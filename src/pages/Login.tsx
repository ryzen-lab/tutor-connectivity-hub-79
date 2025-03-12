
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/auth/LoginForm';
import OAuthOptions from '@/components/auth/OAuthOptions';

const LoginPage = () => {
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
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="mt-2 text-muted-foreground">
                Sign in to your TutorSpace account
              </p>
            </div>
            
            <LoginForm />
            <OAuthOptions mode="sign-in" />
            
            <div className="text-center text-sm mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </SignedOut>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
