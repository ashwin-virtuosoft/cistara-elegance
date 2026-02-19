import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Linkedin, Facebook, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/cistara-logo.png";

const Footer = () => {
  const handleQuickLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-charcoal text-charcoal-foreground">
    <div className="container mx-auto section-padding">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
        {/* Left Section - Logo & Description */}
        <div className="col-span-1">
            <img src={logo} alt="Cistara" className="h-12 sm:h-14 mb-4 sm:mb-6 brightness-200" />
          <p className="text-sm sm:text-base opacity-75 leading-relaxed">
            Premier hospitality supply partner delivering excellence and elegance to upscale hotels, restaurants, and catering businesses.
          </p>
        </div>

        {/* Middle Section - Quick Links & Contact */}
        <div className="col-span-1 sm:col-span-1 lg:col-span-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg sm:text-xl mb-4 sm:mb-5 font-bold">Quick Links</h4>
              <nav className="flex flex-col gap-2 sm:gap-3">
                <Link to="/" onClick={handleQuickLinkClick} className="text-sm sm:text-base opacity-70 hover:text-primary hover:opacity-100 transition-all duration-300">Home</Link>
                <Link to="/about" onClick={handleQuickLinkClick} className="text-sm sm:text-base opacity-70 hover:text-primary hover:opacity-100 transition-all duration-300">About Us</Link>
                <Link to="/products" onClick={handleQuickLinkClick} className="text-sm sm:text-base opacity-70 hover:text-primary hover:opacity-100 transition-all duration-300">Products</Link>
                <Link to="/contact" onClick={handleQuickLinkClick} className="text-sm sm:text-base opacity-70 hover:text-primary hover:opacity-100 transition-all duration-300">Contact</Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-display text-lg sm:text-xl mb-4 sm:mb-5 font-bold">Contact Info</h4>
              <div className="flex flex-col gap-3 sm:gap-4">
                <a href="mailto:sales@cistara.com" className="flex items-start sm:items-center gap-2 sm:gap-3 text-sm sm:text-base opacity-70 hover:text-primary hover:opacity-100 transition-all duration-300">
                  <Mail size={18} className="shrink-0 mt-1 sm:mt-0" /> <span className="break-all">sales@cistara.com</span>
                </a>
                <a href="tel:+971524955377" className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base opacity-70 hover:text-primary hover:opacity-100 transition-all duration-300">
                  <Phone size={18} className="shrink-0" /> <span>+971 52 495</span>
                </a>
                <div className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base opacity-70">
                  <MapPin size={18} className="mt-0.5 shrink-0" />
                  <span>SPC Free Zone, Sharjah, UAE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Business Hours */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <h4 className="font-display text-lg sm:text-xl mb-4 sm:mb-5 font-bold">Business Hours</h4>
          <div className="space-y-2 sm:space-y-3">
            <div>
              <p className="text-sm sm:text-base font-semibold text-primary">Sunday - Thursday</p>
              <p className="text-sm sm:text-base opacity-70">09:00 AM - 06:00 PM</p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-primary">Friday - Saturday</p>
              <p className="text-sm sm:text-base opacity-70">Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Banner Section */}
      <div className="bg-charcoal/50 rounded-xl p-8 sm:p-10 text-center mb-12 border border-charcoal-foreground/10">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Stay connected with us:</h3>
        <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
          {/* Facebook */}
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl text-white"
            title="Facebook"
          >
            <Facebook size={20} />
          </a>

          {/* LinkedIn */}
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-blue-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl text-white"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl text-white"
            title="Instagram"
          >
            <Instagram size={20} />
          </a>


        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-charcoal-foreground/20 pt-6 sm:pt-8">
        <div className="text-center text-xs sm:text-sm opacity-60">
          <p>© {new Date().getFullYear()} Cistara International FZE. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
