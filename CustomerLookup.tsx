import { useState } from "react";
import { Search, Phone, Mail, MapPin, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CustomerLookup = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customer, setCustomer] = useState<any>(null);

  const handleSearch = () => {
    // Mock customer data
    setCustomer({
      id: "CX-2024-0891",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Sydney NSW 2000",
      joinDate: "2021-03-15",
      status: "Active",
      churnRisk: "Low",
      accountBalance: "$0.00",
      plan: "Premium Unlimited",
      contractEnd: "2025-03-15"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Customer Lookup
          </h1>
          <p className="text-muted-foreground">
            Search by customer ID, phone number, or email
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Customer</CardTitle>
            <CardDescription>Enter customer details to retrieve their information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Customer ID, Phone, or Email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button onClick={handleSearch} size="lg" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {customer && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Customer Details
                  <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                    {customer.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-semibold">{customer.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-semibold">{customer.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-semibold">{customer.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Since</p>
                    <p className="font-semibold">{customer.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <p className="font-semibold">{customer.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Balance</p>
                  <p className="font-semibold text-2xl">{customer.accountBalance}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contract Ends</p>
                  <p className="font-semibold">{customer.contractEnd}</p>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-success" />
                    <p className="text-sm text-muted-foreground">Churn Risk</p>
                  </div>
                  <Badge variant="outline" className="text-success border-success">
                    {customer.churnRisk} Risk
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerLookup;
