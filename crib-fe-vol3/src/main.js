import Vue from 'vue'
import App from './App.vue'
import router from './routes/route'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {getCredentials} from "./services/authFetch";

Vue.use(ElementUI)
Vue.config.productionTip = false



new Vue({
    useEslint: false,
    router,
    render:
        h => h(App)
}).$mount('#app')
