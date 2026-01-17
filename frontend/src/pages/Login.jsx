import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import {
  Shield,
  Loader2,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   COMPONENT                                */
/* -------------------------------------------------------------------------- */

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  /* ------------------------------ Submit ---------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (!result?.success) {
        throw new Error(
          result?.message || "Invalid email or password."
        );
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-background cyber-grid flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground 
                     hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Card */}
        <div className="glass rounded-2xl p-8 border border-border/50">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <span className="font-display text-2xl gradient-text">
              StegaCrypt
            </span>
          </div>

          <h1 className="text-2xl font-display text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Sign in to access your dashboard
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background/50"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-background/50"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full glow-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
