
collector service

health connect collector plugin
what data do u want to collect?
- sleep
- steps
- xy
then ask the permission for all
then collect it in a service once per hour or when manually prompted

i want it to be maximally robust

serverless - fission on kubernetes locally hosted

---

frontend generates events (how)
gets written into the event queue (NATS-jetstream)
lambda functions get triggered by the event in the event queue
- write to event store
- update projections in read store


