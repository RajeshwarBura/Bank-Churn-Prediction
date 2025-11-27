import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const PaymentExtension = () => {
  const [customerId, setCustomerId] = useState("");
  const [extensionDate, setExtensionDate] = useState<Date>();
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Extension Granted",
      description: `Payment extension approved until ${extensionDate ? format(extensionDate, "PPP") : ""}`,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Payment Extension
        </h1>
        <p className="text-muted-foreground">
          Manage payment due date extensions for customers
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Payment Extension</CardTitle>
          <CardDescription>
            Grant a payment extension to a customer facing temporary hardship
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
              <Label>Extension Until</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {extensionDate ? format(extensionDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={extensionDate}
                    onSelect={setExtensionDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Extension</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial_hardship">Financial Hardship</SelectItem>
                  <SelectItem value="medical_emergency">Medical Emergency</SelectItem>
                  <SelectItem value="natural_disaster">Natural Disaster</SelectItem>
                  <SelectItem value="billing_dispute">Billing Dispute</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Grant Extension
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentExtension;
