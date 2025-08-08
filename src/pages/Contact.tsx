
import { useState, useEffect } from 'react';
import { SharedLayout } from '@/components/layout/SharedLayout';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'muslimgrowth@gmail.com',
    phone: import.meta.env.VITE_CONTACT_PHONE || '+2349158480530',
    address: import.meta.env.VITE_CONTACT_ADDRESS || 'Federal University Of Agriculture, Abeokuta, Ogun State, Nigeria',
    whatsapp: import.meta.env.VITE_WHATSAPP_CHANNEL || '#',
    telegram: import.meta.env.VITE_TELEGRAM_CHANNEL || '#'
  };

  return (
    <SharedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-primary via-brand-accent to-brand-primary text-white py-16 sm:py-20 md:py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 animate-fade-in-up">
                Contact Us
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '200ms' }}>
                We're here to help you on your journey to academic and spiritual excellence
              </p>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mt-12">
                {[
                  { icon: '📧', title: 'Email Us', subtitle: 'Quick Response' },
                  { icon: '📱', title: 'Call Us', subtitle: 'Direct Support' },
                  { icon: '💬', title: 'Chat', subtitle: 'Live Help' }
                ].map((method, index) => (
                  <div key={index} className="text-center animate-bounce-in" style={{ animationDelay: `${(index + 1) * 300}ms` }}>
                    <div className="text-3xl sm:text-4xl mb-3">{method.icon}</div>
                    <div className="text-lg sm:text-xl font-bold mb-1">{method.title}</div>
                    <div className="text-sm sm:text-base opacity-80">{method.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-left">Send us a Message</CardTitle>
                  <CardDescription className="text-left">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-left">Get in Touch</CardTitle>
                    <CardDescription className="text-left">
                      Choose your preferred way to reach out to us
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-left">Email</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-left">{contactInfo.email}</p>
                        <a 
                          href={`mailto:${contactInfo.email}`}
                          className="text-brand-primary hover:underline text-left"
                        >
                          Send an email
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-left">Phone</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-left">{contactInfo.phone}</p>
                        <a 
                          href={`tel:${contactInfo.phone}`}
                          className="text-brand-primary hover:underline text-left"
                        >
                          Call us now
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-left">Address</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-left">{contactInfo.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-left">Office Hours</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-left">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-gray-600 dark:text-gray-300 text-left">Saturday: 10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Channels */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-left">Join Our Community</CardTitle>
                    <CardDescription className="text-left">
                      Connect with fellow students and get instant support
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <a 
                      href={contactInfo.whatsapp}
                      className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    >
                      <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200 text-left">WhatsApp Community</h4>
                        <p className="text-sm text-green-600 dark:text-green-300 text-left">Join our active study group</p>
                      </div>
                    </a>

                    <a 
                      href={contactInfo.telegram}
                      className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-left">Telegram Channel</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-300 text-left">Get updates and announcements</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SharedLayout>
  );
};

export default Contact;
