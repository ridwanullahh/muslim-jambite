
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const contactInfo = {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'muslimgrowth@gmail.com',
    phone: import.meta.env.VITE_CONTACT_PHONE || '+2349158480530',
    address: import.meta.env.VITE_CONTACT_ADDRESS || 'Federal University Of Agriculture, Abeokuta, Ogun State, Nigeria',
    whatsapp: import.meta.env.VITE_WHATSAPP_CHANNEL || '#',
    telegram: import.meta.env.VITE_TELEGRAM_CHANNEL || '#'
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-brand-dark to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--brand-primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-brand-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Enhanced Brand Section */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center shadow-xl shadow-brand-primary/25 group-hover:shadow-2xl group-hover:shadow-brand-primary/40 transition-all duration-300 group-hover:scale-110">
                  <BookOpen className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-2xl font-bold font-inter group-hover:text-brand-primary transition-colors duration-300">
                  Muslim<span className="text-brand-primary">Jambite</span>
                </span>
                <div className="text-xs text-gray-400 font-medium tracking-wider">
                  Excellence • Faith • Future
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Empowering Muslim students with knowledge that bridges Deen and Dunya through comprehensive JAMB preparation and Islamic education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group p-3 rounded-2xl bg-gray-800/50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brand-primary/25">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="group p-3 rounded-2xl bg-gray-800/50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brand-primary/25">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="group p-3 rounded-2xl bg-gray-800/50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brand-primary/25">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="group p-3 rounded-2xl bg-gray-800/50 text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brand-primary/25">
                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-brand-primary transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-brand-primary transition-colors">About Us</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-brand-primary transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-brand-primary transition-colors">Contact</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-brand-primary transition-colors">Programs</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><a href="#programs" className="text-gray-300 hover:text-brand-primary transition-colors">JAMB Preparation</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-brand-primary transition-colors">Islamic Studies</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-brand-primary transition-colors">Tech Skills</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-brand-primary transition-colors">Arabic Language</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-brand-primary transition-colors">Post-UTME</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:text-brand-primary transition-colors text-sm">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="text-gray-300 hover:text-brand-primary transition-colors text-sm">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {contactInfo.address}
                </span>
              </div>
              <div className="flex space-x-2 pt-2">
                <a href={contactInfo.whatsapp} className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a href={contactInfo.telegram} className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} MuslimJambite. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-brand-primary text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
