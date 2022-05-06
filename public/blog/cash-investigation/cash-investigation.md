---
title: 'cash-investigation'
date: '2022-05-01'
description: 'help the journalists for an investigation on McDonald's'
category: 'code web-scraping schema-registry'
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

Owner A have :
- Macdo 1 : 20 employees
- Macdo 2 : 40 employees
- Macdo 3 : 15 employees
75/49 employees

let's regroup them in new companies
Owner A have :
Company A :
        Macdo 1
        Macdo 3
35/49 employees
Company B :
        Macdo
40/49 employees

To proove that they had journalist that worked during 3 months by listing all Restaurant in phrase, fetching and crossing informations ...

Here is the reason of this article, **could I help it with code ?**

## How to
### what we need

### how to get it
First thing was to look on official Macdo website, there is a map with all available restaurant.

Open the browser terminal in **network** tab, then click on any restaurant

- address
- company name

To fetch the API, we need the storeID.
It seems that the map is built squares by squares
- we load the png to show the point
- we load some Ids related to the points ... the store IDs !

- store Ids

The more we zoom, the more we have restaurants. We will need to zoom on every squares otherwise we will miss some points.
 We can also see that
- this number increment when we zoom
- increment on scrolling south
- increment on scrolling east

With the company name, after cleaning a bit, we can see on [societe.com](https://www.societe.com/) the missing informations

- owner
- how many salaries
- TODO chiffres (this part need a premium account)

After getting all of this informations we should be capable of making the algo to check if the owner should have pay the tax !


### get it ...


