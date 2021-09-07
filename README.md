# ps3commander
handRolled controller v4(?) - vue3 spa ...
 - data backed in as json. at first extracted from my local gamesDB (scraped by skyScrapper)
 - currently using the gameTDB dataSet
 - nodeRed-webManMod-middleWare

# TODO
- decouple media from build ?
- decouple from nodeRed-API / hook wMM direct ?
- ~~decouple from myDB - hook to skyScraper output (need xml>json)~~ 
- current source = gameTDB - need permission
- decouple user-data.json 
  - hardCoded at build time 
  - cache last API resp in browser localStorage 
- massUpload: get gameList from console (w/wMM)
# changeLog
- 21.09.07 - historyMode widget shows last10 in nav
  - added toggle for gamesViewed or gamesMounted in admin
  - arrays put into browser localStore for safeKeeping
  - screenShot below
- 21.09.06 - lets call it alpha again
  - added gameTDB dataSet 
  - myFavs - store select games as array in browser storage
  - seperated app and ps3 status
  - added global warnings in nav
  - seperated the nav into componenets
  - made the howTO page
  - moved APIurl to browserStorage
  - and more
- 21.09.01 - all ps3 games list - default=on (if LAN: off)
- 21.08.31 - snes release
  - controller added to topNav ... sets `filters.console` 
  - added it as a prop on `superHome` too
  - fixed the long-long reloads (onDev-only): game says so in its path
- 21.08.30 - MTP release 
  - LAN/WAN awareness - purple/indigo
    - `@click.middle` to refresh
  - nav layout improved with *punchOut* controller logo
  - howTo improvements
    - use html5 `details>summary` rather then `@click` and state.showJson.{}
  - 2ad893a: cleanup deploy experimentation
  - deploy to `gh-pages` w/ `.github/workflows/deploy.yml`
  - noNeed to roll my own
    - added 2nd step to simLink `index.html` -> `404.html`
    - and requested xRealNeon/VuePagesAction/pull/4 to bake it in
  - fix zoom(in|out) 
    - CAUSE: missing `grid-col-#` after compile 
    - FIX: tailwind safewords to keep `"(sm:)grid-cols-${<7}"` 
  - fix [img/api] paths with env vars
  - <details><summary>block WAN w/apache2 proxy in -`newsPI:default-ssl.conf`</summary>

      ``` 
        ProxyPass /ps3commanderAPI "http://LOCAL-IP:PORT/API/PATH"
        ProxyPassReverse /ps3commanderAPI "http://LOCAL-IP:PORT/API/PATH"
        <Proxy *>
            Order deny,allow
            Deny from all
            Require ip 192.168.1.0/24
            Satisfy Any
        </proxy>
      ```
      </details>

  - moment povided globally
  - nav dropdown layout fixed
  - 8d5277b: NEW superHome route with all params …
    - 1 path + all :props? optional
    - `"/u=:name?/g=:genre?/c=:controller?/p=:players?"`
  - 87e1be4: global search fixed
  - b79b243: bg on whole app body
  - fb8e649: current nav item hilighted & mobile search
  - caa3541: howTo - make/fork your own app/(NR)api
- 21.08.29 - v1b ~complete
  - ps3Status [componenet|vue] 
    - ps3:[on|off] as nav color + bottom-right
  - ps3Timer with moment and svgPie
  - ps3-nr-api [get|post]>(state|hdd|swichUser|mountDisk|eject)
- 21.08.22 - readme init
- 21.08.21 - list/drill/(auto)nav

# obligatory screenshots
| home | dropDown filters | gameInfo |
|:--:|:--:|:--:|
|![home](src/assets/screens/screen1.png?raw=true)|![dp](src/assets/screens/screen2.png?raw=true)|![game](src/assets/screens/screen3.png?raw=true)
| snes | gitLog | status:offline |
|![snes](src/assets/screens/snes.png?raw=true) |![gitLog](src/assets/screens/gitLog.png?raw=true)|![ps3offline](src/assets/screens/info-offline.png?raw=true)|
| powerOff | powerOn:playing | WAN | 
|![powerOff](src/assets/screens/ps3statusOff.png?raw=true)|![powerOff](src/assets/screens/ps3status.png?raw=true)|![powerOff](src/assets/screens/ps3statusWAN.png?raw=true)|
|animated masteHead|history||
|![animatedSVG](src/assets/screens/controllerAnimated.gif?raw=true)|![history](src/assets/screens/history.png?raw=true)||

API:
<img src="src/assets/screens/nodeRed-api.png?raw=true" style="width: 100%;">

# App Dev
```
npm install     ## Project setup
npm run serve   ## hot-reloads for development
npm run build   ## Compiles and minifies for production
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
