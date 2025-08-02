import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Users, 
  MessageCircle, 
  Settings, 
  Home,
  Calendar,
  Percent
} from "lucide-react";

const Layout = () => {
  const location = useLocation();
  
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/marketplace", icon: ShoppingCart, label: "Marketplace" },
    { to: "/bookings", icon: Calendar, label: "Bookings" },
    { to: "/chat", icon: MessageCircle, label: "Chat" },
    { to: "/admin", icon: Settings, label: "Admin" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-farm-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FT</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">FarmTrade</h1>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <NavLink key={item.to} to={item.to}>
                    <Button 
                      variant={isActive ? "farm" : "ghost"} 
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  </NavLink>
                );
              })}
            </nav>

            <div className="flex items-center space-x-2">
              <Button variant="farmSecondary" size="sm">
                <Users className="w-4 h-4 mr-1" />
                Farmer
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <NavLink key={item.to} to={item.to} className="flex flex-col items-center p-2">
                <Icon className={`w-5 h-5 ${isActive ? 'text-farm-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs mt-1 ${isActive ? 'text-farm-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Layout;