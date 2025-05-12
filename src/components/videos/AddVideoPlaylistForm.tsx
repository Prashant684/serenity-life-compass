
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { VideoPlaylist } from "@/types/video";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";

interface AddVideoPlaylistFormProps {
  onPlaylistAdded: () => void;
}

export function AddVideoPlaylistForm({ onPlaylistAdded }: AddVideoPlaylistFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      // Get existing playlists or initialize empty array
      const existingPlaylists = JSON.parse(localStorage.getItem('videoPlaylists') || '[]');
      
      // Create new empty playlist
      const newPlaylist: VideoPlaylist = {
        id: uuidv4(),
        title,
        description,
        source: 'custom',
        videos: [],
        dateAdded: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        progress: 0
      };
      
      existingPlaylists.push(newPlaylist);
      localStorage.setItem('videoPlaylists', JSON.stringify(existingPlaylists));
      
      toast({
        title: "Playlist created",
        description: "Your new playlist has been created. You can now add videos to it.",
      });
      
      onPlaylistAdded();
      setTitle("");
      setDescription("");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your playlist.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Playlist</CardTitle>
        <CardDescription>
          Create a custom playlist to organize your learning videos
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleCreatePlaylist}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Playlist Title</Label>
            <Input 
              id="title" 
              placeholder="e.g., Web Development Course" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description" 
              placeholder="Brief description of this playlist" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={isSubmitting || !title.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Create Playlist
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
