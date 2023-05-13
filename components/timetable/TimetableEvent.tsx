import { IEventUpdated } from '../../interfaces'

type EventProps = {
    event : IEventUpdated
}
  
  export function TimetableEvent({event}:EventProps) {

    return (
      <div className={`flex flex-col bg-${event.color}`}>
              <div className={`font-semibold`}>
                {event.eventLabel} 
              </div>
              <div>{event.start} - {event.end}</div>
              <a className='underline decoration-sky-500' href={event.place.gmap} target='_blank'>{event.place.label}</a>
              </div>
)
  }