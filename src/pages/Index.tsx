
import { Logo } from "@/components/ui/Logo";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <Logo className="h-24 mb-8" />
        <h1 className="text-4xl font-bold">Welcome to ynotx Life Compass</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Your personal guide to mindful living, productivity, and self-improvement
        </p>
      </div>
    </div>
  );
};

export default Index;
