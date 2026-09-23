import * as React from "react"
import "./ProjectCard.css"

// A project with title === null renders as the "coming soon" placeholder card.
export default function ProjectCard({ project }) {
  if (!project) {
    return (
      <article className="avn-project-card avn-project-card-empty avn-card avn-scroll-reveal">
        <div className="avn-project-empty-icon" aria-hidden="true">
          ✦
        </div>
        <p>Project Coming Soon</p>
      </article>
    )
  }

  const { title, category, coverImage, description, videoLink, externalLink, featured } = project

  return (
    <article className="avn-project-card avn-card avn-scroll-reveal">
      <div className="avn-project-cover" style={coverImage ? { backgroundImage: `url(${coverImage})` } : undefined}>
        {featured && <span className="avn-project-featured-badge">Featured</span>}
      </div>
      <div className="avn-project-body">
        <span className="avn-project-category">{category}</span>
        <h3 className="avn-project-title">{title}</h3>
        {description && <p className="avn-project-desc">{description}</p>}
        {(videoLink || externalLink) && (
          <div className="avn-project-links">
            {videoLink && (
              <a href={videoLink} target="_blank" rel="noreferrer">
                Watch ↗
              </a>
            )}
            {externalLink && (
              <a href={externalLink} target="_blank" rel="noreferrer">
                Visit ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
