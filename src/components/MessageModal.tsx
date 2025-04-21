
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientId: string;
}

const MessageModal = ({
  isOpen,
  onClose,
  recipientName,
  recipientId
}: MessageModalProps) => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  
  const handleSend = () => {
    if (message.trim() === '') {
      toast({
        variant: "destructive",
        title: "Message cannot be empty",
        description: "Please write a message before sending.",
      });
      return;
    }
    
    // Here you would typically send the message to your API
    console.log('Sending message to:', recipientId);
    console.log('Message content:', message);
    
    toast({
      title: "Message sent!",
      description: `Your message to ${recipientName} has been sent.`,
    });
    
    setMessage('');
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Message {recipientName}</DialogTitle>
          <DialogDescription>
            Introduce yourself and explain why you'd like to connect for a hackathon collaboration.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Textarea
            placeholder={`Hi ${recipientName}, I'd love to team up for the upcoming hackathon!`}
            className="min-h-[150px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSend}>
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
