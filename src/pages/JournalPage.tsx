
import { useState, useEffect } from "react";
import { JournalEditor } from "@/components/journal/JournalEditor";
import { JournalEntryCard } from "@/components/journal/JournalEntryCard";
import { JournalFilters } from "@/components/journal/JournalFilters";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, isEqual } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { FilePlus, ArrowLeft, FileText } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[];
}

const JournalPage = () => {
  const [activeTab, setActiveTab] = useState("entries");
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem("journalEntries");
    return savedEntries ? JSON.parse(savedEntries).map((entry: any) => ({
      ...entry,
      date: new Date(entry.date)
    })) : [];
  });
  
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    selectedDate: undefined as Date | undefined,
    selectedTags: [] as string[]
  });
  
  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);
  
  // All unique tags across all entries
  const allTags = Array.from(
    new Set(entries.flatMap((entry) => entry.tags))
  );
  
  const handleSaveEntry = (entryData: {
    content: string;
    title: string;
    tags: string[];
    date: Date;
  }) => {
    if (editingEntry) {
      // Update existing entry
      setEntries(
        entries.map((entry) =>
          entry.id === editingEntry.id
            ? { ...entry, ...entryData }
            : entry
        )
      );
      setEditingEntry(null);
    } else {
      // Add new entry
      const newEntry = {
        id: uuidv4(),
        ...entryData
      };
      setEntries([newEntry, ...entries]);
    }
    setActiveTab("entries");
  };
  
  const handleEdit = (id: string) => {
    const entry = entries.find((e) => e.id === id);
    if (entry) {
      setEditingEntry(entry);
      setActiveTab("write");
    }
  };
  
  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };
  
  const filteredEntries = entries.filter((entry) => {
    // Filter by search text
    const matchesSearch = !filters.search || 
      entry.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      entry.content.toLowerCase().includes(filters.search.toLowerCase());
    
    // Filter by date
    const matchesDate = !filters.selectedDate || 
      isEqual(
        new Date(entry.date.getFullYear(), entry.date.getMonth(), entry.date.getDate()),
        new Date(filters.selectedDate.getFullYear(), filters.selectedDate.getMonth(), filters.selectedDate.getDate())
      );
    
    // Filter by tags
    const matchesTags = filters.selectedTags.length === 0 || 
      filters.selectedTags.every((tag) => entry.tags.includes(tag));
    
    return matchesSearch && matchesDate && matchesTags;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Journal</h1>
        {activeTab === "entries" ? (
          <Button onClick={() => { setEditingEntry(null); setActiveTab("write"); }}>
            <FilePlus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setActiveTab("entries")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Entries
          </Button>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="entries" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Entries
          </TabsTrigger>
          <TabsTrigger value="write" className="flex items-center">
            <FilePlus className="h-4 w-4 mr-2" />
            {editingEntry ? "Edit Entry" : "Write New"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="entries" className="space-y-6">
          <JournalFilters 
            tags={allTags}
            onFilterChange={setFilters}
          />
          
          {filteredEntries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEntries.map((entry) => (
                <JournalEntryCard
                  key={entry.id}
                  entry={entry}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-muted/20 rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No journal entries found</h3>
              <p className="text-muted-foreground">
                {entries.length > 0
                  ? "Try adjusting your filters or search query"
                  : "Start writing your first journal entry"}
              </p>
              <Button
                className="mt-4"
                onClick={() => { setEditingEntry(null); setActiveTab("write"); }}
              >
                <FilePlus className="h-4 w-4 mr-2" />
                Create New Entry
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="write">
          <JournalEditor
            onSave={handleSaveEntry}
            initialContent={editingEntry?.content || ""}
            initialTitle={editingEntry?.title || ""}
            initialTags={editingEntry?.tags || []}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JournalPage;
