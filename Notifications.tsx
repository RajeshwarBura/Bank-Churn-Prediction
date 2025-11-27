import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageSquare, AlertCircle } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      type: "email",
      icon: Mail,
      title: "Payment Received",
      message: "Payment of $89.99 confirmed",
      time: "2 hours ago",
      read: false,
    },
    {
      type: "sms",
      icon: MessageSquare,
      title: "Bill Ready",
      message: "Your monthly bill is now available",
      time: "1 day ago",
      read: true,
    },
    {
      type: "alert",
      icon: AlertCircle,
      title: "Payment Due Soon",
      message: "Payment due in 3 days",
      time: "3 days ago",
      read: true,
    },
    {
      type: "notification",
      icon: Bell,
      title: "Service Update",
      message: "Network upgrade completed in your area",
      time: "1 week ago",
      read: true,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Notification History
        </h1>
        <p className="text-muted-foreground">
          All customer communications and alerts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Communication Log</CardTitle>
          <CardDescription>Messages, emails, and alerts sent to customer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification, index) => {
            const Icon = notification.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg border border-border/40 ${
                  !notification.read ? "bg-accent/10" : "bg-background"
                }`}
              >
                <div className="mt-1">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{notification.title}</p>
                    {!notification.read && <Badge variant="default">New</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
