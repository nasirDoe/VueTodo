<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li>
          <router-link to="/">Todos</router-link>
        </li>
        <li>
          <router-link to="/about">Histories</router-link>
        </li>
      </ul>
    </div>
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <vue-progress-bar></vue-progress-bar>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss">
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
  #nav {
    display: block;
    text-align: center;
    ul {
      list-style: none;
      li {
        display: inline-block;
        margin: 0 1rem;
      }
      a {
        display: block;
        padding: 1rem 0;
        color: #444;
        font-size: 1rem;
        text-decoration: none;
        transition: all ease-in-out .25s;
        &.router-link-exact-active {
          color: green;
          box-shadow: 0 3px 0 0 green;
        }
      }
    }
  }
  .container {
    max-width: 600px;
    padding-top: 3rem;
    margin: {
      left: auto;
      right: auto;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
