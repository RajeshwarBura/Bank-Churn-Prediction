import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, CheckCircle2, Download, TrendingDown, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Results = () => {
  // Mock prediction results
  const predictionResult = {
    churnProbability: 78,
    riskLevel: "High",
    confidence: 92,
  };

  const featureImportance = [
    { feature: "Contract Type", importance: 85 },
    { feature: "Tenure", importance: 72 },
    { feature: "Monthly Charges", importance: 68 },
    { feature: "Internet Service", importance: 55 },
    { feature: "Payment Method", importance: 42 },
  ];

  const recommendations = [
    {
      title: "Offer Contract Upgrade",
      description: "Customer on month-to-month plan. Offer incentive for annual contract.",
      impact: "High",
    },
    {
      title: "Reduce Monthly Charges",
      description: "Customer paying above average. Consider loyalty discount of 10-15%.",
      impact: "Medium",
    },
    {
      title: "Improve Service Quality",
      description: "Monitor service issues and proactively address complaints.",
      impact: "Medium",
    },
  ];

  const batchResults = [
    { id: "C001", name: "John Smith", probability: 82, risk: "High" },
    { id: "C002", name: "Sarah Johnson", probability: 15, risk: "Low" },
    { id: "C003", name: "Mike Davis", probability: 67, risk: "High" },
    { id: "C004", name: "Emily Brown", probability: 28, risk: "Low" },
    { id: "C005", name: "David Wilson", probability: 54, risk: "Medium" },
  ];

  const riskData = [
    { name: "High Risk", value: 245, color: "hsl(var(--destructive))" },
    { name: "Medium Risk", value: 412, color: "hsl(var(--warning))" },
    { name: "Low Risk", value: 1212, color: "hsl(var(--success))" },
  ];

  const getRiskBadge = (risk: string) => {
    const variants: Record<string, "destructive" | "secondary" | "default"> = {
      High: "destructive",
      Medium: "secondary",
      Low: "default",
    };
    return <Badge variant={variants[risk] || "default"}>{risk} Risk</Badge>;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Prediction Results</h1>
            <p className="text-muted-foreground">Detailed churn analysis and recommendations</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Single Prediction Result */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Customer Churn Prediction
              </CardTitle>
              <CardDescription>Individual customer risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="text-4xl font-bold text-destructive mb-2">
                    {predictionResult.churnProbability}%
                  </div>
                  <div className="text-sm text-muted-foreground">Churn Probability</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-muted">
                  <div className="text-2xl font-bold mb-2">{getRiskBadge(predictionResult.riskLevel)}</div>
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-success/10 border border-success/20">
                  <div className="text-4xl font-bold text-success mb-2">
                    {predictionResult.confidence}%
                  </div>
                  <div className="text-sm text-muted-foreground">Model Confidence</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Importance & Recommendations */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
                <CardDescription>Key factors influencing this prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={featureImportance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="feature" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="importance" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retention Recommendations</CardTitle>
                <CardDescription>Suggested actions to reduce churn risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 rounded-lg border bg-card">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{rec.title}</h4>
                        {rec.impact === "High" ? (
                          <TrendingUp className="h-4 w-4 text-destructive" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      <Badge variant="outline" className="mt-2">
                        {rec.impact} Impact
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Batch Results */}
          <Card>
            <CardHeader>
              <CardTitle>Batch Prediction Results</CardTitle>
              <CardDescription>Churn predictions for multiple customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6 mb-6">
                {riskData.map((item, idx) => (
                  <div key={idx} className="text-center p-4 rounded-lg border">
                    <div className="text-3xl font-bold mb-1" style={{ color: item.color }}>
                      {item.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{item.name}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Churn Probability</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batchResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.id}</TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-gradient-accent"
                                style={{ width: `${result.probability}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-12">{result.probability}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{getRiskBadge(result.risk)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <CardDescription>Overall churn risk breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
