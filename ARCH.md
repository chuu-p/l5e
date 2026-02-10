
~~~mermaid
sequenceDiagram
    loop L5eService
        Scraper->>Android_Health: get sleepDuration for 2026-02-09
        Scraper->>Store: save sleepDuration for 2026-02-09
    end
    Site->>Store: get sleepDuration for 2026-02-09
~~~


Dashboard

tap to upload daily data
(settigs -> sync every day at)

loglife package exposes .android_health.daily.sleep or sth that can be displayed from frontend

connection is

android health <- loglife scraper 

sequenceDiagram
    Scraper->>Android_Health: get sleepDuration for 2026-02-09
    Scraper->>LogLifeStore: save sleepDuration for 2026-02-09



