import React from "react";
import { Github, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <p className="text-sm leading-loose text-center text-muted-foreground md:text-left">
          Built with love for developers and designers.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Github className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
