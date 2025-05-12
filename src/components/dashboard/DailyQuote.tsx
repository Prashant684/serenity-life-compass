
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Mock quotes data
const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
];

export function DailyQuote() {
  const [quote, setQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    // Choose a random quote when component mounts
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[120px] text-center">
        <blockquote className="italic text-lg">"{quote.text}"</blockquote>
        <cite className="mt-2 text-sm text-muted-foreground">— {quote.author}</cite>
      </CardContent>
    </Card>
  );
}
