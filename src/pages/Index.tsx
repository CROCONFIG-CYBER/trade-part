import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Calendar, MessageCircle, TrendingUp, Users, Package } from "lucide-react";
import { NavLink } from "react-router-dom";
import farmHeroImage from "@/assets/farm-hero.jpg";

const Index = () => {
  return (
    <div className="space-y-8 pb-20 md:pb-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden shadow-farm">
        <img 
          src={farmHeroImage} 
          alt="Farm Trading Platform" 
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-farm-primary/80 to-transparent">
          <div className="flex items-center h-full p-8">
            <div className="text-white space-y-4 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold">
                FarmTrade Marketplace
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Connect farmers directly with buyers. Fresh produce, fair prices, sustainable farming.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <NavLink to="/marketplace">
                  <Button variant="farmSecondary" size="lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Browse Products
                  </Button>
                </NavLink>
                <NavLink to="/admin">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    Admin Dashboard
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NavLink to="/marketplace">
          <Card className="hover:shadow-farm transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-farm-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <ShoppingCart className="w-6 h-6 text-farm-primary" />
              </div>
              <h3 className="text-xl font-semibold">Marketplace</h3>
              <p className="text-muted-foreground">Browse and purchase fresh farm products directly from local farmers</p>
              <Badge variant="success">25+ Products</Badge>
            </CardContent>
          </Card>
        </NavLink>

        <NavLink to="/bookings">
          <Card className="hover:shadow-farm transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-farm-secondary/20 rounded-lg flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6 text-farm-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Bookings</h3>
              <p className="text-muted-foreground">Schedule pickup times and manage your product reservations</p>
              <Badge variant="warning">Easy Scheduling</Badge>
            </CardContent>
          </Card>
        </NavLink>

        <NavLink to="/chat">
          <Card className="hover:shadow-farm transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-farm-accent/20 rounded-lg flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-farm-accent" />
              </div>
              <h3 className="text-xl font-semibold">Community Chat</h3>
              <p className="text-muted-foreground">Connect with farmers and get support from our team</p>
              <Badge variant="default">Live Chat</Badge>
            </CardContent>
          </Card>
        </NavLink>
      </div>

      {/* Stats Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-8">Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-farm-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-5 h-5 text-farm-primary" />
              </div>
              <p className="text-2xl font-bold">15+</p>
              <p className="text-sm text-muted-foreground">Active Farmers</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-farm-secondary/20 rounded-lg flex items-center justify-center mx-auto">
                <Package className="w-5 h-5 text-farm-secondary" />
              </div>
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-muted-foreground">Products Listed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <p className="text-2xl font-bold">200+</p>
              <p className="text-sm text-muted-foreground">Orders Completed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-farm-accent/20 rounded-lg flex items-center justify-center mx-auto">
                <MessageCircle className="w-5 h-5 text-farm-accent" />
              </div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-muted-foreground">Support Available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
