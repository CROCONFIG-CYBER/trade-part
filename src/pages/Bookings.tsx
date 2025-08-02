import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Package,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: number;
  productName: string;
  farmer: string;
  quantity: number;
  unit: string;
  pickupDate: Date;
  pickupTime: string;
  location: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalPrice: number;
  notes?: string;
}

interface BookingForm {
  productName: string;
  farmer: string;
  quantity: string;
  pickupDate: Date | undefined;
  pickupTime: string;
  location: string;
  notes: string;
}

const Bookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      productName: "Organic Tomatoes",
      farmer: "John Smith",
      quantity: 25,
      unit: "kg",
      pickupDate: new Date("2024-08-05"),
      pickupTime: "10:00",
      location: "Green Valley Farm",
      status: "confirmed",
      totalPrice: 124.75,
      notes: "Please pack in wooden crates"
    },
    {
      id: 2,
      productName: "Fresh Corn",
      farmer: "Maria Garcia",
      quantity: 50,
      unit: "pieces",
      pickupDate: new Date("2024-08-07"),
      pickupTime: "14:00",
      location: "Sunny Acres",
      status: "pending",
      totalPrice: 175.00
    },
    {
      id: 3,
      productName: "Red Apples",
      farmer: "David Johnson",
      quantity: 10,
      unit: "kg",
      pickupDate: new Date("2024-08-03"),
      pickupTime: "09:00",
      location: "Mountain View Orchard",
      status: "completed",
      totalPrice: 69.90
    }
  ]);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    productName: "",
    farmer: "",
    quantity: "",
    pickupDate: undefined,
    pickupTime: "",
    location: "",
    notes: ""
  });

  const products = [
    { name: "Organic Tomatoes", farmer: "John Smith", price: 4.99, unit: "kg" },
    { name: "Fresh Corn", farmer: "Maria Garcia", price: 3.50, unit: "dozen" },
    { name: "Red Apples", farmer: "David Johnson", price: 6.99, unit: "kg" },
    { name: "Free-Range Eggs", farmer: "Sarah Wilson", price: 8.99, unit: "dozen" }
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "warning";
      case "confirmed": return "default";
      case "completed": return "success";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <AlertCircle className="w-4 h-4" />;
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const createBooking = () => {
    if (!bookingForm.productName || !bookingForm.quantity || !bookingForm.pickupDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const selectedProduct = products.find(p => p.name === bookingForm.productName);
    if (!selectedProduct) return;

    const booking: Booking = {
      id: Date.now(),
      productName: bookingForm.productName,
      farmer: selectedProduct.farmer,
      quantity: parseInt(bookingForm.quantity),
      unit: selectedProduct.unit,
      pickupDate: bookingForm.pickupDate,
      pickupTime: bookingForm.pickupTime || "10:00",
      location: bookingForm.location || `${selectedProduct.farmer}'s Farm`,
      status: "pending",
      totalPrice: selectedProduct.price * parseInt(bookingForm.quantity),
      notes: bookingForm.notes
    };

    setBookings([booking, ...bookings]);
    setBookingForm({
      productName: "",
      farmer: "",
      quantity: "",
      pickupDate: undefined,
      pickupTime: "",
      location: "",
      notes: ""
    });
    setShowBookingForm(false);

    toast({
      title: "Booking Created",
      description: `Your booking for ${booking.productName} has been submitted.`,
    });
  };

  const updateBookingStatus = (id: number, status: Booking["status"]) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
    
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${status}.`,
    });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="bg-card rounded-xl p-6 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">Farm Product Bookings</h1>
          <Button 
            variant="farm" 
            onClick={() => setShowBookingForm(!showBookingForm)}
          >
            <Package className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Booking Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </div>
          <div className="bg-warning/10 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning-foreground">
              {bookings.filter(b => b.status === "pending").length}
            </p>
          </div>
          <div className="bg-success/10 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Confirmed</p>
            <p className="text-2xl font-bold text-success-foreground">
              {bookings.filter(b => b.status === "confirmed").length}
            </p>
          </div>
          <div className="bg-farm-secondary/20 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">
              ${bookings.reduce((sum, b) => sum + b.totalPrice, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      {showBookingForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product">Product *</Label>
                <Select 
                  value={bookingForm.productName} 
                  onValueChange={(value) => setBookingForm({...bookingForm, productName: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.name} value={product.name}>
                        {product.name} - {product.farmer} (${product.price}/{product.unit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={bookingForm.quantity}
                  onChange={(e) => setBookingForm({...bookingForm, quantity: e.target.value})}
                  placeholder="Enter quantity"
                />
              </div>

              <div>
                <Label>Pickup Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {bookingForm.pickupDate ? format(bookingForm.pickupDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={bookingForm.pickupDate}
                      onSelect={(date) => setBookingForm({...bookingForm, pickupDate: date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="time">Pickup Time</Label>
                <Select 
                  value={bookingForm.pickupTime} 
                  onValueChange={(value) => setBookingForm({...bookingForm, pickupTime: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="location">Pickup Location</Label>
                <Input
                  id="location"
                  value={bookingForm.location}
                  onChange={(e) => setBookingForm({...bookingForm, location: e.target.value})}
                  placeholder="Enter pickup location (optional)"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Special Notes</Label>
              <Textarea
                id="notes"
                value={bookingForm.notes}
                onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                placeholder="Any special requirements or notes..."
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={createBooking} variant="farm">
                Create Booking
              </Button>
              <Button onClick={() => setShowBookingForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bookings List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Bookings</h2>
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{booking.productName}</h3>
                    <Badge variant={getStatusColor(booking.status)} className="flex items-center space-x-1">
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status}</span>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{booking.farmer}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{format(booking.pickupDate, "PPP")} at {booking.pickupTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      Quantity: {booking.quantity} {booking.unit}
                    </span>
                    <span className="font-semibold text-lg text-farm-primary">
                      ${booking.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {booking.notes && (
                    <div className="mt-2 p-2 bg-muted rounded text-sm">
                      <strong>Notes:</strong> {booking.notes}
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  {booking.status === "pending" && (
                    <>
                      <Button 
                        size="sm" 
                        variant="success"
                        onClick={() => updateBookingStatus(booking.id, "confirmed")}
                      >
                        Confirm
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => updateBookingStatus(booking.id, "cancelled")}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <Button 
                      size="sm" 
                      variant="success"
                      onClick={() => updateBookingStatus(booking.id, "completed")}
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
          <p className="text-muted-foreground mb-4">Start by creating your first booking</p>
          <Button variant="farm" onClick={() => setShowBookingForm(true)}>
            Create First Booking
          </Button>
        </div>
      )}
    </div>
  );
};

export default Bookings;