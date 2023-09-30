import { FC } from 'react';
import { EventContentArg } from '@fullcalendar/core/index.js';
import './EventContent.css'

type EventContentProps = {
    eventInfo?: EventContentArg;
    onRemove?: (id: string) => void;
};

const EventContent: FC<EventContentProps> = ({ eventInfo, onRemove }) => {
    if (!eventInfo) {
        return null;
    }
    return (
        <div className="event-content">
            <b className="time">{eventInfo.timeText}</b>
            <div className="title">{eventInfo.event.title}</div>
            <div className="custom">{eventInfo.event.extendedProps.custom}</div>

            {onRemove && <button className="remove" onClick={() => onRemove(eventInfo.event.id)}>🗙</button>}
        </div>
    )
}

export default EventContent;