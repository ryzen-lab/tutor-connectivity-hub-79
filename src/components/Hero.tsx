
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { subjectCategories } from '../data/tutors';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen pt-24 md:pt-0 flex items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/50 to-white">
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.05
        }}
      ></div>

      <div className="container mx-auto px-6 md:px-8 py-12 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={`transition-all duration-700 delay-100 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6">
              Find the perfect tutor <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                for in-home learning
              </span>
            </h1>
          </div>
          
          <div 
            className={`transition-all duration-700 delay-200 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <p className="text-lg md:text-xl text-foreground/80 mb-8 md:mb-10 max-w-2xl mx-auto">
              Connect with qualified tutors who come to your home to provide personalized 
              education tailored to your learning needs.
            </p>
          </div>
          
          <div 
            className={`transition-all duration-700 delay-300 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <div className="bg-white shadow-card flex items-center p-2 pl-5 rounded-full max-w-2xl mx-auto">
              <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search by subject, level, or location..." 
                className="flex-grow border-none bg-transparent py-2 px-3 focus:outline-none text-base"
              />
              <Button className="rounded-full transition-transform duration-300 hover:scale-105">
                Find Tutors
              </Button>
            </div>
          </div>
          
          <div 
            className={`mt-12 transition-all duration-700 delay-400 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <p className="text-sm text-muted-foreground mb-4">Popular subjects</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {subjectCategories.map((category) => (
                <Button 
                  key={category.id}
                  variant="outline" 
                  className="rounded-full bg-white border border-border/60 px-4 py-1 h-auto shadow-sm hover:shadow-md transition-all hover:border-primary/30"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
