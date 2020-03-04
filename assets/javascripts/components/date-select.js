import Vue from 'vue/dist/vue.esm.js';
import axios from 'axios';

Vue.component('complaints-date-select', {
  data() {
    return {
      items: [1, 2, 3, 4],
      complaints: null,
    };
  },
  template: `
    <div>
      <div class="select is-info is-fullwidth">
        <select @change="fetchData($event)">
          <option v-for="item of items" :value="item">{{item}}</option>
        </select>
      </div>

      <ul id="categories">
        <li v-for="complaint of complaints">
          <h4>{{complaint.title}}</h4>
          <p>{{complaint.target}}</p>
          <pre>{{complaint.body}}</pre>
        </li>
      </ul>
    </div>
  `,
  methods: {
    fetchData(e) {
      let value = e.target.value;
      axios.get('/complaints', { params: { dist: this.dist } }).then(response => {
        this.complaints = response.data;
      });
    }
  }
});
