import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Type, Image, Music, Eye, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const cards = [
    {
      title: 'Text to Image',
      description: 'Hide secret text messages within an image',
      icon: <Type className="w-8 h-8" />,
      href: '/encode/text',
      gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      title: 'Image to Image',
      description: 'Conceal an image inside another image',
      icon: <Image className="w-8 h-8" />,
      href: '/encode/image',
      gradient: 'from-teal-500/20 to-green-500/20',
    },
    {
      title: 'Audio to Image',
      description: 'Embed audio files within images',
      icon: <Music className="w-8 h-8" />,
      href: '/encode/audio',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Decode Hidden Data',
      description: 'Extract hidden content from encoded images',
      icon: <Eye className="w-8 h-8" />,
      href: '/decode',
      gradient: 'from-orange-500/20 to-red-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-4 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-display mb-2">
            Welcome to Your <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Choose an operation to hide or reveal secret data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.href}
              className="group relative overflow-hidden rounded-2xl glass border border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative p-8">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary/20 transition-colors">
                  {card.icon}
                </div>

                <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {card.description}
                </p>

                <div className="inline-flex items-center gap-2 text-primary font-medium">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
