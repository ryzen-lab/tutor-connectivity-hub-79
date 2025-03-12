
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Navigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignupForm from '@/components/auth/SignupForm';
import OAuthOptions from '@/components/auth/OAuthOptions';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6">
        <SignedIn>
          {/* If the user is already signed in, redirect them to the tutors page */}
          <Navigate to="/tutors" replace />
        </SignedIn>
        <SignedOut>
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Create an account</h1>
              <p className="mt-2 text-muted-foreground">
                Sign up to find the perfect tutor for your educational needs
              </p>
            </div>
            
            <SignupForm />
            <OAuthOptions mode="sign-up" />
            
            <div className="text-center text-sm mt-6">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </SignedOut>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
