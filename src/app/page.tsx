import { Navigation, Hero, About, Projects, Contact, Footer } from "@/components/layout";
import { BlogSection } from "@/components/blog";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getAllPosts();

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
