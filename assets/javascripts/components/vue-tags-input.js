import Vue from 'vue/dist/vue.esm.js';
import VueTagsInput from '@johmun/vue-tags-input';

Vue.component('vuetagsinput', {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      bcc: null,
    };
  },
  template: `
    <div class="hero is-fullheight is-dark">
      <section class="hero is-halfheight">
        <div class="hero-body">
          <div class="container">
            <div class="section columns is-centered is-6">
              <h1 class="has-text-white title is-1">Stand up for yourself</h1>
            </div>
            <div class="columns is-centered">
              <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="/complaints" method="POST">
                  <div class="field">
                    <label for="" class="label has-text-white">Title</label>
                    <div class="control has-icons-left">
                      <input type="text" name="title" placeholder="Briefly describe the complaint." class="input" required>
                    </div>
                  </div>
      
                  <div class="field">
                    <label for="target" class="label has-text-white">Target</label>
                    <div class="control has-icons-left">
                      <input type="text" name="target" placeholder="Who is the complaint about?" class="input" required>
                    </div>
                  </div>
                  
                  <div class="field">
                    <label for="bcc[]" class="label has-text-white">BCC</label>
                    <div class="control has-icons-left">
                      <vue-tags-input
                        v-model="tag"
                        placeholder="Add valid emails to send anonymously."
                        :tags="tags"
                        :tags.sync="tags"
                        @tags-changed="update"
                      />
                    </div>
                  </div>
                  
                  <div class="field">
                    <label for="body" class="label has-text-white">Complaint</label>
                    <div class="control has-icons-left">
                      <textarea name="body" placeholder="Voice your complaint." required></textarea>
                    </div>
                  </div>
                  
      
                  <div class="field">
                    <button class="button is-success">
                      Take the power back!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  methods: {
    update(newTags) {
      newTags = this.emegexFiltered(newTags);
      this.tags = newTags;
      this.bcc = newTags;
    },

    emegexFiltered(newTags) {
      return newTags.map(tag => tag.text).filter(tag => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(tag);
      });
    }
  }

});