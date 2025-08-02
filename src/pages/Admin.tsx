import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Percent, 
  Package, 
  Users, 
  TrendingUp,
  DollarSign,
  ShoppingCart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  farmer: string;
  price: number;
  category: string;
  inStock: number;
  discount?: number;
}

interface Discount {
  id: number;
  productId: number;
  productName: string;
  percentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Organic Tomatoes", farmer: "John Smith", price: 4.99, category: "vegetables", inStock: 150, discount: 10 },
    { id: 2, name: "Fresh Corn", farmer: "Maria Garcia", price: 3.50, category: "vegetables", inStock: 200 },
    { id: 3, name: "Red Apples", farmer: "David Johnson", price: 6.99, category: "fruits", inStock: 300, discount: 15 },
  ]);

  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: 1, productId: 1, productName: "Organic Tomatoes", percentage: 10, startDate: "2024-08-01", endDate: "2024-08-15", isActive: true },
    { id: 2, productId: 3, productName: "Red Apples", percentage: 15, startDate: "2024-08-01", endDate: "2024-08-20", isActive: true },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    farmer: "",
    price: "",
    category: "",
    inStock: "",
    description: ""
  });

  const [newDiscount, setNewDiscount] = useState({
    productId: "",
    percentage: "",
    startDate: "",
    endDate: ""
  });

  const categories = ["vegetables", "fruits", "dairy", "grains"];

  const addProduct = () => {
    if (!newProduct.name || !newProduct.farmer || !newProduct.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      farmer: newProduct.farmer,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      inStock: parseInt(newProduct.inStock) || 0
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", farmer: "", price: "", category: "", inStock: "", description: "" });
    
    toast({
      title: "Product Added",
      description: `${product.name} has been added to the marketplace.`,
    });
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product Removed",
      description: "Product has been removed from the marketplace.",
    });
  };

  const addDiscount = () => {
    if (!newDiscount.productId || !newDiscount.percentage) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const product = products.find(p => p.id === parseInt(newDiscount.productId));
    if (!product) return;

    const discount: Discount = {
      id: Date.now(),
      productId: parseInt(newDiscount.productId),
      productName: product.name,
      percentage: parseInt(newDiscount.percentage),
      startDate: newDiscount.startDate,
      endDate: newDiscount.endDate,
      isActive: true
    };

    setDiscounts([...discounts, discount]);
    
    // Update product with discount
    setProducts(products.map(p => 
      p.id === parseInt(newDiscount.productId) 
        ? { ...p, discount: parseInt(newDiscount.percentage) }
        : p
    ));

    setNewDiscount({ productId: "", percentage: "", startDate: "", endDate: "" });
    
    toast({
      title: "Discount Added",
      description: `${discount.percentage}% discount applied to ${product.name}.`,
    });
  };

  const toggleDiscount = (discountId: number) => {
    setDiscounts(discounts.map(d => 
      d.id === discountId ? { ...d, isActive: !d.isActive } : d
    ));
  };

  const stats = {
    totalProducts: products.length,
    totalFarmers: new Set(products.map(p => p.farmer)).size,
    activeDiscounts: discounts.filter(d => d.isActive).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.inStock), 0)
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="bg-card rounded-xl p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-foreground mb-6">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-farm-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Products</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-farm-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Farmers</p>
                  <p className="text-2xl font-bold">{stats.totalFarmers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Percent className="w-5 h-5 text-farm-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Discounts</p>
                  <p className="text-2xl font-bold">{stats.activeDiscounts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">${stats.totalValue.toFixed(0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Add Product Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add New Product</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="farmer">Farmer Name *</Label>
                  <Input
                    id="farmer"
                    value={newProduct.farmer}
                    onChange={(e) => setNewProduct({...newProduct, farmer: e.target.value})}
                    placeholder="Enter farmer name"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.inStock}
                    onChange={(e) => setNewProduct({...newProduct, inStock: e.target.value})}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Enter product description"
                />
              </div>
              <Button onClick={addProduct} variant="farm">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </CardContent>
          </Card>

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Current Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold">{product.name}</h3>
                        {product.discount && (
                          <Badge variant="destructive">-{product.discount}%</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        by {product.farmer} • ${product.price} • {product.inStock} in stock
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => removeProduct(product.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discounts" className="space-y-6">
          {/* Add Discount Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Percent className="w-5 h-5" />
                <span>Add New Discount</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discountProduct">Product *</Label>
                  <Select value={newDiscount.productId} onValueChange={(value) => setNewDiscount({...newDiscount, productId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name} - {product.farmer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="discountPercentage">Discount Percentage *</Label>
                  <Input
                    id="discountPercentage"
                    type="number"
                    min="1"
                    max="100"
                    value={newDiscount.percentage}
                    onChange={(e) => setNewDiscount({...newDiscount, percentage: e.target.value})}
                    placeholder="10"
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newDiscount.startDate}
                    onChange={(e) => setNewDiscount({...newDiscount, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newDiscount.endDate}
                    onChange={(e) => setNewDiscount({...newDiscount, endDate: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={addDiscount} variant="farm">
                <Percent className="w-4 h-4 mr-2" />
                Add Discount
              </Button>
            </CardContent>
          </Card>

          {/* Discounts List */}
          <Card>
            <CardHeader>
              <CardTitle>Active Discounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discounts.map((discount) => (
                  <div key={discount.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold">{discount.productName}</h3>
                        <Badge variant={discount.isActive ? "default" : "secondary"}>
                          {discount.percentage}% OFF
                        </Badge>
                        {!discount.isActive && (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {discount.startDate} to {discount.endDate}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={discount.isActive ? "outline" : "farm"} 
                        size="sm"
                        onClick={() => toggleDiscount(discount.id)}
                      >
                        {discount.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Platform Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Product Categories</h3>
                  {categories.map((category) => {
                    const count = products.filter(p => p.category === category).length;
                    const percentage = products.length > 0 ? (count / products.length) * 100 : 0;
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{category}</span>
                          <span>{count} products</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-farm-primary h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Top Farmers</h3>
                  {Array.from(new Set(products.map(p => p.farmer))).map((farmer) => {
                    const farmerProducts = products.filter(p => p.farmer === farmer);
                    const totalValue = farmerProducts.reduce((sum, p) => sum + (p.price * p.inStock), 0);
                    return (
                      <div key={farmer} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{farmer}</p>
                          <p className="text-sm text-muted-foreground">{farmerProducts.length} products</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${totalValue.toFixed(0)}</p>
                          <p className="text-sm text-muted-foreground">total value</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;