import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TextToImage from "./pages/encode/TextToImage";
import ImageToImage from "./pages/encode/ImageToImage";
import AudioToImage from "./pages/encode/AudioToImage";
import Decode from "./pages/Decode";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/encode/text"
              element={
                <ProtectedRoute>
                  <TextToImage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/encode/image"
              element={
                <ProtectedRoute>
                  <ImageToImage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/encode/audio"
              element={
                <ProtectedRoute>
                  <AudioToImage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/decode"
              element={
                <ProtectedRoute>
                  <Decode />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
