
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Edit, Trash, Download } from "lucide-react";

interface JournalEntryCardProps {
  entry: {
    id: string;
    title: string;
    content: string;
    date: Date;
    tags: string[];
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function JournalEntryCard({ entry, onEdit, onDelete }: JournalEntryCardProps) {
  const { id, title, content, date, tags } = entry;
  
  const getContentPreview = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const exportEntry = () => {
    const fileContent = `# ${title}
Date: ${format(date, "PPP")}
Tags: ${tags.join(", ")}

${content}`;
    
    const blob = new Blob([fileContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = `${format(date, "yyyy-MM-dd")}-${title.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <Card className="card-shadow h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          {format(date, "MMMM d, yyyy")}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="mb-2 flex-1">
          <p className="text-sm text-muted-foreground">
            {getContentPreview(content)}
          </p>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between mt-auto pt-2 border-t">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs"
            onClick={() => onEdit(id)}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs"
            onClick={exportEntry}
          >
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-destructive"
            onClick={() => onDelete(id)}
          >
            <Trash className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
