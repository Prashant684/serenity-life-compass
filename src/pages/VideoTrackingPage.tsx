
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YoutubePlaylistSync } from "@/components/videos/YoutubePlaylistSync";
import { VideoPlaylistList } from "@/components/videos/VideoPlaylistList";
import { AddVideoPlaylistForm } from "@/components/videos/AddVideoPlaylistForm";
import { ManualVideoForm } from "@/components/videos/ManualVideoForm";

const VideoTrackingPage = () => {
  const [activeTab, setActiveTab] = useState<string>("playlists");
  const [refreshPlaylists, setRefreshPlaylists] = useState<number>(0);

  // Trigger refresh of playlists when new content is added
  const handleContentAdded = () => {
    setRefreshPlaylists(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Video Progress Tracker</h1>
        <p className="text-muted-foreground">Track your progress on educational videos and courses</p>
      </div>

      <Tabs defaultValue="playlists" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="playlists">My Playlists</TabsTrigger>
          <TabsTrigger value="sync">Sync YouTube</TabsTrigger>
          <TabsTrigger value="add">Add Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-6">
          <VideoPlaylistList key={refreshPlaylists} />
        </TabsContent>

        <TabsContent value="sync" className="space-y-6">
          <YoutubePlaylistSync onPlaylistsAdded={handleContentAdded} />
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <AddVideoPlaylistForm onPlaylistAdded={handleContentAdded} />
            </div>
            <div className="space-y-6">
              <ManualVideoForm onVideoAdded={handleContentAdded} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VideoTrackingPage;
