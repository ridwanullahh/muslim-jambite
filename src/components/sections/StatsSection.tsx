
import { Users, BookOpen, Award, MapPin } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: "1000+",
    label: "Students Enrolled",
    description: "Across Nigeria"
  },
  {
    icon: BookOpen,
    number: "9-12",
    label: "Month Programs",
    description: "Comprehensive Training"
  },
  {
    icon: Award,
    number: "100%",
    label: "Islamic Approach",
    description: "Values-Based Education"
  },
  {
    icon: MapPin,
    number: "36",
    label: "States Covered",
    description: "Nationwide Reach"
  }
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center text-white">
                <Icon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm opacity-90">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
