export type TeamMemberType = {
    id: string
    title: string
    color?: string
    description?: string
}

export type CalendarSourceEvent = {
    id: string
    title: string
    borderColor?: string
    backgroundColor?: string
    start?: string | Date
    end?: string | Date
    custom?: string
    allDay: boolean
}