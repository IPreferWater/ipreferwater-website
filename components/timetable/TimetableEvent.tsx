import { IEventUpdated } from '../../interfaces'

type EventProps = {
    event : IEventUpdated
}

  export function TimetableEvent({event}:EventProps) {

    return (
      <div className={`flex flex-col rounded-lg p-4 ${event.color}`}>
        <div className={`font-bold`}>
          {event.eventLabel}
        </div>
        <div>{event.start} - {event.end}</div>
        <a className='underline font-semibold' href={event.place.gmap} target='_blank'>{event.place.label}</a>
      </div>
)
  }