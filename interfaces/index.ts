export type Post = {
  id: string,
  title: string
date: string
component: string
description: string
category: string
icon: string
}

export type ITimetable = {
  dayTimetables: Array<IDayTimetable>
}

export type IDayTimetable = {
  dayID: string
  events: Array<IEvent>
}

export type IEvent = {
  start: string
  end: string
  id: string
  placeId: string
}

export type IEventId = {
 [key : string]: IInfoEvent
}

export type IInfoEvent = {
  labels: Array<[key : string]>
  color: string
 }

 export type IPlaceIds = {
  [key : string]: IInfoPlace
 }

 export type IInfoPlace = {
  label: string
  address: string
  gmap: string
 }
