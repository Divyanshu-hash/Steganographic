import { useEffect, useState } from "react";
import { Shield, Lock, Eye } from "lucide-react";

const DURATION = 3000;

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const value = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(value);

      if (elapsed < DURATION) {
        requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background cyber-grid flex items-center justify-center overflow-hidden">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-line" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 fade-in">
        {/* Logo */}
        <div className="relative">
          <div className="logo-core animate-float">
            <Shield className="w-16 h-16 text-primary" />
          </div>

          {/* Orbit */}
          <div className="orbit orbit-slow">
            <Lock className="orbit-icon" />
          </div>
          <div className="orbit orbit-fast reverse">
            <Eye className="orbit-icon" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-display logo-text text-glow mb-2">
            StegaCrypt
          </h1>
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground">
            HIDE · PROTECT · SECURE
          </p>
        </div>

        {/* Progress */}
        <div className="w-72">
          <div className="progress-track">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs font-mono">
            <span className="text-muted-foreground">INITIALIZING</span>
            <span className="text-primary">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Terminal text */}
        <div className="font-mono text-xs text-muted-foreground/50 text-center space-y-1">
          <p className="blink">loading encryption modules...</p>
          <p className="blink delay">establishing secure channel...</p>
        </div>
      </div>

      {/* Ambient blobs */}
      <div className="ambient ambient-1" />
      <div className="ambient ambient-2" />
    </div>
  );
};

export default SplashScreen;
