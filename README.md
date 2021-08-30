# ps3commander
handRolled controller v4(?) - vue3 spa ...
 - data backed in as json extracted from my local gamesDB
 - *(Doc:comingSoon)* ps3-API / nodeRed-webManMod-_inTheMiddle-ware_

# changeLog
- 21.08.30 - MTP release
  - deploy to `gh-pages` w/ `.github/workflows/deploy.yml`
  - noNeed to roll my own [[props](https://github.com/marketplace/actions/vue-to-github-pages)]
- 21.08.29 - v1b ~complete
  - ps3Status [componenet|vue] 
    - ps3:[on|off] as nav color + bottom-right
  - ps3Timer with moment and svgPie
  - ps3-nr-api [get|post]>(state|hdd|swichUser|mountDisk|eject)
- 21.08.22 - readme init
- 21.08.21 - list/drill/(auto)nav

# obligatory screenshots
<img src="src/assets/screens/screen1.png?raw=true" style="width: 30%;">
<img src="src/assets/screens/screen2.png?raw=true" style="width: 30%;">
<img src="src/assets/screens/screen3.png?raw=true" style="width: 30%;">

| powerOff | powerOn |
|:--:|:--:|
|![powerOff](src/assets/screens/ps3statusOff.png?raw=true)|![powerOff](src/assets/screens/ps3status.png?raw=true)|

API:
<img src="src/assets/screens/nodeRed-api.png?raw=true" style="width: 100%;">

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
