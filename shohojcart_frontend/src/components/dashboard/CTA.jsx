import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from "./Button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <section className="border-t bg-muted/50">
      <div className="container py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Ready to find your coding buddy?
          </h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            Join thousands of developers and designers who are already collaborating and growing together.
          </p>
          <Button size="lg" className="mt-4 gap-2" onClick={handleGetStarted}>
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
