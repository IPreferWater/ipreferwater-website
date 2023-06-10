import { IEventUpdated } from '../../interfaces'

type EventProps = {
    event : IEventUpdated
}
  
  export function TimetableEvent({event}:EventProps) {

    function getBgColorFromColorID(colorID:string) : string{
      switch (colorID) {
        case 'red':
          return 'bg-red-200'
        case 'blue':
          return 'bg-blue-200'
          case 'purple':
          return 'bg-purple-200'
          case 'pink':
          return 'bg-pink-300'
      }
      return ''
    }

    return (
      <div className={`flex flex-col rounded-lg p-4 ${getBgColorFromColorID(event.color)}`}>
        <div className={`font-bold`}>
          {event.eventLabel} 
        </div>
        <div>{event.start} - {event.end}</div>
        <a className='underline font-semibold' href={event.place.gmap} target='_blank'>{event.place.label}</a>
      </div>
)
  }