// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export type Post = {
  id: string,
  title: string
date: string
component: string
description: string
category: string
}

export type Product = {
  name: string
  price: number
  image: string
  sku: string
  currency: string
  id: string
}
