# Event broker

The event borker is a service that manages the import and update of events.

It is designed to be triggered by a cron job. The event broker optimizes the import and update intervals.

It fetches the calendar data from the [calendar-api](https://github.com/schafe-vorm-fenster/calendar-api) and pushes the events to the [events-api](https://github.com/schafe-vorm-fenster/events-api).

## Tech stack

The event broker is implemented as a next js api service.

- Nextjs 14 with typescript
- ts-rest, ts-rest/open-api
- Axios
- Mongoose
- Supertest, cucumber, jest
- Vercel cron jobs
