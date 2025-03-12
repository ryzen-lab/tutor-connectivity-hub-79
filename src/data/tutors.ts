
import { Tutor, SubjectCategory } from '../types';

export const tutors: Tutor[] = [
  {
    id: '1',
    name: 'Sophie Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    reviewCount: 128,
    hourlyRate: 45,
    subjects: ['Mathematics', 'Physics', 'Computer Science'],
    educationLevel: 'Ph.D in Computer Science',
    experience: 6,
    description: 'Experienced tutor specializing in mathematics and physics. I focus on building strong foundations and critical thinking skills.',
    location: 'New York City',
    availability: ['Weekday Evenings', 'Saturday'],
    featured: true
  },
  {
    id: '2',
    name: 'David Park',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 40,
    subjects: ['English Literature', 'Writing', 'History'],
    educationLevel: 'Master\'s in English Literature',
    experience: 8,
    description: 'Passionate about literature and helping students develop strong writing skills. Specialized in essay writing and critical analysis.',
    location: 'Boston',
    availability: ['Weekdays', 'Sunday Afternoon'],
    featured: true
  },
  {
    id: '3',
    name: 'Aisha Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 5.0,
    reviewCount: 56,
    hourlyRate: 50,
    subjects: ['Chemistry', 'Biology', 'Science'],
    educationLevel: 'Master\'s in Biochemistry',
    experience: 5,
    description: 'Specializing in making complex scientific concepts accessible and engaging for students at all levels.',
    location: 'Chicago',
    availability: ['Weekends', 'Friday Afternoon'],
    featured: true
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.7,
    reviewCount: 73,
    hourlyRate: 35,
    subjects: ['Spanish', 'French', 'ESL'],
    educationLevel: 'Bachelor\'s in Linguistics',
    experience: 10,
    description: 'Native Spanish speaker with extensive experience teaching languages. Focus on conversational fluency and practical application.',
    location: 'Miami',
    availability: ['Flexible Schedule'],
    featured: false
  },
  {
    id: '5',
    name: 'Olivia Taylor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    reviewCount: 62,
    hourlyRate: 55,
    subjects: ['Music Theory', 'Piano', 'Composition'],
    educationLevel: 'Conservatory Graduate',
    experience: 12,
    description: 'Classical pianist and composer offering personalized music instruction for students of all ages and skill levels.',
    location: 'Los Angeles',
    availability: ['Weekday Afternoons', 'Saturday Morning'],
    featured: false
  },
  {
    id: '6',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 60,
    subjects: ['Calculus', 'Statistics', 'Data Science'],
    educationLevel: 'Ph.D in Applied Mathematics',
    experience: 7,
    description: 'Making mathematics approachable and applicable to real-world situations. Specialized in helping students prepare for standardized tests.',
    location: 'Seattle',
    availability: ['Weekends', 'Thursday Evening'],
    featured: false
  },
];

export const subjectCategories: SubjectCategory[] = [
  {
    id: '1',
    name: 'Mathematics',
    icon: '📐'
  },
  {
    id: '2',
    name: 'Science',
    icon: '🔬'
  },
  {
    id: '3',
    name: 'Languages',
    icon: '🗣️'
  },
  {
    id: '4',
    name: 'Arts',
    icon: '🎨'
  },
  {
    id: '5',
    name: 'Humanities',
    icon: '📚'
  },
  {
    id: '6',
    name: 'Computer Science',
    icon: '💻'
  }
];
