# ps3commander
handRolled controller v4(?) - vue3 spa - backed by 1 parts by json extracted from my local gamesDB, and 1 part nodeRed-webManMod-_inTheMiddle-ware_

# TODO
- ps3 backEnd - power/login/mount/now-playing
- deploy _(to gh-pages?)_
# changeLog
- 21.08.22 - readme init
- 21.08.21 - list/drill/(auto)nav

# obligatory screenshots
<img src="src/assets/screen1.png?raw=true" style="width: 30%;">
<img src="src/assets/screen2.png?raw=true" style="width: 30%;">
<img src="src/assets/screen3.png?raw=true" style="width: 30%;">

# prep
- `store/game.json` generated by skyScraper
- `public/images/` generated from skyScraper
- `store/tags.json` from local gamesDB
```
  select tag, 
    group_concat(ID SEPARATOR ',') as games 
    from ps3tags group by tag ;
  select tag, 
    group_concat(ID SEPARATOR ',') as games 
    from ps3controller group by tag;  
```

# App Dev
```
npm install     ## Project setup
npm run serve   ## hot-reloads for development
npm run build   ## Compiles and minifies for production
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
