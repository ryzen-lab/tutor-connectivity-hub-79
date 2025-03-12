
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TutorCard from './TutorCard';
import { Tutor } from '../types';
import { tutors } from '../data/tutors';
import { ArrowRight } from 'lucide-react';

const FeaturedTutors = () => {
  const [isVisible, setIsVisible] = useState(false);
  const featuredTutors = tutors.filter(tutor => tutor.featured);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('tutors');
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
    <section id="tutors" className="py-20 bg-white relative">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Top Tutors</h2>
            <p className="text-lg text-muted-foreground">
              Experienced educators ready to provide personalized in-home tutoring
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredTutors.map((tutor, index) => (
            <div 
              key={tutor.id}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <TutorCard tutor={tutor} />
            </div>
          ))}
        </div>
        
        <div className={`mt-12 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button variant="outline" className="rounded-full group" size="lg">
            <span>View all tutors</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;
