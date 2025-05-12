
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { VideoPlaylist, VideoItem } from "@/types/video";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";

interface ManualVideoFormProps {
  onVideoAdded: () => void;
}

export function ManualVideoForm({ onVideoAdded }: ManualVideoFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [playlists, setPlaylists] = useState<VideoPlaylist[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load playlists from localStorage
    const savedPlaylists = JSON.parse(localStorage.getItem('videoPlaylists') || '[]');
    setPlaylists(savedPlaylists);
  }, []);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playlistId) {
      toast({
        title: "Select a playlist",
        description: "You need to select or create a playlist first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get existing playlists
      const existingPlaylists = JSON.parse(localStorage.getItem('videoPlaylists') || '[]');
      
      // Find the selected playlist
      const playlistIndex = existingPlaylists.findIndex(
        (p: VideoPlaylist) => p.id === playlistId
      );
      
      if (playlistIndex === -1) {
        throw new Error("Playlist not found");
      }
      
      // Create new video
      const newVideo: VideoItem = {
        id: uuidv4(),
        title,
        url,
        watched: false,
        dateAdded: new Date().toISOString(),
      };
      
      // Add video to playlist
      existingPlaylists[playlistIndex].videos.push(newVideo);
      existingPlaylists[playlistIndex].lastUpdated = new Date().toISOString();
      
      // Recalculate progress
      const watchedCount = existingPlaylists[playlistIndex].videos.filter((v: VideoItem) => v.watched).length;
      existingPlaylists[playlistIndex].progress = 
        Math.round((watchedCount / existingPlaylists[playlistIndex].videos.length) * 100);
      
      localStorage.setItem('videoPlaylists', JSON.stringify(existingPlaylists));
      
      toast({
        title: "Video added",
        description: `"${title}" has been added to your playlist.`,
      });
      
      onVideoAdded();
      setTitle("");
      setUrl("");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding your video.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Video</CardTitle>
        <CardDescription>
          Add a video to one of your playlists
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleAddVideo}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="playlist">Select Playlist</Label>
            <Select 
              value={playlistId} 
              onValueChange={setPlaylistId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a playlist" />
              </SelectTrigger>
              <SelectContent>
                {playlists.map((playlist) => (
                  <SelectItem key={playlist.id} value={playlist.id}>
                    {playlist.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {playlists.length === 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                No playlists available. Create a playlist first.
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Video Title</Label>
            <Input 
              id="title" 
              placeholder="Enter video title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">Video URL</Label>
            <Input 
              id="url" 
              placeholder="https://youtube.com/watch?v=..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isSubmitting || !title.trim() || !url.trim() || !playlistId}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Video
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
