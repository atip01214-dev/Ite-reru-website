import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Curriculum from "@/components/Curriculum";
import Faculty from "@/components/Faculty";
import News from "@/components/News";
import Facilities from "@/components/Facilities";
import Footer from "@/components/Footer";

export const revalidate = 60; // ISR: revalidate page every 60 seconds

export default async function Home() {
  // Fetch all data in parallel at build/request time
  const [hero, stats, about, programs, courses, otherPrograms, careers, news, faculty, dean, facilities, contact, partners, navLinks] =
    await Promise.all([
      api.getHero(),
      api.getStats(),
      api.getAbout(),
      api.getPrograms(),
      api.getCourses(),
      api.getOtherPrograms(),
      api.getCareers(),
      api.getNews(),
      api.getFaculty(),
      api.getDean(),
      api.getFacilities(),
      api.getContact(),
      api.getPartners(),
      api.getNavLinks(),
    ]);

  return (
    <>
      <Navbar navLinks={navLinks} />
      <main className="flex-1">
        <Hero data={hero} />
        <About stats={stats} about={about} />
        <Curriculum
          programs={programs}
          courses={courses}
          otherPrograms={otherPrograms}
          careers={careers}
        />
        <News initialNews={news} />
        <Faculty members={faculty} dean={dean} />
        <Facilities items={facilities} />
      </main>
      <Footer navLinks={navLinks} contact={contact} partners={partners} />
    </>
  );
}
