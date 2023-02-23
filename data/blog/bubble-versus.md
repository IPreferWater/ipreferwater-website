---
title: 'Bubble Versus'
date: '2023-02-01'
description: 'A local versus game'
category: 'code go wasm ebiten'
icon: '/blog/bubble-versus/icon.webp'
---


![game screen](/blog/bubble-versus/game_screen.webp)

# Play it on the page [bubbleversus](/bubbleversus)


## resources

This is a game I made in Go using [ebiten](https://github.com/hajimehoshi/ebiten)

It look like a local guitar hero versus (with a Keyboard)
I just wanted to try the go -> js via Wasm ...

- Sprites are from [bust-a-move](https://github.com/hajimehoshi/ebiten)
- Music from [8-Bit-Universe](https://www.youtube.com/watch?v=uun5czVkBr8)
- Source code [is here](https://github.com/IPreferWater/game-wasm)
- Background images are generated with [IA Midjourney](https://midjourney.com/home/?callbackUrl=%2Fapp%2F)

## Run on local
The game itself is in the [wasm folder](https://github.com/IPreferWater/game-wasm/tree/main/wasm)  you can try wasm by bulding the file

**be carrefull, I didn't include the .mp3 in the res folder, put any song you like**

```
cd wasm
GOOS=js GOARCH=wasm go build -o ../assets/game.wasm
```

The file game.wasm will be acessible on your local server 

```
cd game-wasm
go run .
```
then visit [localhost:9090](http://localhost:9090/)
