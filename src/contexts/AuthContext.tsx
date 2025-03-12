
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  isTutor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [isTutor, setIsTutor] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    const storedTutorProfile = localStorage.getItem('tutorProfile');
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log('User restored from localStorage:', user);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        
        // Check if user is a tutor
        if (storedTutorProfile) {
          const tutorProfile = JSON.parse(storedTutorProfile);
          setIsTutor(tutorProfile.isTutor || false);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('tutorProfile');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        setIsTutor(false);
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Login attempt with:', { email, password });
    
    try {
      // For demo purposes, we'll simulate authentication
      // In a real app, you would make an API call here
      if (password.length < 6) {
        throw new Error('Invalid credentials');
      }
      
      // Create a mock user based on the email
      const user: User = {
        id: Math.random().toString(36).substring(2, 11),
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
      
      console.log('Login successful:', user);
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
      throw error;
    }
  };

  const signup = async (email: string, name: string, password: string) => {
    console.log('Signup attempt with:', { email, name, password });
    
    try {
      // For demo purposes, we'll simulate registration
      // In a real app, you would make an API call here
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create a new user
      const user: User = {
        id: Math.random().toString(36).substring(2, 11),
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast({
        title: "Account created",
        description: `Welcome to TutorSpace, ${name}!`,
      });
      
      console.log('Signup successful:', user);
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    localStorage.removeItem('user');
    localStorage.removeItem('tutorProfile');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    setIsTutor(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        isTutor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
