<template>
  <div class="p-3 m-2">
    <div class="text-lg font-bold border-b border-blue-300">
      easy as 1, 2, 3, 4...
    </div>
    <ol type="1" class="list-decimal p-3 pt-0 ml-2">
      <admin-li class="pt-2">
        <template #title> browse and favorite some ps3 games </template>
        <template #row>
          <ul class="ml-2">
            <admin-li>
              <template #row>
                smash
                <my-svg i="gameTDB" class="h-4" />
                @ top-right
              </template>
            </admin-li>
            <admin-li>
              <template #col>
                <div class="flex flex-row">
                  search, and click to add/rm (
                  <StarCheck class="text-lg text-blue-500" /> /
                  <StarCheckOutline class="text-lg text-blue-500" />) from your
                  collection
                </div>
                <div class="transform scale-75 origin-left -my-1">
                  or manually: set
                  <b class="font-mono">
                    localStorage.myFavs = ["diskID1","diskID2","diskID3",...]
                  </b>
                </div>
              </template>
            </admin-li>
            <admin-li>
              <template #row>
                view only your favorites from the top (
                <StarCircle class="text-lg text-blue-500" />/
                <StarCircleOutline class="text-lg text-blue-500" />
                )
              </template>
            </admin-li>
            <admin-li>
              <template #row>
                toggle <b class="mx-0.5"> localList </b>mode [
                <Earth class="text-lg text-blue-500" />
                /
                <HomeAccount class="text-lg text-blue-500" />
                ] for additional filters
              </template>
              <template #col>
                <span class="text-purple-500">
                  TODO: allow customization here
                </span>
              </template>
            </admin-li>
            <admin-li class="text-purple-500">
              <template #row>
                <b>TODO: view games</b>
              </template>
            </admin-li>
          </ul>
        </template>
      </admin-li>
      <admin-li>
        <template #title>smash a ps3 </template>
        <template #row> theres not much to see here otherwise </template>
      </admin-li>
      <li class="pt-2">
        <span class="text-blue-800 font-serif border-b border-blue-200">
          <b> you will need an API</b>
          for this thing to do any <em>commendering</em>
        </span>

        <ul class="list-disc ml-2">
          <li>it should scrape webManMod html into JSON</li>
          <li>and return a proper CORS header for this domain</li>
        </ul>
      </li>
      <li class="pt-2">
        <span class="text-blue-800 font-serif border-b border-blue-200">
          smash a ps3
        </span>
        <ul class="ml-2">
          <li>
            <span
              >the rest is pretty useless without one running webManMod</span
            >
          </li>
          <li>ask google, then continue</li>
        </ul>
      </li>
      <li class="pt-2">
        <span class="text-blue-800 font-serif border-b border-blue-200">
          get meta (and assets), make json:
        </span>
        <ul class="ml-2">
          <li>
            <details>
              <summary>
                Structure:gamesList.json<br />
                <em> hint: try skyScraper to get assets and meta </em>
              </summary>
              <details>
                <summary>use nodeRed to make json from xml</summary>
                <pre class="p-4 bg-blue-300" v-text="nrXmlJSON" />
              </details>
              <div class="grid grid-cols-2">
                <pre class="bg-blue-200 p-3 overflow-x-scroll">{{
                  jsonGame
                }}</pre>
                <div class="font-bold p-3 bg-blue-300 overflow-x-scroll">
                  {
                  <span class="block ml-3 font-bold"
                    >"id": "unique-disk-id",</span
                  >

                  <span class="block ml-3 font-bold"
                    >"name":"used to search",</span
                  >
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
            </details>
          </li>

          <li>
            <details>
              <summary>
                Structure:navData.json
                <br /><em> hint: try jq to make it make it match </em>
              </summary>
              <pre class="bg-blue-200 p-3">
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
          </pre
              >
            </details>
          </li>
        </ul>
      </li>
      <li class="pt-2">
        <span class="text-blue-800 font-serif border-b border-blue-200">
          roll the backEnd
        </span>
        <ul class="ml-2">
          <li>
            make an API endPoint using your weapon of choice
            <details>
              <summary v-text="`GET response example`" />
              <pre>
{
    "on":[true|false],
    "temp":{},
    "user":{"name","icon"},
    "time":{ "seconds":{ "power":0, "game":0 }}
}
                  </pre
              >
            </details>
            <details>
              <summary>
                <span class="text-blue-900">TODO(doc):</span> POST:{action:HDD}
              </summary>
            </details>
            <details>
              <summary>
                <span class="text-blue-900">TODO(doc):</span>
                POST:{action:mount,id:diskID}
              </summary>
            </details>
            <details>
              <summary>
                <span class="text-blue-900">TODO(doc):</span>
                POST:{action:user,name:name}
              </summary>
            </details>
            <details>
              <summary>hint: check out my node-red flow<em /></summary>
              <div class="text-blue-800">
                <ul class="ml-2">
                  <li>wMM@ps3 should be @ <span>http://ps3.lan/</span></li>
                  <li>
                    CORS subflow <span>need adjusting</span> for
                    <span>CORS headers</span>
                  </li>
                  <li>
                    some links (like to smartHome w/mqtt) are
                    <span>also not included</span>
                  </li>
                </ul>
              </div>
              <img
                :src="nodeRedApiPng"
                alt="apiScreenshot"
                class="mix-blend-multiply pb-2"
              />
              <details>
                <summary>flow.JSON</summary>
                <pre
                  v-text="nrFlow"
                  class="bg-blue-300 p-2 overflow-scroll h-80"
                />
              </details>
            </details>

            <details>
              <summary>
                <span>lock it down to LAN only</span>
                (/aka: <em>be here</em> )
              </summary>

              <div>hint: proxy with apach2</div>
              <pre class="bg-blue-200 p-3">
  ProxyPass /ps3commanderAPI "http://LOCAL-IP:PORT/API/PATH"
  ProxyPassReverse /ps3commanderAPI "http://LOCAL-IP:PORT/API/PATH"
  &lt;proxy%3E Proxy *>
      Order deny,allow
      Deny from all
      Require ip 192.168.1.0/24
      Satisfy Any
  &lt;/proxy></pre
              >
            </details>
          </li>
        </ul>
      </li>
      <li class="pt-2">
        <span class="text-blue-800 font-serif border-b border-blue-200">
          make the app
        </span>
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
          <li>set vars in .env.[PROD|DEV]</li>
          <li>push > github action will build and publish gh-pages</li>
          <li>(ONCE:) set pages to branch=gh-pages and folder=/</li>
        </ul>
      </li>
      <li>
        <b>but i want it on my LAN:</b> go for it ...
        <ul class="ml-2">
          <li class="list-disc">clone the gh-pages branch (the last build)</li>
          <li class="list-disc">
            put it in <span class="font-mono">$WEBROOT/ps3commander/</span>
          </li>
          <li class="list-disc">
            OR clone the main branch, then
            <div class="font-mono font-normal mx-2">
              <div>npm install</div>
              <div>npm build</div>
              <div>#deploy to local webServer</div>
            </div>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script>
import { computed, reactive, toRefs, inject } from "vue";
import adminLi from "../components/adminHowToLI.vue";
import {
  // DiscPlayer,
  // ServerNetwork,
  // Application,
  StarCheckOutline,
  StarCheck,
  // HelpRhombusOutline,
  StarCircle,
  StarCircleOutline,
  HomeAccount,
  Earth,
} from "mdue";
import nodeRedApiPng from "/src/assets/screens/nodeRed-api.png";
import nrXmlJSON from "/src/assets/nodeRed/xml-to-json.json";
import nrFlow from "@/assets/nodeRed/api.json";
export default {
  name: "howTo",
  components: {
    adminLi,
    StarCircle,
    StarCircleOutline,
    StarCheckOutline,
    StarCheck,
    HomeAccount,
    Earth,
  },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      nodeRedApiPng: nodeRedApiPng,
      nrFlow: nrFlow,
      nrXmlJSON: nrXmlJSON,
      thisIX: 0,
      maxIX: computed(() => dataStore?.data?.games?.length),
      jsonGame: computed(() => dataStore?.data?.games[state.thisIX]),
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

ol > li::marker {
  list-style-position: outside;
  color: rgb(30, 64, 175); /* Change the color */
  font-weight: bold;
}
</style>
