import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface ScheduleProps {
  events: any;
  eventClick: any;
  height?: any;
}

const Schedule = ({ events, eventClick, height, ...props }: ScheduleProps) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      eventClick={eventClick}
      initialView="dayGridMonth"
      events={events}
      height={height}
      {...props}
    />
  );
};

export default Schedule;
