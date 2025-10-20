"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com", label: "GitHub" },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:your.email@example.com",
      label: "Email",
    },
  ];

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-accent hover:bg-accent/80 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-foreground/60 flex items-center gap-2">
              © {currentYear} Built with{" "}
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                <Heart size={16} className="text-red-500 fill-red-500" />
              </motion.span>
              by Your Name
            </p>
          </div>

          {/* Tech Stack */}
          <p className="text-xs text-foreground/40">
            Built with Next.js, TypeScript, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}

