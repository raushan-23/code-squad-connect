
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProfileCard, { ProfileCardProps } from '@/components/ProfileCard';
import FilterSidebar from '@/components/FilterSidebar';
import HackathonCard, { HackathonCardProps } from '@/components/HackathonCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for users
const mockUsers: ProfileCardProps[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    title: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'UI/UX'],
    hackathons: ['HackMIT', 'Global Hack Week', 'ETHGlobal'],
    location: 'San Francisco',
    experience: 'Intermediate'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200',
    title: 'Full Stack Developer',
    skills: ['Node.js', 'React', 'MongoDB', 'Express'],
    hackathons: ['PennApps', 'HackNY'],
    location: 'New York',
    experience: 'Expert'
  },
  {
    id: '3',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    title: 'UX Designer',
    skills: ['Figma', 'UI/UX', 'User Research', 'Prototyping'],
    hackathons: ['DesignHack', 'Global Hack Week'],
    location: 'Remote',
    experience: 'Intermediate'
  },
  {
    id: '4',
    name: 'James Wilson',
    title: 'Backend Developer',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    hackathons: ['HackMIT', 'TreeHacks'],
    location: 'Boston',
    experience: 'Expert'
  },
  {
    id: '5',
    name: 'Anna Lopez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    title: 'Mobile Developer',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    hackathons: ['MobileHack', 'AppJam'],
    location: 'Online',
    experience: 'Intermediate'
  },
  {
    id: '6',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    title: 'DevOps Engineer',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Architecture'],
    hackathons: ['CloudHack', 'DevOpsChallenge'],
    location: 'Seattle',
    experience: 'Expert'
  },
  {
    id: '7',
    name: 'Olivia Taylor',
    title: 'Product Manager',
    skills: ['Product Strategy', 'Agile', 'User Stories', 'Analytics'],
    hackathons: ['ProductHack', 'StartupWeekend'],
    location: 'Chicago',
    experience: 'Beginner'
  },
  {
    id: '8',
    name: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    title: 'ML Engineer',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science'],
    hackathons: ['AI Hack', 'DataFest'],
    location: 'Toronto',
    experience: 'Expert'
  }
];

// Mock data for hackathons
const mockHackathons: HackathonCardProps[] = [
  {
    id: '1',
    name: 'Global Hack Week',
    date: 'Jun 5-12, 2025',
    location: 'Online',
    description: 'A week-long virtual hackathon with daily challenges covering various tech domains.',
    tags: ['AI', 'Web3', 'Mobile', 'Beginners Welcome'],
    interested: 542
  },
  {
    id: '2',
    name: 'HackMIT',
    date: 'Sept 18-20, 2025',
    location: 'Boston, MA',
    description: 'One of the largest student-run hackathons, held annually at MIT.',
    tags: ['Hardware', 'ML', 'Startups', 'Innovation'],
    interested: 312
  },
  {
    id: '3',
    name: 'ETHGlobal SF',
    date: 'May 21-23, 2025',
    location: 'San Francisco, CA',
    description: 'A blockchain hackathon focusing on Ethereum and Web3 technologies.',
    tags: ['Blockchain', 'Web3', 'Ethereum', 'DeFi'],
    interested: 287
  },
  {
    id: '4',
    name: 'TreeHacks',
    date: 'Feb 14-16, 2025',
    location: 'Stanford, CA',
    description: 'Stanford University\'s annual hackathon focused on social impact and innovation.',
    tags: ['Social Impact', 'Health', 'Education', 'Climate'],
    interested: 235
  },
  {
    id: '5',
    name: 'PennApps',
    date: 'Jan 24-26, 2025',
    location: 'Philadelphia, PA',
    description: 'The original college hackathon, hosted at the University of Pennsylvania.',
    tags: ['Student', 'Web', 'Mobile', 'Hardware'],
    interested: 298
  },
  {
    id: '6',
    name: 'HackNY',
    date: 'Apr 3-5, 2025',
    location: 'New York, NY',
    description: 'A hackathon that brings together students from around the world to New York City.',
    tags: ['NYC', 'Fintech', 'Media', 'Startups'],
    interested: 187
  }
];

const Browse = () => {
  const [activeTab, setActiveTab] = useState('teammates');
  const [filters, setFilters] = useState({});
  const [filteredUsers, setFilteredUsers] = useState<ProfileCardProps[]>(mockUsers);
  const [filteredHackathons, setFilteredHackathons] = useState<HackathonCardProps[]>(mockHackathons);
  
  useEffect(() => {
    // Apply filters to users
    let filtered = [...mockUsers];
    
    // This is a simplified example - in a real app, you'd apply more complex filtering
    if (filters && Object.keys(filters).length > 0) {
      const { searchTerm, skills, locations, hackathons, experienceLevel } = filters as any;
      
      if (searchTerm) {
        filtered = filtered.filter(user => 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
          user.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (skills && skills.length > 0) {
        filtered = filtered.filter(user => 
          skills.some((skill: string) => user.skills.includes(skill))
        );
      }
      
      if (locations && locations.length > 0) {
        filtered = filtered.filter(user => 
          locations.includes(user.location)
        );
      }
      
      if (hackathons && hackathons.length > 0) {
        filtered = filtered.filter(user => 
          hackathons.some((hackathon: string) => user.hackathons.includes(hackathon))
        );
      }
      
      if (experienceLevel) {
        filtered = filtered.filter(user => 
          user.experience === experienceLevel
        );
      }
    }
    
    setFilteredUsers(filtered);
    
    // Apply filters to hackathons (simplified)
    let filteredEvents = [...mockHackathons];
    
    if (filters && Object.keys(filters).length > 0) {
      const { searchTerm, locations } = filters as any;
      
      if (searchTerm) {
        filteredEvents = filteredEvents.filter(hackathon => 
          hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hackathon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          hackathon.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (locations && locations.length > 0) {
        filteredEvents = filteredEvents.filter(hackathon => 
          locations.includes(hackathon.location)
        );
      }
    }
    
    setFilteredHackathons(filteredEvents);
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Squad</h1>
        <p className="text-muted-foreground">
          Browse potential teammates and hackathons to find your perfect match
        </p>
      </div>
      
      <Tabs defaultValue="teammates" onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="teammates">Teammates</TabsTrigger>
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col lg:flex-row">
        <FilterSidebar onFilterChange={handleFilterChange} />
        
        <div className="flex-1">
          <TabsContent value="teammates" className="m-0">
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <ProfileCard key={user.id} {...user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No teammates match your filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="hackathons" className="m-0">
            {filteredHackathons.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredHackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} {...hackathon} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No hackathons match your filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </TabsContent>
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
