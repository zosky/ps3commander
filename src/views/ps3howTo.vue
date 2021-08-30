<template>
  <div class="p-3 m-2">
    <div class="text-lg font-bold">easy as 1, 2, 3, 4...</div>
    <ol type="1" class="list-decimal p-3 pt-0 ml-2">
      <li>
        smash a ps3
        <ul class="ml-2">
          <li>
            <span>this is pretty useless without one running webManMod</span>
          </li>
          <li>ask google, then continue</li>
        </ul>
      </li>
      <li>
        make json files and assets:
        <ul class="ml-2">
          <li
            @click="showJson.games = !showJson.games"
            :class="{ 'font-bold': showJson.games }"
          >
            gamesList.json
            <span>[{{ !showJson.games ? "show" : "hide" }} structure]</span>
            <em> hint: try skyScraper to get assets and meta </em>
          </li>
          <div v-if="showJson.games" class="grid grid-cols-2">
            <pre class="bg-blue-200 p-3 overflow-x-scroll">{{ jsonGame }}</pre>
            <div class="font-bold p-3 bg-blue-300">
              {
              <span class="block ml-3 font-bold">"id": "unique-disk-id",</span>

              <span class="block ml-3 font-bold">"name":"used to search",</span>
              <span class="block ml-3 italic">"video":"not-yet",</span>
              <span class="block ml-3 italic">"rating":"not-yet",</span>
              <span class="block ml-3 font-bold">"desc":"info....",</span>
              <span class="block ml-3 font-bold"
                >"date":"timeStamp used w/momentJS",</span
              >
              <span class="block ml-3 font-bold"
                >"developer":"gameInfo card",</span
              >
              <span class="block ml-3 font-bold"
                >"publisher": "gameInfo card",</span
              >
              <span class="block ml-3 font-bold"
                >"genre":"dropDown + gameInfo card",</span
              >
              <span class="block ml-3 font-bold"
                >"players":dropDown + gameInfo card",</span
              >
              <span class="block ml-3">"images": { </span>
              <span class="block ml-8 font-bold">
                "cover": "covers/{diskID}.png",</span
              >
              <span class="block ml-8 font-bold">
                "image":"screenshots/{diskID}.png",</span
              >
              <span class="block ml-8 font-bold">
                "marquee":wheel/{diskID}.png",</span
              >
              <span class="block ml-3">}, "ps3": { </span>
              <span class="block ml-8 font-bold">"info":"{isoPath}",</span>
              <span class="block ml-8 font-bold">"id":"{diskID}".</span>
              <span class="block ml-8 font-bold">"file":"{iso}".</span>
              <span class="block ml-3"> }</span>
              <span>}</span>
            </div>
          </div>
          <li @click="showJson.data = !showJson.data">
            navData.json
            <span> [{{ !showJson.data ? "show" : "hide" }} structure] </span>
            <em> hint: try jq to make it make it match to needed structure </em>
          </li>
          <pre v-if="showJson.data" class="bg-blue-200 p-3">
{
    "players": {
        "name1": ["gameID1","gameID2",...],
        "name2": ["gameID2","gameID3","gameID3",...],
        ...
    },
    "controllers":{
        "guitar": ["gameID1","gameID2",...],
        "move": ["gameID3","gameID4",""gameID5",...],
    }
}              
          </pre>
        </ul>
      </li>
      <li>
        roll the backEnd
        <ul class="ml-2">
          <li>
            using your weapon of choice: make an API endPoint

            <ul class="ml-2">
              <li @click="showJson.APIget = !showJson.getData">
                GET:
                <span>
                  [{{ !showJson.APIget ? "show" : "hide" }} structure]
                </span>
                <pre v-if="showJson.APIget">
{
    "on":[true|false],
    "temp":{},
    "user":{"name","icon"},
    "time":{ "seconds":{ "power":0, "game":0 }}
}
                  </pre
                >
              </li>
              <li>
                <span> TODO(doc): </span>
                POST:{action:HDD}
              </li>
              <li>
                <span> TODO(doc): </span>
                POST:{action:mount,id:diskID}
              </li>
              <li>
                <span> TODO(doc): </span>
                POST:{action:user,name:name}
              </li>
            </ul>
          </li>
          <li @click="showJson.nodeRedAPI = !showJson.nodeRedAPI">
            HINT: a while back i made a flow in nodeRed
            <span> [{{ !showJson.nodeRedAPI ? "show" : "hide" }} ex:API] </span>
          </li>
          <div v-if="showJson.nodeRedAPI" class="text-red-400">
            <ul class="ml-2">
              <li>wMM@ps3 should be @ <span>http://ps3.lan/</span></li>
              <li>
                CORS subflow <span>(not included)</span> should set
                <span>CORS headers</span>
              </li>
              <li>
                some links (like to smartHome w/mqtt) are
                <span>also not included</span>
              </li>
            </ul>
          </div>
          <img
            v-if="showJson.nodeRedAPI"
            :src="nodeRedApiPng"
            alt="apiScreenshot"
            class="mix-blend-multiply pb-2"
          />
          <pre
            v-if="showJson.nodeRedAPI"
            class="w-full overflow-x-scroll bg-blue-200 p-2"
          >
[{&quot;id&quot;:&quot;2b873668.7e882a&quot;,&quot;type&quot;:&quot;subflow&quot;,&quot;name&quot;:&quot;CORS&quot;,&quot;info&quot;:&quot;a new central (sub-flow) \n- this way i don't litter all the flows with CORS.change\n- and i have 1 place to change them all\n\n## OPTIONAL INPUTs\n`method` default = 'POST, GET, OPTIONS'\n`origin` default = `here or desk`\n - if !orgin &gt; look at `req.headers.origin`\n&quot;,&quot;category&quot;:&quot;&quot;,&quot;in&quot;:[{&quot;x&quot;:320,&quot;y&quot;:240,&quot;wires&quot;:[{&quot;id&quot;:&quot;175288f.f150977&quot;}]}],&quot;out&quot;:[{&quot;x&quot;:770,&quot;y&quot;:240,&quot;wires&quot;:[{&quot;id&quot;:&quot;175288f.f150977&quot;,&quot;port&quot;:0}]}],&quot;env&quot;:[],&quot;color&quot;:&quot;#FFAAAA&quot;,&quot;icon&quot;:&quot;font-awesome/fa-unlock-alt&quot;,&quot;status&quot;:{&quot;x&quot;:770,&quot;y&quot;:285,&quot;wires&quot;:[{&quot;id&quot;:&quot;69e3fcd2.6279b4&quot;,&quot;port&quot;:0}]}},{&quot;id&quot;:&quot;175288f.f150977&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;2b873668.7e882a&quot;,&quot;name&quot;:&quot;Access-Control-Allow-Origin &gt; host filter&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;headers&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;{\t 'Access-Control-Allow-Methods':\t methods?methods:'POST, GET, OPTIONS',\t 'Access-Control-Allow-Origin': \t origin?origin:\t (req.headers.origin in [ \t 'http://localhost:8080' ,\t 'http://localhost:8181' ,\t 'http://192.168.1.91:8080',\t 'http://192.168.1.91:8181',\t 'http://mintyelite:4000',\t 'http://mintyelite:5000',\t 'http://mintyelite:5050',\t 'https://mintyelite:4001',\t 'http://192.168.1.62:4000',\t 'http://192.168.1.62:5000',\t 'http://192.168.1.62:5050',\t 'https://192.168.1.62:4001'\t ] ? '*')\t}&quot;,&quot;tot&quot;:&quot;jsonata&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:535,&quot;y&quot;:240,&quot;wires&quot;:[[&quot;69e3fcd2.6279b4&quot;]],&quot;icon&quot;:&quot;font-awesome/fa-unlock-alt&quot;},{&quot;id&quot;:&quot;69e3fcd2.6279b4&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;2b873668.7e882a&quot;,&quot;name&quot;:&quot;status&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;payload&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;{ \t \&quot;fill\&quot;: headers.\&quot;Access-Control-Allow-Origin\&quot; ?\&quot;green\&quot;:\&quot;red\&quot;, \t \&quot;text\&quot;: req.headers.origin\t ?req.headers.origin.$substringAfter('://')\t .( $=\&quot;localhost:8080\&quot;\t ?\&quot;VUE.dev\&quot;\t : $ in [\&quot;mintyelite:4000\&quot;, \&quot;192.168.1.62:4000\&quot;]?\&quot;VUE.prod\&quot;\t : $ \t )\t :headers.\&quot;Access-Control-Allow-Origin\&quot;\t ? '' : 'BLOCKED',\t \&quot;shape\&quot;:\&quot;dot\&quot;\t}\t&quot;,&quot;tot&quot;:&quot;jsonata&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:635,&quot;y&quot;:285,&quot;wires&quot;:[[]]},{&quot;id&quot;:&quot;b5f96100.282f9&quot;,&quot;type&quot;:&quot;inject&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;meta&quot;,&quot;repeat&quot;:&quot;&quot;,&quot;crontab&quot;:&quot;&quot;,&quot;once&quot;:true,&quot;onceDelay&quot;:&quot;12&quot;,&quot;topic&quot;:&quot;du&quot;,&quot;payload&quot;:&quot;&quot;,&quot;payloadType&quot;:&quot;date&quot;,&quot;x&quot;:255,&quot;y&quot;:1665,&quot;wires&quot;:[[&quot;19fd37cd.6a98d8&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;37a69b40.27b9c4&quot;,&quot;type&quot;:&quot;http request&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;mapi&quot;,&quot;method&quot;:&quot;GET&quot;,&quot;ret&quot;:&quot;txt&quot;,&quot;paytoqs&quot;:&quot;ignore&quot;,&quot;url&quot;:&quot;http://ps3.lan/cpursx.ps3&quot;,&quot;tls&quot;:&quot;&quot;,&quot;persist&quot;:false,&quot;proxy&quot;:&quot;&quot;,&quot;authType&quot;:&quot;basic&quot;,&quot;x&quot;:390,&quot;y&quot;:1665,&quot;wires&quot;:[[&quot;d6a0dc.22d15f28&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;d6a0dc.22d15f28&quot;,&quot;type&quot;:&quot;html&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;raw.game&quot;,&quot;property&quot;:&quot;payload&quot;,&quot;outproperty&quot;:&quot;raw.game&quot;,&quot;tag&quot;:&quot;#content h2 a&quot;,&quot;ret&quot;:&quot;html&quot;,&quot;as&quot;:&quot;single&quot;,&quot;x&quot;:510,&quot;y&quot;:1665,&quot;wires&quot;:[[&quot;b81deb9a.f752a8&quot;]]},{&quot;id&quot;:&quot;5c042e61.fe2f2&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;scrape&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;payload&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;raw . {\t \&quot;on\&quot;: \t $$.statusCode in ['EHOSTUNREACH', 'ETIMEDOUT']\t ?false:true,\t \&quot;playing\&quot; : $exists(game[1])?\t ( $g:=game[0];\t $flowContext('games')[id=$g] ), \t \&quot;disk\&quot;: $exists(disk[0])?\t ( $d:= disk[0].$match(/^([A-Z]{4}[0-9]{5}).*/).groups[0] ; \t $flowContext('games')[id=$d] ),\t \&quot;temp\&quot; : $join(temps, '')\t .$match(/CPU:\\W*(\\d*)&amp;....;C.*RSX:\\W*(\\d*)&amp;....;C.*MEM:\\W*([\\d,]*).*FAN SPEED:\\W*(\\d*).*/) \t .groups {\t \&quot;cpu\&quot;: $[0].$number(),\t \&quot;rsx\&quot;: $[1].$number(),\t \&quot;mem\&quot;: $[2].$replace(',','').$number(),\t \&quot;fanSpeed\&quot;: $[3].$number()\t }\t , \t \&quot;user\&quot;: \t ( $u:=user.href\t .$split('/')[3]\t .$match(/.*([\\d])/)\t .groups[0]\t .$number() ;\t ){ \t \&quot;id\&quot; : $,\t \&quot;name\&quot;: $=2?'marc'\t : $=3?'ben'\t : $=4?'mel'\t : $=6?'admin'\t : $=1?'no one',\t \&quot;icon\&quot;: $=2?'memory'\t : $=3?'child_care'\t : $=4?'face'\t : $=6?'policy'\t : $=1?'lock'\t },\t \&quot;time\&quot;: {\t \&quot;power\&quot;: time.on.$match(/([\\d]*)d ([\\d]{2}):([\\d]{2}):([\\d]{2})/).groups ~&gt; $join(':'),\t \&quot;game\&quot;: time.game.$match(/([\\d]*)d ([\\d]{2}):([\\d]{2}):([\\d]{2})/,1).groups ~&gt; $join(':'),\t \&quot;seconds\&quot;: {\t \&quot;power\&quot;: ( $x:= time.on.$match(/([\\d]*)d ([\\d]{2}):([\\d]{2}):([\\d]{2})/).groups.$number();\t $x[0]*60*60*24 + $x[1]*60*60 + $x[2]*60 + $x[3] ),\t \&quot;game\&quot;: ( $x:= time.game.$match(/([\\d]*)d ([\\d]{2}):([\\d]{2}):([\\d]{2})/).groups.$number();\t $count($x)=0?0:\t $x[0]*60*60*24 + $x[1]*60*60 + $x[2]*60 + $x[3] )\t },\t \&quot;gameARR\&quot;:\t $zip( \t [\&quot;d\&quot;,\&quot;h\&quot;,\&quot;m\&quot;,\&quot;s\&quot;],\t time.game.$match(/([\\d]*)d ([\\d]{2}):([\\d]{2}):([\\d]{2})/).groups)\t .{ \&quot;k\&quot;: $[0], \t \&quot;v\&quot;:$[1]\t .($contains($, /0[\\d]/)\t ?$substring($, 1, 1)\t :$\t ).$number()\t },\t \&quot;powerARR\&quot;: \t $zip( \t [\&quot;d\&quot;,\&quot;h\&quot;,\&quot;m\&quot;,\&quot;s\&quot;],\t time.on.$match(/([\\d]*)d ([\\d]{2}):([\\d]{2}):([\\d]{2})/).groups)\t .{ \&quot;k\&quot;: $[0], \t \&quot;v\&quot;: $[1]\t .($contains($, /0[\\d]/)\t ?$substring($, 1, 1)\t :$\t ).$number()\t }\t }\t}&quot;,&quot;tot&quot;:&quot;jsonata&quot;},{&quot;t&quot;:&quot;delete&quot;,&quot;p&quot;:&quot;statusCode&quot;,&quot;pt&quot;:&quot;msg&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:680,&quot;y&quot;:1815,&quot;wires&quot;:[[&quot;ade0f582.c3f448&quot;,&quot;c748b419.d8f728&quot;,&quot;e44a8090.8bd9&quot;]]},{&quot;id&quot;:&quot;cd67e2fe.a2963&quot;,&quot;type&quot;:&quot;html&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;raw.time.on&quot;,&quot;property&quot;:&quot;payload&quot;,&quot;outproperty&quot;:&quot;raw.time.on&quot;,&quot;tag&quot;:&quot;label[title='Startup'] &lt; a&quot;,&quot;ret&quot;:&quot;text&quot;,&quot;as&quot;:&quot;single&quot;,&quot;x&quot;:520,&quot;y&quot;:1785,&quot;wires&quot;:[[&quot;db621f06.f6a57&quot;]]},{&quot;id&quot;:&quot;34b326ef.80821a&quot;,&quot;type&quot;:&quot;html&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;raw.user&quot;,&quot;property&quot;:&quot;payload&quot;,&quot;outproperty&quot;:&quot;raw.user&quot;,&quot;tag&quot;:&quot;label[title='Startup'] &lt; a&quot;,&quot;ret&quot;:&quot;attr&quot;,&quot;as&quot;:&quot;single&quot;,&quot;x&quot;:510,&quot;y&quot;:1725,&quot;wires&quot;:[[&quot;a644c2e9.2c6c5&quot;]]},{&quot;id&quot;:&quot;db621f06.f6a57&quot;,&quot;type&quot;:&quot;html&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;raw.time.game&quot;,&quot;property&quot;:&quot;payload&quot;,&quot;outproperty&quot;:&quot;raw.time.game&quot;,&quot;tag&quot;:&quot;label[title='Play'] &lt; b&quot;,&quot;ret&quot;:&quot;text&quot;,&quot;as&quot;:&quot;single&quot;,&quot;x&quot;:530,&quot;y&quot;:1815,&quot;wires&quot;:[[&quot;5c042e61.fe2f2&quot;]]},{&quot;id&quot;:&quot;19fd37cd.6a98d8&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;timeOut 3&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;requestTimeout&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;3000&quot;,&quot;tot&quot;:&quot;num&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:345,&quot;y&quot;:1665,&quot;wires&quot;:[[&quot;37a69b40.27b9c4&quot;]],&quot;icon&quot;:&quot;font-awesome/fa-clock-o&quot;,&quot;l&quot;:false},{&quot;id&quot;:&quot;888ac7ca.b05568&quot;,&quot;type&quot;:&quot;http in&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;url&quot;:&quot;/myGames/ps3/status&quot;,&quot;method&quot;:&quot;get&quot;,&quot;upload&quot;:false,&quot;swaggerDoc&quot;:&quot;&quot;,&quot;x&quot;:350,&quot;y&quot;:1620,&quot;wires&quot;:[[&quot;52752ff2.312ae&quot;]]},{&quot;id&quot;:&quot;846d8fc.5440e7&quot;,&quot;type&quot;:&quot;http response&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;statusCode&quot;:&quot;&quot;,&quot;headers&quot;:{},&quot;x&quot;:1080,&quot;y&quot;:1830,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;33504de2.ce22f2&quot;,&quot;type&quot;:&quot;http in&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;url&quot;:&quot;/myGames/ps3/status&quot;,&quot;method&quot;:&quot;post&quot;,&quot;upload&quot;:false,&quot;swaggerDoc&quot;:&quot;&quot;,&quot;x&quot;:345,&quot;y&quot;:1860,&quot;wires&quot;:[[&quot;93517ad1.bbc2d8&quot;]]},{&quot;id&quot;:&quot;8d2580aa.0e3d8&quot;,&quot;type&quot;:&quot;debug&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;active&quot;:true,&quot;tosidebar&quot;:true,&quot;console&quot;:false,&quot;tostatus&quot;:false,&quot;complete&quot;:&quot;true&quot;,&quot;targetType&quot;:&quot;full&quot;,&quot;x&quot;:630,&quot;y&quot;:2025,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;8b752aad.bc6578&quot;,&quot;type&quot;:&quot;http response&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;statusCode&quot;:&quot;&quot;,&quot;headers&quot;:{},&quot;x&quot;:915,&quot;y&quot;:1965,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;fcdfdcfb.61aec&quot;,&quot;type&quot;:&quot;switch&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;action&quot;,&quot;property&quot;:&quot;payload.action&quot;,&quot;propertyType&quot;:&quot;msg&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;eq&quot;,&quot;v&quot;:&quot;drives&quot;,&quot;vt&quot;:&quot;str&quot;},{&quot;t&quot;:&quot;eq&quot;,&quot;v&quot;:&quot;play&quot;,&quot;vt&quot;:&quot;str&quot;},{&quot;t&quot;:&quot;eq&quot;,&quot;v&quot;:&quot;user&quot;,&quot;vt&quot;:&quot;str&quot;},{&quot;t&quot;:&quot;eq&quot;,&quot;v&quot;:&quot;quit&quot;,&quot;vt&quot;:&quot;str&quot;}],&quot;checkall&quot;:&quot;false&quot;,&quot;repair&quot;:false,&quot;outputs&quot;:4,&quot;x&quot;:275,&quot;y&quot;:1950,&quot;wires&quot;:[[&quot;4fcf5540.d6349c&quot;],[&quot;817831a4.5294f&quot;],[&quot;f83a74e9.5492c8&quot;],[&quot;457eb8af.777998&quot;]]},{&quot;id&quot;:&quot;817831a4.5294f&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;play game&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;game&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;$flowContext('games')[id=$$.payload.id]&quot;,&quot;tot&quot;:&quot;jsonata&quot;},{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;url&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;'http://ps3.lan/'\t&amp; 'mount.ps3/unmount;'\t&amp; (\t game.ps3.file.$contains('game/NPUB') \t ? '/play.ps3?' &amp; game.id\t : game.ps3.file\t)&quot;,&quot;tot&quot;:&quot;jsonata&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:490,&quot;y&quot;:1965,&quot;wires&quot;:[[&quot;8d2580aa.0e3d8&quot;,&quot;e96c7f52.ddb69&quot;]]},{&quot;id&quot;:&quot;f83a74e9.5492c8&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;changeUser&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;url&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;'http://ps3.lan'\t&amp;'/browser.ps3$focus_category+user+0.0'\t&amp;';/browser.ps3$focus_index+2+'\t&amp;( payload.name.(\t $='marc'?0\t :$='ben'?1\t :$='mel'?2 \t) )\t&amp;';/wait.ps3?1;/pad.ps3?cross'\t&amp;';/wait.ps3?1;/pad.ps3?cross' \t&amp;';/wait.ps3?2;'&quot;,&quot;tot&quot;:&quot;jsonata&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:490,&quot;y&quot;:1995,&quot;wires&quot;:[[&quot;8d2580aa.0e3d8&quot;,&quot;e96c7f52.ddb69&quot;]]},{&quot;id&quot;:&quot;6e5e21ff.16035&quot;,&quot;type&quot;:&quot;http request&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;ps3CMD&quot;,&quot;method&quot;:&quot;GET&quot;,&quot;ret&quot;:&quot;txt&quot;,&quot;paytoqs&quot;:false,&quot;url&quot;:&quot;&quot;,&quot;tls&quot;:&quot;&quot;,&quot;proxy&quot;:&quot;&quot;,&quot;authType&quot;:&quot;basic&quot;,&quot;x&quot;:810,&quot;y&quot;:1965,&quot;wires&quot;:[[&quot;8b752aad.bc6578&quot;,&quot;340a5767.f7e6f8&quot;]]},{&quot;id&quot;:&quot;e96c7f52.ddb69&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;prep&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;timeout&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;15000&quot;,&quot;tot&quot;:&quot;num&quot;},{&quot;t&quot;:&quot;delete&quot;,&quot;p&quot;:&quot;payload&quot;,&quot;pt&quot;:&quot;msg&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:665,&quot;y&quot;:1965,&quot;wires&quot;:[[&quot;6e5e21ff.16035&quot;]]},{&quot;id&quot;:&quot;340a5767.f7e6f8&quot;,&quot;type&quot;:&quot;debug&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;active&quot;:true,&quot;tosidebar&quot;:true,&quot;console&quot;:false,&quot;tostatus&quot;:false,&quot;complete&quot;:&quot;true&quot;,&quot;targetType&quot;:&quot;full&quot;,&quot;x&quot;:915,&quot;y&quot;:1935,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;457eb8af.777998&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;quit&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;url&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;'http://ps3.lan'\t&amp;'/pad.ps3?psbtn;/wait.ps3?3'\t&amp;';/browser.ps3$focus_segment_index+seg_gameexit+0;/wait.ps3?1'\t&amp;';/pad.ps3?cross;/wait.ps3?1;/pad.ps3?left'\t&amp;';/pad.ps3?cross;/wait.ps3?4'\t&quot;,&quot;tot&quot;:&quot;jsonata&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:470,&quot;y&quot;:2025,&quot;wires&quot;:[[&quot;8d2580aa.0e3d8&quot;,&quot;e96c7f52.ddb69&quot;]]},{&quot;id&quot;:&quot;b81deb9a.f752a8&quot;,&quot;type&quot;:&quot;html&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;raw.disk&quot;,&quot;property&quot;:&quot;payload&quot;,&quot;outproperty&quot;:&quot;raw.disk&quot;,&quot;tag&quot;:&quot;a[href^='/mount.ps3/']&quot;,&quot;ret&quot;:&quot;text&quot;,&quot;as&quot;:&quot;single&quot;,&quot;x&quot;:510,&quot;y&quot;:1695,&quot;wires&quot;:[[&quot;34b326ef.80821a&quot;]]},{&quot;id&quot;:&quot;c748b419.d8f728&quot;,&quot;type&quot;:&quot;switch&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;if http&quot;,&quot;property&quot;:&quot;http&quot;,&quot;propertyType&quot;:&quot;msg&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;true&quot;}],&quot;checkall&quot;:&quot;true&quot;,&quot;repair&quot;:false,&quot;outputs&quot;:1,&quot;x&quot;:830,&quot;y&quot;:1800,&quot;wires&quot;:[[&quot;a6a56f75.c5386&quot;,&quot;c9d83bec.4cc8d8&quot;]]},{&quot;id&quot;:&quot;ade0f582.c3f448&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;mqtt*&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;topic&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;payload.on\t?'ps3/info'\t:'ps3/power'&quot;,&quot;tot&quot;:&quot;jsonata&quot;},{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;payload&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;payload.on\t ?payload.{\t \&quot;playing\&quot;: $exists(playing)?playing.id:'',\t \&quot;disk\&quot;: $exists(disk)?disk.id:'',\t \&quot;img\&quot;: { \&quot;game\&quot;: playing.images.cover ? \&quot;http://192.168.1.62:1880/myGamesDB-img-ps3/\&quot; &amp; playing.images.cover : '',\t \&quot;disk\&quot;: ( disk.images.cover = playing.images.cover ) ? '' :\t \&quot;http://192.168.1.62:1880/myGamesDB-img-ps3/\&quot; &amp; disk.images.cover\t },\t \&quot;temp\&quot;: temp.cpu?temp ,\t \&quot;user\&quot;: user,\t \&quot;time\&quot;: time ~&gt; | $ | {\t },[\&quot;gameARR\&quot;,\&quot;powerARR\&quot;] |\t }\t :'OFF'&quot;,&quot;tot&quot;:&quot;jsonata&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:830,&quot;y&quot;:1860,&quot;wires&quot;:[[&quot;5545b570.a9d00c&quot;,&quot;866d5c53.c95cb&quot;]],&quot;info&quot;:&quot; if \n - payload.on=false\n - topic = `ps3/power`\n - payload = `OFF`\n - else (power=on)\n - topic = `ps3/info`\n - payload = `{json}`\n - ex: `{\&quot;playing\&quot;:\&quot;BLUS30947\&quot;,\&quot;disk\&quot;:\&quot;BLUS30947\&quot;,\&quot;temp\&quot;:{\&quot;cpu\&quot;:63,\&quot;rsx\&quot;:67,\&quot;mem\&quot;:1204,\&quot;hddGBfree\&quot;:77,\&quot;fanSpeed\&quot;:37},\&quot;user\&quot;:{\&quot;id\&quot;:2,\&quot;name\&quot;:\&quot;marc\&quot;,\&quot;icon\&quot;:\&quot;memory\&quot;},\&quot;time\&quot;:{\&quot;power\&quot;:\&quot;0:04:09:48\&quot;,\&quot;game\&quot;:\&quot;0:04:07:18\&quot;,\&quot;seconds\&quot;:{\&quot;power\&quot;:14988,\&quot;game\&quot;:14838}}}`&quot;},{&quot;id&quot;:&quot;aa23f2e1.c2a3c&quot;,&quot;type&quot;:&quot;link out&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;ps3 status - repeat&quot;,&quot;links&quot;:[&quot;acdf35aa.0ae3a8&quot;],&quot;x&quot;:1080,&quot;y&quot;:1725,&quot;wires&quot;:[]},{&quot;id&quot;:&quot;acdf35aa.0ae3a8&quot;,&quot;type&quot;:&quot;link in&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;ps3 status - in&quot;,&quot;links&quot;:[&quot;aa23f2e1.c2a3c&quot;],&quot;x&quot;:300,&quot;y&quot;:1665,&quot;wires&quot;:[[&quot;19fd37cd.6a98d8&quot;]]},{&quot;id&quot;:&quot;5545b570.a9d00c&quot;,&quot;type&quot;:&quot;link out&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;mqtt &gt; ps3/(power/info) &gt; ( off | {json} )&quot;,&quot;links&quot;:[&quot;122dfcde.d4ee03&quot;],&quot;x&quot;:1080,&quot;y&quot;:1905,&quot;wires&quot;:[]},{&quot;id&quot;:&quot;866d5c53.c95cb&quot;,&quot;type&quot;:&quot;debug&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;active&quot;:true,&quot;tosidebar&quot;:true,&quot;console&quot;:false,&quot;tostatus&quot;:false,&quot;complete&quot;:&quot;true&quot;,&quot;targetType&quot;:&quot;full&quot;,&quot;x&quot;:1080,&quot;y&quot;:1860,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;b9e6a60c.914278&quot;,&quot;type&quot;:&quot;switch&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;if on&quot;,&quot;property&quot;:&quot;payload.on&quot;,&quot;propertyType&quot;:&quot;msg&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;true&quot;},{&quot;t&quot;:&quot;false&quot;}],&quot;checkall&quot;:&quot;true&quot;,&quot;repair&quot;:false,&quot;outputs&quot;:2,&quot;x&quot;:830,&quot;y&quot;:1755,&quot;wires&quot;:[[&quot;9c4f5ef0.515f3&quot;,&quot;3806c823.e282d8&quot;,&quot;954424d4.f59048&quot;],[&quot;aa52561b.55b358&quot;,&quot;22b94067.f51b6&quot;]]},{&quot;id&quot;:&quot;3806c823.e282d8&quot;,&quot;type&quot;:&quot;link out&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;du&quot;,&quot;links&quot;:[&quot;1c507e6b.f43872&quot;],&quot;x&quot;:1080,&quot;y&quot;:1665,&quot;wires&quot;:[]},{&quot;id&quot;:&quot;9c4f5ef0.515f3&quot;,&quot;type&quot;:&quot;trigger&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;on/15m&quot;,&quot;op1&quot;:&quot;&quot;,&quot;op2&quot;:&quot;0&quot;,&quot;op1type&quot;:&quot;nul&quot;,&quot;op2type&quot;:&quot;str&quot;,&quot;duration&quot;:&quot;15&quot;,&quot;extend&quot;:true,&quot;units&quot;:&quot;min&quot;,&quot;reset&quot;:&quot;&quot;,&quot;bytopic&quot;:&quot;all&quot;,&quot;outputs&quot;:1,&quot;x&quot;:1020,&quot;y&quot;:1710,&quot;wires&quot;:[[&quot;aa23f2e1.c2a3c&quot;,&quot;309fc9d4.c82106&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;aa52561b.55b358&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;reset&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;true&quot;,&quot;tot&quot;:&quot;bool&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:930,&quot;y&quot;:1770,&quot;wires&quot;:[[&quot;9c4f5ef0.515f3&quot;]],&quot;icon&quot;:&quot;font-awesome/fa-refresh&quot;,&quot;l&quot;:false},{&quot;id&quot;:&quot;22b94067.f51b6&quot;,&quot;type&quot;:&quot;trigger&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;off/1h&quot;,&quot;op1&quot;:&quot;&quot;,&quot;op2&quot;:&quot;0&quot;,&quot;op1type&quot;:&quot;nul&quot;,&quot;op2type&quot;:&quot;str&quot;,&quot;duration&quot;:&quot;1&quot;,&quot;extend&quot;:true,&quot;units&quot;:&quot;hr&quot;,&quot;reset&quot;:&quot;&quot;,&quot;bytopic&quot;:&quot;all&quot;,&quot;outputs&quot;:1,&quot;x&quot;:1020,&quot;y&quot;:1755,&quot;wires&quot;:[[&quot;aa23f2e1.c2a3c&quot;,&quot;9cf19a9.2debc68&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;954424d4.f59048&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;reset&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;true&quot;,&quot;tot&quot;:&quot;bool&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:930,&quot;y&quot;:1695,&quot;wires&quot;:[[&quot;22b94067.f51b6&quot;]],&quot;icon&quot;:&quot;font-awesome/fa-refresh&quot;,&quot;l&quot;:false},{&quot;id&quot;:&quot;9cf19a9.2debc68&quot;,&quot;type&quot;:&quot;debug&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;active&quot;:true,&quot;tosidebar&quot;:true,&quot;console&quot;:false,&quot;tostatus&quot;:false,&quot;complete&quot;:&quot;true&quot;,&quot;targetType&quot;:&quot;full&quot;,&quot;x&quot;:1080,&quot;y&quot;:1755,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;309fc9d4.c82106&quot;,&quot;type&quot;:&quot;debug&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;active&quot;:true,&quot;tosidebar&quot;:true,&quot;console&quot;:false,&quot;tostatus&quot;:false,&quot;complete&quot;:&quot;true&quot;,&quot;targetType&quot;:&quot;full&quot;,&quot;x&quot;:1080,&quot;y&quot;:1695,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;a644c2e9.2c6c5&quot;,&quot;type&quot;:&quot;html&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;raw.temps&quot;,&quot;property&quot;:&quot;payload&quot;,&quot;outproperty&quot;:&quot;raw.temps&quot;,&quot;tag&quot;:&quot;#content a.s&quot;,&quot;ret&quot;:&quot;html&quot;,&quot;as&quot;:&quot;single&quot;,&quot;x&quot;:510,&quot;y&quot;:1755,&quot;wires&quot;:[[&quot;cd67e2fe.a2963&quot;]]},{&quot;id&quot;:&quot;8462f74d.ca80d8&quot;,&quot;type&quot;:&quot;catch&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;scope&quot;:[&quot;af252bd3.089918&quot;,&quot;37a69b40.27b9c4&quot;],&quot;uncaught&quot;:false,&quot;x&quot;:330,&quot;y&quot;:1725,&quot;wires&quot;:[[&quot;21e11836.c4bf08&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;21e11836.c4bf08&quot;,&quot;type&quot;:&quot;debug&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;active&quot;:true,&quot;tosidebar&quot;:true,&quot;console&quot;:false,&quot;tostatus&quot;:false,&quot;complete&quot;:&quot;true&quot;,&quot;targetType&quot;:&quot;full&quot;,&quot;x&quot;:375,&quot;y&quot;:1725,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;52752ff2.312ae&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;http&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;http&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;true&quot;,&quot;tot&quot;:&quot;bool&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:480,&quot;y&quot;:1620,&quot;wires&quot;:[[&quot;19fd37cd.6a98d8&quot;]],&quot;icon&quot;:&quot;node-red/white-globe.svg&quot;,&quot;l&quot;:false,&quot;info&quot;:&quot;set msg.http=true to seperate reKicks from requests (that should reach the out node)&quot;},{&quot;id&quot;:&quot;a6a56f75.c5386&quot;,&quot;type&quot;:&quot;debug&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;active&quot;:true,&quot;tosidebar&quot;:true,&quot;console&quot;:false,&quot;tostatus&quot;:false,&quot;complete&quot;:&quot;true&quot;,&quot;targetType&quot;:&quot;full&quot;,&quot;x&quot;:1080,&quot;y&quot;:1800,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;e44a8090.8bd9&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;!http&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;delete&quot;,&quot;p&quot;:&quot;http&quot;,&quot;pt&quot;:&quot;msg&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:720,&quot;y&quot;:1755,&quot;wires&quot;:[[&quot;b9e6a60c.914278&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;c9d83bec.4cc8d8&quot;,&quot;type&quot;:&quot;subflow:2b873668.7e882a&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;x&quot;:990,&quot;y&quot;:1830,&quot;wires&quot;:[[&quot;846d8fc.5440e7&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;4fcf5540.d6349c&quot;,&quot;type&quot;:&quot;http request&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;ps3&quot;,&quot;method&quot;:&quot;GET&quot;,&quot;ret&quot;:&quot;txt&quot;,&quot;paytoqs&quot;:&quot;ignore&quot;,&quot;url&quot;:&quot;http://ps3.lan/&quot;,&quot;tls&quot;:&quot;&quot;,&quot;persist&quot;:false,&quot;proxy&quot;:&quot;&quot;,&quot;authType&quot;:&quot;basic&quot;,&quot;x&quot;:435,&quot;y&quot;:1920,&quot;wires&quot;:[[&quot;2777a12c.77559e&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;2777a12c.77559e&quot;,&quot;type&quot;:&quot;html&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;du&quot;,&quot;property&quot;:&quot;payload&quot;,&quot;outproperty&quot;:&quot;hdd.ext.du&quot;,&quot;tag&quot;:&quot;a[href=\&quot;/dev_ntfs0\&quot;] &lt; td + td div a&quot;,&quot;ret&quot;:&quot;attr&quot;,&quot;as&quot;:&quot;single&quot;,&quot;x&quot;:515,&quot;y&quot;:1920,&quot;wires&quot;:[[&quot;90fb5eca.0600b&quot;]]},{&quot;id&quot;:&quot;90fb5eca.0600b&quot;,&quot;type&quot;:&quot;html&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;hdd.int.du&quot;,&quot;property&quot;:&quot;payload&quot;,&quot;outproperty&quot;:&quot;hdd.int.du&quot;,&quot;tag&quot;:&quot;a[href=\&quot;/dev_hdd0\&quot;] &lt; td + td div a&quot;,&quot;ret&quot;:&quot;attr&quot;,&quot;as&quot;:&quot;single&quot;,&quot;x&quot;:585,&quot;y&quot;:1920,&quot;wires&quot;:[[&quot;10bc5b03.a5f845&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;10bc5b03.a5f845&quot;,&quot;type&quot;:&quot;html&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;netFS&quot;,&quot;property&quot;:&quot;payload&quot;,&quot;outproperty&quot;:&quot;netfs&quot;,&quot;tag&quot;:&quot;a[href=\&quot;/net0\&quot;]&quot;,&quot;ret&quot;:&quot;text&quot;,&quot;as&quot;:&quot;single&quot;,&quot;x&quot;:630,&quot;y&quot;:1920,&quot;wires&quot;:[[&quot;5bb6137a.70920c&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;52b71a91.2af6a4&quot;,&quot;type&quot;:&quot;debug&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;active&quot;:true,&quot;tosidebar&quot;:true,&quot;console&quot;:false,&quot;tostatus&quot;:false,&quot;complete&quot;:&quot;true&quot;,&quot;targetType&quot;:&quot;full&quot;,&quot;statusVal&quot;:&quot;&quot;,&quot;statusType&quot;:&quot;auto&quot;,&quot;x&quot;:1080,&quot;y&quot;:1935,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;2ae40f92.ae8b6&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;output&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;payload&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot; hdd ~&gt; | $.* | {\t \&quot;free\&quot;: \t du.title\t .$match(/free \\(([0-9,]*) b/).groups[0]\t .$replace(',','')\t .$number()\t / $power(1000, 3) ~&gt; $round() ,\t \&quot;size\&quot;: \t du.title\t .$match(/\\(([0-9,]*) b\\)$/).groups[0]\t .$replace(',','')\t .$number() \t / $power(1000, 3) ~&gt; $round() \t},[\&quot;du\&quot;] |\t ~&gt; | $.* | {\t \&quot;percent\&quot;: 100 - ( free * 100 / size ).$round()\t} |&quot;,&quot;tot&quot;:&quot;jsonata&quot;},{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;payload.netfs&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;$exists(netfs[0]) ? nfs : false&quot;,&quot;tot&quot;:&quot;jsonata&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:855,&quot;y&quot;:1920,&quot;wires&quot;:[[&quot;52b71a91.2af6a4&quot;,&quot;c9d83bec.4cc8d8&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;139e188c.4c5947&quot;,&quot;type&quot;:&quot;debug&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;active&quot;:false,&quot;tosidebar&quot;:true,&quot;console&quot;:false,&quot;tostatus&quot;:true,&quot;complete&quot;:&quot;true&quot;,&quot;targetType&quot;:&quot;full&quot;,&quot;statusVal&quot;:&quot;payload.action&quot;,&quot;statusType&quot;:&quot;msg&quot;,&quot;x&quot;:540,&quot;y&quot;:1860,&quot;wires&quot;:[],&quot;l&quot;:false},{&quot;id&quot;:&quot;93517ad1.bbc2d8&quot;,&quot;type&quot;:&quot;json&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;&quot;,&quot;property&quot;:&quot;payload&quot;,&quot;action&quot;:&quot;obj&quot;,&quot;pretty&quot;:false,&quot;x&quot;:495,&quot;y&quot;:1860,&quot;wires&quot;:[[&quot;fcdfdcfb.61aec&quot;,&quot;139e188c.4c5947&quot;]],&quot;l&quot;:false},{&quot;id&quot;:&quot;5bb6137a.70920c&quot;,&quot;type&quot;:&quot;exec&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;command&quot;:&quot;df /nfs/mb/media/zosky/cb4/afterDark/ | tail -1&quot;,&quot;addpay&quot;:false,&quot;append&quot;:&quot;&quot;,&quot;useSpawn&quot;:&quot;false&quot;,&quot;timer&quot;:&quot;&quot;,&quot;oldrc&quot;:false,&quot;name&quot;:&quot;du netFS&quot;,&quot;x&quot;:720,&quot;y&quot;:1920,&quot;wires&quot;:[[&quot;6131d512.a5ed7c&quot;],[],[]]},{&quot;id&quot;:&quot;6131d512.a5ed7c&quot;,&quot;type&quot;:&quot;change&quot;,&quot;z&quot;:&quot;ede2087b.985298&quot;,&quot;name&quot;:&quot;inject&quot;,&quot;rules&quot;:[{&quot;t&quot;:&quot;set&quot;,&quot;p&quot;:&quot;nfs&quot;,&quot;pt&quot;:&quot;msg&quot;,&quot;to&quot;:&quot;payload.$split(' ')[$]{\t 'free': $round($number($[3])/(1024*1024) ),\t 'used': $round($number($[2])/(1024*1024) ),\t 'size': $round($number($[1])/(1024*1024) ),\t 'percent': $round($number($[2])*100/$number($[1]))\t}&quot;,&quot;tot&quot;:&quot;jsonata&quot;}],&quot;action&quot;:&quot;&quot;,&quot;property&quot;:&quot;&quot;,&quot;from&quot;:&quot;&quot;,&quot;to&quot;:&quot;&quot;,&quot;reg&quot;:false,&quot;x&quot;:810,&quot;y&quot;:1920,&quot;wires&quot;:[[&quot;2ae40f92.ae8b6&quot;]],&quot;l&quot;:false}]</pre
          >
          <li>save URL till 4.iv</li>
        </ul>
      </li>
      <li>
        make the app
        <ul class="ml-2 list-disc">
          <li>fork the repo</li>
          <li>
            add json from step one to
            <span>/src/store/[list|data].json</span>
          </li>
          <li>
            add assets (f/skyScraper) to
            <span>/public/images/*/[gameID].png</span>
          </li>
          <li>
            set the API-URL at <span>/src/store/index.json:data.api</span>
          </li>

          <li>compile and publish to <span>gh-pages</span> banch</li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script>
import { computed, reactive, toRefs, inject } from "vue";
import nodeRedApiPng from "/src/assets/screens/nodeRed-api.png";
export default {
  name: "ps3howTo",
  components: {},
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      nodeRedApiPng: nodeRedApiPng,
      thisIX: 0,
      maxIX: computed(() => dataStore?.data?.games?.length),
      jsonGame: computed(() => dataStore?.data?.games[state.thisIX]),
      showJson: {
        games: false,
        data: false,
        APIget: false,
        nodeRedAPI: false,
      },
    });
    return { ...toRefs(state) };
  },
};
</script>

<style scoped>
ul {
  list-style-type: lower-roman;
  font-size: 0.75rem;
}
ul span {
  font-weight: bold;
}
</style>
