---
title: 'squared paper'
date: '2022-10-01'
description: 'css to create squared paper style'
category: 'code css tailwind'
icon: '/blog/squared-paper/icon.webp'
---

![notebook](/blog/squared-paper/notebook.webp)

Recently I had a request for a background in the style of the squared paper & graph paper you had in school

## svg
I created a simple square svg and **background-repeat**

![adobe 1](/blog/squared-paper/adobe_1.webp)

The result was strange because the paper looked like fake, the real paper is randomly cut by industry

I used 4 differents squares and joined them in the nearly center of my canvas
When reapeting several times svg, it will give us full square but more realistics one

![grid gray squares](/blog/squared-paper/grid_gray_squares.svg)

same for the graph one

![grid green squares](/blog/squared-paper/grid_green_squares.svg)
  
## Tailwind css
    
the smaller the **background-size** is, the more square you will have on screen
in **index.css**
```
@layer components {
  .background-grid-green {
    background-image: url(grid_green_squares.svg);
    background-repeat: repeat;
    background-size: 22px 22px;
  }

  .background-gray-green {
    background-image: url(grid_gray_squares.svg);
    background-repeat: repeat;
    background-size: 8px 8px;
  }
}
```
example of use in code ([github](https://github.com/IPreferWater/cel-nextjs/blob/develop/components/tarifs/SquaredPaper.tsx) for full code)
```
<div className='background-gray-green p-8 m-8 rounded-xl relative '>
```

and here is the result in the target [website](https://www.clementinestla.com/)

![result](/blog/squared-paper/result.webp)