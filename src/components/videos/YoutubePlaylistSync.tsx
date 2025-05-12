
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Sync } from "lucide-react";
import { VideoPlaylist } from "@/types/video";
import { v4 as uuidv4 } from "uuid";

interface YoutubePlaylistSyncProps {
  onPlaylistsAdded: () => void;
}

export function YoutubePlaylistSync({ onPlaylistsAdded }: YoutubePlaylistSyncProps) {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncPlaylist = async () => {
    // In a real implementation, this would connect to YouTube API
    // For now, we'll simulate the sync with localStorage
    
    setIsSyncing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing playlists or initialize empty array
      const existingPlaylists = JSON.parse(localStorage.getItem('videoPlaylists') || '[]');
      
      // Create mock playlist from the URL
      const youtubeId = playlistUrl.includes('?list=') 
        ? playlistUrl.split('?list=')[1].split('&')[0]
        : 'PL' + Math.random().toString(36).substr(2, 9);
      
      const mockVideos = Array(5).fill(null).map((_, i) => ({
        id: uuidv4(),
        title: `Video ${i + 1} - YouTube Tutorial`,
        thumbnailUrl: "https://i.ytimg.com/vi/placeholder/mqdefault.jpg",
        url: `https://youtube.com/watch?v=sample${i}`,
        watched: i < 2, // First two are watched
        dateAdded: new Date().toISOString(),
        duration: "10:30"
      }));
      
      const newPlaylist: VideoPlaylist = {
        id: youtubeId,
        title: "Watch Later Playlist",
        description: "Synced from YouTube",
        thumbnailUrl: "https://i.ytimg.com/vi/placeholder/mqdefault.jpg",
        source: 'youtube',
        playlistUrl: playlistUrl,
        videos: mockVideos,
        dateAdded: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        progress: 40 // 2 out of 5 videos watched
      };
      
      // Check if playlist already exists and update it, or add it
      const playlistIndex = existingPlaylists.findIndex(
        (p: VideoPlaylist) => p.id === youtubeId
      );
      
      if (playlistIndex >= 0) {
        existingPlaylists[playlistIndex] = {
          ...existingPlaylists[playlistIndex],
          lastUpdated: new Date().toISOString(),
          videos: mockVideos,
        };
        toast({
          title: "Playlist updated",
          description: "Your YouTube playlist has been refreshed.",
        });
      } else {
        existingPlaylists.push(newPlaylist);
        toast({
          title: "Playlist added",
          description: "Your YouTube playlist has been added to your tracker.",
        });
      }
      
      localStorage.setItem('videoPlaylists', JSON.stringify(existingPlaylists));
      onPlaylistsAdded();
      setPlaylistUrl("");
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "There was an error syncing your YouTube playlist.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sync YouTube Playlist</CardTitle>
        <CardDescription>
          Add your Watch Later or any other YouTube playlist to track your progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Paste the URL of your YouTube playlist below
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="https://youtube.com/playlist?list=..."
                value={playlistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
              />
              <Button 
                onClick={handleSyncPlaylist} 
                disabled={isSyncing || !playlistUrl.trim().length}
              >
                {isSyncing ? (
                  <>
                    <Sync className="mr-2 h-4 w-4 animate-spin" />
                    Syncing
                  </>
                ) : (
                  <>
                    <Sync className="mr-2 h-4 w-4" />
                    Sync
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Note: This currently simulates syncing with YouTube. In a real implementation, you would need to connect this to the YouTube Data API.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Last synced: {new Date().toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
