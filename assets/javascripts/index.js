import Turbolinks from "turbolinks"
import '../stylesheets/main.css';
import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm.js';
import './components/date-select.js';
import './components/vue-tags-input.js';

Turbolinks.start()
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  new Vue({
    el: "#app",
  });
});
