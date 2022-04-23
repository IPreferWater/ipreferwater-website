---
title: 'server side rendering'
date: '2022-05-01'
description: 'server side rendering'
category: 'code ssr nextjs'
icon: '/blog/ssr/icon.webp'
---

### What's Server Side Rendering

When you buy a shelf on Ikea, you receive a box with instructions.
This is the same for your browser when you visit a website. He received code (instructions) and try to do his best.

Imagine if Ikea, instead of sending you the box, they send you the already built shelf. This is what SSR is about.

- technical definition [link](https://www.heavy.ai/technical-glossary/server-side-rendering)
- performances [link](https://medium.com/walmartglobaltech/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)

### Example

We will use [nextjs](https://nextjs.org/)
The github is [here](https://github.com/IPreferWater/ssr-coffee)

We are working in a company that trade coffee
Everydays different teams need to monitore what's happening in our stocks

![front presentation](/blog/ssr/front_presentation.webp)

- purchase/sales of bags by countries
- entry/exit in our warehouses
- current stock
- stock market of concurents

we need our api to give us this informations
```
cd ssr-coffee\go-backend
go run .
```
( actually, the data are [harcoded](https://github.com/IPreferWater/ssr-coffee/blob/main/nextjs-ssr-coffee/pages/index.tsx#L17) in the front, we will just check the calls of the api)

start the nextjs
```
cd ssr-coffee\nextjs-ssr-coffee
npm run dev
```
visit the website and you should see the monitoring interfaces
```
localhost:3000
```


if you check your golang app you can see the endpoint */report* was called
```
[GIN] 2022/04/23 - 17:37:24 | 202 |      5.9176ms |       127.0.0.1 | GET      "/report"
```

## What's happening

Nextjs load [Index.tsx](https://github.com/IPreferWater/ssr-coffee/blob/main/nextjs-ssr-coffee/pages/index.tsx#L17) at the end of the page we have a function [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

```
export async function getServerSideProps() {
  const res = await fetch(`http:127.0.0.1:3002/report`)
  const data = await res.json()
  return {
    props: {
      data
    },
  }
}

```
We fetch the data on **localhost:3002/report**, and insert the data in the **props**

The problem is everytime someone in our companie visit the page, the api is called ...
```
[GIN] 2022/04/23 - 17:37:24 | 202 |      5.9176ms |       127.0.0.1 | GET      "/report"
[GIN] 2022/04/23 - 17:37:25 | 202 |      5.9176ms |       127.0.0.1 | GET      "/report"
[GIN] 2022/04/23 - 17:37:26 | 202 |      5.9176ms |       127.0.0.1 | GET      "/report"
[...]
```

## Implement the SSR

Let's use [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)

change the function from **getServerSideProps** to **getStaticProps**

```
export async function getStaticProps() {
  [...]
}
```

restart the nextjs but not with **npm run dev** [it won't work](https://nextjs.org/docs/basic-features/data-fetching/get-static-props#runs-on-every-request-in-development)


we need to build the website first
```
npm run build
npm run start
```
you will see during the build your backend is called
```
[GIN] 2022/04/23 - 18:37:24 | 202 |      5.9176ms |       127.0.0.1 | GET      "/report"
```

now everytime you visit [localhost:3000](localhost:3000) the api won't be called ! Nextjs will delevery the website already build with the data fetched during the build

they are stored in the folder
```
 ssr-coffee\nextjs-ssr-coffee\.next
 ```

This is really cool if your data nearly never change

## But our companie's data change everydays ...

Let's use [revalidate](https://nextjs.org/docs/api-reference/data-fetching/get-static-props#revalidate) param

set it to 3 seconds (or 86,400 for courageous people)

```
export async function getStaticProps() {
  [...]]
  return {[...]},
    revalidate :5
  }
}
```

don't forget to rebuild your nextjs
```
npm run build
npm run start
```

and this time if you spam refresh you will see your api is fetched only when the validation time is expired !
```
[GIN] 2022/04/23 - 18:52:00 | 202 |      5.9176ms |       127.0.0.1 | GET      "/report"
[GIN] 2022/04/23 - 18:52:05 | 202 |      5.9176ms |       127.0.0.1 | GET      "/report"
[GIN] 2022/04/23 - 18:52:10 | 202 |      5.9176ms |       127.0.0.1 | GET      "/report"
[...]
```

Now, every morning when someone will check were the precious coffee is, he will trigger the revalidation and the website will deliver the already built webpage !