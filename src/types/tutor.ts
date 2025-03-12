
export interface TutorProfile extends User {
  age: number;
  experience: number;
  expertise: string[];
  education: string;
  resume?: string;
  description: string;
  hourlyRate: number;
  availability: string[];
  location: string;
  isTutor: true;
}
