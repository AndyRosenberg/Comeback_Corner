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
    <div>
      <form action="/complaints" method="POST">
        <vue-tags-input
          v-model="tag"
          :tags="tags"
          :tags.sync="tags"
          @tags-changed="update"
        />

        <input type="hidden" v-for="cc of bcc" name="bcc[]" :value="cc" />
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="targets" placeholder="Targets" />
        <textarea name="body" placeholder="Voice your complaint" required></textarea>
        <button type="submit">Post</button>
      </form>
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