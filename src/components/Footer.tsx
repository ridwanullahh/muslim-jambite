
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold font-inter">
                  Muslim<span className="text-brand-primary">Jambite</span>
                </span>
                <div className="text-xs text-gray-400 font-medium">
                  Excellence • Faith • Future
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Empowering Muslim students with knowledge that bridges Deen and Dunya through comprehensive JAMB preparation and Islamic education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors">
                <Youtube className="w-5 h-5" />
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
