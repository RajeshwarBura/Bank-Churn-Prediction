import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, Brain, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "ML-Powered Predictions",
      description: "Advanced machine learning algorithms to predict customer churn with high accuracy",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Comprehensive EDA dashboard with visual insights and churn analytics",
    },
    {
      icon: Users,
      title: "Customer Segmentation",
      description: "Classify customers by churn risk levels - low, medium, and high",
    },
    {
      icon: TrendingUp,
      title: "Predictive Insights",
      description: "Identify key churn drivers and patterns before customers leave",
    },
    {
      icon: Shield,
      title: "Proactive Retention",
      description: "Enable data-backed retention strategies and personalized offers",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Instant predictions for single customers or bulk datasets",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Predict Customer Churn with
              <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                Machine Learning
              </span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Leverage advanced analytics and predictive modeling to identify at-risk customers
              and implement proactive retention strategies before it's too late.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/predict">
                <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              
              <a href="http://localhost:8501/" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  Predict Churn
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand, predict, and prevent customer churn
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border/50 hover:border-accent/50 transition-colors">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, streamlined process from data to actionable insights
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Upload Data", desc: "Import your telecom customer dataset" },
              { step: "2", title: "Analyze", desc: "Explore patterns and churn indicators" },
              { step: "3", title: "Predict", desc: "Get ML-powered churn predictions" },
              { step: "4", title: "Act", desc: "Implement retention strategies" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Reduce Churn?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Start analyzing your customer data today and unlock actionable insights
          </p>
          <Link to="/upload">
            <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              Upload Your Data <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
