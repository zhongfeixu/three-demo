import Vue from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import './styles/index.scss'
Vue.use(ElementUI);

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
