
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tag, Save, Plus, X } from "lucide-react";

interface JournalEditorProps {
  onSave: (entry: {
    content: string;
    title: string;
    tags: string[];
    date: Date;
  }) => void;
  initialContent?: string;
  initialTitle?: string;
  initialTags?: string[];
}

export function JournalEditor({
  onSave,
  initialContent = "",
  initialTitle = "",
  initialTags = [],
}: JournalEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your journal entry");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter some content for your journal entry");
      return;
    }

    onSave({
      content,
      title,
      tags,
      date: new Date(),
    });

    toast.success("Journal entry saved successfully");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Write in Your Journal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="title" className="text-sm font-medium block mb-1">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title your entry..."
            className="focus-ring"
          />
        </div>

        <div>
          <label htmlFor="content" className="text-sm font-medium block mb-1">
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts here..."
            className="min-h-[200px] focus-ring resize-y"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-secondary px-2 py-1 rounded-md text-sm"
              >
                <span className="mr-1">#{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag..."
              className="focus-ring"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={addTag}
              className="ml-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center">
            <Save className="mr-2 h-4 w-4" />
            Save Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
