
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import HackathonCard, { HackathonCardProps } from '@/components/HackathonCard';
import Layout from '@/components/Layout';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for featured hackathons
  const featuredHackathons: HackathonCardProps[] = [
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
    }
  ];

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    // In a real app, this would redirect to the browse page with the search term
    console.log('Searching for:', term);
  };

  return (
    <Layout>
      <section className="py-12 md:py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect <span className="text-brand-purple">Hackathon Team</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with developers, designers, and innovators who share your passion for building amazing projects.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/browse">
              <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-dark">
                Find Teammates
              </Button>
            </Link>
            <Link to="/profile">
              <Button size="lg" variant="outline">
                Create Your Profile
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center mb-12">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-2">Featured Hackathons</h2>
          <p className="text-muted-foreground mb-8">
            Connect with teammates for these upcoming events
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} {...hackathon} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline">View All Hackathons</Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-purple">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Showcase your skills, experience, and the hackathons you're interested in attending.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-purple">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Browse Teammates</h3>
              <p className="text-muted-foreground">
                Filter by skills, location, and hackathon interests to find the perfect match for your team.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-purple">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Connect & Collaborate</h3>
              <p className="text-muted-foreground">
                Message potential teammates, form your dream team, and start building amazing projects together.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/browse">
              <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-dark">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
