import { Button } from '@/components/ui/button';
import { Recycle } from 'lucide-react';

export default function HeroSection() {
  const handleCTAClick = () => {
    // Scroll to the material grade dashboard section
    const materialSection = document.getElementById('material-guide');
    if (materialSection) {
      materialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Split-Screen Background Images */}
      <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
        {/* Left Side - Old Torn Denim */}
        <div 
          className="w-full md:w-1/2 h-1/2 md:h-full"
          style={{
            backgroundImage: 'url(/assets/generated/hero-denim-left.dim_960x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Right Side - Recycled Materials & Thrifted Outfits */}
        <div 
          className="w-full md:w-1/2 h-1/2 md:h-full"
          style={{
            backgroundImage: 'url(/assets/generated/hero-recycled-right.dim_960x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Recycle className="w-12 h-12 text-primary" strokeWidth={1.5} />
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-foreground">
              EcoThread Connect
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-3xl font-light text-black max-w-2xl mx-auto leading-relaxed">
            Transform your textile waste into sustainable impact
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-black max-w-xl mx-auto">
            Join the circular fashion movement. Recycle responsibly, earn green credits, and discover local recycling partners.
          </p>

          {/* CTA Button */}
          <div className="pt-6">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={handleCTAClick}
            >
              Recycle Your Closet
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-light text-primary">2.5M+</div>
              <div className="text-sm text-muted-foreground">Items Recycled</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-light text-primary">150K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-light text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Partner Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
