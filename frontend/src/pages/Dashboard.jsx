import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {
  Type,
  Image as ImageIcon,
  Music,
  Eye,
  ArrowRight,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const DASHBOARD_CARDS = [
  {
    id: "text",
    title: "Text to Image",
    description: "Hide secret text messages within an image",
    icon: Type,
    href: "/encode/text",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "image",
    title: "Image to Image",
    description: "Conceal an image inside another image",
    icon: ImageIcon,
    href: "/encode/image",
    gradient: "from-teal-500/20 to-green-500/20",
  },
  {
    id: "audio",
    title: "Audio to Image",
    description: "Embed audio files within images",
    icon: Music,
    href: "/encode/audio",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "decode",
    title: "Decode Hidden Data",
    description: "Extract hidden content from encoded images",
    icon: Eye,
    href: "/decode",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

/* -------------------------------------------------------------------------- */
/*                              CARD COMPONENT                                */
/* -------------------------------------------------------------------------- */

const DashboardCard = ({ title, description, icon: Icon, href, gradient }) => {
  return (
    <Link
      to={href}
      aria-label={title}
      className="group relative overflow-hidden rounded-2xl glass border border-border/50 
                 hover:border-primary/50 transition-all duration-300 hover:glow-primary"
    >
      {/* Hover Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} 
                    opacity-0 group-hover:opacity-100 transition-opacity`}
      />

      <div className="relative p-8">
        <div
          className="w-16 h-16 rounded-xl bg-primary/10 flex items-center 
                     justify-center mb-6 text-primary 
                     group-hover:bg-primary/20 transition-colors"
        >
          <Icon className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h2>

        <p className="text-muted-foreground mb-4">{description}</p>

        <div className="inline-flex items-center gap-2 text-primary font-medium">
          Get Started
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

/* -------------------------------------------------------------------------- */
/*                                DASHBOARD                                   */
/* -------------------------------------------------------------------------- */

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-4 pt-24 pb-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-display mb-2">
            Welcome to Your <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Choose an operation to hide or reveal secret data
          </p>
        </header>

        {/* Cards */}
        <section className="grid md:grid-cols-2 gap-6">
          {DASHBOARD_CARDS.map((card) => (
            <DashboardCard key={card.id} {...card} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
