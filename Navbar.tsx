import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Wifi, CreditCard, MessageSquare, DollarSign, Target, BarChart3 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: BarChart3 },
    { path: "/customer-lookup", label: "Customer Lookup", icon: Search },
    { path: "/create-customer", label: "New Customer", icon: UserPlus },
    { path: "/services", label: "Services", icon: Wifi },
    { path: "/payment-history", label: "Payments", icon: CreditCard },
    { path: "/interactions", label: "Interactions", icon: MessageSquare },
    { path: "/payment", label: "Process Payment", icon: DollarSign },
    { path: "http://localhost:8501/", label: "Churn Risk", icon: Target },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-accent" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ChurnPredict
          </span>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              if (item.label === "Churn Risk") {
                // Use <a> for external streamlit link
                return (
                  <a key={item.path} href="http://localhost:8501/" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Button>
                  </a>
                );
              }
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
