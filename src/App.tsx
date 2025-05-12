
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import JournalPage from "./pages/JournalPage";
import TasksPage from "./pages/TasksPage";
import VisionPage from "./pages/VisionPage";
import PlanningPage from "./pages/PlanningPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout><DashboardPage /></Layout>} />
            <Route path="/journal" element={<Layout><JournalPage /></Layout>} />
            <Route path="/tasks" element={<Layout><TasksPage /></Layout>} />
            <Route path="/vision" element={<Layout><VisionPage /></Layout>} />
            <Route path="/planning" element={<Layout><PlanningPage /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
