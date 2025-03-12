
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Book, Clock, DollarSign, MapPin, GraduationCap } from 'lucide-react';

export default function TutorRegistrationForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    experience: '',
    expertise: '',
    education: '',
    description: '',
    hourlyRate: '',
    availability: '',
    location: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll just store in localStorage
      const tutorProfile = {
        ...user,
        ...formData,
        age: parseInt(formData.age),
        experience: parseInt(formData.experience),
        hourlyRate: parseFloat(formData.hourlyRate),
        expertise: formData.expertise.split(',').map(item => item.trim()),
        availability: formData.availability.split(',').map(item => item.trim()),
        isTutor: true as const,
      };
      
      localStorage.setItem('tutorProfile', JSON.stringify(tutorProfile));
      
      console.log('Tutor registration successful:', tutorProfile);
      
      toast({
        title: "Registration successful",
        description: "Your tutor profile has been created!",
      });
      
      navigate('/tutor/dashboard');
    } catch (error) {
      console.error('Tutor registration error:', error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              required
              min="18"
              max="100"
              value={formData.age}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              name="experience"
              type="number"
              required
              min="0"
              max="50"
              value={formData.experience}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Education Level</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <Input
                id="education"
                name="education"
                type="text"
                required
                placeholder="e.g., Master's in Mathematics"
                className="pl-10"
                value={formData.education}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <DollarSign className="h-5 w-5" />
              </div>
              <Input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                required
                min="1"
                className="pl-10"
                value={formData.hourlyRate}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expertise">Expertise (comma-separated)</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Book className="h-5 w-5" />
            </div>
            <Input
              id="expertise"
              name="expertise"
              required
              placeholder="e.g., Mathematics, Physics, Computer Science"
              className="pl-10"
              value={formData.expertise}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">Availability (comma-separated)</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Clock className="h-5 w-5" />
            </div>
            <Input
              id="availability"
              name="availability"
              required
              placeholder="e.g., Weekday Evenings, Saturday Morning"
              className="pl-10"
              value={formData.availability}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <MapPin className="h-5 w-5" />
            </div>
            <Input
              id="location"
              name="location"
              required
              placeholder="e.g., New York City"
              className="pl-10"
              value={formData.location}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">About You</Label>
          <Textarea
            id="description"
            name="description"
            required
            placeholder="Tell us about your teaching experience and approach..."
            className="min-h-[100px]"
            value={formData.description}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating profile...
              </span>
            ) : (
              'Create Tutor Profile'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
