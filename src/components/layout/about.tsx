"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Rocket, Zap } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      icon: <Code2 size={32} />,
      title: "Full-Stack Development",
      description:
        "Experienced in building scalable web applications using modern frameworks and best practices.",
    },
    {
      icon: <Palette size={32} />,
      title: "UI/UX Design",
      description:
        "Creating beautiful, intuitive interfaces that provide exceptional user experiences.",
    },
    {
      icon: <Rocket size={32} />,
      title: "Performance Optimization",
      description:
        "Ensuring fast load times and smooth interactions through optimization techniques.",
    },
    {
      icon: <Zap size={32} />,
      title: "Modern Technologies",
      description:
        "Always learning and implementing the latest tools and technologies in web development.",
    },
  ];

  const technologies = [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Git",
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/20">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            I'm passionate about creating digital experiences that make a difference
          </p>
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Get to know me</h3>
            <p className="text-foreground/70 leading-relaxed">
              I'm a passionate Full-Stack Developer with a love for creating
              innovative web solutions. With several years of experience, I've
              worked on diverse projects ranging from e-commerce platforms to
              complex web applications.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              My journey in web development started with a curiosity about how
              websites work, and it has evolved into a career where I get to
              solve problems and build products that impact people's lives.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing my knowledge
              through blog posts and tutorials.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Technologies I work with</h3>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  className="px-4 py-2 bg-accent rounded-lg text-sm font-medium hover:bg-accent/80 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-background rounded-xl border border-border hover:border-blue-500/50 transition-all"
            >
              <div className="text-blue-600 mb-4">{skill.icon}</div>
              <h3 className="text-lg font-bold mb-2">{skill.title}</h3>
              <p className="text-sm text-foreground/60">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

