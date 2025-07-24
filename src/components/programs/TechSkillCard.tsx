
import { ArrowRight, Clock, Users, Star, Code } from 'lucide-react';

interface TechSkillCardProps {
  skill: {
    name: string;
    icon: string;
    description: string;
    details: string;
    months: string;
    color: string;
  };
  index: number;
}

export const TechSkillCard = ({ skill, index }: TechSkillCardProps) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transform hover:-translate-y-2">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Card Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            {skill.icon}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${skill.color} text-white`}>
            {skill.months}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
          {skill.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm font-lora leading-relaxed">
          {skill.description}
        </p>
      </div>
      
      {/* Card Body */}
      <div className="px-6 pb-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3">
          {skill.details}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Duration</span>
          </div>
          <div className="flex items-center space-x-1">
            <Code className="w-4 h-4" />
            <span>Hands-on</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Industry Ready</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <button className="w-full py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:from-blue-500 hover:to-purple-600 hover:text-white text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300 group flex items-center justify-center space-x-2">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
