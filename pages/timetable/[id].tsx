import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllTimetableIds, getTimetableData } from '../api/timetable'
import { IEvent, IEventIds, IEventUpdated, IPlaceIds, ITimetable } from '../../interfaces'
import { Day } from '../../components/timetable/Day'
import React from 'react'

type TimetableProps = {
  timetable: ITimetable,
  id: string
}
export default function TimeTablePage ({timetable, id}: TimetableProps) {

  //TODO should we add a default language on timetable ?
  const [language, setlanguage] = React.useState("FR");
  
  const onChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    
    const value = event.target.value;
    setlanguage(value);
  };

  return <Layout title={`Timetable ${id}`}>
    <h1>Timetable</h1>

<select name="language" id="language-select" onChange={onChangeLanguage}>
    <option  value="FR">Français 🇫🇷</option>
    <option value="EN">English 🇬🇧</option>
</select> 

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2">
            {timetable.dayTimetables.map((day, index) => 
             <Day  key={index} day={day} eventIds={timetable.eventIds} placeIds={timetable.placeIds} language={language}/>
             )}
        </div>
    {timetable.dayTimetables.map((day, index) => 
             //<PlanningDay  key={index} day={day} id={id} dayNumber={index+1}/>
             day.dayID
             )}

  </Layout>
}



export async function getStaticProps(context:any) {
  const id = context.params.id
    const timetable = getTimetableData(id)    
    
    return {
      props: {
        timetable,
        id
      }
    }
  }

export async function getStaticPaths() {
  const paths = getAllTimetableIds()
  return {
    paths,
    fallback: false
  }
}
