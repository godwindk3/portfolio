import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Architecture } from "@/components/architecture";
import { Arrow, SectionLabel } from "@/components/site";
import { portfolio } from "@/content/portfolio";
import { joblake, sourceUrl } from "@/content/joblake";

export const metadata: Metadata = {
  title: "JobLake — Engineering Case Study",
  description:
    "How JobLake collects, validates, stores, and serves job listings: raw HTML in MinIO, PostgreSQL state, Airflow orchestration, and a Next.js search website.",
  openGraph: {
    title: "JobLake — Engineering Case Study",
    description:
      "From raw HTML to searchable records. Architecture, failure handling, trade-offs, and lessons from a personal data engineering project.",
  },
};

function Evidence({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  return (
    <a className="source-reference" href={sourceUrl(path)}>
      {children} <Arrow diagonal />
    </a>
  );
}
function StudySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="case-section">
      <SectionLabel number={number}>Engineering notes</SectionLabel>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function JobLakeCaseStudy() {
  const project = portfolio.projects[0];
  return (
    <main id="main" className="container">
      <div className="case-hero">
        <Link className="back-link" href="/#work">
          ← Back to selected work
        </Link>
        <p className="eyebrow">Personal project / Engineering case study</p>
        <h1>{joblake.title}</h1>
        <p className="case-subtitle">{joblake.subtitle}</p>
        <p className="case-description">{joblake.description}</p>
        <dl className="case-meta">
          <div>
            <dt>Role</dt>
            <dd>Personal project · Pipeline & web</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>June 2026 — Present</dd>
          </div>
          <div>
            <dt>Primary tools</dt>
            <dd>Python · SQL · PostgreSQL · Next.js</dd>
          </div>
        </dl>
        <div className="case-actions">
          <a className="button" href={project.live}>
            Explore JobLake <Arrow diagonal />
          </a>
          <a className="text-link" href={project.github}>
            Pipeline source <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="case-layout">
        <aside className="case-toc">
          <span className="eyebrow">On this page</span>
          <nav aria-label="Case study sections">
            {joblake.navigation.map(([id, title]) => (
              <a href={`#${id}`} key={id}>
                {title}
              </a>
            ))}
          </nav>
        </aside>
        <div>
          <StudySection
            id="overview"
            number="01"
            title="One system, two repositories."
          >
            <p>
              Job listings are spread across websites with different page
              structures, fields, and ways of navigating results. JobLake
              collects those pages, keeps the raw input, and transforms it into
              records that a small search application can serve.
            </p>
            <h3>Why build it?</h3>
            <p>
              The project is a practical way to work through an entire data
              lifecycle: discovery, collection, validation, storage, and
              retrieval. The interesting part is connecting these steps while
              keeping enough state to understand failures and resume work.
            </p>
            <div className="note">
              <strong>Scope:</strong> a personal learning project with a live
              website. The architecture demonstrates implemented behavior; it is
              not a claim of large-scale production operation.
            </div>
            <figure className="screenshot">
              <a href={project.live} aria-label="Open the live JobLake website">
                <Image
                  src="/joblake.webp"
                  alt="The live JobLake website with keyword search, source and city filters, and job listings"
                  width={1280}
                  height={900}
                  sizes="(max-width: 640px) 100vw, 800px"
                />
              </a>
              <figcaption>
                Actual JobLake interface, captured on 24 September 2026.
                Listings change over time.
              </figcaption>
            </figure>
          </StudySection>

          <StudySection
            id="architecture"
            number="02"
            title="A clear boundary between collection and serving."
          >
            <p>
              The pipeline runs with local PostgreSQL and MinIO. PostgreSQL is
              authoritative for crawl state and normalized records. A separate
              synchronization operation publishes a compact active-listing view
              to Supabase PostgreSQL; the Next.js website reads that view on
              Vercel.
            </p>
            <Architecture />
            <h3>The data flow</h3>
            <ol>
              <li>
                <strong>Discover:</strong> source adapters traverse listing
                pages and register canonical URLs in PostgreSQL crawl state.
              </li>
              <li>
                <strong>Fetch:</strong> pending detail URLs are fetched and
                validated before their HTML is accepted into MinIO.
              </li>
              <li>
                <strong>Parse:</strong> parsers read retained objects, verify
                their integrity, extract fields, and record validation issues.
              </li>
              <li>
                <strong>Persist:</strong> accepted or partial results are saved
                with parser identity and raw-data provenance in local
                PostgreSQL.
              </li>
              <li>
                <strong>Publish:</strong> manual reconciliation stages a
                consistent local snapshot and updates the remote serving tables
                transactionally.
              </li>
              <li>
                <strong>Serve:</strong> Next.js Server Components query the
                serving database for search, details, filters, and statistics.
              </li>
            </ol>
            <Evidence path="src/joblake/pipeline.py">
              Inspect the pipeline
            </Evidence>
          </StudySection>

          <StudySection
            id="ingestion"
            number="03"
            title="Fetch once. Keep something worth parsing."
          >
            <h3>Source-specific ingestion</h3>
            <p>
              The repository contains adapters, parsers, and configuration for{" "}
              {joblake.sources.join(", ")}. These are supported sources, not a
              guarantee that every source is available or current at every
              moment.
            </p>
            <p>
              YAML configuration controls targets, pagination, transport,
              delays, retries, and validation. Fetchers support HTTP requests
              and browser-based collection. Detail work comes from the persisted
              queue, so a detail run does not require discovery to finish in the
              same process.
            </p>
            <h3>Raw data is a separate layer</h3>
            <p>
              Detail HTML is stored in MinIO. The database records the object
              locator, byte length, and SHA-256. Validation checks status,
              content type when present, minimum content size, allowed hosts and
              paths, required selectors, and known block pages. A challenge page
              should not become an apparently successful job record.
            </p>
            <p>
              Current source configurations do not retain discovery-page HTML.
              The CLI’s <code>full</code> phase runs discovery and detail only;
              parsing is an explicit, independently restartable phase.
            </p>
            <Evidence path="configs/topdev.yaml">
              Inspect a source configuration
            </Evidence>
            <br />
            <Evidence path="src/joblake/storage.py">
              Inspect raw storage
            </Evidence>
          </StudySection>

          <StudySection
            id="parsing"
            number="04"
            title="Normalize the useful fields. Preserve the context."
          >
            <p>
              Source parsers extract data from source-specific HTML and
              structured page data. A shared dataclass model carries titles,
              employers, descriptions, requirements, benefits, skills,
              locations, dates, and source payloads. Shared helpers normalize
              text and derive province/city values.
            </p>
            <p>
              Some values intentionally remain raw, including salary and
              experience descriptions. The system does not claim to have a
              universal salary model or resolved employer identities.
            </p>
            <p>
              Parsing verifies object size and SHA-256 before reading the HTML.
              Quality assessment distinguishes accepted, partial, and rejected
              output. Accepted and partial records can be persisted; rejected
              attempts retain their validation issues in crawl state.
            </p>
            <table className="data-table">
              <caption
                className="eyebrow"
                style={{ textAlign: "left", marginBottom: 10 }}
              >
                Storage responsibilities
              </caption>
              <thead>
                <tr>
                  <th scope="col">Layer</th>
                  <th scope="col">What it holds</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MinIO</td>
                  <td>Raw detail HTML used as parser input.</td>
                </tr>
                <tr>
                  <td>
                    <code>crawl_state</code>
                  </td>
                  <td>
                    Runs, discovery coverage, job lifecycle, fetch/parse
                    attempts, and object references.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>ref.sources</code>
                  </td>
                  <td>Stable source identities and display names.</td>
                </tr>
                <tr>
                  <td>
                    <code>core</code>
                  </td>
                  <td>
                    Source postings and versioned parse results, with one
                    current result per posting.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>serving</code> on Supabase
                  </td>
                  <td>
                    A compact active-job copy and search support for the
                    website.
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              A uniqueness constraint on posting, raw hash, parser name, and
              parser version makes repeated writes idempotent. A partial unique
              index enforces one current parse result per posting. Alembic
              tracks local schema changes.
            </p>
            <Evidence path="src/joblake/parsing/service.py">
              Inspect validation and parse handling
            </Evidence>
            <br />
            <Evidence path="migrations/versions/0001_parsed_jobs.py">
              Inspect the persisted data model
            </Evidence>
          </StudySection>

          <StudySection
            id="serving"
            number="05"
            title="A smaller model for a focused website."
          >
            <h3>Reconciliation, not a live stream</h3>
            <p>
              The sync checks source identities and lifecycle baselines, reads a
              repeatable local snapshot, and stages remote rows. It upserts
              current content, retains last good content for still-active
              listings without fresh parsed output, and removes listings whose
              authoritative state is no longer active. Verification runs before
              the transaction commits.
            </p>
            <p>
              Raw HTML, source payloads, parser metadata, and processing history
              are not copied into the serving tables. A dry-run stages data and
              reports changes without applying them.
            </p>
            <h3>Search and the web read path</h3>
            <p>
              PostgreSQL full-text search uses normalized text and GIN indexes.
              Plain queries can match the final token as a prefix from three
              normalized characters; quoted phrases, OR, and exclusions retain
              their web-search semantics. Source and province/city filters
              narrow the result set.
            </p>
            <p>
              The Next.js application uses server-only Postgres.js queries with
              parameters and a read-only role. It renders search, job details,
              and aggregate statistics. Pagination fetches one extra row to
              detect another page instead of presenting an invented total.
            </p>
            <p>
              Bounded in-memory caches have hard expiry and are local to each
              Vercel instance. Expired data is not used as a fallback for
              database errors. The application does not fall back to demo
              listings in production.
            </p>
            <Evidence path="src/joblake/supabase_sync.py">
              Inspect serving reconciliation
            </Evidence>
            <br />
            <Evidence path="src/joblake/sql/serving_search_prefix.sql">
              Inspect search semantics
            </Evidence>
          </StudySection>

          <StudySection
            id="reliability"
            number="06"
            title="Make failures visible and recovery deliberate."
          >
            <h3>Orchestration</h3>
            <p>
              Each source has an Airflow DAG for discovery → detail → parse.
              Source DAGs are manually triggered and start paused. A shared
              three-slot pool limits concurrent work across sources; serving
              sync and raw cleanup reserve all three slots to avoid overlapping
              ingestion. PostgreSQL advisory locks coordinate work for each
              source.
            </p>
            <p>
              Later ingestion phases can process already-available work even
              when an earlier phase fails. A watcher preserves the failed DAG
              result. Task retries and persisted state serve different purposes:
              Airflow retries execution, while the application decides which
              records are safe to resume.
            </p>
            <h3>Retention has a cost</h3>
            <p>
              Raw cleanup defaults to dry-run, checks eligibility against
              lifecycle and parsing state, and protects active, unparsed, or
              in-progress data. It records deletion intent, validates the
              object, and marks intentional removal. Parsed records remain, but
              deleted HTML cannot be reparsed without another fetch.
            </p>
            <h3>Deployment boundaries</h3>
            <p>
              Docker Compose defines local PostgreSQL and MinIO, with a separate
              Airflow stack using LocalExecutor. The web application is deployed
              on Vercel and reads Supabase through a restricted server-side
              connection. The pipeline does not run inside the web deployment.
            </p>
            <div className="note">
              <strong>Current limits:</strong> manual ingestion and sync, source
              markup changes, local service availability, and cache expiry all
              affect freshness. Listings are not deduplicated across source
              websites, and there is no claimed uptime or throughput target.
            </div>
            <Evidence path="orchestration/airflow/compose.yaml">
              Inspect Airflow and pool configuration
            </Evidence>
            <br />
            <Evidence path="src/joblake/raw_cleanup.py">
              Inspect raw retention safeguards
            </Evidence>
          </StudySection>

          <StudySection
            id="decisions"
            number="07"
            title="Decisions, with their trade-offs."
          >
            {joblake.decisions.map((decision) => (
              <article className="decision" key={decision.title}>
                <h3>{decision.title}</h3>
                <dl>
                  <dt>Problem</dt>
                  <dd>{decision.problem}</dd>
                  <dt>Constraint</dt>
                  <dd>{decision.constraint}</dd>
                  <dt>Decision</dt>
                  <dd>{decision.decision}</dd>
                  <dt>Trade-off</dt>
                  <dd>{decision.tradeoff}</dd>
                  <dt>Result</dt>
                  <dd>{decision.result}</dd>
                </dl>
              </article>
            ))}
          </StudySection>

          <StudySection
            id="problems"
            number="08"
            title="Problems encountered along the way."
          >
            <p>
              These are concrete failure modes addressed in the current
              implementation. They matter more to this project than a list of
              technologies.
            </p>
            {joblake.problems.map((problem) => (
              <article key={problem.title}>
                <h3>{problem.title}</h3>
                <p>{problem.text}</p>
                {problem.path && (
                  <Evidence path={problem.path}>
                    Read the implementation
                  </Evidence>
                )}
              </article>
            ))}
          </StudySection>

          <StudySection id="learning" number="09" title="What I learned.">
            {joblake.lessons.map((lesson) => (
              <article key={lesson.title}>
                <h3>{lesson.title}</h3>
                <p>{lesson.text}</p>
              </article>
            ))}
          </StudySection>

          <StudySection
            id="next"
            number="10"
            title="What I would improve next."
          >
            <p>
              These are next steps, not features the project already provides.
            </p>
            {joblake.next.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </StudySection>

          <StudySection id="evidence" number="11" title="Inspect the work.">
            <p>
              This case study was checked against both repositories on{" "}
              {joblake.reviewed}. Older architecture notes sometimes describe
              SQLite state or a smaller Airflow setup; this page follows the
              current code and configuration.
            </p>
            <ul>
              <li>
                <a className="source-reference" href={project.github}>
                  JobLake pipeline — public repository ↗
                </a>
              </li>
              <li>
                <a className="source-reference" href={project.live}>
                  JobLake web — live application ↗
                </a>
              </li>
              <li>
                The frontend repository, <code>joblake-web</code>, is private.
                Its implementation was reviewed for this case study; there is no
                public source link for it.
              </li>
            </ul>
            <p>
              Pipeline revision <code>{joblake.sourceCommit.slice(0, 7)}</code>{" "}
              · Web revision <code>{joblake.webCommit.slice(0, 7)}</code>.
            </p>
            <p>
              The repository includes tests for parsers, state transitions,
              integrity checks, lifecycle tracking, cleanup, and serving
              behavior. Their presence documents tested scenarios; it does not
              establish production scale.
            </p>
          </StudySection>
          <div className="case-end">
            <Link className="text-link" href="/#work">
              ← Back to the portfolio
            </Link>
            <a className="text-link" href={`mailto:${portfolio.contact.email}`}>
              Talk about this project <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
