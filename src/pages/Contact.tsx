
import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Contact = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@muslimjambite.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+234 XXX XXX XXXX',
      description: 'Call us during business hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Lagos, Nigeria',
      description: 'Our main office location'
    },
    {
      icon: Clock,
      title: 'Hours',
      value: '24/7 Support',
      description: 'We\'re here when you need us'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-light via-brand-white to-brand-light dark:from-brand-dark dark:via-gray-800 dark:to-brand-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white mb-8 font-inter">
                Contact <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent font-normal">Us</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
                Get in touch with us for any questions, support, or inquiries about our programs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-inter">
                      {info.title}
                    </h3>
                    <p className="text-lg text-brand-primary font-medium mb-1">
                      {info.value}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-lora">
                      {info.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-inter">
                  Send us a Message
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-lora">
                  Have a question or need support? Fill out the form and we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Quick Response</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">We typically respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Direct Support</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Get help directly from our team</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-accent hover:to-brand-primary"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-lora">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How do I register?</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Simply fill out our registration form and pay the ₦500 registration fee to get started.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What's included in the programs?</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    All programs include JAMB preparation, integrated Shariah studies, and 24/7 support. The enhanced program adds tech skills training.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I switch programs later?</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Yes, you can upgrade from the base program to the enhanced program at any time during your enrollment.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is there a refund policy?</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We offer a 30-day money-back guarantee if you're not satisfied with our program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center">
                  <span className="text-white font-bold">MJ</span>
                </div>
                <span className="text-xl font-bold font-inter text-gray-900 dark:text-white">
                  Muslim<span className="text-brand-primary">Jambite</span>
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 font-lora">
                Building the future of Islamic education through innovative learning experiences.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">
                © 2024 MuslimJambite. All rights reserved.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 font-inter text-gray-900 dark:text-white">Programs</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-lora">
                <li>JAMB Preparation</li>
                <li>Shariah Studies</li>
                <li>Tech Skills</li>
                <li>Career Guidance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 font-inter text-gray-900 dark:text-white">Contact</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-lora">
                <li>support@muslimjambite.com</li>
                <li>+234 XXX XXX XXXX</li>
                <li>Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
