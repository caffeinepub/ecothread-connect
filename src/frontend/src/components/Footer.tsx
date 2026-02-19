import { Recycle } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX, SiLinkedin } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Generate app identifier for UTM tracking
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'ecothread-connect';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Recycle className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <span className="text-lg font-light">EcoThread Connect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transforming textile waste into sustainable impact, one thread at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="#material-guide" 
                  onClick={(e) => handleNavClick(e, 'material-guide')}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#material-guide" 
                  onClick={(e) => handleNavClick(e, 'material-guide')}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Material Guide
                </a>
              </li>
              <li>
                <a 
                  href="#scrap-map" 
                  onClick={(e) => handleNavClick(e, 'scrap-map')}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Find Locations
                </a>
              </li>
              <li>
                <a 
                  href="#green-credits" 
                  onClick={(e) => handleNavClick(e, 'green-credits')}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Green Credits
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="#" 
                  className="hover:text-foreground transition-colors cursor-pointer"
                  onClick={(e) => e.preventDefault()}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-foreground transition-colors cursor-pointer"
                  onClick={(e) => e.preventDefault()}
                >
                  Sustainability Report
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-foreground transition-colors cursor-pointer"
                  onClick={(e) => e.preventDefault()}
                >
                  Partner With Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-foreground transition-colors cursor-pointer"
                  onClick={(e) => e.preventDefault()}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Join our community and stay updated on sustainable fashion.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            © {currentYear} EcoThread Connect. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <span className="text-primary">♥</span>
            <span>using</span>
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors cursor-pointer"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
