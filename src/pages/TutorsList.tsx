
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TutorCard from '@/components/TutorCard';
import { Tutor } from '@/types';
import { tutors as allTutors } from '@/data/tutors';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react';

const TutorsList = () => {
  const [tutors, setTutors] = useState<Tutor[]>(allTutors);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  // List of unique subjects across all tutors
  const allSubjects = [...new Set(allTutors.flatMap(tutor => tutor.subjects))].sort();
  
  useEffect(() => {
    let filtered = allTutors;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tutor => 
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        tutor.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by selected subject
    if (selectedSubject) {
      filtered = filtered.filter(tutor => 
        tutor.subjects.includes(selectedSubject)
      );
    }
    
    setTutors(filtered);
  }, [searchTerm, selectedSubject]);
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <SignedIn>
          <div className="container mx-auto px-6 md:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Find Your Perfect Tutor</h1>
              <p className="text-muted-foreground">Browse our qualified tutors and find the right match for your learning needs</p>
            </div>
            
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name, subject, or keywords..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="sm:w-auto"
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="hidden sm:flex bg-secondary rounded-md border border-border p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Collapsible filters */}
              {isFiltersVisible && (
                <div className="bg-secondary/50 p-4 rounded-lg border border-border animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">Filter by Subject</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      variant={selectedSubject === null ? "default" : "outline"}
                      size="sm"
                      className="rounded-full text-xs"
                      onClick={() => setSelectedSubject(null)}
                    >
                      All Subjects
                    </Button>
                    {allSubjects.map((subject) => (
                      <Button
                        key={subject}
                        variant={selectedSubject === subject ? "default" : "outline"}
                        size="sm"
                        className="rounded-full text-xs"
                        onClick={() => setSelectedSubject(subject)}
                      >
                        {subject}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Tutors list */}
            {tutors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No tutors found matching your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSubject(null);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" 
                  : "space-y-6"
              }>
                {tutors.map((tutor) => (
                  <div key={tutor.id} className={viewMode === 'list' ? "flex-1" : ""}>
                    <TutorCard tutor={tutor} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </main>
      <Footer />
    </div>
  );
};

export default TutorsList;
