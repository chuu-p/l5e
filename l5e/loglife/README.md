# loglife

Loglife is an application that collects and displays a diverse set of life data points like steps per day, sleep score, number of github commits, and manual data like diary entries and mood tracking.

## features

- Health Data gets synced from health connect api from the phone of the user automatically with a android foreground service

- Users can view their data via web browser and android app

## user stories

as a mobile user, i want my steps and sleep data to sync automatically from health connect in the background so that i have a complete record without opening the app daily.

## arch

https://ui.aceternity.com/components

https://blocks.tremor.so/

architecture pattern:
- event sourcing
- I want to use pocketbase for auth and database
- Will be deployed on a HA K3S Cluster on 3 rpis running nixos

## data model

- health
    - sleep (detailed, per day)
    - steps
- digital wellbeing
    - number of unlocks
    - number of notifications
    - screen time 
        - aggregate
        - per day per app
- dev
    - github commits (detailed, per day)
- manual data entry
    - diary
    - mood tracking

