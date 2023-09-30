import { FC } from "react"
import { TeamMemberType } from "../../interfaces"

type TeamMemberProps = {
    hours: number
    event: TeamMemberType
}

const TeamMember: FC<TeamMemberProps> = ({ event, hours }) => {
    return <div
        className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event"
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
    </div>
}

export default TeamMember