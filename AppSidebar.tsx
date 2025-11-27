import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  UserPlus,
  Wifi,
  CreditCard,
  DollarSign,
  FileText,
  Receipt,
  History,
  Bell,
  Paperclip,
  Target,
  Calendar,
  ClipboardList,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const menuItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/customer-lookup", label: "Customer Lookup", icon: Search },
  { path: "/create-customer", label: "New Customer", icon: UserPlus },
  { path: "/services", label: "Services", icon: Wifi },
  { path: "/payment-history", label: "Payments", icon: CreditCard },
  { path: "/payment", label: "Process Payment", icon: DollarSign },
  { path: "/payment-extension", label: "Payment Extension", icon: Calendar },
  { path: "/payment-arrangement", label: "Payment Arrangement", icon: ClipboardList },
  { path: "/billing", label: "Billing", icon: FileText },
  { path: "/billing-items", label: "Billing Items", icon: Receipt },
  { path: "/credit-history", label: "Credit Check History", icon: History },
  { path: "/notifications", label: "Notification History", icon: Bell },
  { path: "/contracts", label: "Contract Attachments", icon: Paperclip },
  { path: "/predict", label: "Churn Risk", icon: Target },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const collapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary text-primary-foreground font-medium"
      : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-accent" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ChurnPredict
            </span>
          </div>
        )}
        <SidebarTrigger />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} end className={getNavCls}>
                      <item.icon className={collapsed ? "" : "mr-2"} />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={signOut}
              >
                <LogOut className={collapsed ? "" : "mr-2"} />
                {!collapsed && <span>Logout</span>}
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
