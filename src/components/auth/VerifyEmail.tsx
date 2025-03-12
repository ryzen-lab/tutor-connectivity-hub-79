
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Check, Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isLoaded, signUp } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      
      if (completeSignUp.status === 'complete') {
        toast({
          title: "Account verified",
          description: "Your account has been successfully verified.",
        });
        navigate('/tutors');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Verification failed",
        description: "The verification code is incorrect or expired.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md">
      <div className="bg-primary/10 p-3 rounded-full">
        <Check className="h-6 w-6 text-primary" />
      </div>
      <h1 className="text-2xl font-bold">Verify your email</h1>
      <p className="text-center text-muted-foreground">
        We've sent a verification code to your email address. Please enter it below to complete your registration.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="space-y-2">
          <Input 
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            className="text-center text-lg py-6"
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Verifying...
            </>
          ) : (
            "Verify email address"
          )}
        </Button>
      </form>
    </div>
  );
};

export default VerifyEmail;
