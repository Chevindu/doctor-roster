import { stringify } from 'yaml'
import { createRef, useEffect, useState } from 'react'
import { getFormattedDateTime, removeDuplicates } from './utils'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { CalendarSourceEvent, TeamMemberType } from './interfaces'
import EventStorage from './services/EventStorage'
import EventContent from './components/EventContent/EventContent'
import { EventChangeArg, EventContentArg } from '@fullcalendar/core/index.js'
import interactionPlugin, { DateClickArg, Draggable, EventReceiveArg } from '@fullcalendar/interaction'
import './App.css'
import TeamMember from './components/TeamMember/TeamMember'


function App() {

  const calendarRef = createRef<FullCalendar>();
  const [hours, setHours] = useState(6);
  const [copyButtonText, setCopyButtonText] = useState('Copy Schedule');
  const [externalEvents] = useState<TeamMemberType[]>([
    { title: "Dr. Dinesh / Dr. Nirmala", color: "#0097a7", id: "0001", description: "Admin" },
    { title: "Dr. Nadeera", color: "#f44336", id: "0002", description: "MO in-charge" },
    { title: "Dr. Pradeep", color: "#f57f17", id: "0003" },
    { title: "Dr. Ranindu", color: "#90a4ae", id: "0004" },
    { title: "Dr. Geesara", color: "#4cbb00", id: "0005" },
    { title: "Dr. Asitha", color: "#bb008c", id: "0006" },
  ]);

  const [calendarEvents, setCalendarEvents] = useState<CalendarSourceEvent[]>(EventStorage.getEvents());

  useEffect(() => {
    const containerEl = document.getElementById("external-events");
    if (containerEl) {
      new Draggable(containerEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          const id = eventEl.dataset.id;
          const title = eventEl.getAttribute("title");
          const color = eventEl.dataset.color;
          const custom = eventEl.dataset.description;
          const duration = eventEl.dataset.hours;

          return {
            id: id,
            title: title,
            color: color,
            custom: custom,
            create: true,
            duration: { hours: duration }
          };
        }
      });
    }
  }, []);

  const handleDateClick = (arg: DateClickArg) => {
    console.log('Date click\n', arg)
  }

  const handleEventChange = (arg: EventChangeArg) => {
    console.log('Event change\n', arg.event.toJSON())
    console.log("=====  handleEventChange events:", calendarRef.current?.getApi()?.getEvents().map(event => event.toJSON()))
    const latestCalendarEvents = calendarRef.current?.getApi()?.getEvents().map(event => event.toJSON());
    if (latestCalendarEvents) {
      setEvents(latestCalendarEvents as any[]);
    }
  }

  const handleEventReceive = (arg: EventReceiveArg) => {
    console.log('handleEventReceive\n', arg.event.toJSON())
    const { event } = arg;
    const newEvent = {
      title: event.title,
      start: event.start ?? undefined,
      end: event.end ?? undefined,
      color: event.backgroundColor,
      extendedProps: event.extendedProps,
      id: (event.start?.getTime() ?? '') + event.id,
      allDay: event.allDay,
    };

    setEvents([...calendarEvents, newEvent])
  }

  const setEvents = (newEvents: CalendarSourceEvent[]) => {
    setCalendarEvents(newEvents)
    const deduplicatedEvents = removeDuplicates(newEvents);
    EventStorage.setEvents(deduplicatedEvents)
  }

  const removeEvent = (id: string) => {
    const newEvents = calendarEvents.filter(event => event.id !== id);
    setEvents(newEvents);
  }

  const renderEventContent = (eventInfo: EventContentArg) => {
    return <EventContent eventInfo={eventInfo} onRemove={removeEvent} />
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard");
        setCopyButtonText('Copied!');
      })
      .catch((err) => {
        setCopyButtonText('Failed to copy!');
        console.error('Failed to write to clipboard', err);
      })
      .finally(() => {
        setTimeout(() => {
          setCopyButtonText('Copy Schedule');
        }, 1000);
      });
  };

  const handleFormatSchedule = () => {
    const deduplicatedEvents = removeDuplicates(calendarEvents);

    const eventsByTitle: { [title: string]: CalendarSourceEvent[] } = {};

    for (const event of deduplicatedEvents) {
      if (!event.start || !event.end) {
        continue;
      }

      const currentEvents = eventsByTitle[event.title];
      if (currentEvents) {
        currentEvents.push(event)
      } else {
        eventsByTitle[event.title] = [event]
      }
    }

    const sessionsByTitle: { [title: string]: string[] } = {};
    for (const title in eventsByTitle) {
      sessionsByTitle[title] = eventsByTitle[title]
        .sort((a, b) => new Date(a.start!).getTime() - new Date(b.start!).getTime())
        .map(event => `${getFormattedDateTime(event.start)} - ${getFormattedDateTime(event.end)}`)
    }

    copyToClipboard(stringify(sessionsByTitle))
  }

  return (
    <div className='app-container'>
      <div className='external-events' id='external-events'>
        <div className="section hours-section">
          <strong>Shift (hours)</strong>
          <div>{hours}</div>
          <input type="range" min={4} max={16} value={hours} onChange={(e) => setHours(Number(e.target.value))} />
        </div>

        <div className="section team-section">
          <strong>Team</strong>
          {externalEvents.map((event) => <TeamMember event={event} hours={hours} key={event.id} />)}
        </div>

        <button onClick={() => { setEvents([]) }} className="action clear-events">Clear Schedule</button>
        <button onClick={handleFormatSchedule} className="action copy-event">{copyButtonText}</button>
      </div>

      <div className='calendar-container'>
        <FullCalendar
          ref={calendarRef}
          firstDay={1}
          height={700}
          editable={true}
          droppable={true}
          nowIndicator={true}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="timeGridWeek"
          events={calendarEvents}
          dateClick={handleDateClick}
          eventChange={handleEventChange}
          eventReceive={handleEventReceive}
          eventContent={renderEventContent}
          slotDuration={{ hours: 0.5 }}
          scrollTime="08:00:00"
          scrollTimeReset={false}
          slotLabelInterval={{ hours: 2 }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        />
      </div>
    </div>
  )
}

export default App
