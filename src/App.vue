<template>
  <div id="app">
    <jumbotron></jumbotron>
    <navbar></navbar>
    <router-view />
    <footer></footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Jumbotron from '@/components/Jumbotron.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Footer,
    Navbar,
    Jumbotron,
  },
})
export default class App extends Vue {}
</script>

<style>
</style>



