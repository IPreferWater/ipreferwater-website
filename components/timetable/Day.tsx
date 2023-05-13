
import { IDayTimetable, IEvent, IEventIds, IEventUpdated, IPlaceIds } from '../../interfaces'
import { TimetableEvent } from './TimetableEvent'

type PlanningDayProps = {
    day : IDayTimetable
    eventIds : IEventIds
    placeIds : IPlaceIds
    language: string
}
  
  export function Day({day, eventIds, placeIds, language}:PlanningDayProps) {

    function updateEventsIdsAndPlaceIds(event :IEvent) : IEventUpdated{
        const eventID = eventIds[event.eventId]
        const place = placeIds[event.placeId]

         return {
          start: event.start,
          end: event.end,
          eventLabel: eventID.labels[language],
          color: eventID.color,
          place: place
         } as IEventUpdated;
      }
    
    return (<div className="min-h-200 min-w-200 rounded overflow-hidden shadow-lg relative">
  
      <div className="px-6 py-4 pb-16">
        <div className="flex flex-row justify-between">
          <div className="font-bold text-xl mb-2">
             getLabelDayWithID {day.dayID}
          </div>
          <div className="text-xs"></div>
        </div>
  
        <ul className={`min-h-32 min-w-32`}>
          {day.events.map((event, i) =>
            <li key={i} className={`flex flex-col text-center rounded-lg text-beach-grey p-2 mb-2 todo-color}`}>
              <TimetableEvent event={updateEventsIdsAndPlaceIds(event)}/>
            </li>
          )}
        </ul>
      </div>
    </div>)
  }