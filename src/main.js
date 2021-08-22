import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import "./assets/tailwind.css";

let app = createApp(App);
app.config.globalProperties.$moment = moment;
app.use(router).mount("#app");
