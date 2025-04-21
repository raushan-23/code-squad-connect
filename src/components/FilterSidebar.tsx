
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

const skills = [
  'React', 'Angular', 'Vue', 'JavaScript', 'TypeScript',
  'Node.js', 'Python', 'Java', 'Ruby', 'Go', 'C#',
  'UI/UX Design', 'Product Management', 'DevOps'
];

const locations = [
  'San Francisco', 'New York', 'London', 'Berlin', 'Toronto',
  'Remote', 'Online', 'Tokyo', 'Singapore', 'Sydney'
];

const hackathons = [
  'HackMIT', 'TreeHacks', 'HackNY', 'PennApps', 'Hack the North',
  'Global Hack Week', 'ETHGlobal', 'Google HashCode', 'DevPost Hackathon'
];

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedHackathons, setSelectedHackathons] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    }
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location]);
    } else {
      setSelectedLocations(selectedLocations.filter(l => l !== location));
    }
  };

  const handleHackathonChange = (hackathon: string, checked: boolean) => {
    if (checked) {
      setSelectedHackathons([...selectedHackathons, hackathon]);
    } else {
      setSelectedHackathons(selectedHackathons.filter(h => h !== hackathon));
    }
  };

  const applyFilters = () => {
    onFilterChange({
      searchTerm,
      skills: selectedSkills,
      locations: selectedLocations,
      hackathons: selectedHackathons,
      experienceLevel
    });
    setIsMobileFilterOpen(false);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setSelectedLocations([]);
    setSelectedHackathons([]);
    setExperienceLevel('');
    onFilterChange({});
  };

  const DesktopFilters = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search">Search</Label>
        <div className="relative mt-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search skills, names..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label>Experience Level</Label>
        <Select 
          value={experienceLevel} 
          onValueChange={setExperienceLevel}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Any experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any experience</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="mb-1 block">Skills</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 flex flex-col">
          {skills.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox 
                id={`skill-${skill}`} 
                checked={selectedSkills.includes(skill)}
                onCheckedChange={(checked) => 
                  handleSkillChange(skill, checked === true)
                }
              />
              <Label htmlFor={`skill-${skill}`} className="text-sm">
                {skill}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label className="mb-1 block">Locations</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 flex flex-col">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox 
                id={`location-${location}`} 
                checked={selectedLocations.includes(location)}
                onCheckedChange={(checked) => 
                  handleLocationChange(location, checked === true)
                }
              />
              <Label htmlFor={`location-${location}`} className="text-sm">
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label className="mb-1 block">Hackathons</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 flex flex-col">
          {hackathons.map((hackathon) => (
            <div key={hackathon} className="flex items-center space-x-2">
              <Checkbox 
                id={`hackathon-${hackathon}`} 
                checked={selectedHackathons.includes(hackathon)}
                onCheckedChange={(checked) => 
                  handleHackathonChange(hackathon, checked === true)
                }
              />
              <Label htmlFor={`hackathon-${hackathon}`} className="text-sm">
                {hackathon}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-x-2 pt-2">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="mt-2 w-full"
        >
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-64 pr-4 space-y-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        <DesktopFilters />
      </div>
      
      {/* Mobile Filter Button */}
      <div className="lg:hidden w-full mb-4 flex items-center justify-between">
        <div className="relative flex-grow mr-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      {/* Mobile Filter Dropdown */}
      {isMobileFilterOpen && (
        <div className="lg:hidden w-full bg-background border rounded-lg p-4 mb-4 shadow-lg animate-fade-in">
          <DesktopFilters />
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
