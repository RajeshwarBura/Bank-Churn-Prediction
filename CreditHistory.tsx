import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const CreditHistory = () => {
  const checks = [
    { date: "2024-01-10", type: "New Service", score: 720, result: "Approved" },
    { date: "2023-12-05", type: "Device Upgrade", score: 715, result: "Approved" },
    { date: "2023-11-20", type: "Credit Increase", score: 710, result: "Approved" },
    { date: "2023-10-15", type: "New Service", score: 705, result: "Conditional" },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Credit Check History
        </h1>
        <p className="text-muted-foreground">
          Track all credit assessments and approvals
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credit Assessment Records</CardTitle>
          <CardDescription>Historical credit checks performed for this customer</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check Type</TableHead>
                <TableHead>Credit Score</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checks.map((check, index) => (
                <TableRow key={index}>
                  <TableCell>{check.date}</TableCell>
                  <TableCell>{check.type}</TableCell>
                  <TableCell>
                    <span className="font-bold text-primary">{check.score}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        check.result === "Approved"
                          ? "default"
                          : check.result === "Conditional"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {check.result}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditHistory;
