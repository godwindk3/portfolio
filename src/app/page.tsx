import Link from "next/link";
import { portfolio, contactLinks } from "@/content/portfolio";
import { Architecture } from "@/components/architecture";
import { Arrow, SectionLabel } from "@/components/site";

export default function Home() {
  return (
    <main id="main" className="container">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-main">
          <p className="eyebrow direction">
            <span className="status-dot" />
            {portfolio.direction}
          </p>
          <h1 id="hero-heading">
            {portfolio.headline.split("\n")[0]}
            <br />
            <span>{portfolio.headline.split("\n")[1]}</span>
          </h1>
          <p className="hero-description">{portfolio.introduction}</p>
          <div className="hero-actions">
            <a className="button" href="#work">
              Explore my work <Arrow />
            </a>
            {portfolio.contact.github && (
              <a className="text-link" href={portfolio.contact.github}>
                GitHub <Arrow diagonal />
              </a>
            )}
            {portfolio.contact.resume && (
              <a className="text-link" href={portfolio.contact.resume}>
                Resume <span className="file-type">PDF</span> <Arrow diagonal />
              </a>
            )}
          </div>
        </div>
        <aside className="hero-note">
          <span className="eyebrow">A working notebook</span>
          <p>
            Projects, decisions,
            <br />
            and things learned
            <br />
            along the way.
          </p>
          <span className="note-line" />
          <span className="mono">Python / SQL / Systems</span>
        </aside>
      </section>

      <section id="work" className="section work-section">
        <SectionLabel number="01">Selected work</SectionLabel>
        {portfolio.projects.map((project) => (
          <article className="project" key={project.slug}>
            <div className="project-title-row">
              <div>
                <p className="eyebrow">{project.category}</p>
                <h2>
                  <Link href={project.caseStudy}>
                    {project.name}
                    <Arrow diagonal />
                  </Link>
                </h2>
              </div>
              <span className="project-period mono">{project.period}</span>
            </div>
            <div className="project-intro">
              <h3>{project.description}</h3>
              <p>{project.summary}</p>
            </div>
            <Architecture compact />
            <div className="project-bottom">
              <ul className="tags" aria-label="Project technologies">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="project-links">
                <Link className="text-link strong" href={project.caseStudy}>
                  Read the case study <Arrow />
                </Link>
                <a href={project.live}>
                  Live site <Arrow diagonal />
                </a>
                <a href={project.github}>
                  Source <Arrow diagonal />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section id="focus" className="section">
        <SectionLabel number="02">Current focus</SectionLabel>
        <div className="focus-grid">
          {portfolio.currentFocus.map((item) => (
            <article key={item.number}>
              <span className="focus-number mono">/{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section split-section">
        <SectionLabel number="03">Technical areas</SectionLabel>
        <div>
          <p className="section-lede">
            Tools and concepts demonstrated in JobLake.
          </p>
          <div className="skills-grid">
            {portfolio.skills.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
          <div className="learning-row">
            <span className="eyebrow">Currently developing</span>
            <p>{portfolio.learning.join(" · ")}</p>
          </div>
        </div>
      </section>

      <section id="experience" className="section split-section">
        <SectionLabel number="04">Experience</SectionLabel>
        <div>
          {portfolio.experience.map((item) => (
            <article
              className="experience"
              key={`${item.company}-${item.role}`}
            >
              <div className="experience-heading">
                <h3>{item.role}</h3>
                <span className="mono">{item.period}</span>
              </div>
              <p className="company">{item.company}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
          <div className="education">
            <span className="eyebrow">Education</span>
            <h3>{portfolio.education.degree}</h3>
            <p>
              {portfolio.education.school}{" "}
              <span>· {portfolio.education.period}</span>
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="section split-section">
        <SectionLabel number="05">A little about me</SectionLabel>
        <div className="about-copy">
          <h2>
            Curious about the parts
            <br />
            beneath the surface.
          </h2>
          <p>{portfolio.about}</p>
          <p>{portfolio.aboutSecond}</p>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div>
          <SectionLabel number="06">Contact</SectionLabel>
          <h2>Let’s compare notes.</h2>
          <p>
            Have a question about a project, or an opportunity to learn and
            contribute?
            <br className="desktop-break" /> I’d be glad to hear from you.
          </p>
          {portfolio.contact.email && (
            <a
              className="email-link"
              href={`mailto:${portfolio.contact.email}`}
            >
              {portfolio.contact.email} <Arrow diagonal />
            </a>
          )}
        </div>
        <div className="contact-links">
          {contactLinks
            .filter((link) => link.label !== "Email")
            .map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
                <Arrow diagonal />
              </a>
            ))}
        </div>
      </section>
    </main>
  );
}
