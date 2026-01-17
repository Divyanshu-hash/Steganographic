import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Shield, Home, AlertTriangle } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   COMPONENT                                */
/* -------------------------------------------------------------------------- */

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn(
        "[404] Route not found:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background cyber-grid flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative z-10 max-w-md w-full text-center glass rounded-2xl p-10 border border-border/50">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
          <AlertTriangle className="w-8 h-8 text-primary" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-display font-bold mb-2">
          404
        </h1>

        <p className="text-lg text-muted-foreground mb-6">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="gap-2">
            <Link to="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>

          <Button variant="outline" asChild className="gap-2">
            <Link to="/dashboard">
              <Shield className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
