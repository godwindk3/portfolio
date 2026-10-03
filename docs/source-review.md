# JobLake content evidence

Reviewed 24 September 2026. Both local source checkouts were clean when reviewed.

- Pipeline revision: `90927928429a57ece5723d8b103ba2ac8b7095fb`
- Frontend revision: `638a8e095fe6cabb8ea92d09a6c5d6e1399cf90f`
- Personal experience and education: supplied FlowCV résumé dated 23 September 2026.
- Public contact links: existing JobLake `contact-details.tsx`, consistent with the supplied résumé.

## Evidence map

| Claim                                               | Pipeline or frontend implementation                                              |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| Nine configured sources with adapters/parsers       | `configs/`, `src/joblake/sources/`, `src/joblake/parsing/parsers/`               |
| PostgreSQL crawl state                              | Current YAML `state.provider`, `postgres_state.py`, migrations 0002–0005         |
| Raw HTML, integrity, interrupted-upload recovery    | `storage.py`, `pipeline.py`, `validation.py`, `block_detection.py`               |
| Separate restartable parse phase                    | `main.py`, `pipeline.py`, `parsing/service.py`                                   |
| Shared normalized model and raw fields              | `parsing/models.py`, `parsing/common.py`, `parsing/locations.py`                 |
| Version identity and current-result constraint      | `migrations/versions/0001_parsed_jobs.py`, `postgres.py`                         |
| Coverage-gated listing lifecycle                    | `cdc.py`, `discovery.py`, `tests/test_cdc.py`                                    |
| Local authoritative state, compact serving snapshot | `supabase_sync.py`                                                               |
| Transactional staging, reconciliation, verification | `supabase_sync.py`: stage_snapshot, reconcile, verify_staged, sync               |
| PostgreSQL FTS and final-token prefix rules         | `sql/serving_search_v1.sql`, `sql/serving_search_prefix.sql`                     |
| Manual source DAGs; three-slot shared pool          | `orchestration/airflow/dags/`, `orchestration/airflow/compose.yaml`              |
| Failure watcher                                     | Source DAG `all_done` phase dependencies and `one_failed` watcher                |
| Conservative cleanup and deletion journal           | `raw_cleanup.py`, migration 0005, `docs/operations/raw-cleanup.md`               |
| Next.js read-only database serving                  | Frontend `src/lib/db.ts`, `jobs.ts`, `scripts/setup-web-reader.sql`              |
| Boundaries on reads, deadline, selected retry       | Frontend `src/lib/read-executor.ts`, corresponding tests                         |
| Per-instance hard TTL cache                         | Frontend `src/lib/ttl-cache.ts`, `jobs.ts`, `statistics-data.ts`                 |
| Search/filter/detail/statistics UI                  | Frontend `src/app/`, `src/components/`, `src/lib/query.ts`                       |
| Deployment layout                                   | Pipeline Docker/Compose files; frontend README, Next config and live application |

## Avoid stale descriptions

Some pipeline architecture documents still refer to SQLite, four source DAGs, or a one-slot pool. Those statements are superseded by current source configuration, DAG files, and the Compose initialization command. SQLite remains a legacy backend; it is not the active configuration described by the portfolio.

## Boundaries in the published copy

- No user counts, throughput, uptime, cost savings, or performance improvements are claimed.
- Source support does not guarantee continuous live availability.
- URL lifecycle tracking is listing-presence comparison, not database-log CDC or confirmed HTTP deletion.
- Raw salary and experience strings are not described as fully standardized values.
- No cross-source deduplication, semantic search, or real-time synchronization is claimed.
- The Problems and Lessons sections explain implementation-backed failure modes and takeaways without fabricating incidents, dates, or measured outcomes.
- Proposed improvements are explicitly labeled as future work.
- The website displays no standalone phone number or home address. The résumé is the original user-supplied public document, which contains its original contact details.

Only source and configuration were inspected for this content review. The portfolio build does not execute crawlers, query JobLake databases, run migrations, or modify either source repository.


## Enrichment and privacy update — 27 September 2026

Reviewed local joblake HEAD 5808348 plus uncommitted enrichment/search-v2 changes, and deployed web d50c284. Existing source links stay pinned to the original revision; no new links claim unpublished files exist there.

- Extraction fields, enums, numeric bounds and verbatim evidence checks: src/joblake/enrichment/schema.py. Evidence validation is not proof of semantic correctness.
- Content identity, persistent queue, attempts and provider budgets: enrichment/service.py, store.py, sql/enrichment.sql and docs/operations/enrichment.md.
- Independent manual DAG: orchestration/airflow/dags/joblake_enrichment.py. No historical backfill or full coverage claimed.
- Serving projection and filters: enrichment/serving.py, supabase_sync.py, sql/serving_search_v2.sql; web docs/FILTERS_CONTRACT.md and src/lib/jobs.ts.
- Removed Zalo from shared contact data and all generated contact links at the user's request. The supplied resume PDF is unchanged.


## Search, insights and enrichment review — 3 October 2026

- Reviewed clean pipeline HEAD d6cdce7fe0a8e163c94262bab672efdd145b6326 and web HEAD 1cce2d1bbea31cbc320e1e63e51c5ee1c3537356 before the contact edit. Older source URLs remain pinned to 9092792; the page separately identifies the current reviewed local revision. No claim that newer pipeline code is available at the old public links.
- Skill normalization: pipeline src/joblake/skills/__init__.py and catalogue.json; web src/lib/skill-catalogue.json, skills.ts, query.ts and jobs.ts. 221 entries, at most ten selected keys, ANY/ALL, required or required+preferred. Search uses serving.search_jobs_v3.
- Filtered statistics: src/lib/statistics.ts, insights.ts, insight-query.ts and statistics UI; serving.job_statistics_v1 receives the same filters. Coverage, unknown values, denominator and drilldown are implemented. Statistics cache is five minutes per instance.
- Historical enrichment: pipeline enrichment/backfill.py and joblake_enrichment_backfill DAG implement date/source/ID selection, read-only preview, job/API limits and shared queue budgets. Backfill availability is not proof that historical data has all been processed.
- Grouped model calls: enrichment/service.py and schema.py support up to three Gemini jobs and per-member validation/results. configs/enrichment.yaml still sets batch_size: 1. No token savings, throughput or quality improvement claimed.
- Access protection: TLS and bounded reads verified in web source. Firewall configuration is described as the deployment record from 2 October (web docs/SKILLS_INSIGHTS.md), not a fresh control-plane verification.
- Refreshed home project summary, case-study metadata, technical narrative, architecture caption and next steps. Kept the screenshot labeled with its original capture date; resume and personal career history are unchanged.
- Portfolio public URL supplied by the user: https://buinguyenphong.vercel.app/.

Validation for this edit: Node 24.19 production build and typecheck passed. No lint or test script is defined in this repo. Browser QA used the built app on localhost:3121: home → case study → back, light/dark, desktop and 360px mobile, no horizontal overflow and no console errors/warnings in the checked tabs. The original screenshot remains explicitly dated; no database or model calls were run by the portfolio. Changes are local, not committed/pushed/deployed. Next: publish this repo separately alongside the JobLake contact update, then confirm both public domains.
