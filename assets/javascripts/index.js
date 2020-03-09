import Turbolinks from "turbolinks"
import '../stylesheets/main.css';
import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm.js';
import './events/flash-delete-button.js';
import './components/complaints-date-select.js';
import './components/new-complaint-form.js';

Turbolinks.start()
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  new Vue({
    el: "#app",
  });
});
