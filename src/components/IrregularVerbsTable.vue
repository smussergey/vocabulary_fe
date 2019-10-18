
<template>
  <div class="tableFixHead">
    <table class="table table-striped table-hover table-bordered thead-dark">
      <thead class="thead-dark">
        <tr>
          <th>Infinitive</th>
          <th v-bind:class="{ hideElement: hideTranscription }">Transcription</th>
          <th>PastTense</th>
          <th v-bind:class="{ hideElement: hideTranscription }">Transcription</th>
          <th>PastParticiple</th>
          <th v-bind:class="{ hideElement: hideTranscription }">Transcription</th>
          <th>Translation</th>
          <th v-bind:class="{ hideElement: hideControlButtons }" v-if="currentTub!=='all'">Controls</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="iv in processedIrregularVerbs"
          v-bind:key="iv.id"
          v-on:dblclick="changeStateOfIrregularVerb(iv)"
        >
          <td>{{iv.infinitive}}</td>
          <td v-bind:class="{ hideElement: hideTranscription }">{{iv.transcriptionInfinitive}}</td>
          <td>{{iv.pastTense}}</td>
          <td v-bind:class="{ hideElement: hideTranscription }">{{iv.transcriptionPastTense}}</td>
          <td>{{iv.pastParticiple}}</td>
          <td v-bind:class="{ hideElement: hideTranscription }">{{iv.transcriptionPastParticiple}}</td>
          <td>{{iv.translation}}</td>
          <td v-bind:class="{ hideElement: hideControlButtons }" v-if="currentTub!=='all'">
            <button class="btn btn-sm btn-success" v-on:click="changeStateOfIrregularVerb(iv)">move</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Inject,
  Watch,
  InjectReactive,
} from 'vue-property-decorator';
import { IrregularVerb } from '@/store/models';
import irregularVerbsStore from '@/store/modules/irregularVerbsStore';

@Component
export default class IrregularVerbsTable extends Vue {
  @Prop()
  private currentTub!: string;
  @InjectReactive('changeTranscriptionState')
  private hideTranscription!: boolean;
  @InjectReactive('changeControlButtonsState')
  private hideControlButtons!: boolean;

  private get processedIrregularVerbs(): IrregularVerb[] {
    switch (this.currentTub) {
      case 'all':
        return irregularVerbsStore.irregularVerbsAll;
      case 'tolearn':
        return irregularVerbsStore.irregularVerbsToLearn;
      default:
        return irregularVerbsStore.irregularVerbsLearnt;
    }
  }

  private changeStateOfIrregularVerb(itemToMoove: IrregularVerb) {
    if (this.currentTub === 'tolearn') {
      irregularVerbsStore.changeStateIntoLearnt(itemToMoove);
    } else if (this.currentTub === 'learnt') {
      irregularVerbsStore.changeStateIntoToLearn(itemToMoove);
    }
  }
}
</script>

<style  scoped>
.tableFixHead {
  overflow-y: auto;
  height: 500px;
}
.tableFixHead thead th {
  position: sticky;
  top: 0;
}

/* Just common table stuff. Really. */
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 8px 16px;
}
th {
  background: #eee;
}

.hideElement {
  display: none;
}
</style>