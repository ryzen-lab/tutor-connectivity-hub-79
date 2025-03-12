
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tutor } from '../types';
import { Star, MapPin, Calendar, BookOpen, Clock } from 'lucide-react';

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group bg-white rounded-xl overflow-hidden border border-border/40 transition-all duration-300 ${
        isHovered ? 'shadow-elevated transform -translate-y-1' : 'shadow-card'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="h-40 bg-secondary overflow-hidden">
          <img 
            src={tutor.avatar} 
            alt={tutor.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {tutor.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-primary/90 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold">{tutor.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-400 mr-1 flex-shrink-0" />
            <span className="text-sm font-medium">{tutor.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({tutor.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center mb-3 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>{tutor.location}</span>
          <span className="mx-2">•</span>
          <BookOpen className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>{tutor.experience} years</span>
        </div>
        
        <p className="mb-4 text-sm line-clamp-2">{tutor.description}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tutor.subjects.slice(0, 3).map((subject, index) => (
            <span 
              key={index}
              className="text-xs bg-secondary rounded-full px-2.5 py-1 font-medium"
            >
              {subject}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="text-xs bg-secondary rounded-full px-2.5 py-1 font-medium">
              +{tutor.subjects.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border/40">
          <div className="flex items-baseline">
            <span className="text-lg font-semibold">${tutor.hourlyRate}</span>
            <span className="text-xs text-muted-foreground ml-1">/hour</span>
          </div>
          <Button 
            size="sm" 
            className="rounded-full transition-transform duration-300 group-hover:scale-105"
          >
            Book Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
