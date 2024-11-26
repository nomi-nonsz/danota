import { FeaturedList } from "@/components/single/featured-list";
import { Footer } from "@/components/single/footer";
import Hero from "@/components/single/hero";
import { SimpleNav } from "@/components/ui/navigation";

export default function Home() {
  return (
    <main className="bg-background">
      <div className="md:fixed top-0 le">
        <SimpleNav />
      </div>
      <div className="text-center md:my-4">An app by Nomi Nonsense</div>
      <Hero />
      <FeaturedList />
      <Footer />
    </main>
  );
}
