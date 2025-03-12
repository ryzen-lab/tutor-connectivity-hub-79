
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('become-tutor');
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
    <section id="become-tutor" className="relative py-20 overflow-hidden bg-gradient-to-br from-primary to-primary/90 text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      ></div>
      
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="container relative mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Share Your Knowledge, Become a Tutor
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our platform to connect with students and build your tutoring career.
              Set your own rates and schedule while making a real difference.
            </p>
          </div>
          
          <div 
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-primary hover:bg-white/90 transition-transform duration-300 hover:scale-105 rounded-full"
                size="lg"
              >
                Apply as a Tutor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white/10 rounded-full"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default CTASection;
