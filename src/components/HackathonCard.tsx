
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface HackathonCardProps {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  tags: string[];
  interested: number;
}

const HackathonCard = ({
  id,
  name,
  date,
  location,
  description,
  tags,
  interested
}: HackathonCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge 
            variant="outline" 
            className="bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue-dark border-brand-blue/30"
          >
            {date}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <Badge 
            variant="outline" 
            className="bg-accent/10 text-accent-foreground"
          >
            {location}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3">
        <span className="text-sm text-muted-foreground">{interested} people interested</span>
        <Button variant="outline" size="sm">Interested</Button>
      </CardFooter>
    </Card>
  );
};

export default HackathonCard;
