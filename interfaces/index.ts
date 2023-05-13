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
  eventIds: IEventIds
  placeIds: IPlaceIds
}

export type IDayTimetable = {
  dayID: string
  events: Array<IEvent>
}

export type IEvent = {
  start: string
  end: string
  eventId: string
  placeId: string
}

export type IEventIds = {
 [key : string]: IInfoEvent
}

export type IInfoEvent = {
  labels: IEventLabel
  color: string
 }

 export type IEventLabel = {
  [key : string] : string
 }

 export type IPlaceIds = {
  [key : string]: IInfoPlace
 }

 export type IInfoPlace = {
  label: string
  address: string
  gmap: string
 }

 export type IEventUpdated = {
  start: string
  end: string
  eventLabel: string
  color: string
  place: IInfoPlace
}
