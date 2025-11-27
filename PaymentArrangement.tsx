import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PaymentArrangement = () => {
  const [customerId, setCustomerId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [installments, setInstallments] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const installmentAmount = (parseFloat(totalAmount) / parseInt(installments)).toFixed(2);
    toast({
      title: "Payment Plan Created",
      description: `${installments} monthly installments of $${installmentAmount}`,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Payment Arrangement
        </h1>
        <p className="text-muted-foreground">
          Set up flexible payment plans for customers
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Payment Plan</CardTitle>
            <CardDescription>
              Break down outstanding balance into manageable installments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customerId">Customer ID</Label>
                <Input
                  id="customerId"
                  placeholder="Enter customer ID"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Outstanding Amount ($)</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="installments">Number of Installments</Label>
                <Input
                  id="installments"
                  type="number"
                  placeholder="3"
                  value={installments}
                  onChange={(e) => setInstallments(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Create Payment Plan
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Payment Plans</CardTitle>
            <CardDescription>Current installment arrangements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border/40 bg-accent/10">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Customer #12345</span>
                  <span className="text-sm text-success">Active</span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span>$450.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly:</span>
                    <span>$150.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining:</span>
                    <span>2/3 payments</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentArrangement;
