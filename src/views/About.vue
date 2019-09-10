<template>
  <div class="about">
    <div class="todo-holder">
      <transition-group name="fadeUp" tag="ul">
        <li v-for="todo in histories" :key="todo.id">
          {{ todo.todo }}
          <button @click="deleted(todo.id)">Delete</button>
        </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "about",
  data() {
    return {
      histories: []
    }
  },
  methods: {
    async history() {
      const response = await axios.post('http://localhost/todo/todo/histories');
      this.histories = response.data;
    },
    async deleted(id) {
      this.$Progress.start();
      const response = await axios.post('http://localhost/todo/todo/delete?id='+ id);
      this.histories.splice(this.histories.indexOf(id), 1);
      this.$Progress.finish();
      this.history();
    },
    start () {
      this.$Progress.start()
    },
    set (num) {
      this.$Progress.set(num)
    },
    increase (num) {
      this.$Progress.increase(num)
    },
    decrease (num) {
      this.$Progress.decrease(num)
    },
    finish () {
      this.$Progress.finish()
    },
    fail () {
      this.$Progress.fail()
    },
  },
  async mounted() {
    this.history();
  }
}
</script>
<style lang="scss" scoped>
@import 'node_modules/vue2-animate/src/sass/vue2-animate.scss';
body {
  font-size: 16px;
  line-height: 1.5;
}
ul, ol {
  padding: 0;
  margin: 0;
}
.todo-holder {
  max-width: 400px;
  position: relative;
  margin-top: 1rem;
  height: auto;
  transition: height ease-in-out 1s;
  margin: {
    left: auto;
    right: auto;
  }
  ul {
    display: block;
    list-style: none;
    height: auto;
    transition: height ease-in-out 1s;
    li {
      display: block;
      padding: 10px 1rem;
      border: 1px solid #ddd;
      margin-bottom: 1rem;
    }
  }
}

.fader-enter-active, .fader-leave-active {
  transition: opacity .5s;
}
.fader-enter, .fader-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>