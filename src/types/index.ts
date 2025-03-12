
export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  subjects: string[];
  educationLevel: string;
  experience: number; // in years
  description: string;
  location: string;
  availability: string[];
  featured: boolean;
}

export interface SubjectCategory {
  id: string;
  name: string;
  icon: string;
}
