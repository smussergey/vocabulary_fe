import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
  MutationAction,
} from 'vuex-module-decorators';
import store from '@/store';
import * as api from '@/store/api';
import { IrregularVerb } from './../models.d';
import usersStore from './usersStore';
// type FeedType = 'global' | 'user';

@Module({
  dynamic: true,
  namespaced: true,
  name: 'irregularVerbsStore',
  store,
})
class IrregularVerbsModule extends VuexModule {
  public irregularVerbsAll: IrregularVerb[] = [];
  public irregularVerbsToLearn: IrregularVerb[] = [];
  public irregularVerbsLearnt: IrregularVerb[] = [];
  public filesToUpload: File[] = [];


  @Mutation
  public changeStateIntoLearnt(irregularVerb: IrregularVerb) {
    this.irregularVerbsLearnt.push(irregularVerb);
    const indexOfItemToDelete: number = this.irregularVerbsToLearn.indexOf(irregularVerb);
    this.irregularVerbsToLearn.splice(indexOfItemToDelete, 1);
    if (usersStore.isUserLogined) {
      api.addIrregularVerbToLearnt(irregularVerb.id);
    }
  }

  @Mutation
  public changeStateIntoToLearn(irregularVerb: IrregularVerb) {
    this.irregularVerbsToLearn.push(irregularVerb);
    const indexOfItemToDelete: number = this.irregularVerbsLearnt.indexOf(irregularVerb);
    this.irregularVerbsLearnt.splice(indexOfItemToDelete, 1);
    if (usersStore.isUserLogined) {
      api.removeIrregularVerbFromLearnt(irregularVerb.id);
    }
  }

  @Mutation
  public clearStateOfIrregularVerbs() {
    this.irregularVerbsToLearn = this.irregularVerbsAll;
    this.irregularVerbsLearnt = [];
  }


  // REDO to awoid code duplication
  @Mutation
  public shuffleIrregularVerbsAll() {
    const result: IrregularVerb[] = [];
    const source: IrregularVerb[] = this.irregularVerbsAll.concat([]);
    let index;
    while (source.length) {
      index = Math.floor(Math.random() * source.length);
      result.push(source.splice(index, 1)[0]);
    }
    this.irregularVerbsAll = result;
  }
  // REDO to awoid code duplication
  @Mutation
  public shuffleIrregularVerbsToLearn() {
    const result: IrregularVerb[] = [];
    const source: IrregularVerb[] = this.irregularVerbsToLearn.concat([]);
    let index;
    while (source.length) {
      index = Math.floor(Math.random() * source.length);
      result.push(source.splice(index, 1)[0]);
    }
    this.irregularVerbsToLearn = result;
  }
  // REDO to awoid code duplication
  @Mutation
  public shuffIrregularVerbsLearnt() {
    const result: IrregularVerb[] = [];
    const source: IrregularVerb[] = this.irregularVerbsLearnt.concat([]);
    let index;
    while (source.length) {
      index = Math.floor(Math.random() * source.length);
      result.push(source.splice(index, 1)[0]);
    }
    this.irregularVerbsLearnt = result;
  }

  @Mutation
  public sortIrregularVerbsValues() {
    this.irregularVerbsAll.sort((iv1, iv2) => iv1.infinitive > iv2.infinitive ? 1 : -1);
    this.irregularVerbsToLearn.sort((iv1, iv2) => iv1.infinitive > iv2.infinitive ? 1 : -1);
    this.irregularVerbsLearnt.sort((iv1, iv2) => iv1.infinitive > iv2.infinitive ? 1 : -1);
  }


  @Action({ commit: 'setIrregularVerbsInitialValues' })
  public async fetchIrregularVerbs() {
    return await api.downLoadIrregularVerbsAll().then((response) => response.data);
  }


  @Mutation
  private setIrregularVerbsInitialValues(irregularVerbsData: IrregularVerb[]) {
    if (irregularVerbsData.length >= 1) {
      this.irregularVerbsAll = irregularVerbsData;
      this.irregularVerbsToLearn = irregularVerbsData.filter((iv) => !iv.isLearnt);
      this.irregularVerbsLearnt = irregularVerbsData.filter((iv) => iv.isLearnt);
    }
  }


}
export default getModule(IrregularVerbsModule);
