<template>
  <nav id="nav" class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <!-- Links -->

      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">
            <i class="fa fa-fw fa-home"></i>HOME
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/irregularverbstutorial">Irregular verbs</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="#">Phrasal verbs</router-link>
        </li>
      </ul>
      <ul class="navbar-nav  my-2 my-lg-0">
        <li v-if="!userFirstName" class="nav-item">
          <router-link class="nav-link" to="/login">
            <i class="fa fa-fw fa-user"></i>Login
          </router-link>
        </li>
        <li v-if="!userFirstName" class="nav-item">
          <router-link class="nav-link" to="/register">
            <i class="fa fa-fw fa-user"></i>Register
          </router-link>
        </li>
       
        <!-- Dropdown -->
        <li v-if="userFirstName" class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbardrop"
            data-toggle="dropdown"
          >{{userFirstName}}</a>
          <div id="dropdown-menu" class="dropdown-menu">
            <router-link class="dropdown-item" to="/profile">Profile</router-link>
            <a class="dropdown-item" href="#" @click="logOut()">Logout</a>
          </div>
        </li>
      </ul>
      
    </div>
  </nav>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import usersStore from '@/store/modules/usersStore';
import { UserResponse } from '../store/models';
import irregularVerbsStore from '../store/modules/irregularVerbsStore';

@Component
export default class AppNavbar extends Vue {
  get userFirstName() {
    return usersStore.userFirstName;
  }

  public logOut() {
    usersStore.logOutUser();
    // irregularVerbsStore.deleteIrregularVerbsValues();
    if (this.$route.name === 'home') {
      return;
    }
    this.$router.push(`/`);
  }
}
</script>

 <style scoped>
/* .navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
} */

#nav a {
  font-weight: bold;
  color: #9e9fa0;
}

#nav a.router-link-exact-active {
  color: #f1f7f4;
  background-color: #4caf50;
}

.nav-item a:hover {
  background-color: rgb(0, 0, 0);
}

.dropdown-menu {
  background-color: #3e3e3f;
  opacity: 1;
}
</style>