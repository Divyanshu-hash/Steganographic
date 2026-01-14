import { useEffect, useState } from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 100;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const timeout = setTimeout(onComplete, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background cyber-grid flex flex-col items-center justify-center overflow-hidden">
      
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan-line" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in">

        {/* Animated logo */}
        <div className="relative">
          <div className="w-32 h-32 rounded-2xl bg-primary/10 flex items-center justify-center glow-primary-strong animate-float">
            <Shield className="w-16 h-16 text-primary" />
          </div>

          {/* Orbiting icons */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
            <Lock className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 text-primary/60" />
          </div>

          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: '12s', animationDirection: 'reverse' }}
          >
            <Eye className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 text-primary/60" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-display gradient-text text-glow mb-2">
            StegaCrypt
          </h1>
          <p className="text-muted-foreground font-mono text-sm tracking-wider">
            HIDE • PROTECT • SECURE
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-cyan-400 to-primary transition-all duration-100 glow-primary"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-xs font-mono text-muted-foreground">
              INITIALIZING
            </span>
            <span className="text-xs font-mono text-primary">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Code-like text */}
        <div className="font-mono text-xs text-muted-foreground/50 text-center space-y-1">
          <p className="animate-pulse">loading encryption modules...</p>
          <p className="animate-pulse" style={{ animationDelay: '0.5s' }}>
            establishing secure connection...
          </p>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-primary/5 blur-xl animate-pulse" />
      <div
        className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary/5 blur-xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
    </div>
  );
};

export default SplashScreen;
