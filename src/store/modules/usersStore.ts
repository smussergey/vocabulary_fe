import {
  getModule,
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import store from '@/store';
import { UserSubmit, UserResponse, UserProfile, User } from '../models';
import * as api from '@/store/api';
import irregularVerbsStore from './irregularVerbsStore';


@Module({
  namespaced: true,
  name: 'usersStore',
  store,
  dynamic: true,
})
class UsersModule extends VuexModule {
  public userResponse: UserResponse | null = null;
  public isUserLogined: boolean = false;
  // public userProfile!: UserProfile;
  public userFirstName: string = '';



  // public get userFirstName() {
  //   return (this.userResponse && this.userResponse.userFirstName) || null;
  // }

  @Action({ commit: 'setUserRespond' })
  public async register(user: User): Promise<UserResponse> {
    const userResponse = await api.registerUser(user);
    api.setJWT(userResponse.token);
    irregularVerbsStore.clearStateOfIrregularVerbs();
    return userResponse;
  }

  @Action({ commit: 'setUserRespond' })
  public async login(userSubmit: UserSubmit): Promise<UserResponse> {
    const userResponse = await api.loginUser(userSubmit);
    api.setJWT(userResponse.token);
    irregularVerbsStore.clearStateOfIrregularVerbs();
    return userResponse;
  }


  @Action({ commit: 'setUserProfile' })
  public async fetchProfile(): Promise<UserProfile> {
    return await api.downLoadUserProfile();
  }


  // @Action
  // public async updateUserProfile(userProfile: UserProfile): Promise<any> {
  //   const response = await api.updateUserProfile(userProfile);
  //   return response;
  // }



  @Mutation
  public logOutUser() {
    api.deleteJWT();
    this.isUserLogined = false;
    this.userResponse = null;
    this.userFirstName = '';
    irregularVerbsStore.clearStateOfIrregularVerbs();
  }


  // @Mutation
  // public setUserProfile(userProfile: UserProfile) {
  //   this.userProfile = userProfile;
  // }

  @Mutation
  public setUserFirstName(userFirstName: string) {
    this.userFirstName = userFirstName;
    this.isUserLogined = true;
  }

  @Mutation
  private setUserRespond(userResponse: UserResponse) {
    this.userResponse = userResponse;
    this.userFirstName = userResponse.userFirstName;
    this.isUserLogined = true;
  }


}

export default getModule(UsersModule);
