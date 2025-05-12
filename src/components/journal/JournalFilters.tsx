
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, Filter, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface JournalFiltersProps {
  tags: string[];
  onFilterChange: (filters: {
    search: string;
    selectedDate: Date | undefined;
    selectedTags: string[];
  }) => void;
}

export function JournalFilters({ tags, onFilterChange }: JournalFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onFilterChange({ search: newSearch, selectedDate, selectedTags });
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    onFilterChange({ search, selectedDate: date, selectedTags });
  };

  const toggleTag = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
    onFilterChange({ search, selectedDate, selectedTags: newSelectedTags });
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedDate(undefined);
    setSelectedTags([]);
    onFilterChange({ search: "", selectedDate: undefined, selectedTags: [] });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search journal entries..."
                className="pl-9"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-2 px-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  {selectedDate && (
                    <span className="ml-2 text-xs">
                      {format(selectedDate, "MMM d")}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            
            {(search || selectedDate || selectedTags.length > 0) && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={clearFilters}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {tags.length > 0 && (
            <div>
              <div className="flex items-center mb-2">
                <Filter className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Filter by tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
