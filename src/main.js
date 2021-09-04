import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import "./assets/tailwind.css";
import dataStore from "./store/";
import mySvg from "@/components/svgIcons.vue";
import myPie from "@/components/svgPie.vue";
let app = createApp(App);
app.config.globalProperties.$moment = moment;
app
  .use(router)
  .provide("moment", moment)
  .provide("$dataStore", dataStore)
  .component(mySvg, myPie)
  .mount("#app");
