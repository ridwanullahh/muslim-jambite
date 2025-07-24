
import { ArrowRight, Clock, Users, Star } from 'lucide-react';

interface ShariahSubjectCardProps {
  subject: {
    name: string;
    icon: string;
    description: string;
    details: string;
    category: string;
    color: string;
  };
  index: number;
}

export const ShariahSubjectCard = ({ subject, index }: ShariahSubjectCardProps) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-brand-accent/50 transform hover:-translate-y-2">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Card Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${subject.color} flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            {subject.icon}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${subject.color} text-white`}>
            {subject.category}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-accent transition-colors">
          {subject.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm font-lora leading-relaxed">
          {subject.description}
        </p>
      </div>
      
      {/* Card Body */}
      <div className="px-6 pb-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3">
          {subject.details}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Weekly Classes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>Islamic Scholars</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Authentic Sources</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <button className="w-full py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:from-brand-accent hover:to-brand-primary hover:text-white text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300 group flex items-center justify-center space-x-2">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
