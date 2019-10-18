<template>
  <div>
    <div v-for="ap in processedArticlePreviews" v-bind:key="ap.id">
      <h5>{{ap.title}}</h5>
      <p>{{ap.description}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import articleStore from '@/store/modules/articleStore';
import { ArticlePreview } from '@/store/models';

@Component
export default class ArticlePreviewBlock extends Vue {
  private get processedArticlePreviews(): ArticlePreview[] {
    return articleStore.articlePreviewsGeneral;
  }
}
</script>