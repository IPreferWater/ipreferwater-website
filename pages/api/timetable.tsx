import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ITimetable } from '../../interfaces'

const timetablesDirectory = path.join(process.cwd(), 'data/timetable')




export function getAllTimetableIds() {
  const fileNames = fs.readdirSync(timetablesDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.json$/, '')
      }
    }
  })
}

export function getTimetableData(id:number) {
  const fullPath = path.join(timetablesDirectory, `${id}.json`)
  const timetableString = fs.readFileSync(fullPath, 'utf8')

  const planing: ITimetable = JSON.parse(timetableString);
  return planing
}
