const EVENT_KEY = "doctor_roster_events"
const MEMBER_KEY = "doctor_roster_members"

namespace AppStorage {

    function setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function getItem(key: string) {
        const eventsString = localStorage.getItem(key);
        return eventsString ? JSON.parse(eventsString) : null;
    }

    export function setEvents(events: any[]) {
        setItem(EVENT_KEY, events);
    }
    export function getEvents() {
        return getItem(EVENT_KEY) ?? [];
    }

    export function setMembers(members: any[]) {
        setItem(MEMBER_KEY, members);
    }
    export function getMembers() {
        return getItem(MEMBER_KEY) ?? [
            { title: "Dr. Dinesh / Dr. Nirmala", color: "hsl(186, 100%, 33%)", id: "0001", description: "Admin" },
            { title: "Dr. Nadeera", color: "hsl(4, 100%, 58%)", id: "0002", description: "MO in-charge" },
            { title: "Dr. Pradeep", color: "hsl(28, 100%, 53%)", id: "0003" },
            { title: "Dr. Ranindu", color: "hsl(200, 100%, 56%)", id: "0004" },
            { title: "Dr. Geesara", color: "hsl(96, 100%, 37%)", id: "0005" },
            { title: "Dr. Asitha", color: "hsl(315, 100%, 37%)", id: "0006" },
        ];
    }
}

export default AppStorage;