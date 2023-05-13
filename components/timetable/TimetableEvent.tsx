import { IEventUpdated } from '../../interfaces'

type EventProps = {
    event : IEventUpdated
}
  
  export function TimetableEvent({event}:EventProps) {
    
    return (
      <div className={`bg-${event.color}`}>
              <span className={`font-semibold`}>
                {event.eventLabel} {event.start} - {event.end}
              </span>
              <span>{event.place.label}</span>
              <span>{event.place.address}</span>
              </div>

)
  }