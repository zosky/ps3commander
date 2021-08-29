import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import "./assets/tailwind.css";
import dataStore from "./store/";
let app = createApp(App);
app.config.globalProperties.$moment = moment;
app
  .use(router)
  .provide("moment", moment)
  .provide("$dataStore", dataStore)
  .mount("#app");
