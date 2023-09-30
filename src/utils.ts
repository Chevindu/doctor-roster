export const getFormattedDateTime = (value?: string | Date): string => {
    if (!value) {
        return ''
    } else if (typeof value === "string") {
        return getFormattedDateTime(new Date(value));
    } else {
        return value.toLocaleDateString('en-CA') + ' ' + value.toLocaleDateString('en-CA', { weekday: 'short' }) + ' ' + value.toLocaleTimeString('en-CA');
    }
}

export const removeDuplicates = (array: any[]) => array.filter((value, index, array) => array.findIndex(v2 => (v2.id === value.id)) === index)
