
import { useState, useEffect } from 'react';
import { Search, UserCheck, Calendar, GraduationCap } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Search',
    description: 'Browse through our diverse network of qualified tutors based on subject, expertise and location.',
    icon: Search,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    title: 'Connect',
    description: 'Choose the perfect tutor for your needs and connect directly to discuss your learning goals.',
    icon: UserCheck,
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 3,
    title: 'Schedule',
    description: 'Book sessions at times that suit your schedule, with tutors coming directly to your home.',
    icon: Calendar,
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 4,
    title: 'Learn',
    description: 'Enjoy personalized learning with one-on-one attention in the comfort of your own space.',
    icon: GraduationCap,
    color: 'from-emerald-500 to-teal-600'
  }
];

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('how-it-works');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="how-it-works" className="py-20 bg-secondary/50 relative">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How TutorSpace Works</h2>
            <p className="text-lg text-muted-foreground">
              Finding the perfect in-home tutor has never been easier
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border/60 z-0"></div>
          
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`relative z-10 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full bg-white shadow-elevated flex items-center justify-center mb-5 relative`}>
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-10`}></div>
                  <step.icon className={`h-7 w-7 text-primary`} />
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-sm border border-border/40 flex items-center justify-center">
                    <span className="text-xs font-semibold">{step.id}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
