import { FC } from "react"
import { TeamMemberType } from "../../interfaces"
import "./TeamMember.css"

type TeamMemberProps = {
    hours: number
    event: TeamMemberType
    onRemove: (event: TeamMemberType) => void
}

const TeamMember: FC<TeamMemberProps> = ({ event, hours, onRemove }) => {
    return <div
        className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event team-member-event"
        title={event.title}
        data-id={event.id}
        data-color={event.color}
        data-description={event.description}
        data-hours={hours}
        style={{
            backgroundColor: event.color,
            borderColor: event.color,
        }}
    >
        <div className="fc-event-main">
            <div className="title">{event.title}</div>
            <div className="description">{event.description}</div>
        </div>

        <button onClick={() => onRemove(event)} className="close-icon">X</button>
    </div>
}

export default TeamMember