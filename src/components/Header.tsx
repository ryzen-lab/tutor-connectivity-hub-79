
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-subtle py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              TutorSpace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/#how-it-works" className="text-foreground/80 hover:text-primary transition-colors duration-200">
              How It Works
            </Link>
            <Link to={isAuthenticated ? "/tutors" : "/#tutors"} className="text-foreground/80 hover:text-primary transition-colors duration-200">
              Find Tutors
            </Link>
            <Link to="/#become-tutor" className="text-foreground/80 hover:text-primary transition-colors duration-200">
              Become a Tutor
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="rounded-full" onClick={() => navigate('/tutors')}>
              <Search className="h-4 w-4 mr-2" />
              <span>Search</span>
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-secondary">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <UserCircle className="h-full w-full text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-sm font-medium hidden lg:inline">{user?.name}</span>
                </div>
                <Button variant="outline" size="sm" className="rounded-full" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="rounded-full">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="rounded-full">Sign up</Button>
                </Link>
              </>
            )}
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
            <Link 
              to="/#how-it-works" 
              className="py-3 px-4 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to={isAuthenticated ? "/tutors" : "/#tutors"} 
              className="py-3 px-4 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Tutors
            </Link>
            <Link 
              to="/#become-tutor" 
              className="py-3 px-4 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Become a Tutor
            </Link>
            
            <div className="pt-4 pb-2 border-t border-border/40 mt-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 mb-3 px-4 py-2">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-secondary">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                      ) : (
                        <UserCircle className="h-full w-full text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{user?.name}</h4>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full mt-2 justify-start" size="sm">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
              <div className="flex items-center mt-4 bg-secondary rounded-full p-1 pl-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search for subjects or tutors..." 
                  className="bg-transparent border-none w-full focus:outline-none text-sm pl-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate('/tutors');
                      setMobileMenuOpen(false);
                    }
                  }}
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
