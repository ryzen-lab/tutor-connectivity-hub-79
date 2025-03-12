
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { TutorProfile } from '@/types/tutor';
import { toast } from '@/hooks/use-toast';
import { Home, LogOut, Edit } from 'lucide-react';

export default function TutorDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Load tutor profile from localStorage
    const storedProfile = localStorage.getItem('tutorProfile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
        console.log('Tutor profile loaded:', parsedProfile);
      } catch (error) {
        console.error('Error loading tutor profile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load tutor profile",
        });
      }
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary">
                  {profile.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt={profile.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-primary/10" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
                <Button 
                  variant="outline"
                  className="ml-auto"
                  onClick={() => navigate('/become-tutor')}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <p><span className="text-muted-foreground">Age:</span> {profile.age}</p>
                    <p><span className="text-muted-foreground">Location:</span> {profile.location}</p>
                    <p><span className="text-muted-foreground">Experience:</span> {profile.experience} years</p>
                    <p><span className="text-muted-foreground">Education:</span> {profile.education}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Teaching Details</h3>
                  <div className="space-y-2">
                    <p><span className="text-muted-foreground">Hourly Rate:</span> ${profile.hourlyRate}</p>
                    <p><span className="text-muted-foreground">Subjects:</span> {profile.expertise.join(', ')}</p>
                    <p><span className="text-muted-foreground">Availability:</span> {profile.availability.join(', ')}</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">{profile.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
