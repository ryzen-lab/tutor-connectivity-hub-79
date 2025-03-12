
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import TutorRegistrationForm from '@/components/TutorRegistrationForm';

export default function BecomeTutor() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Become a Tutor
          </h1>
          <TutorRegistrationForm />
        </div>
      </div>
    </div>
  );
}
