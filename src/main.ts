import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css"
import router from "./plugins/router.ts";
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.mount("#app");
