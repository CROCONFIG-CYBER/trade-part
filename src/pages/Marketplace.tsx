import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingCart, Star, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  farmer: string;
  location: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  rating: number;
  inStock: number;
  description: string;
  discount?: number;
  harvestDate: string;
}

const Marketplace = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "John Smith",
      location: "Green Valley Farm",
      price: 4.99,
      unit: "per kg",
      category: "vegetables",
      image: "/placeholder.svg",
      rating: 4.8,
      inStock: 150,
      description: "Fresh, organic tomatoes grown without pesticides",
      discount: 10,
      harvestDate: "2024-08-01"
    },
    {
      id: 2,
      name: "Fresh Corn",
      farmer: "Maria Garcia",
      location: "Sunny Acres",
      price: 3.50,
      unit: "per dozen",
      category: "vegetables",
      image: "/placeholder.svg",
      rating: 4.6,
      inStock: 200,
      description: "Sweet corn harvested this morning",
      harvestDate: "2024-08-02"
    },
    {
      id: 3,
      name: "Red Apples",
      farmer: "David Johnson",
      location: "Mountain View Orchard",
      price: 6.99,
      unit: "per kg",
      category: "fruits",
      image: "/placeholder.svg",
      rating: 4.9,
      inStock: 300,
      description: "Crisp, sweet red apples from our orchard",
      discount: 15,
      harvestDate: "2024-07-28"
    },
    {
      id: 4,
      name: "Free-Range Eggs",
      farmer: "Sarah Wilson",
      location: "Happy Hen Farm",
      price: 8.99,
      unit: "per dozen",
      category: "dairy",
      image: "/placeholder.svg",
      rating: 5.0,
      inStock: 100,
      description: "Fresh eggs from free-range chickens",
      harvestDate: "2024-08-02"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "dairy", label: "Dairy & Eggs" },
    { value: "grains", label: "Grains" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price * (1 - discount / 100);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="bg-card rounded-xl p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-foreground mb-6">Farm Marketplace</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {cart.length > 0 && (
          <div className="mb-6 p-4 bg-farm-secondary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {cart.length} item(s) in cart
              </span>
              <Button variant="farmSecondary" size="sm">
                <ShoppingCart className="w-4 h-4 mr-1" />
                View Cart
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
          
          return (
            <Card key={product.id} className="overflow-hidden hover:shadow-farm transition-all duration-300">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.discount && (
                  <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                    -{product.discount}%
                  </Badge>
                )}
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{product.rating}</span>
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground space-x-2">
                  <MapPin className="w-3 h-3" />
                  <span>{product.farmer} • {product.location}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{product.description}</p>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Harvested: {product.harvestDate}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {product.discount ? (
                        <>
                          <span className="text-lg font-bold text-farm-primary">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-sm line-through text-muted-foreground">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-farm-primary">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{product.unit}</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {product.inStock} in stock
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  variant="farm"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No products found matching your criteria.</div>
          <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Marketplace;