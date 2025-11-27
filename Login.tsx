import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Admin tab state
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<Array<{ id: string; email: string; full_name: string | null }>>([]);
  const [accessMap, setAccessMap] = useState<Record<string, "full" | "limited" | "none">>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate("/");
    }
    setLoading(false);
  };

  // Sign up is intentionally removed

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10 p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-2xl">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-accent mb-4" />
              <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ChurnPredict
              </CardTitle>
              <CardDescription>
                Telecom Customer Service Platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="expert@telecom.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

                <TabsContent value="admin">
                  {!isAdmin ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setAdminLoading(true);
                        const emailNorm = adminEmail.trim().toLowerCase();
                        const { error: authErr } = await supabase.auth.signInWithPassword({
                          email: emailNorm,
                          password: adminPassword,
                        });
                        if (authErr) {
                          toast({ title: "Admin Login Failed", description: authErr.message, variant: "destructive" });
                          setAdminLoading(false);
                          return;
                        }
                        const { data: userData } = await supabase.auth.getUser();
                        const uid = userData.user?.id;
                        if (!uid) {
                          toast({ title: "Admin Login Failed", description: "No user session", variant: "destructive" });
                          setAdminLoading(false);
                          return;
                        }
                        // Verify admin role using has_role() or user_roles table
                        const { data: isAdminFn, error: roleErr } = await supabase.rpc("has_role", { _role: "admin", _user_id: uid });
                        if (roleErr || !isAdminFn) {
                          toast({ title: "Access Denied", description: "Admin role required", variant: "destructive" });
                          setAdminLoading(false);
                          return;
                        }
                        setIsAdmin(true);
                        // Load users and access
                        const [{ data: profiles }, { data: access }] = await Promise.all([
                          supabase.from("profiles").select("id,email,full_name").order("email"),
                          (supabase as any).from("user_access").select("user_id,access_level"),
                        ]);
                        setUsers(profiles || []);
                        const map: Record<string, "full" | "limited" | "none"> = {};
                        (access || []).forEach((a: any) => { map[a.user_id] = a.access_level; });
                        setAccessMap(map);
                        setAdminLoading(false);
                      }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">Admin Email</Label>
                        <Input id="admin-email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-password">Password</Label>
                        <Input id="admin-password" type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
                      </div>
                      <Button type="submit" className="w-full" disabled={adminLoading}>
                        {adminLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Admin Sign In"
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">Access Control</h3>
                        <p className="text-sm text-muted-foreground">Toggle user visibility/permission levels</p>
                      </div>
                      <div className="space-y-3 max-h-80 overflow-auto pr-1">
                        {users.map((u) => (
                          <div key={u.id} className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="font-medium truncate">{u.email}</div>
                              <div className="text-xs text-muted-foreground truncate">{u.full_name ?? "—"}</div>
                            </div>
                            <select
                              className="border rounded px-2 py-1 text-sm"
                              value={accessMap[u.id] || "none"}
                              onChange={async (e) => {
                                const level = e.target.value as "full" | "limited" | "none";
                                setAccessMap((m) => ({ ...m, [u.id]: level }));
                                const { error } = await (supabase as any).rpc("set_user_access", {
                                  _user_id: u.id,
                                  _access_level: level,
                                });
                                if (error) {
                                  toast({ title: "Update failed", description: error.message, variant: "destructive" });
                                } else {
                                  toast({ title: "Access updated", description: `${u.email} → ${level}` });
                                }
                              }}
                            >
                              <option value="full">Full Access</option>
                              <option value="limited">Limited Access</option>
                              <option value="none">No Access</option>
                            </select>
                          </div>
                        ))}
                        {users.length === 0 && (
                          <div className="text-sm text-muted-foreground">No users found.</div>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>
          </Tabs>
            </CardContent>
      </Card>
    </div>
  );
};

export default Login;
