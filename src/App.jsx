import Navbar from './components/Navbar'
import WelcomeSplash from './components/WelcomeSplash'
import Hero from './components/Hero'
import About from './components/About'
import WhyCyberSecurity from './components/WhyCyberSecurity'
import OffensiveSecurity from './components/OffensiveSecurity'
import AIEngineering from './components/AIEngineering'
import DreamUniversity from './components/DreamUniversity'
import CareerRoadmap from './components/CareerRoadmap'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import MediaCoverage from './components/MediaCoverage'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-abyss text-ice antialiased">
      <WelcomeSplash />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyCyberSecurity />
        <OffensiveSecurity />
        <AIEngineering />
        <DreamUniversity />
        <CareerRoadmap />
        <Experience />
        <Certificates />
        <MediaCoverage />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
