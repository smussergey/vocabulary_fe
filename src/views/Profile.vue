<template>
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Profile</h1>
        <div v-if="editProfileErrors">
          <ul
            v-for="editProfileError in editProfileErrors"
            v-bind:key="editProfileError"
            class="error-messages"
          >
            <li>{{ editProfileError }}</li>
          </ul>
        </div>
        <form onsubmit="event.preventDefault()">
          <fieldset class="form-group">
            <label for="username">Username:</label>
            <input
              id="username"
              class="form-control form-control-lg"
              type="text"
              v-model="userProfile.username"
              placeholder="Username"
            />
          </fieldset>
          <fieldset class="form-group">
            <label for="email">Email address:</label>
            <input
              id="email"
              class="form-control form-control-lg"
              type="text"
              v-model="userProfile.email"
              placeholder="Email"
            />
          </fieldset>
          <fieldset class="form-group">
            <label for="firstName">First name:</label>
            <input
              id="firstName"
              class="form-control form-control-lg"
              type="text"
              v-model="userProfile.firstName"
              placeholder="First name"
            />
          </fieldset>
          <fieldset class="form-group">
            <label for="lastName">Last name:</label>
            <input
              id="lastName"
              class="form-control form-control-lg"
              type="text"
              v-model="userProfile.lastName"
              placeholder="Last name"
            />
          </fieldset>
          <button @click="update()" class="btn btn-lg btn-success pull-xs-right">Save changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import usersStore from '@/store/modules/usersStore';
import { UserProfile } from '../store/models';
import * as api from '@/store/api';

@Component
export default class Profile extends Vue {
  private userProfile: UserProfile = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  };
  private editProfileErrors: string[] = [];

  private async created() {
    Object.assign(this.userProfile, await usersStore.fetchProfile());
  }

  private update() {
    api
      .updateUserProfile(this.userProfile)
      .then((response: any) => this.handleUpdateProfileResponse(response))
      .catch((error: any) => {
        this.editProfileErrors = error.response.data.errors;
      });
  }

  private handleUpdateProfileResponse(response: any) {
    alert(response.data);
    usersStore.setUserFirstName(this.userProfile.firstName);
  }
}
</script>

<style scoped>
button {
  border-radius: 0px;
}
.error-messages {
  color: red;
}
</style>