import Vue from 'vue'
import ViewUI from 'view-design';
import App from './App.vue'
import 'view-design/dist/styles/iview.css';
import './libs/custom.css';
import VueRouter from 'vue-router';
import Routers from './router';
import {title} from './libs/util';
import { layoutConfig } from "./libs/layoutConfig";

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ViewUI);
const RouterConfig = {
  mode: 'hash',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

let first = true;
router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  // location.hash = `#${to.fullPath}`;
  console.log(`to = ${to}`);
  if (first) {
    first = false;
  } else {
    layoutConfig.defaultPath(to.fullPath);
  }
  title(to.meta.title);
  next();
});

router.afterEach((/*to, from, next*/) => {
  ViewUI.LoadingBar.finish();
  window.scrollTo(0, 0);
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  mounted() {
    // window.Env = Env;
  }
});