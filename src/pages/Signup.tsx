
import SignupForm from '@/components/SignupForm';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tutors');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Join TutorSpace
          </h1>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
