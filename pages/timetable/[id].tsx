import Layout from '../../components/Layout'
import { getAllTimetableIds, getTimetableData } from '../api/timetable'
import { ITimetable } from '../../interfaces'
import { Day } from '../../components/timetable/Day'
import React from 'react'

type TimetableProps = {
  timetable: ITimetable,
  id: string
}

interface ILabels {
  [key: string]: {
    title: string;
    places: string;
  };
}

export default function TimeTablePage ({timetable, id}: TimetableProps) {

  const [language, setlanguage] = React.useState("FR");
  const labels: ILabels = {
    'FR': {
      "title": "planning",
      "places":"lieux d'entrainements"
    },
    'EN': {
      "title": "timetable",
      "places":"places of training"
    }
  }
  
  const onChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setlanguage(value);
  };

  return <Layout title={`Timetable ${id}`}>
    <div className='m-2'>
    <h1 className='font-bol text-2xl'>{labels[language].title} {id}</h1>

<select name="language" id="language-select" onChange={onChangeLanguage}>
    <option  value="FR">Français 🇫🇷</option>
    <option value="EN">English 🇬🇧</option>
</select> 

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-2">
            {timetable.dayTimetables.map((day, index) => 
             <Day  key={index} day={day} eventIds={timetable.eventIds} placeIds={timetable.placeIds} language={language}/>
             )}
        </div>

    <div className='my-6 flex flex-col'>
    <h1 className='font-bol text-2xl'>{labels[language].places}</h1>
    {Object.values(timetable.placeIds).map((place, index) => (
        <a key={index} href={place.gmap} target='_blank' className='underline'>
          {place.label} - {place.address}
        </a>
      ))}
    </div>
    </div>
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
