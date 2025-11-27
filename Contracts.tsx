import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Contracts = () => {
  const contracts = [
    {
      name: "Mobile Service Agreement",
      date: "2023-01-15",
      type: "Service Contract",
      status: "Active",
    },
    {
      name: "Home Internet Contract",
      date: "2023-03-20",
      type: "Service Contract",
      status: "Active",
    },
    {
      name: "Device Payment Plan",
      date: "2023-06-10",
      type: "Finance Agreement",
      status: "Completed",
    },
    {
      name: "Terms & Conditions v2.1",
      date: "2023-01-15",
      type: "Legal Document",
      status: "Signed",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Contract Attachments
        </h1>
        <p className="text-muted-foreground">
          Access all customer contracts and legal documents
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Documents</CardTitle>
          <CardDescription>Signed agreements and contracts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {contract.name}
                    </div>
                  </TableCell>
                  <TableCell>{contract.type}</TableCell>
                  <TableCell>{contract.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        contract.status === "Active"
                          ? "bg-success/20 text-success"
                          : contract.status === "Completed"
                          ? "bg-accent/20 text-accent-foreground"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {contract.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
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

export default Contracts;
