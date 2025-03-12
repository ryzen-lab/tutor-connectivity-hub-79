
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VerifyEmail from '@/components/auth/VerifyEmail';

const EmailVerificationPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6">
        <SignedIn>
          {/* If the user is already signed in, redirect them to the tutors page */}
          <Navigate to="/tutors" replace />
        </SignedIn>
        <SignedOut>
          <VerifyEmail />
        </SignedOut>
      </main>
      <Footer />
    </div>
  );
};

export default EmailVerificationPage;
