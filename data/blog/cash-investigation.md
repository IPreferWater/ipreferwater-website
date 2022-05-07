---
title: 'cash-investigation'
date: '2022-05-01'
description: 'help the journalists for an investigation on McDonalds'
category: 'code web-scraping'
icon: '/blog/cash-investigation/icon.webp'
---
**Cash-investigation** is a french TV-show about problemes & injustices in society.

In the episode of [April 2022](https://www.france.tv/france-2/cash-investigation/3202099-ca-se-passe-comme-ca-chez-mcdonald-s.html), they revealed some dirty tricks of the company McDonald for paying as low as possible their employee

### The rule
In France, depending on the number of employees you have in your company, you have [obligations](https://entreprendre.service-public.fr/vosdroits/F31415) ( for example, from 20 employees, you have to possese at least 6% of disabled people )

The one that interest us is 

> From 50 employees, you have to pay a prime of share to your employees

In the documentary, they showed that a lot of MacDonal's owner splitted their franchise in different companies in order to never cross this **49 employees** 

for example

> Owner A have :
> - Macdo 1 : 20 employees
> - Macdo 2 : 40 employees
> - Macdo 3 : 15 employees
> 75/49 employees

let's regroup them in new companies
> Owner A have :  
> - Company A :  
>         Macdo 1  
>         Macdo 3  
> 35/49 employees  
> - Company B :  
>        Macdo  
> 40/49 employees  

To proove that they had journalist that worked during 3 months by listing all Restaurant in phrase, fetching and crossing informations ...

Here is the reason of this article, **could I help it with code ?**

## How to

> the code you will see can't replace the work of journalists, but I do think this could be a cool tool to help speed the process.

### what we need

We will need :
- the adresses of the stores
- check on google-map if they still exist ? (I saw one of the journalist doing this)
- get the company name of the restaurant
- the name of the director
- the number of employees
- the sales revenues to calcul how much Macdo saved by splitting his employees in different companies

### how to get it
First thing was to look on official Macdo website, there is a map with all available restaurant.

Open the browser terminal in **network** tab, then click on any restaurant

![get store informations](/blog/cash-investigation/map_1.webp)
we found **address** ,**company name** & **x y coordinates**

To fetch this API, we need the storeID.
It seems that the map is built squares by squares
- load the png to show the point
![map load points](/blog/cash-investigation/map_points.webp)
- load some Ids related to the points ... the store IDs !
![map load grid](/blog/cash-investigation/map_grid.webp)


The more we zoom, the more we have restaurants. We will need to zoom on every squares otherwise we will miss some points.
 We can also see that
- the first number increment when we zoom
```
https:[...]4-x-x.grid.json?key=...
https:[...]5-x-x.grid.json?key=...
https:[...]6-x-x.grid.json?key=...
```
- the second increment on scrolling south
```
https:[...]x-29-x.grid.json?key=...
https:[...]x-30-x.grid.json?key=...
https:[...]x-31-x.grid.json?key=...
```
- the last increment on scrolling east
```
https:[...]x-x-22.grid.json?key=...
https:[...]x-x-23.grid.json?key=...
https:[...]x-x-24.grid.json?key=...
```

we will start our incrementation on the top-left of the France , and parse every grids until bottom right

![map split](/blog/cash-investigation/map_split.webp)

With the company name, after cleaning a bit, we can see on [societe.com](https://www.societe.com/) the missing informations

![company info](/blog/cash-investigation/company_info.webp)
- owner
- how many salaries
- sales revenues

with a premium account we could even see all the other companies owned by the same person
![companies tree](/blog/cash-investigation/companies_tree.webp)


#### check google map
if you make a search on googlemap with the x,y you can easyly check the restaurant
```
    "coordinates": {
        "latitude": 48.215584,
        "longitude": -4.051743291
    },
```
![google_map](/blog/cash-investigation/google_map.webp)

After getting all of this informations we should be capable of making the algo to check if the owner should have pay the tax !

### get it ...

here is the code part, everything is on [github](https://github.com/IPreferWater/cash-investigation-mcdo)
If you are not interested in the code part, you can skip to the **Conclusion**

I exagerated the split on csv to explain the process

#### get all store ids

>! I'm using a token that could be expired when you use the code, you can find a new one by checking the **network** tab [mcdonalds](https://www.mcdonalds.fr/restaurants) and replace it in [list_stores.go](https://github.com/IPreferWater/cash-investigation-mcdo/blob/main/list_stores.go#L24)

I placed a time.sleep of 1 second to avoid too much calls ...

start the app
```
go run . list-stores
```

the output will be a csv file
```
store.csv
```
it should contain around 4000 ids
```
730
361
236
[...]
```
#### get stores informations
The app will load all ids from **store.csv**, and foreach, extract
- city
- company name
- x & y coordonates
- street
```
go run . info-stores
```
the output will be another csv file
```
info-stores.csv
```
should look like this
```
184,LYON VILLEFRANCHE SUR SAONE,FRAMI,45.998466;4.734668,Rue Berthelot VILLEFRANCHE SUR SAONE 69400
1659,BESANCON MARCHAUX A36 ORIGINALS AREAS,HOLDING,47.326909;6.126240,Aire de Besancon Marchaux MARCHAUX 25640
456,TOUQUES,R3,49.346960;0.096800,Chemin du Roy TOUQUES 14800
[...]
```
#### get companies informations

For this part there is no available API. We will have to use web-scrapping to extract the informations.
We use [go-colly](https://github.com/gocolly/colly)

the last output is
```
info-company.csv
```
should look like this
```
[...]Restauration,20 � 49 salari�s,M Olivier BURNIAUX
[...]Services,,M Laurent COYON
[...]Restauration,20 � 49 salari�s,M Bruno PIGE
```

## Conclusion
Now we have the csv, you can apply the same filters on excel we saw in the documentaries, or even make the algo on golang part !
The cool part is once you have the working code, you can repeat it as much as you want .
Next year we could check if Macdonald's stoped his tricks (spoiler alert: **They won't**)
