import { useState } from "react";
import { Link } from "react-router-dom";

import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

import {
  Shield,
  Lock,
  Image as ImageIcon,
  Music,
  Eye,
  ArrowRight,
  CheckCircle2,
  Upload,
  Download,
  Zap,
  Mail,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   CONSTANTS                                */
/* -------------------------------------------------------------------------- */

const BRAND_NAME = "StegaCrypt";
const CONTACT_EMAIL = "contact@stegacrypt.com";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  {
    icon: Lock,
    title: "Text Encoding",
    description:
      "Hide secret messages within ordinary images using advanced LSB techniques.",
  },
  {
    icon: ImageIcon,
    title: "Image in Image",
    description:
      "Conceal entire images inside other images without visible changes.",
  },
  {
    icon: Music,
    title: "Audio Steganography",
    description:
      "Embed audio files securely within your cover images.",
  },
  {
    icon: Eye,
    title: "Easy Decoding",
    description:
      "Extract hidden content with a simple upload and one click.",
  },
];

const STEPS = [
  {
    step: 1,
    title: "Upload Cover Image",
    description: "Select the image that will hide your data",
  },
  {
    step: 2,
    title: "Add Secret Content",
    description: "Choose text, image, or audio to hide",
  },
  {
    step: 3,
    title: "Download Encoded Image",
    description: "Get your steganographic image",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   COMPONENT                                 */
/* -------------------------------------------------------------------------- */

const Index = () => {
  const [showSplash, setShowSplash] = useState(
    !sessionStorage.getItem("splashShown")
  );

  const handleSplashComplete = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ------------------------------ HERO -------------------------------- */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center cyber-grid overflow-hidden pt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-primary/5 blur-3xl animate-pulse delay-1000" />

        <div className="container relative z-10 px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">
              Secure Data Hiding Technology
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Hide Your Secrets <br />
            <span className="text-primary">In Plain Sight</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Advanced steganography platform to embed text, images, and audio
            within ordinary images. Undetectable, secure, and easy to use.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/register" aria-label="Get started for free">
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------- FEATURES -------------------------------- */}
      <section id="features" className="py-20 md:py-32">
        <div className="container px-4">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
              Everything you need to hide and protect your sensitive data
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-6 rounded-xl glass border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------- HOW IT WORKS ------------------------------ */}
      <section id="how-it-works" className="py-20 md:py-32 bg-card/50">
        <div className="container px-4">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Simple three-step process to hide your data securely
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map(({ step, title, description }, index) => (
              <div key={step} className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-display text-primary">
                    {step}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>

                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-16">
            {[Upload, Zap, Download].map((Icon, i) => (
              <div key={i} className="p-4 rounded-xl glass">
                <Icon className="w-8 h-8 text-primary" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ CTA ---------------------------------- */}
      <section className="py-20 md:py-32">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto glass rounded-2xl p-12 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Ready to Hide Your Secrets?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join now and start using advanced steganography to protect your
              data.
            </p>

            <Button variant="hero" size="lg" asChild>
              <Link to="/register">
                Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>

            <div className="flex justify-center gap-6 mt-8 text-sm">
              {["Free to use", "No credit card"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- CONTACT -------------------------------- */}
      <section id="contact" className="py-20 md:py-32 bg-card/50 text-center">
        <h2 className="text-3xl md:text-4xl font-display mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-muted-foreground mb-6">
          Have questions or feedback? We'd love to hear from you.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <Mail className="w-5 h-5" />
          {CONTACT_EMAIL}
        </a>
      </section>

      {/* ------------------------------ FOOTER -------------------------------- */}
      <footer className="py-8 border-t border-border/50">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-display gradient-text">{BRAND_NAME}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
