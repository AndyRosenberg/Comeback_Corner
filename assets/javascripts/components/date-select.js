import Vue from 'vue/dist/vue.esm.js';
import axios from 'axios';

Vue.component('complaints-date-select', {
  data() {
    return {
      items: [7, 30, 60, 365],
      complaints: null,
    };
  },
  template: `
    <div>
      <div class="select is-dark is-fullwidth">
        <select @change="fetchData($event)">
          <option value="" selected>All Time</option>
          <option v-for="item of items" :value="item">Last {{item}} Days</option>
        </select>
      </div>
      <section>
        <div class="hero-body">
          <div class="container" id="feed-sections">
            <section class="section" v-for="complaint of complaints">
              <div class="columns is-variable is-8">
                <div class="column is-5 is-offset-1 ">
                  <div class="content is-medium">
                    <h2 class="subtitle is-5 has-text-grey">{{complaint.created_at}}</h2>
                    <h1 class="title has-text-white is-3">{{complaint.title}}</h1>
                    <h5 class="has-text-grey-light is-5" v-if="complaint.target">
                      Target: <span class="has-text-grey-lighter">{{complaint.target}}</span>
                    </h5>
                  </div>
                </div>
                <div class="column is-5">
                  <div class="content is-medium">
                    <pre>{{complaint.body}}</pre>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  `,
  methods: {
    fetchData(e) {
      let value = e ? e.target.value : "";
      axios.get('/complaints', { params: { days_ago: value } }).then(response => {
        this.complaints = response.data;
      });
    }
  },
  created() {
    this.fetchData();
  }
});
