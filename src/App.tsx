
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import JournalPage from "./pages/JournalPage";
import TasksPage from "./pages/TasksPage";
import VisionPage from "./pages/VisionPage";
import PlanningPage from "./pages/PlanningPage";
import VideoTrackingPage from "./pages/VideoTrackingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Layout><DashboardPage /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/journal" 
              element={
                <ProtectedRoute>
                  <Layout><JournalPage /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <ProtectedRoute>
                  <Layout><TasksPage /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/vision" 
              element={
                <ProtectedRoute>
                  <Layout><VisionPage /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/planning" 
              element={
                <ProtectedRoute>
                  <Layout><PlanningPage /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/videos" 
              element={
                <ProtectedRoute>
                  <Layout><VideoTrackingPage /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
