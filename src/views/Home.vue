<template>
  <div class="home">
    <div class="todo-form">
      <form @submit.prevent="save" class="form-holder">
        <input type="text" class="form-control" v-model="form.todo" placeholder="Add some todos">
        <button class="btn-add">{{ buttonText }}</button>
      </form>
    </div>
    <div class="todo-holder">
      <transition-group name="fadeUp" tag="ul">
        <li v-for="todo in todos" :key="todo.id">
          {{ todo.todo }}
          <button @click="remove(todo.id)">Remove</button>
          <button @click="getId(todo.id)">Update</button>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: "home",
  data() {
    return {
      form: {
        todo: ''
      },
      todos: [],
      buttonText: 'Add',
      getid: ''
    }
  },
  async mounted() {
    this.load();
  },
  methods: {
    async load() {
      const response = await axios.post('http://localhost/todo/todo/todos');
      this.todos = response.data;
    },
    async save() {
      try {
        this.$Progress.start();
        if(this.form.todo == '') {
          alert("Form Masih kosong");
          this.$Progress.fail();
          return;
        }
        if(this.getid) {
          await axios.post('http://localhost/todo/todo/update', { "todo": this.form.todo, "id": this.getid });
        } else {
          await axios.post('http://localhost/todo/todo/add', this.form);
        }
        this.$Progress.finish();  
        this.form.todo = ''; 
        this.getid = '';
        this.buttonText = 'Add'
        this.load();
      } catch (error) {
        console.log(error);
      }      
    },
    async remove(id) {
      try {
        this.$Progress.start();
        const response = await axios.post('http://localhost/todo/todo/move?id='+ id);
        this.todos.splice(this.todos.indexOf(id), 1)
        this.$Progress.finish();
        this.$router.push('/about');
      } catch (error) {
        console.log(error);
      }      
    },
    async getId(id) {
      try {
        this.getid = id;
        this.$Progress.start();
        const { data } = await axios.post('http://localhost/todo/todo/getid?id='+ id);
        this.form.todo = data.todo;
        this.$Progress.finish();
        this.buttonText = "Update";
      } catch (error) {
        console.log(error);
      }
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
  }
};
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
.todo-form {
  width: 400px;
  position: relative;
  margin: {
    left: auto;
    right: auto;
  }
  .form-holder {
    display: flex;
    position: relative;
  }
  .form-control {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: .25rem;
    font-size: 1.1rem;
    color: #444;
    padding: 10px 1rem;
    transition: all ease-in-out .25s;
    &:focus {
      outline: none;
      border-color: #398339;
    }
  }
  .btn-add {
    margin-left: 1rem;
    display: inline-block;
    padding: 10px 1rem;
    border-radius: .25rem;
    background-color: #398339;
    color: #fff;
    font-size: 1.1rem;
    border: none;
    transition: all ease-in-out .25s;
    &:hover {
      background-color: darken(#398339, 6%);
    }
  }
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
  .fader-enter-active, .fader-leave-active {
    transition: opacity .3s;
  }
  .fader-enter, .fader-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>