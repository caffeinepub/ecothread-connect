import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const locations = [
  {
    id: 1,
    name: 'EcoThread Downtown Hub',
    address: '123 Green Street, Downtown',
    distance: '0.8 mi',
    hours: 'Mon-Sat: 9AM-6PM',
    phone: '(555) 123-4567',
    services: ['Resale', 'Upcycle', 'Recycle'],
    position: { top: '35%', left: '45%' }
  },
  {
    id: 2,
    name: 'Sustainable Textiles Center',
    address: '456 Eco Avenue, Midtown',
    distance: '1.2 mi',
    hours: 'Mon-Fri: 10AM-7PM',
    phone: '(555) 234-5678',
    services: ['Recycle', 'Upcycle'],
    position: { top: '55%', left: '60%' }
  },
  {
    id: 3,
    name: 'Green Fashion Collective',
    address: '789 Circular Lane, Westside',
    distance: '2.1 mi',
    hours: 'Tue-Sun: 11AM-5PM',
    phone: '(555) 345-6789',
    services: ['Resale', 'Recycle'],
    position: { top: '45%', left: '30%' }
  },
  {
    id: 4,
    name: 'Textile Renewal Station',
    address: '321 Sustainability Blvd, Eastside',
    distance: '2.8 mi',
    hours: 'Mon-Sat: 8AM-8PM',
    phone: '(555) 456-7890',
    services: ['Recycle'],
    position: { top: '25%', left: '70%' }
  }
];

export default function ScrapMap() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const handleGetDirections = (location: typeof locations[0]) => {
    toast.success('Opening Directions', {
      description: `Getting directions to ${location.name}`,
    });
  };

  const handleCall = (location: typeof locations[0]) => {
    window.location.href = `tel:${location.phone}`;
  };

  const handlePinClick = (locationId: number) => {
    setSelectedLocation(locationId);
    // Scroll to the location card
    const locationCard = document.getElementById(`location-${locationId}`);
    if (locationCard) {
      locationCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section id="scrap-map" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 text-sm px-4 py-1">
            Local Network
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Find Your Nearest Drop-Off
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover convenient recycling locations in your area. All partners are verified for sustainable practices.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Map Visualization */}
          <Card className="border-2 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full h-[500px] bg-gradient-to-br from-muted via-background to-muted/50">
                {/* Decorative Map Grid */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="border border-foreground/20" />
                    ))}
                  </div>
                </div>

                {/* Location Pins */}
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="absolute group cursor-pointer z-10"
                    style={{ top: location.position.top, left: location.position.left }}
                    onClick={() => handlePinClick(location.id)}
                  >
                    {/* Pin */}
                    <div className="relative -translate-x-1/2 -translate-y-full">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${
                        selectedLocation === location.id ? 'bg-primary scale-110' : 'bg-primary'
                      }`}>
                        <MapPin className="w-6 h-6 text-primary-foreground" fill="currentColor" strokeWidth={1.5} />
                      </div>
                      {/* Pulse Animation */}
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-card border-2 border-border rounded-lg p-3 shadow-xl whitespace-nowrap">
                          <div className="text-sm font-medium mb-1">{location.name}</div>
                          <div className="text-xs text-muted-foreground">{location.distance} away</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border-2 border-border rounded-lg p-4 shadow-lg">
                  <div className="text-xs font-medium mb-2">Services</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-xs text-muted-foreground">Resale</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-xs text-muted-foreground">Upcycle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-xs text-muted-foreground">Recycle</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {locations.map((location) => (
              <Card 
                key={location.id} 
                id={`location-${location.id}`}
                className={`border-2 transition-all hover:shadow-lg cursor-pointer ${
                  selectedLocation === location.id ? 'border-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedLocation(location.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-medium mb-1">{location.name}</CardTitle>
                      <CardDescription className="text-sm">{location.address}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {location.distance}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Services */}
                  <div className="flex flex-wrap gap-2">
                    {location.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" strokeWidth={1.5} />
                      <span>{location.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" strokeWidth={1.5} />
                      <span>{location.phone}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGetDirections(location);
                      }}
                    >
                      <Navigation className="w-4 h-4 mr-2" strokeWidth={1.5} />
                      Directions
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCall(location);
                      }}
                    >
                      <Phone className="w-4 h-4 mr-2" strokeWidth={1.5} />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
