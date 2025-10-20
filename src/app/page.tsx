import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import BlogSection from "@/components/blog-section";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <BlogSection posts={posts} />
      <Contact />
      <Footer />
    </main>
  );
}
