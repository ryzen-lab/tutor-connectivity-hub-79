
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const SSOCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This page is only a callback page, we'll redirect
    // The actual auth handling is done by Clerk
    const timer = setTimeout(() => {
      navigate('/tutors');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <h2 className="mt-4 text-xl font-semibold">Finalizing authentication...</h2>
      <p className="text-muted-foreground mt-2">You'll be redirected shortly.</p>
    </div>
  );
};

export default SSOCallbackPage;
