import React from "react";
import { Users, Code2, MessageSquare, Rocket, Trophy, Calendar, Layout, Shield } from "lucide-react";

const features = [
  { title: "Find Teammates", description: "AI-powered matching", Icon: Users },
  { title: "Collaboration Hub", description: "Manage projects", Icon: Code2 },
  { title: "Help Forum", description: "Discuss and learn", Icon: MessageSquare },
  { title: "MicroProjects", description: "Quick bids and chat", Icon: Rocket },
  { title: "Gamification", description: "Earn badges", Icon: Trophy },
  { title: "Events", description: "Create meetups", Icon: Calendar },
  { title: "Dashboard", description: "Personalized feeds", Icon: Layout },
  { title: "Security", description: "Safe community", Icon: Shield },
];

function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-24">
      <h2 className="text-3xl font-bold text-center">Powerful Features</h2>
      <div className="grid gap-8 py-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {features.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="border p-6 rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <Icon className="h-10 w-10 text-primary mb-3" />
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
