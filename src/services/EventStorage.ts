const EVENT_KEY = "doctor_roster_events"

namespace EventStorage {
    export function setEvents(events: any[]) {
        localStorage.setItem(EVENT_KEY, JSON.stringify(events));
    }
    export function getEvents() {
        const eventsString = localStorage.getItem(EVENT_KEY);
        return eventsString ? JSON.parse(eventsString) : [];
    }
}

export default EventStorage;