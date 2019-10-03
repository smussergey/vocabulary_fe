import {
    Module,
    VuexModule,
    getModule,
    Action,
    Mutation,
} from 'vuex-module-decorators';
import store from '@/store';
import { ArticlePreview } from './../models.d';
import * as api from '@/store/api';

// type FeedType = 'global' | 'user';

@Module({
    dynamic: true,
    namespaced: true,
    name: 'articleName',
    store,
})

class ArticleModule extends VuexModule {
    public articlePreviewsGeneral: ArticlePreview[] = [];


    @Action({ commit: 'setarticlePreviewsGeneral' })
    public fetchArticlePreviews(topic: string) {
        return api.downLoadArticlePreviews(topic);
    }

    @Mutation
    private setarticlePreviewsGeneral(articlePreviews: ArticlePreview[]) {
        // alert('setarticlePreviewsGeneral = ' + articlePreviews.length);
        this.articlePreviewsGeneral = articlePreviews;
    }

}
export default getModule(ArticleModule);
