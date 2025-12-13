
Backend: 
it should be a liberal, schema-light, CQRS-ES backend that can accept any life data, preserve history, and let the frontend decide how to interpret and visualize it, like grafana + prometheus, but for life-logging.

The backend records facts.
The frontend assigns meaning.

Backend does not deeply understand “steps”, “sleep”, “mood”

Backend guarantees:
- ownership
- ordering
- history
- traceability

Frontend:
- groups
- interprets
- visualizes

---

- events are facts (this data was recorded at time t)
- commands express intent (sync this dataset, record a diary entry)
- aggregates protect invariants (ownership, duplication, consistency)
- read models optimize reflection (show me my life at day x)

## bounded contexts

1. Ownership Context
2. Data Ingestion Context
3. Manual Life Logging Context
4. Timeline Context (Read Models)

