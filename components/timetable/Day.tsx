
import { IDayTimetable, IEvent, IEventIds, IEventUpdated, IPlaceIds } from '../../interfaces'
import { getLabelDayByLanguage } from '../../pages/api/util'

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
    
    return (<div className="rounded overflow-hidden shadow-lg relative">
  
      <div className="px-2 py-4 pb-16">
        <div className="flex flex-row">
          <div className="font-bold text-xl mb-2">
             {getLabelDayByLanguage(day.dayID, language)}
          </div>
          <div className="text-xs"></div>
        </div>
  
        <ul>
          {day.events.map((event, i) =>
            <li key={i} className={`text-center mx-2 my-4`}>
              <TimetableEvent event={updateEventsIdsAndPlaceIds(event)}/>
            </li>
          )}
        </ul>
      </div>
    </div>)
  }