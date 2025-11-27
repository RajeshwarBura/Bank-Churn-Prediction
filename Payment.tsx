import { useState } from "react";
import { DollarSign, CreditCard, Smartphone, Building, QrCode } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [amount, setAmount] = useState("79.99");

  const handlePayment = () => {
    toast({
      title: "Payment Processed",
      description: `Payment of $${amount} has been successfully processed.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <DollarSign className="h-10 w-10 text-primary" />
            Process Payment
          </h1>
          <p className="text-muted-foreground">
            Accept customer payments through multiple methods
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Payment Amount</CardTitle>
                <CardDescription>Enter the amount to be paid</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl h-14 font-bold"
                    placeholder="0.00"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select how the customer wants to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="card" id="card" className="mt-1" />
                    <div className="flex-1">
                      <label htmlFor="card" className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Credit/Debit Card</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or Amex</p>
                      </label>
                      {paymentMethod === "card" && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="app" id="app" className="mt-1" />
                    <div className="flex-1">
                      <label htmlFor="app" className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Mobile Wallet</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Apple Pay, Google Pay, PayPal</p>
                      </label>
                      {paymentMethod === "app" && (
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" className="flex-1">Apple Pay</Button>
                          <Button variant="outline" className="flex-1">Google Pay</Button>
                          <Button variant="outline" className="flex-1">PayPal</Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="bank" id="bank" className="mt-1" />
                    <div className="flex-1">
                      <label htmlFor="bank" className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Bank Transfer</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Direct bank account transfer</p>
                      </label>
                      {paymentMethod === "bank" && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor="accountNumber">Account Number</Label>
                            <Input id="accountNumber" placeholder="Enter account number" />
                          </div>
                          <div>
                            <Label htmlFor="routingNumber">Routing Number</Label>
                            <Input id="routingNumber" placeholder="Enter routing number" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="qr" id="qr" className="mt-1" />
                    <div className="flex-1">
                      <label htmlFor="qr" className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <QrCode className="h-5 w-5 text-primary" />
                          <span className="font-semibold">QR Code Payment</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Scan and pay via UPI/QR apps</p>
                      </label>
                      {paymentMethod === "qr" && (
                        <div className="mt-4 flex justify-center">
                          <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                            <QrCode className="h-32 w-32 text-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>

                <Button onClick={handlePayment} className="w-full mt-6" size="lg">
                  Process Payment ${amount}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-semibold">CX-2024-0891</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-semibold">Sarah Johnson</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                  <p className="font-semibold">$79.99</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Amount</p>
                  <p className="text-3xl font-bold text-primary">${amount}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">Remaining Balance</p>
                  <p className="font-semibold">${(79.99 - parseFloat(amount || "0")).toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">$79.99</p>
                  <p className="text-muted-foreground">Mar 15, 2024 - Auto Pay</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">$79.99</p>
                  <p className="text-muted-foreground">Feb 15, 2024 - Credit Card</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">$79.99</p>
                  <p className="text-muted-foreground">Jan 15, 2024 - Credit Card</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
