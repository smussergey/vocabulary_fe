<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>

          <ul class="error-messages" v-if="loginError">
            <li>{{ loginError }}</li>
          </ul>
          <form onsubmit="event.preventDefault()">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="username"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="firstName"
                placeholder="First name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="lastName"
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

@Component
export default class Register extends Vue {
  public username: string = '';
  public password: string = '';
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public loginError = '';

  public register() {
    usersStore
      .registerNewUser({
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
      })
      .then(() => this.$router.push('/'))
      .catch((err) => {
        // tslint:disable-next-line:no-console
        console.error(err);
        this.loginError = 'Invalid username or password';
      });
  }
}
</script>


<style scoped>
button {
  border-radius: 0px;
}
</style>