import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllTimetableIds, getTimetableData } from '../api/timetable'
import { ITimetable } from '../../interfaces'

type TimetableProps = {
  timetable: ITimetable,
  id: string
}
export default function TimeTablePage ({timetable, id}: TimetableProps) {
  return <Layout title="IPreferWater About me">
    <h1>Timetable</h1>
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
