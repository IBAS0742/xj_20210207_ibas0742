import Vue from 'vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './libs/custom.css';
import {title} from './libs/util';
import { layoutConfig } from "./libs/layoutConfig";

import App from './views/testIndex'
Vue.use(ViewUI);

new Vue({
    el: '#app',
    render: h => h(App),
    mounted() {
        // window.Env = Env;
    }
});