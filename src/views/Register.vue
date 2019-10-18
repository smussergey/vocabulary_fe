<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Register</h1>

          <ul class="error-messages" v-if="registerError">
            <li>{{ registerError }}</li>
          </ul>
          <form onsubmit="event.preventDefault()">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.firstName"
                placeholder="First name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.lastName"
                placeholder="Last name"
              />
            </fieldset>
            <button @click="register()" class="btn btn-lg btn-success pull-xs-right">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import usersStore from '@/store/modules/usersStore';
import { User } from '../store/models';

@Component
export default class Register extends Vue {
  // private username: string = '';
  // private password: string = '';
  // private email: string = '';
  // private firstName: string = '';
  // private lastName: string = '';
  private registerError = '';

  private user: User = {
    id: null,
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  };
  private register() {
    usersStore
      .register(this.user)
      .then(() => this.$router.push('/'))
      .catch((err: any) => {
        // tslint:disable-next-line:no-console
        console.error(err);
        this.registerError = 'Invalid username or password';
      });
  }
}
</script>


<style scoped>
button {
  border-radius: 0px;
}
</style>