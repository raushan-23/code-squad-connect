
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

interface UserData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  hackathons: string[];
  location: string;
  experience: string;
  avatar?: string;
}

const UserProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - in a real app, this would come from an API or auth provider
  const [userData, setUserData] = useState<UserData>({
    name: 'Alex Johnson',
    title: 'Full-Stack Developer',
    bio: 'Passionate developer with 3 years of experience building web applications. Looking for teammates for upcoming hackathons!',
    skills: ['React', 'Node.js', 'TypeScript', 'UI/UX'],
    hackathons: ['HackMIT', 'PennApps'],
    location: 'San Francisco',
    experience: 'Intermediate',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200',
  });
  
  const [formData, setFormData] = useState<UserData>({ ...userData });
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setFormData({ ...formData, skills });
  };
  
  const handleHackathonsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hackathons = e.target.value.split(',').map(hackathon => hackathon.trim()).filter(Boolean);
    setFormData({ ...formData, hackathons });
  };
  
  const handleSave = () => {
    if (!formData.name || !formData.location) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Name and location are required fields.",
      });
      return;
    }
    
    // Update the user data
    setUserData(formData);
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };
  
  const initials = userData.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {isEditing ? (
              // Edit Mode
              <>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    {userData.avatar ? (
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                    ) : (
                      <AvatarFallback className="bg-brand-purple text-white text-xl">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground">Profile Image</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Photo upload functionality would be added in the next version
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title/Role</Label>
                    <Input 
                      id="title" 
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Frontend Developer, UX Designer"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Share a bit about yourself and what you're looking for"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="skills">Skills (comma separated)</Label>
                    <Input 
                      id="skills" 
                      value={formData.skills.join(', ')}
                      onChange={handleSkillsChange}
                      placeholder="e.g. React, Node.js, UI/UX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hackathons">Interested Hackathons (comma separated)</Label>
                    <Input 
                      id="hackathons" 
                      value={formData.hackathons.join(', ')}
                      onChange={handleHackathonsChange}
                      placeholder="e.g. HackMIT, TreeHacks"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Country or Remote"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <select
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </>
            ) : (
              // View Mode
              <>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <Avatar className="w-24 h-24">
                    {userData.avatar ? (
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                    ) : (
                      <AvatarFallback className="bg-brand-purple text-white text-xl">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold">{userData.name}</h2>
                    <p className="text-muted-foreground">{userData.title}</p>
                    
                    <div className="flex flex-wrap mt-2 gap-2 justify-center md:justify-start">
                      <span className="location-tag">{userData.location}</span>
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-sm font-medium 
                        ${userData.experience === 'Beginner' 
                          ? 'bg-green-100 text-green-800' 
                          : userData.experience === 'Intermediate' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                        {userData.experience}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="md:self-start"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">
                    {userData.bio || "No bio provided yet."}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-medium mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {userData.skills.length > 0 ? (
                        userData.skills.map((skill) => (
                          <span key={skill} className="skill-tag">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No skills added yet.</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Interested Hackathons</h3>
                    <div className="flex flex-wrap gap-1">
                      {userData.hackathons.length > 0 ? (
                        userData.hackathons.map((hackathon) => (
                          <span key={hackathon} className="hackathon-tag">
                            {hackathon}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No hackathons added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
