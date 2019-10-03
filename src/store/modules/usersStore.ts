import {
  getModule,
  Module,
  MutationAction,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import store from '@/store';
import { UserSubmit, UserResponse, UserForCreateOrUpdate, Profile } from '../models';
import * as api from '@/store/api';
import irregularVerbsStore from './irregularVerbsStore';


@Module({
  namespaced: true,
  name: 'usersName',
  store,
  dynamic: true,
})
class UsersModule extends VuexModule {

  get userFirstName() {
    return (this.userResponse && this.userResponse.userFirstName) || null;
  }

  public userResponse: UserResponse | null = null;
  public isUserLogined: boolean = false;
  public profile: Profile | null = null;



  @Mutation
  public setUserRespond(userResponse: UserResponse) {
    this.userResponse = userResponse;
    this.isUserLogined = true;
  }

  @Mutation
  public logOutUser() {
    api.deleteJWT();
    this.isUserLogined = false;
    this.userResponse = null;
    irregularVerbsStore.clearStateOfIrregularVerbs();
  }


  @Action({ commit: 'setUserRespond' })
  public async login(userSubmit: UserSubmit) {
    const userResponse = await api.loginUser(userSubmit);
    api.setJWT(userResponse.token);
    irregularVerbsStore.clearStateOfIrregularVerbs();
    return userResponse;
  }

  @Action({ commit: 'setUserRespond' })
  public async registerNewUser(user: UserForCreateOrUpdate) {
    const userResponse = await api.registerUser(user);
    api.setJWT(userResponse.token);
    irregularVerbsStore.clearStateOfIrregularVerbs();
    return userResponse;
  }


  @Action({ commit: 'setUserProfile' })
  public async loadProfile() {
    return await api.downLoadUserProfile().then((response) => response.data);
  }

  @Mutation
  private setUserProfile(profile: Profile) {
    this.profile = profile;
  }

  // @MutationAction
  // public async loadUser() {
  //   const user = await fetchUser();
  //   return { user };
  // }

  // @MutationAction
  // public async updateSelfProfile(userUpdateFields: UserForUpdate) {
  //   const user = await updateUser(userUpdateFields);
  //   return { user };
  // }
}

export default getModule(UsersModule);
