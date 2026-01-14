import { useState } from 'react';
import { Link } from 'react-router-dom';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Lock, 
  Image, 
  Music, 
  Eye, 
  ArrowRight, 
  CheckCircle2,
  Upload,
  Download,
  Zap,
  Mail
} from 'lucide-react';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const features = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Text Encoding',
      description: 'Hide secret messages within ordinary images using advanced LSB techniques.',
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: 'Image in Image',
      description: 'Conceal entire images inside other images without visible changes.',
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: 'Audio Steganography',
      description: 'Embed audio files securely within your cover images.',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Easy Decoding',
      description: 'Extract hidden content with a simple upload and one click.',
    },
  ];

  const steps = [
    { step: 1, title: 'Upload Cover Image', description: 'Select the image that will hide your data' },
    { step: 2, title: 'Add Secret Content', description: 'Choose text, image, or audio to hide' },
    { step: 3, title: 'Download Encoded Image', description: 'Get your steganographic image' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center cyber-grid overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container relative z-10 px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary">Secure Data Hiding Technology</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white text-center">
  Hide Your Secrets <br />
  <span className="text-primary">In Plain Sight</span>
</h1>
            
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto text-center">
  Advanced steganography platform to embed text, images, and audio within
  ordinary images. Undetectable, secure, and easy to use.
</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button variant="hero" size="lg" asChild>
                <Link to="/register" className="gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to hide and protect your sensitive data
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-xl glass border border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-card/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple three-step process to hide your data securely
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((item, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 glow-primary">
                    <span className="text-2xl font-display text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Process icons */}
          <div className="flex justify-center items-center gap-4 mt-16">
            <div className="p-4 rounded-xl glass">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="p-4 rounded-xl glass">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="p-4 rounded-xl glass">
              <Download className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-10 md:p-16 border border-primary/20 glow-primary">
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Ready to Hide Your Secrets?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join now and start using advanced steganography to protect your data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/register" className="gap-2">
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>No credit card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-card/50">
        <div className="container px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <a 
              href="mailto:contact@stegacrypt.com" 
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Mail className="w-5 h-5" />
              contact@stegacrypt.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-display gradient-text">StegaCrypt</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StegaCrypt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
