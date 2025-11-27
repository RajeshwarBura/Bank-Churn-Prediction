import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BillingItems = () => {
  const items = [
    { service: "Mobile Plan - Premium", amount: 49.99, type: "Recurring" },
    { service: "Home Internet - NBN 100", amount: 79.99, type: "Recurring" },
    { service: "International Calls", amount: 12.50, type: "Usage" },
    { service: "Additional Data - 5GB", amount: 15.00, type: "One-time" },
    { service: "Device Insurance", amount: 9.99, type: "Recurring" },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Billing Items
        </h1>
        <p className="text-muted-foreground">
          Detailed breakdown of all charges and services
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Billing Items</CardTitle>
          <CardDescription>All active services and charges</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service/Charge</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.service}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent/20 text-accent-foreground">
                      {item.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">
                  ${items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingItems;
