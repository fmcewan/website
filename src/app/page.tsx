import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection' 
import SkillsSection from '@/components/SkillsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>  
  )
}
