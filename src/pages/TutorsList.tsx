
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import TutorCard from '@/components/TutorCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { tutors, subjectCategories } from '@/data/tutors';
import { Tutor } from '@/types';
import { Search, Filter, BookOpen, MapPin, DollarSign, Star } from 'lucide-react';

export default function TutorsList() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>(tutors);
  const [showFilters, setShowFilters] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Apply filters
  useEffect(() => {
    const filtered = tutors.filter(tutor => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tutor.subjects.some(subject => 
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        tutor.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Subject filter
      const subjectMatch = selectedSubjects.length === 0 || 
        tutor.subjects.some(subject => 
          selectedSubjects.includes(subject)
        );
      
      // Price filter
      const priceMatch = tutor.hourlyRate >= priceRange[0] && 
                         tutor.hourlyRate <= priceRange[1];
      
      return searchMatch && subjectMatch && priceMatch;
    });
    
    setFilteredTutors(filtered);
  }, [searchTerm, selectedSubjects, priceRange]);

  // Toggle subject selection
  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Tutor</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our qualified tutors and find the right match for your learning needs
          </p>
          
          {/* Search and filter bar */}
          <div className="bg-white rounded-xl shadow-card p-4 mb-8">
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for subjects, tutors, or keywords..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {/* Expandable filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Subjects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {subjectCategories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedSubjects.includes(category.name) ? "default" : "outline"}
                        size="sm"
                        className="rounded-full text-xs"
                        onClick={() => toggleSubject(category.name)}
                      >
                        {category.icon} {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Price Range
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">${priceRange[0]}</span>
                    <div className="flex-grow h-2 bg-secondary rounded relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="absolute h-full bg-primary rounded-l" style={{ width: `${priceRange[0]}%` }}></div>
                      <div className="absolute h-full bg-primary rounded-r" style={{ width: `${100 - priceRange[1]}%`, right: 0 }}></div>
                    </div>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="ghost" 
                    className="ml-auto"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSubjects([]);
                      setPriceRange([0, 100]);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredTutors.length} tutors
          </p>
          
          {/* Tutors grid */}
          {filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredTutors.map((tutor) => (
                <div key={tutor.id} className="animate-fadeIn">
                  <TutorCard tutor={tutor} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No tutors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
