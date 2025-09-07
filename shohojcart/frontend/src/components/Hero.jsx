import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Users2, Zap } from "lucide-react";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="container flex flex-col items-center justify-center text-center py-24 md:py-32">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Connect. Collaborate.{" "}
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Create.
          </span>
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Find your perfect coding buddy, collaborate on projects, and grow together in a vibrant community of developers and designers.
        </p>
      </div>

      {/* Centering Buttons */}
      <div className="flex flex-col items-center justify-center gap-4 mt-6 sm:flex-row">
        <Button
          size="lg"
          className="gap-2"
          onClick={() => navigate("/find_buddy")}
        >
          <Users2 className="h-4 w-4" /> Find Buddies
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="gap-2"
          onClick={() => navigate("/show_case")}
        >
          <Zap className="h-4 w-4" /> Explore Projects
        </Button>
      </div>
    </section>
  );
}

export default Hero;
