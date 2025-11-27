import { CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PaymentHistory = () => {
  const payments = [
    { id: "PAY-001", date: "2024-01-15", amount: "$79.99", method: "Credit Card", status: "Completed", invoice: "INV-2024-001" },
    { id: "PAY-002", date: "2024-02-15", amount: "$79.99", method: "Auto-Pay", status: "Completed", invoice: "INV-2024-002" },
    { id: "PAY-003", date: "2024-03-15", amount: "$79.99", method: "Credit Card", status: "Completed", invoice: "INV-2024-003" },
    { id: "PAY-004", date: "2024-04-15", amount: "$79.99", method: "Auto-Pay", status: "Pending", invoice: "INV-2024-004" },
    { id: "PAY-005", date: "2024-04-01", amount: "$15.99", method: "Debit Card", status: "Failed", invoice: "INV-2024-005" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "Failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Completed":
        return "default";
      case "Pending":
        return "secondary";
      case "Failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <CreditCard className="h-10 w-10 text-primary" />
            Payment History
          </h1>
          <p className="text-muted-foreground">
            View all customer payment transactions and invoices
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Payments</CardTitle>
            <CardDescription>Filter by customer ID, invoice number, or date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input placeholder="Customer ID or Invoice Number" className="flex-1" />
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">$319.96</div>
              <p className="text-sm text-muted-foreground">Total Collected (2024)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">$79.99</div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-destructive">$15.99</div>
              <p className="text-sm text-muted-foreground">Failed Payments</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Transactions</CardTitle>
            <CardDescription>Complete history of all payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell className="font-semibold">{payment.amount}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.invoice}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(payment.status)} className="gap-1">
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentHistory;
