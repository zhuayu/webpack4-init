// Less
import './../less/app.less';

// ES6 
import printMe from './print.js';
printMe();

// Vue
import Vue from 'vue'
import App from './app.vue'
new Vue({
  el: '#app',
  render:h=>h(App)
})