
import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { BookOpen, Users, Award, Clock, Heart, Star, Globe, Shield, Target, Eye, CheckCircle, MoonStar, Brain, Handshake, Lightbulb, TrendingUp } from 'lucide-react';

const About = () => {
  const [darkMode, setDarkMode] = useState(false);

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

  const stats = [
    { icon: Users, number: '1000+', label: 'Students and counting across 36 states' },
    { icon: Award, number: 'Top', label: 'JAMB scorers gaining university admissions nationwide' },
    { icon: Globe, number: 'Dozens', label: 'Tech projects launched by students' },
    { icon: Heart, number: 'Alumni', label: 'Mentors now guiding the next generation' }
  ];

  const uniqueFeatures = [
    {
      icon: Mosque,
      title: "Islamic Integration",
      description: "We don't just prepare students for JAMB. We help them strengthen their relationship with Allah (SWT), understand their Deen, and live with purpose — all while excelling academically.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Brain,
      title: "Tech-Savvy Learning",
      description: "From live tutorials and digital flashcards to CBT simulations and optional tech skill tracks, our programs combine the best of modern education with traditional Islamic values.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Handshake,
      title: "Community & Mentorship",
      description: "Our students learn together, grow together, and support each other. With dedicated mentors, peer-led study groups, and alumni networks, we are building a nationwide Muslim student community.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Real-World Readiness",
      description: "Students in our Enhanced Program don't stop at passing JAMB — they graduate with industry-ready tech skills like Data Science, Mobile App Development, or Cybersecurity, preparing them for careers in a digital world.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const coreValues = [
    {
      icon: Mosque,
      title: "Tawheed First",
      description: "We put Islamic principles at the center of every decision, lesson, and life goal.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: BookOpen,
      title: "Ilm (Knowledge)",
      description: "We strive to cultivate both sacred and worldly knowledge for holistic success.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Heart,
      title: "Ukhuwwah (Brotherhood/Sisterhood)",
      description: "We build bonds of unity and support across our student community.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Star,
      title: "Ihsan (Excellence)",
      description: "In everything we do — from academics to tech to spiritual growth — we aim for excellence.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: TrendingUp,
      title: "Istiqamah (Consistency)",
      description: "We don't believe in one-time inspiration. We believe in lifelong transformation.",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const offerings = [
    {
      icon: "🌟",
      title: "JAMB + Islamic Studies",
      description: "Comprehensive subject mastery alongside integrated Shariah studies including Qur'an, Hadith, Fiqh, Aqeedah, and more."
    },
    {
      icon: "🌟",
      title: "Optional Tech Skill Tracks",
      description: "Frontend, Backend, Cybersecurity, UI/UX Design, Mobile App Dev, and more — all offered from an Islamic lens."
    },
    {
      icon: "🌟",
      title: "Support at Every Step",
      description: "From onboarding to exam day, we offer 100% dedicated support. Our team, tutors, and scholars are with you throughout your journey."
    },
    {
      icon: "🌟",
      title: "Nationwide Reach, Global Vision",
      description: "With students enrolled across Nigeria — from Lagos to Kano, Port Harcourt to Maiduguri — we're building a future Ummah that's connected, capable, and confident."
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
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 font-inter">
                About <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">MuslimJambite</span>
              </h1>
              <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto font-lora mb-6">
                We are not just a JAMB preparation program — we are a movement towards academic excellence built on the foundation of Islamic values.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-lora">
                Nigeria's first Islamic-integrated JAMB preparation platform, uniquely designed to prepare Muslim students for success.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-inter">
                  Who We Are
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-lora">
                  MuslimJambite is Nigeria's first Islamic-integrated JAMB preparation platform, uniquely designed to prepare Muslim students for success in their academic journey while nurturing their Islamic identity and moral compass.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-lora">
                  We believe that a strong Ummah starts with empowered youth — both intellectually and spiritually.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-lora">
                  We are a growing community of learners, scholars, educators, tech mentors, and faith-driven professionals who have come together to revolutionize education for the Nigerian Muslim student.
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-3xl flex items-center justify-center">
                  <div className="text-8xl">🕌</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                  Our Mission
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-lora">
                  To empower Muslim students across Nigeria with the academic excellence, Islamic knowledge, and digital skills they need to thrive in both this world (Dunya) and the next (Akhirah).
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                  Our Vision
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-lora">
                  To be the leading Islamic educational platform that bridges the gap between academic achievement and religious consciousness — raising a generation of Muslims who are intellectually sound, spiritually grounded, and future-ready.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Unique */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                What Makes Us Unique?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {uniqueFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                      ✅ {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-lora">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                What We Offer
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {offerings.map((offering, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
                  <div className="text-4xl mb-4">{offering.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                    {offering.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-lora">
                    {offering.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                Our Core Values
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
                      🕌 {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-lora">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4 font-inter">
                Our Impact (By Allah's Permission)
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-white/90 font-lora">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Promise Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 font-inter">
                Our Promise
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-lora">
                We are committed to making MuslimJambite a platform where students:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                "Prepare for academic excellence",
                "Grow in spiritual discipline", 
                "Gain relevant 21st-century skills",
                "Connect with a strong Muslim community",
                "Live purposefully with the pleasure of Allah (SWT) as the ultimate goal"
              ].map((promise, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-lora">{promise}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 shadow-xl">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-inter">
                  Meet the Movement
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-lora">
                  Whether you're aiming for Medicine, Engineering, Law, or Tech, your journey starts here — with the right intention, the right support, and the right environment.
                </p>
                <p className="text-xl font-semibold text-brand-primary mb-8">
                  🕋 Success is from Allah alone.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-lora">
                  Let's walk the path together — in knowledge, in faith, and in excellence.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-8 mb-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 font-arabic mb-4" dir="rtl">
                    سَنُقْرِئُكَ فَلَا تَنسَىٰ ۝ إِلَّا مَا شَاءَ اللَّهُ ۚ إِنَّهُ يَعْلَمُ الْجَهْرَ وَمَا يَخْفَىٰ
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 font-lora italic">
                    "We shall make you to recite (the Qur'ân), so you (O Muhammad ﷺ) shall not forget (it) - Except what Allâh may will. He knows what is apparent and what is hidden."
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
                    — Surah Al-A'la (87:6-7)
                  </p>
                </div>

                <a
                  href="/#registration"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
                >
                  Join Us Today - Register for just ₦500
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
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
                © {new Date().getFullYear()} / {new Date().getFullYear() + 622} H MuslimJambite. All rights reserved.
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
              <h3 className="font-semibold mb-4 font-inter text-gray-900 dark:text-white">Useful Links</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-lora">
                <li><a href="/about" className="hover:text-brand-primary transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-brand-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 font-inter text-gray-900 dark:text-white">Contact</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-lora">
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>muslimgrowth@gmail.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+2349158480530</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>FUNAAB, Abeokuta, Ogun State</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
