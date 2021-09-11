<template>
  <div class="p-3 m-2">
    <div class="text-lg font-bold border-b border-blue-300">
      easy as 1, 2, 3...
    </div>
    <ol type="1" class="list-decimal p-3 pt-0 ml-2">
      <admin-li>
        <template #title>
          for this app to do any <em>commendering</em><br />
          <div class="text-sm leading-none">
            like get your console's status, your users, and mount your disks...
          </div>
        </template>
        <template #col>
          <ul>
            <li>
              <b> you will need:</b>
              <ul class="pl-4">
                <li class="list-disc">a JB'd ps3</li>
                <li class="list-disc">the amazing webManMod</li>
                <li class="list-disc">
                  and an API that can respond to this app
                  <ul class="list-disc ml-2">
                    <li>
                      <details>
                        <summary
                          class="
                            text-blue-800
                            font-serif
                            border-b border-blue-200
                          "
                        >
                          listen for GET/POST - tell webManMod - respond w/JSON:
                        </summary>
                        <ul class="ml-2">
                          <li>
                            <details>
                              <summary class="text-blue-900" v-text="`GET`" />
                              <ul class="pl-2">
                                <li class="list-disc">
                                  <Ethernet
                                    class="inline-block text-red-500 mb-1"
                                  />
                                  IF <b>(on=false)</b>: the rest is ignored
                                </li>
                                <li class="list-disc">
                                  <LanDisconnect
                                    class="inline-block text-blue-500"
                                  />
                                  IF <b>ERROR</b> (~403/404...) = WANmode
                                </li>
                                <li class="list-disc">
                                  JSON:
                                  <pre class="text-xs bg-blue-200 p-4">
{
    "on": true,
    "temp": {
        "cpu": 66,
        "rsx": 68,
        "mem": 1900,
        "fanSpeed": 30
    },
    "user": {
        "id": 1,
        "name": "no one",
        "icon": "lock"
    },
    "time": {
        "seconds": {
            "power": 975,
            "game": 0
        }
    }
}</pre
                                  >
                                </li>
                              </ul>
                            </details>
                          </li>
                          <li>
                            <details>
                              <summary class="text-blue-900">
                                POST:{action:"HDD"}
                              </summary>
                              Responde:
                              <pre class="text-xs bg-blue-200 p-4">
{
  "ext": {
    "free": 73,
    "size": 1000,
    "percent": 93
  },
  "int": {
    "free": 61,
    "size": 308,
    "percent": 80
  },
  "netfs": {
    "free": 49,
    "used": 3618,
    "size": 3667,
    "percent": 99
  }
}</pre
                              >
                            </details>
                          </li>
                          <li>
                            <details>
                              <summary>
                                <span class="text-blue-900">TODO(doc):</span>
                                POST:{action:user,name:name}
                              </summary>
                            </details>
                          </li>
                          <li>
                            <details>
                              <summary>
                                <span class="text-blue-900">TODO(doc):</span>
                                POST:{action:mount,id:gameID}
                              </summary>
                            </details>
                          </li>

                          <details>
                            <summary>
                              hint: check out my node-red flow<em />
                            </summary>
                            <div class="text-blue-800 pl-6">
                              <ul class="">
                                <li>
                                  wMM@ps3 should be @
                                  <span>http://ps3.lan/</span>
                                </li>
                                <li>
                                  some link destinations (like mqtt flows) are
                                  not in scope here
                                </li>
                              </ul>
                            </div>
                            <details class="ml-3">
                              <summary>flow.JSON</summary>
                              <pre
                                v-text="nrFlow"
                                class="bg-blue-300 p-2 overflow-scroll h-80"
                              />
                            </details>
                            <img
                              :src="nodeRedApiPng"
                              alt="apiScreenshot"
                              class="mix-blend-multiply pb-2"
                            />
                          </details>
                        </ul>
                      </details>
                    </li>
                    <li>
                      plus return a CORS header for this domain:
                      <b>{{ hostName }}</b>
                    </li>
                    <li>
                      <details>
                        <summary>
                          <span>SUGGESTED: lock it down to LAN only</span>
                          (/aka: <em>be here</em> )
                        </summary>

                        <div>hint: proxy with apach2</div>
                        <pre class="bg-blue-200 p-3">
  ProxyPass /ps3commanderAPI "http://LOCAL-IP:PORT/API/PATH"
  ProxyPassReverse /ps3commanderAPI "http://LOCAL-IP:PORT/API/PATH"
  &lt;Proxy *>
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
              </ul>
            </li>
            <li>
              set your APIurl
              <em v-if="APIurl && APIurl != 'demo'">["{{ APIurl }}"]</em>
            </li>
            <li
              v-if="APIurl != 'demo'"
              class="text-blue-500 cursor-pointer"
              @click="gogoDemo()"
            >
              <span>or try demo mode</span> (APIurl=demo)
            </li>
          </ul>
        </template>
      </admin-li>
      <admin-li class="pt-2">
        <template #title> browse your games </template>
        <template #row>
          <div class="flex flex-row align-middle text-sm gap-1">
            by smashing
            <my-svg i="ps3" class="h-6" />
            or
            <my-svg i="snes" class="h-6" />
            in the corner ... then again on a game
          </div>
        </template>
      </admin-li>
      <admin-li class="pt-2">
        <template #title> mount and play </template>
        <template #row>
          <div>TODO</div>
        </template>
      </admin-li>

      <admin-li>
        <template #title
          >if you want to host this app locally, look under the hood, or
          contribute</template
        >
        <template #row>
          <span class="text-sm"
            >clone the
            <a
              href="https://github.com/zosky/ps3commander"
              target="_blank"
              class="underline px-1 text-blue-600"
              >git repo</a
            >
            and make it more awesome
          </span></template
        >
      </admin-li>
    </ol>
  </div>
</template>

<script>
import { computed, reactive, toRefs, inject } from "vue";
import adminLi from "../components/adminHowToLI.vue";
import { LanDisconnect, Ethernet } from "mdue";
import nodeRedApiPng from "/src/assets/screens/nodeRed-api.png";
import nrXmlJSON from "/src/assets/nodeRed/xml-to-json.json";
import nrFlow from "@/assets/nodeRed/api.json";
export default {
  name: "howTo",
  components: {
    adminLi,
    LanDisconnect,
    Ethernet,
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
      hostName: window.location.hostname,
      APIurl: computed(
        () => dataStore.data?.API && dataStore.data?.API,
        "not set yet"
      ),
      gogoDemo: () => (dataStore.data.API = "demo"),
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
