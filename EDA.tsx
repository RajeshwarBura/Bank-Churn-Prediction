import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const EDA = () => {
  // Mock data for visualizations
  const churnData = [
    { name: "Stayed", value: 5174, percentage: 73.5 },
    { name: "Churned", value: 1869, percentage: 26.5 },
  ];

  const contractData = [
    { type: "Month-to-month", churned: 1200, stayed: 1500 },
    { type: "One year", churned: 450, stayed: 1800 },
    { type: "Two year", churned: 219, stayed: 1874 },
  ];

  const tenureData = [
    { range: "0-12", churn: 35 },
    { range: "13-24", churn: 25 },
    { range: "25-36", churn: 18 },
    { range: "37-48", churn: 15 },
    { range: "49-60", churn: 12 },
    { range: "61+", churn: 8 },
  ];

  const monthlyChargesData = [
    { range: "$0-30", count: 1200 },
    { range: "$30-60", count: 2100 },
    { range: "$60-90", count: 1800 },
    { range: "$90+", count: 1943 },
  ];

  const COLORS = ["hsl(var(--success))", "hsl(var(--destructive))"];

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Exploratory Data Analysis</h1>
          <p className="text-muted-foreground">
            Visual insights and patterns from your telecom customer data
          </p>
        </div>

        <div className="grid gap-6">
          {/* Summary Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,043</div>
                <p className="text-xs text-muted-foreground mt-1">In dataset</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">26.5%</div>
                <p className="text-xs text-muted-foreground mt-1">1,869 customers</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Avg Monthly Charge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$64.76</div>
                <p className="text-xs text-muted-foreground mt-1">Per customer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Avg Tenure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 months</div>
                <p className="text-xs text-muted-foreground mt-1">Customer lifetime</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Churn Distribution</CardTitle>
                <CardDescription>Overall customer churn breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={churnData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {churnData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn by Contract Type</CardTitle>
                <CardDescription>Contract duration impact on churn</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={contractData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="churned" fill="hsl(var(--destructive))" name="Churned" />
                    <Bar dataKey="stayed" fill="hsl(var(--success))" name="Stayed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Churn Rate by Tenure</CardTitle>
                <CardDescription>Customer lifetime vs churn probability</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={tenureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="churn"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      name="Churn %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Charges Distribution</CardTitle>
                <CardDescription>Customer count by billing amount</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyChargesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Important churn drivers identified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <h4 className="font-semibold mb-2 text-destructive">High Risk Factor</h4>
                  <p className="text-sm">Month-to-month contracts show 42% churn rate</p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <h4 className="font-semibold mb-2 text-warning">Medium Risk</h4>
                  <p className="text-sm">Customers with tenure &lt; 12 months have 35% churn</p>
                </div>
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <h4 className="font-semibold mb-2 text-success">Positive Indicator</h4>
                  <p className="text-sm">Two-year contracts retain 89% of customers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EDA;
