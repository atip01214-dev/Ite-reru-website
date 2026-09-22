import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Curriculum from "@/components/Curriculum";
import Faculty from "@/components/Faculty";
import News from "@/components/News";
import Facilities from "@/components/Facilities";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Curriculum />
        <News />
        <Faculty />
        <Facilities />
      </main>
      <Footer />
    </>
  );
}
