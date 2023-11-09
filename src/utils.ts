import { CalendarSourceEvent } from "./interfaces";

const getShift = (hour: number) => {
    if (hour < 13) {        // Starting before noon
        return "M";
    } else if (hour < 19) { // Starting before 6PM
        return "E";
    } else {
        return "N";
    }
}

export const getFormattedDateTime = (value?: string | Date): string => {
    if (!value) {
        return ''
    } else if (typeof value === "string") {
        return getFormattedDateTime(new Date(value));
    } else {
        const shift = getShift(value.getHours());
        return value.toLocaleString('en-us', { month: 'short', day: 'numeric' }) + ' (' + value.toLocaleDateString('en-CA', { weekday: 'short' }) + ') ' + shift;
    }
}

export const removeDuplicates = (array: CalendarSourceEvent[]) => array.filter((value, index, array) => array.findIndex(v2 => (v2.id === value.id)) === index)
