import { IEventUpdated } from '../../interfaces'

type EventProps = {
    event : IEventUpdated
}

  export function TimetableEvent({event}:EventProps) {

    function getBgColorFromColorId(colorId:string): string {
      switch(colorId) {
        case  'bg-blue-200':
        return 'bg-blue-200'
        case 'bg-purple-200':
          return 'bg-purple-200'
          case 'bg-red-300':
          return 'bg-red-300'
          case 'bg-yellow-400':
          return 'bg-yellow-400'
          case 'bg-orange-200':
          return 'bg-orange-200'
          case 'bg-red-200':
          return 'bg-red-200'
      }


        return ''
    }
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