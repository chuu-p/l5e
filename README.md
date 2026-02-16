qself

the quantified self

# l5e

pronounced else

loglife is an application to aggregate data from users

this data can be movement profiles, phone usage, health data, etc.

it should be a digital diary that writes itself.

## feature delimitation

his application should not aggregate the data itself, but just sync and save it

except manual data entry like manual diary or mood tracking 

except maybe plugins someday....

## architecture

backend: cqrs-es

david would
    - git with text based files -> bc git is cool -> history

frontend: 
- website: vuejs 3 typescript + nextjs-cdn
- android: Trusted Web Activity (TWA)
  - Google Play Store now allows you to list your PWA as a Trusted Web Activity (TWA), which is essentially a specialized WebView.

## adr (architecture decision record)

- why nixos? -> i ♥ nixos  
- why vue? -> i need it in my next job
- why nextjs? -> i need it in my next job
- why not rust? -> i think it is actually better but i dont need it in my next job
- why anything? -> i probably need it in my next job

## data types

- location history
  - like google timeline or david custom app :)
- android health
  - all data types
- manual entry data
  - daily mood tracking
  - diary
- watch histories
  - crunchyroll
  - youtube
  - mpv (with mpv script as plugin that sends usage data to the api)
  - etc. this needs to be extensible by power users
- google calendar

