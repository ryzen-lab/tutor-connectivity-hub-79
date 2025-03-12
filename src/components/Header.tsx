
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, UserCircle } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-subtle py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              TutorSpace
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors duration-200">
              How It Works
            </a>
            <a href="#tutors" className="text-foreground/80 hover:text-primary transition-colors duration-200">
              Find Tutors
            </a>
            <a href="#become-tutor" className="text-foreground/80 hover:text-primary transition-colors duration-200">
              Become a Tutor
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Search className="h-4 w-4 mr-2" />
              <span>Search</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">Log in</Button>
            <Button size="sm" className="rounded-full">Sign up</Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in">
          <div className="pt-2 pb-4 px-6 space-y-1 flex flex-col">
            <a 
              href="#how-it-works" 
              className="py-3 px-4 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#tutors" 
              className="py-3 px-4 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Tutors
            </a>
            <a 
              href="#become-tutor" 
              className="py-3 px-4 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Become a Tutor
            </a>
            
            <div className="pt-4 pb-2 border-t border-border/40 mt-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <UserCircle className="mr-2 h-4 w-4" />
                Log in
              </Button>
              <Button className="w-full mt-2 justify-start" size="sm">
                Sign up
              </Button>
              <div className="flex items-center mt-4 bg-secondary rounded-full p-1 pl-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search for subjects or tutors..." 
                  className="bg-transparent border-none w-full focus:outline-none text-sm pl-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
