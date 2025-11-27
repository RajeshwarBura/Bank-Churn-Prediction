import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const DBStatus = () => {
  const { user } = useAuth();
  const [envOk, setEnvOk] = useState<boolean>(true);
  const [queryOk, setQueryOk] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      // If client was created, env vars exist due to guard in client.ts
      setEnvOk(true);
    } catch (e: any) {
      setEnvOk(false);
      setErrorMsg(e?.message || String(e));
      return;
    }

    const run = async () => {
      // Must be logged in for RLS-protected tables
      if (!user) {
        setQueryOk(false);
        setErrorMsg("Not signed in. Log in to test DB access.");
        return;
      }

      const { error } = await supabase.from("profiles").select("id").limit(1);
      if (error) {
        setQueryOk(false);
        setErrorMsg(error.message);
      } else {
        setQueryOk(true);
        setErrorMsg(null);
      }
    };
    run();
  }, [user]);

  const StatusBadge = ({ ok }: { ok: boolean | null }) => {
    if (ok === null) return <Badge variant="secondary">Checking...</Badge>;
    return ok ? <Badge className="bg-green-600">OK</Badge> : <Badge variant="destructive">Error</Badge>;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Supabase Connection Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Env variables present</span>
              <StatusBadge ok={envOk} />
            </div>
            <div className="flex items-center justify-between">
              <span>Live query (profiles)</span>
              <StatusBadge ok={queryOk} />
            </div>
            {errorMsg && (
              <div className="text-sm text-destructive">{errorMsg}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DBStatus;


