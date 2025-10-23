import { Navigation, Hero, About, Projects, Contact, Footer } from "@/components/layout";
import { BlogSection } from "@/components/blog";
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
