<template>
  <div class="auth-page ">
    <div class="container page ">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12 ">
          <h1 class="text-xs-center ">Login</h1>

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
            <button @click="login()" class="btn btn-lg btn-success pull-xs-right">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import usersStore from '@/store/modules/usersStore';
import { UserResponse } from '../store/models';

@Component
export default class Login extends Vue {
  private username = 'adm';
  private password = 'admpas';
  private loginError = '';

  private login() {
    usersStore
      .login({
        username: this.username,
        password: this.password,
      })
      .then(() => this.$router.push('/'))
      .catch((err) => {
        // tslint:disable-next-line:no-console
        console.error(err);
        this.loginError = 'Invalid username or password';
        // this.loginError = (usersStore.userResponse as any).errorMessage;
      });
  }
}
</script>

<style scoped>
button {
  border-radius: 0px;
}
</style>