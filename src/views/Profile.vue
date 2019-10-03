<template>

    <div class="container">
        
    </div>
      
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import usersStore from '@/store/modules/usersStore';

@Component
export default class Profile extends Vue {
  public username: string = '';
  public password: string = '';
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';

   public created() {
    usersStore.loadProfile();
  }
  get profile() {
    return usersStore.profile;
  }
}
</script>
