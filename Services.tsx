import { Wifi, Smartphone, Tv, Phone, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Services = () => {
  const services = [
    {
      id: 1,
      type: "Mobile",
      icon: Smartphone,
      details: [
        { number: "+1 (555) 123-4567", plan: "Premium Unlimited", status: "Active", data: "Unlimited", minutes: "Unlimited" },
        { number: "+1 (555) 123-4568", plan: "Standard", status: "Active", data: "50GB", minutes: "Unlimited" },
      ]
    },
    {
      id: 2,
      type: "Home Internet",
      icon: Wifi,
      details: [
        { type: "NBN 100/40", address: "123 Main Street, Sydney", status: "Active", speed: "100 Mbps", technology: "FTTC" },
      ]
    },
    {
      id: 3,
      type: "Landline",
      icon: Phone,
      details: [
        { number: "+1 (555) 987-6543", plan: "Unlimited Local & National", status: "Active" },
      ]
    },
    {
      id: 4,
      type: "TV & Streaming",
      icon: Tv,
      details: [
        { package: "Premium Sports & Movies", devices: "3 Devices", status: "Active", channels: "150+" },
      ]
    },
  ];

  const addons = [
    { name: "International Calls Pack", price: "$10/mo", active: true },
    { name: "Extra 20GB Data", price: "$15/mo", active: true },
    { name: "Device Insurance", price: "$8/mo", active: false },
    { name: "Premium Email Service", price: "$5/mo", active: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Wifi className="h-10 w-10 text-primary" />
            Customer Services
          </h1>
          <p className="text-muted-foreground">
            Manage all active services and subscriptions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {service.type}
                    <Badge variant="outline" className="ml-auto">{service.details.length} Active</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {service.details.map((detail, idx) => (
                    <div key={idx} className="p-4 border rounded-lg space-y-2">
                      {service.type === "Mobile" && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{detail.number}</span>
                            <Badge className="bg-success">{detail.status}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div>Plan: <span className="text-foreground">{detail.plan}</span></div>
                            <div>Data: <span className="text-foreground">{detail.data}</span></div>
                          </div>
                        </>
                      )}
                      {service.type === "Home Internet" && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{detail.type}</span>
                            <Badge className="bg-success">{detail.status}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{detail.address}</div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div>Speed: <span className="text-foreground">{detail.speed}</span></div>
                            <div>Tech: <span className="text-foreground">{detail.technology}</span></div>
                          </div>
                        </>
                      )}
                      {service.type === "Landline" && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{detail.number}</span>
                            <Badge className="bg-success">{detail.status}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">Plan: <span className="text-foreground">{detail.plan}</span></div>
                        </>
                      )}
                      {service.type === "TV & Streaming" && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{detail.package}</span>
                            <Badge className="bg-success">{detail.status}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div>Devices: <span className="text-foreground">{detail.devices}</span></div>
                            <div>Channels: <span className="text-foreground">{detail.channels}</span></div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Add New {service.type}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Additional Subscriptions & Add-ons</CardTitle>
            <CardDescription>Manage optional services and extras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {addons.map((addon, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold">{addon.name}</p>
                    <p className="text-sm text-muted-foreground">{addon.price}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={addon.active ? "default" : "secondary"}>
                      {addon.active ? "Active" : "Inactive"}
                    </Badge>
                    <Switch checked={addon.active} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
