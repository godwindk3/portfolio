export const joblake = {
  title: "JobLake",
  subtitle: "Following a job posting from raw HTML to a searchable record.",
  description:
    "A personal engineering project spanning two repositories: a Python ingestion pipeline and a Next.js website. It brings together source-specific crawling, recoverable processing, relational storage, and a small, read-only search experience.",
  reviewed: "24 September 2026",
  sourceCommit: "90927928429a57ece5723d8b103ba2ac8b7095fb",
  webCommit: "638a8e095fe6cabb8ea92d09a6c5d6e1399cf90f",
  sources: [
    "ITviec",
    "TopCV",
    "TopDev",
    "VietnamWorks",
    "Devwork",
    "CareerViet",
    "Vieclam24h",
    "CareerLink",
    "JobsGO",
  ],
  navigation: [
    ["overview", "Overview"],
    ["architecture", "Architecture & data flow"],
    ["ingestion", "Ingestion & raw data"],
    ["parsing", "Parsing & database"],
    ["serving", "Search & serving"],
    ["reliability", "Orchestration & reliability"],
    ["decisions", "Engineering decisions"],
    ["problems", "Problems encountered"],
    ["learning", "What I learned"],
    ["next", "What comes next"],
    ["evidence", "Inspect the implementation"],
  ],
  decisions: [
    {
      title: "Keep raw data separate from parser output",
      problem:
        "Source HTML changes, and a parser fix should not always require another crawl.",
      constraint:
        "Fetching a page can involve browser automation, delays, and transient failures.",
      decision:
        "Keep detail HTML in MinIO; record its locator and hash in PostgreSQL. Parse from stored objects with versioned parsers.",
      tradeoff:
        "Storage retention and consistency between objects and database state need explicit handling.",
      result:
        "A new parser version can process retained raw HTML again. Purged HTML must be fetched again.",
    },
    {
      title: "Publish a compact serving copy",
      problem:
        "The public website needs current listings, not crawler state or every parse attempt.",
      constraint:
        "The local pipeline remains authoritative, while the web application runs on Vercel.",
      decision:
        "Reconcile active listings into a separate Supabase serving schema, then read it with a restricted database role.",
      tradeoff:
        "Two databases introduce synchronization work and a freshness gap. Updates are not streamed in real time.",
      result:
        "The website reads a smaller data model; raw objects and processing history stay with the pipeline.",
    },
    {
      title: "Require complete discovery before expiring a listing",
      problem:
        "A missing URL can mean an incomplete crawl rather than a removed job.",
      constraint:
        "Pagination can fail, repeat pages, or stop early; configured search scopes can change.",
      decision:
        "Track coverage and a scope hash. Apply lifecycle changes only after a complete qualifying scan; changed scopes establish a new baseline.",
      tradeoff:
        "A failed or incomplete scan leaves previous lifecycle information in place, so stale records can remain.",
      result:
        "Partial scans do not incorrectly expire listings. This tracks listing presence, not verified HTTP deletion.",
    },
    {
      title: "Use PostgreSQL to serve search",
      problem:
        "Visitors need keyword search across normalized job data and predictable source/location filters.",
      constraint:
        "A separate search service would add another deployment and synchronization boundary.",
      decision:
        "Use PostgreSQL full-text search, GIN indexes, normalized text, and final-token prefix matching.",
      tradeoff:
        "Search follows PostgreSQL tokenization rules; it is not fuzzy matching or semantic search.",
      result:
        "The Next.js application queries one serving database for search, details, filters, and aggregate statistics.",
    },
  ],
  problems: [
    {
      title: "An interrupted upload is an ambiguous success",
      text: "MinIO may accept an object before the process commits raw_ready in PostgreSQL. The pipeline records the expected key, byte length, and SHA-256 before upload, then inspects unfinished uploads on the next run. This makes recovery a state transition that can be checked, rather than a blind retry.",
      path: "src/joblake/pipeline.py",
    },
    {
      title: "A successful final task can hide an earlier failure",
      text: "The source DAGs allow later phases to process available work with all_done. A watcher task uses one_failed so a successful parse does not make a failed ingestion run look healthy. The DAG status and individual phase results need to tell the same story.",
      path: "orchestration/airflow/dags/joblake_topdev.py",
    },
    {
      title: "Missing parser output is not evidence of expiry",
      text: "A listing can still be active even when a fresh parse is unavailable. Serving reconciliation retains the last good content for active listings and refreshes last_seen_at. Removal follows authoritative lifecycle state, rather than the absence of newly parsed content.",
      path: "src/joblake/supabase_sync.py",
    },
    {
      title: "A slow database read is more than SQL execution time",
      text: "The web application accounts for queueing, connection setup, and the query within one deadline. It bounds in-flight reads, permits one retry for selected transient failures, and resets the client when the deadline expires. Logs distinguish operations and sanitized error codes; they do not establish the root cause of every slow query.",
      path: null,
    },
  ],
  lessons: [
    {
      title: "Make progress explicit.",
      text: "Fetched, uploaded, parsed, and published are different states. Recording those boundaries makes it possible to decide what is safe to retry.",
    },
    {
      title: "Preserve the evidence behind a record.",
      text: "Raw-object references, hashes, parser versions, and validation issues make a normalized row explainable. A row alone cannot show how it was produced.",
    },
    {
      title: "Define what absence actually means.",
      text: "An incomplete scan, a rejected parse, and an expired listing need different treatment. Combining them into one failure flag loses information.",
    },
    {
      title: "Treat the user-facing read path as part of the pipeline.",
      text: "Data is only useful if it can be read predictably. Database permissions, query behavior, caching, and honest error states matter alongside ingestion.",
    },
  ],
  next: [
    {
      title: "Measure freshness end to end",
      text: "Surface the last successful crawl, parse, and serving sync together. A healthy task alone does not prove that the website has fresh data.",
    },
    {
      title: "Expand failure and recovery exercises",
      text: "Add repeatable scenarios for interrupted uploads, stale parse claims, failed reconciliation, and restoring local state and raw storage together.",
    },
    {
      title: "Make operations easier to repeat",
      text: "Document a deliberate ingestion and sync cadence, recovery procedures, and source-change checks before depending on unattended scheduling.",
    },
    {
      title: "Evaluate matching across sources",
      text: "The same role may appear on different websites. Explore cross-source duplicate detection with a labeled sample before merging records or changing statistics.",
    },
  ],
};

export function sourceUrl(path: string) {
  return `https://github.com/godwindk3/joblake/blob/${joblake.sourceCommit}/${path}`;
}
