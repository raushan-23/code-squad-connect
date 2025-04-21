
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import MessageModal from './MessageModal';

export interface ProfileCardProps {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  skills: string[];
  hackathons: string[];
  location: string;
  experience: 'Beginner' | 'Intermediate' | 'Expert';
}

const ProfileCard = ({
  id,
  name,
  avatar,
  title,
  skills,
  hackathons,
  location,
  experience
}: ProfileCardProps) => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  
  const getExperienceColor = () => {
    switch (experience) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Expert':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <>
      <Card className="overflow-hidden card-hover">
        <CardContent className="p-0">
          <div className="h-12 bg-gradient-to-r from-brand-purple to-brand-blue" />
          <div className="px-6 pb-6">
            <div className="flex flex-col items-center -mt-6">
              <Avatar className="w-16 h-16 border-4 border-background">
                {avatar ? (
                  <AvatarImage src={avatar} alt={name} />
                ) : (
                  <AvatarFallback className="bg-brand-purple text-white">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <h3 className="mt-2 text-xl font-semibold">{name}</h3>
              <p className="text-muted-foreground">{title}</p>
              
              <div className="mt-2 text-center">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${getExperienceColor()}`}>
                  {experience}
                </span>
              </div>
              
              <div className="mt-4 w-full">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                    {skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Hackathons</h4>
                  <div className="flex flex-wrap gap-1">
                    {hackathons.slice(0, 2).map((hackathon) => (
                      <span key={hackathon} className="hackathon-tag">
                        {hackathon}
                      </span>
                    ))}
                    {hackathons.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{hackathons.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                  <span className="location-tag">{location}</span>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => setIsMessageModalOpen(true)}
                >
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <MessageModal 
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        recipientName={name}
        recipientId={id}
      />
    </>
  );
};

export default ProfileCard;
