
import { Users, MessageCircle, Heart, Star } from 'lucide-react';

export const CommunitySection = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 font-inter">
            Join Our <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Muslim Community</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
            Connect with thousands of Muslim students nationwide. Share experiences, get support, and grow together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Users, title: "Study Groups", desc: "Join subject-specific study circles" },
            { icon: MessageCircle, title: "24/7 Chat", desc: "Get help anytime from peers" },
            { icon: Heart, title: "Islamic Support", desc: "Strengthen your faith together" },
            { icon: Star, title: "Mentorship", desc: "Learn from successful alumni" }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl inline-block">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Ready to Connect?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Join our community of aspiring Muslim professionals</p>
            <button
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Join the Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
