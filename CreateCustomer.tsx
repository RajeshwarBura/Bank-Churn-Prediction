import { useState } from "react";
import { UserPlus, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CreateCustomer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    seniorCitizen: "",
    tenure: "",
    contractType: "",
    monthlyCharges: "",
    internetService: "",
    phoneService: "",
    paymentMethod: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    plan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      // Only insert columns that exist in public.customers
      const payload = {
        gender: formData.gender || null,
        age: formData.age ? Number(formData.age) : null,
        seniorcitizen:
          formData.seniorCitizen === "yes" ? true : formData.seniorCitizen === "no" ? false : null,
        tenure: formData.tenure ? Number(formData.tenure) : null,
        plantype: formData.plan || null,
      } as const;

      const { error } = await (supabase as unknown as any).from("customers").insert(payload);
      if (error) throw error;

      toast({
        title: "Customer Created",
        description: "New customer has been saved to the database.",
      });

      setFormData({
        gender: "",
        age: "",
        seniorCitizen: "",
        tenure: "",
        contractType: "",
        monthlyCharges: "",
        internetService: "",
        phoneService: "",
        paymentMethod: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        plan: "",
      });
    } catch (err: any) {
      toast({
        title: "Save failed",
        description: err?.message || "Could not save customer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <UserPlus className="h-10 w-10 text-primary" />
            Create New Customer
          </h1>
          <p className="text-muted-foreground">
            Register a new customer in the system
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
                <CardDescription>Enter primary customer information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 35"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenure">Tenure (months)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      placeholder="e.g., 24"
                      value={formData.tenure}
                      onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seniorCitizen">Senior Citizen</Label>
                    <Select value={formData.seniorCitizen} onValueChange={(value) => setFormData({ ...formData, seniorCitizen: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contractType">Contract Type</Label>
                    <Select value={formData.contractType} onValueChange={(value) => setFormData({ ...formData, contractType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Contract" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Month-to-Month</SelectItem>
                        <SelectItem value="annual">1 Year Contract</SelectItem>
                        <SelectItem value="biannual">2 Year Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="monthlyCharges">Monthly Charges ($)</Label>
                    <Input
                      id="monthlyCharges"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 65.50"
                      value={formData.monthlyCharges}
                      onChange={(e) => setFormData({ ...formData, monthlyCharges: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="internetService">Internet Service</Label>
                    <Select value={formData.internetService} onValueChange={(value) => setFormData({ ...formData, internetService: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dsl">DSL</SelectItem>
                        <SelectItem value="fiber">Fiber Optic</SelectItem>
                        <SelectItem value="no">No Internet Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phoneService">Phone Service</Label>
                    <Select value={formData.phoneService} onValueChange={(value) => setFormData({ ...formData, phoneService: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronic">Electronic Check</SelectItem>
                        <SelectItem value="mailed">Mailed Check</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Enter customer's personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address Details</CardTitle>
                <CardDescription>Enter customer's residential address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Plan Details</CardTitle>
                <CardDescription>Select customer's initial plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plan">Select Plan</Label>
                    <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic - $29.99/mo</SelectItem>
                        <SelectItem value="standard">Standard - $49.99/mo</SelectItem>
                        <SelectItem value="premium">Premium Unlimited - $79.99/mo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="gap-2" disabled={isSubmitting}>
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Create Customer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;
