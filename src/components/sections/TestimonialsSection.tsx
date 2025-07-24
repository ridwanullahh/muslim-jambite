
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Amina Abdullahi",
    role: "JAMB Score: 298",
    image: "👩‍🎓",
    content: "MuslimJambite didn't just help me ace JAMB, it strengthened my faith while preparing for my future. The integrated approach is truly unique.",
    rating: 5
  },
  {
    name: "Ibrahim Suleiman",
    role: "Medicine Student, UI",
    image: "👨‍⚕️",
    content: "The tech skills track gave me an edge. Now I'm not just a medical student, I'm building health apps that serve our community.",
    rating: 5
  },
  {
    name: "Khadijah Musa",
    role: "Computer Science, UNILAG",
    image: "👩‍💻",
    content: "Alhamdulillah! The Shariah integration helped me maintain my Islamic values while pursuing my tech career dreams.",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 font-inter">
            Success Stories from Our <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Students</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-lora">
            Real stories from students who achieved their dreams through our program
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-brand-primary/20">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{testimonial.image}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-brand-primary text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-brand-primary/20" />
                <p className="text-gray-600 dark:text-gray-300 font-lora italic pl-6">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Join Our Success Stories
          </button>
        </div>
      </div>
    </section>
  );
};
