import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import SectionHeading from "../components/SectionHeading.jsx"
import ServiceCard from "../components/ServiceCard.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import "./Home.css"

const FEATURED_SERVICES = [
  { name: "YouTube Video Editing", description: "Polished, retention-focused edits for long-form content." },
  { name: "Reel Editing", description: "Fast-paced, scroll-stopping short-form edits." },
  { name: "Thumbnail Design", description: "High-contrast thumbnails designed to earn the click." },
]

export default function Home() {
  const navigate = useNavigate()

  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("avn-in-view")),
      { threshold: 0.15 }
    )
    document.querySelectorAll(".avn-scroll-reveal").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="avn-page">
      <section className="avn-hero avn-container">
        <span className="avn-eyebrow">AI Graphic Designer • Video Editor • Creative Designer</span>
        <h1 className="avn-hero-title">AVNEDIT</h1>
        <p className="avn-hero-intro">
          AVNEDIT creates modern visual content and digital experiences through AI graphic design,
          thumbnail design, video editing, scripts and custom websites.
        </p>
        <div className="avn-hero-ctas">
          <button className="avn-btn avn-btn-primary" onClick={() => navigate("/projects")}>
            View My Work
          </button>
          <button className="avn-btn avn-btn-secondary" onClick={() => navigate("/plans")}>
            Explore Plans
          </button>
        </div>
      </section>

      <section className="avn-container" style={{ marginTop: 72 }}>
        <SectionHeading eyebrow="Featured Work" title="Selected Projects" subtitle="A preview of the kind of work AVNEDIT does." />
        <div className="avn-home-projects-grid">
          <ProjectCard project={null} />
          <ProjectCard project={null} />
          <ProjectCard project={null} />
        </div>
      </section>

      <section className="avn-container" style={{ marginTop: 80 }}>
        <SectionHeading eyebrow="What AVNEDIT Does" title="Services" />
        <div className="avn-home-services-grid">
          {FEATURED_SERVICES.map((s) => (
            <ServiceCard key={s.name} name={s.name} description={s.description} onClick={() => navigate("/services")} />
          ))}
        </div>
        <div className="avn-home-services-cta">
          <Link to="/services" className="avn-btn avn-btn-ghost">
            See All Services →
          </Link>
        </div>
      </section>

      <section className="avn-container avn-home-cta-band avn-card" style={{ marginTop: 88 }}>
        <h2>Have a project in mind?</h2>
        <p>Pick a plan that fits your project and tell AVNEDIT what you need.</p>
        <button className="avn-btn avn-btn-primary" onClick={() => navigate("/plans")}>
          Explore Plans
        </button>
      </section>
    </div>
  )
}
