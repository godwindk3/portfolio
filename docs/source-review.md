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
