import { MessageSquare, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Interactions = () => {
  const tickets = [
    { id: "IT-2024-089", date: "2024-04-10", type: "Technical", subject: "Internet Speed Issue", status: "Open", priority: "High", agent: "John Doe" },
    { id: "IT-2024-078", date: "2024-04-05", type: "Billing", subject: "Invoice Clarification", status: "Resolved", priority: "Medium", agent: "Sarah Smith" },
    { id: "IT-2024-065", date: "2024-03-28", type: "Technical", subject: "Mobile Network Issue", status: "Resolved", priority: "High", agent: "Mike Wilson" },
    { id: "IT-2024-051", date: "2024-03-15", type: "Service", subject: "Plan Upgrade Request", status: "Closed", priority: "Low", agent: "Emma Brown" },
    { id: "IT-2024-034", date: "2024-02-20", type: "Technical", subject: "Router Not Working", status: "Closed", priority: "High", agent: "John Doe" },
  ];

  const calls = [
    { id: "CALL-2024-234", date: "2024-04-12", duration: "8:45", type: "Inbound", reason: "Billing Query", agent: "Sarah Smith" },
    { id: "CALL-2024-198", date: "2024-04-08", duration: "12:30", type: "Outbound", reason: "Follow-up", agent: "John Doe" },
    { id: "CALL-2024-176", date: "2024-03-25", duration: "5:20", type: "Inbound", reason: "Technical Support", agent: "Mike Wilson" },
  ];

  const getPriorityVariant = (priority: string): "default" | "secondary" | "destructive" => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <Clock className="h-4 w-4" />;
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "Closed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <MessageSquare className="h-10 w-10 text-primary" />
            Customer Interactions
          </h1>
          <p className="text-muted-foreground">
            Track all customer IT tickets and call history
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">23</div>
              <p className="text-sm text-muted-foreground">Total Tickets</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">5</div>
              <p className="text-sm text-muted-foreground">Open Tickets</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">18</div>
              <p className="text-sm text-muted-foreground">Resolved Tickets</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">47</div>
              <p className="text-sm text-muted-foreground">Total Calls</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tickets" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tickets">IT Tickets</TabsTrigger>
            <TabsTrigger value="calls">Call History</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Customer service and technical support tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Agent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{ticket.type}</Badge>
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge variant={getPriorityVariant(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            {getStatusIcon(ticket.status)}
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{ticket.agent}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Call History</CardTitle>
                <CardDescription>All customer call interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Call ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Agent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calls.map((call) => (
                      <TableRow key={call.id}>
                        <TableCell className="font-medium">{call.id}</TableCell>
                        <TableCell>{call.date}</TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell>
                          <Badge variant={call.type === "Inbound" ? "default" : "secondary"}>
                            {call.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{call.reason}</TableCell>
                        <TableCell>{call.agent}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Interactions;
