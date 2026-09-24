const stages = [
  {
    title: "Discover & fetch",
    detail: "Source adapters · Python",
    note: "URLs + validated detail HTML",
  },
  {
    title: "Store raw HTML",
    detail: "MinIO",
    note: "Object locator + SHA-256",
  },
  {
    title: "Parse & validate",
    detail: "Versioned parsers",
    note: "Normalized fields + quality issues",
  },
  {
    title: "Persist records",
    detail: "Local PostgreSQL",
    note: "Current results + parse history",
  },
];

export function Architecture({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      className={`architecture ${compact ? "compact" : ""}`}
      aria-label="JobLake data flow from source websites to searchable listings"
    >
      <div className="diagram-heading">
        <span className="eyebrow">The path from source to search</span>
        <span className="diagram-key">
          <i /> Data flow
        </span>
      </div>
      <div className="flow-stages">
        {stages.map((stage, i) => (
          <div className="flow-stage" key={stage.title}>
            <span className="stage-number">0{i + 1}</span>
            <strong>{stage.title}</strong>
            <span>{stage.detail}</span>
            {!compact && <small>{stage.note}</small>}
            {i < stages.length - 1 && (
              <span className="stage-arrow" aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="state-rail">
        <span>PostgreSQL crawl state</span>
        <span>
          URL lifecycle · retries · raw object locators · parse attempts
        </span>
      </div>
      <div className="serving-flow">
        <span>Local PostgreSQL</span>
        <span aria-hidden="true">→</span>
        <span>Manual sync</span>
        <span aria-hidden="true">→</span>
        <span>Supabase serving</span>
        <span aria-hidden="true">→</span>
        <strong>Next.js on Vercel</strong>
      </div>
      <figcaption>
        Airflow orchestrates ingestion phases. A separate sync publishes active
        listings; the website reads the serving database.
      </figcaption>
    </figure>
  );
}
