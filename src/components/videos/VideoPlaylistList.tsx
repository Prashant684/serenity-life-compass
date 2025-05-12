
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { VideoPlaylist, VideoItem } from "@/types/video";
import { toast } from "@/components/ui/use-toast";
import { Plus, Youtube } from "lucide-react";

export function VideoPlaylistList() {
  const [playlists, setPlaylists] = useState<VideoPlaylist[]>([]);
  const [expandedPlaylists, setExpandedPlaylists] = useState<string[]>([]);

  useEffect(() => {
    // Load playlists from localStorage
    const savedPlaylists = localStorage.getItem('videoPlaylists');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }
  }, []);

  const toggleVideoWatched = (playlistId: string, videoId: string) => {
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        const updatedVideos = playlist.videos.map(video => {
          if (video.id === videoId) {
            return { ...video, watched: !video.watched };
          }
          return video;
        });
        
        // Calculate new progress percentage
        const watchedCount = updatedVideos.filter(v => v.watched).length;
        const progress = updatedVideos.length > 0 
          ? Math.round((watchedCount / updatedVideos.length) * 100)
          : 0;
          
        return {
          ...playlist,
          videos: updatedVideos,
          progress,
          lastUpdated: new Date().toISOString()
        };
      }
      return playlist;
    });
    
    setPlaylists(updatedPlaylists);
    localStorage.setItem('videoPlaylists', JSON.stringify(updatedPlaylists));
  };

  const handleDeletePlaylist = (id: string) => {
    const updatedPlaylists = playlists.filter(playlist => playlist.id !== id);
    setPlaylists(updatedPlaylists);
    localStorage.setItem('videoPlaylists', JSON.stringify(updatedPlaylists));
    
    toast({
      title: "Playlist deleted",
      description: "The playlist has been removed from your tracker.",
    });
  };

  if (playlists.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed rounded-lg">
        <h3 className="text-lg font-medium mb-2">No playlists added yet</h3>
        <p className="text-muted-foreground mb-4">
          Sync your YouTube playlists or add videos manually to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {playlists.map((playlist) => (
        <Card key={playlist.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center">
                  {playlist.source === 'youtube' && (
                    <Youtube className="h-5 w-5 mr-2 text-red-500" />
                  )}
                  {playlist.title}
                </CardTitle>
                <CardDescription>{playlist.description}</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleDeletePlaylist(playlist.id)}
              >
                Remove
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{playlist.progress}%</span>
              </div>
              <Progress value={playlist.progress} className="h-2" />
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="videos">
                <AccordionTrigger>
                  Videos ({playlist.videos.filter(v => v.watched).length}/{playlist.videos.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 mt-2">
                    {playlist.videos.map((video) => (
                      <div 
                        key={video.id} 
                        className="flex items-start space-x-2 py-2 border-b border-border last:border-0"
                      >
                        <Checkbox 
                          id={video.id}
                          checked={video.watched}
                          onCheckedChange={() => toggleVideoWatched(playlist.id, video.id)}
                        />
                        <div className="grid gap-1.5">
                          <label
                            htmlFor={video.id}
                            className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                              video.watched ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {video.title}
                          </label>
                          {video.duration && (
                            <p className="text-xs text-muted-foreground">
                              Duration: {video.duration}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Last updated: {new Date(playlist.lastUpdated).toLocaleDateString()}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
