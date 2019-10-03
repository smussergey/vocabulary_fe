<template>
  <div class="container" style="margin-top:30px">
    <div class="row">
      <!-- sidebar -->
      <div class="col-sm-2 sidebar">
        <h5>Instruction:</h5>
        <div id="accordion">
          <div>
            <div id="card-header">
              <a
                class="btn btn-secondary btn-block"
                data-toggle="collapse"
                href="#collapseOne"
                v-on:click="changeInstructionVisibilityState()"
              >{{ hideInstruction ? "Show" : "Hide"}}</a>
            </div>
            <div id="collapseOne" class="collapse show" data-parent="#accordion">
              <div class="card-body">
                1. Make double click, or press corresponding control buttons to move items you are learning (e.g. if you make double click on the row in "To learn" tab
                it moves current item to "Learnt" tab and vice versa)
              </div>
            </div>
          </div>
        </div>
        <br />

        <div>
          <h5>Settings:</h5>
          <button
            class="btn btn-secondary btn-block"
            v-on:click="changeTranscriptionVisibilityState()"
          >{{ hideTranscription ? "Show transcription" : "Hide transcription"}}</button>
          <button @click="shuffle()" class="btn btn-secondary btn-block">Shuffle</button>
          <button @click="sort()" class="btn btn-secondary btn-block">Sort</button>
          <button
            @click="changeControlButtonsVisibilityState()"
            class="btn btn-secondary btn-block"
          >{{ hideControlButtons ? "Show control buttons" : "Hide control buttons"}}</button>
        </div>
        <br />

        <div>
          <h5>Articles:</h5>
          <p v-for="ap in articlePreviews" v-bind:key="ap.id">{{ap.title}}</p>
        </div>
      </div>

      <!--Tabs -->
      <div class="col-sm-10">
        <div>
          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#all">
                All
                <span class="badge badge-light">{{irregularVerbsAllCount}}</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#tolearn">
                To learn
                <span class="badge badge-light">{{irregularVerbsToLearnCount}}</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#learnt">
                Learnt
                <span class="badge badge-light">{{irregularVerbsLearntCount}}</span>
              </a>
            </li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div id="all" class="container tab-pane active">
              <br />
              <irregular-verbs-table currentTub="all" />
            </div>
            <div id="tolearn" class="container tab-pane fade">
              <br />
              <irregular-verbs-table currentTub="tolearn" />
            </div>
            <div id="learnt" class="container tab-pane fade">
              <br />
              <irregular-verbs-table currentTub="learnt" />
            </div>
          </div>
        </div>
        <br />
        <!-- Articles -->
        <div>
          <h2>TITLE HEADING</h2>
          <h5>Title description, Dec 7, 2017</h5>
          <div class="fakeimg">Fake Image</div>
          <p>Some text..</p>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          <br />
          <h2>TITLE HEADING</h2>
          <h5>Title description, Sep 2, 2017</h5>
          <div class="fakeimg">Fake Image</div>
          <p>Some text..</p>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Watch,
  Provide,
  ProvideReactive,
} from 'vue-property-decorator';

// import articles from '@/store/modules/articles';
import IrregularVerbsTable from '@/components/IrregularVerbsTable.vue';
import irregularVerbsStore from '@/store/modules/irregularVerbsStore';
import usersStore from '@/store/modules/usersStore';
import { IrregularVerb } from '@/store/models';
import articleStore from '../store/modules/articleStore';
import { ArticlePreview } from '../store/models';

@Component({
  components: {
    IrregularVerbsTable,
  },
})
export default class IrregularVerbsTurorial extends Vue {
  @ProvideReactive('changeTranscriptionState')
  private hideTranscription: boolean = true;
  private hideInstruction: boolean = false;
  @ProvideReactive('changeControlButtonsState')
  private hideControlButtons: boolean = true;
  private articlePreviews: ArticlePreview[] = [];

  private get irregularVerbsAllCount() {
    return irregularVerbsStore.irregularVerbsAll.length;
  }
  private get irregularVerbsToLearnCount() {
    return irregularVerbsStore.irregularVerbsToLearn.length;
  }
  private get irregularVerbsLearntCount() {
    return irregularVerbsStore.irregularVerbsLearnt.length;
  }

  // @Watch('isUserLoginedValue')
  // public onIsUserLoginedChanged(val: boolean, oldVal: boolean) {
  //   alert('User login/logout');
  //   irregularVerbsStore.fetchIrregularVerbs();
  // }

  public async created() {
    if (irregularVerbsStore.irregularVerbsAll.length === 0) {
      // alert('created if statement');
      irregularVerbsStore.fetchIrregularVerbs();
    } else if (
      irregularVerbsStore.irregularVerbsToLearn.length ===
        irregularVerbsStore.irregularVerbsAll.length &&
      irregularVerbsStore.irregularVerbsLearnt.length === 0 &&
      usersStore.isUserLogined
    ) {
      // alert('created else if statement');
      irregularVerbsStore.fetchIrregularVerbs();
    }
    // alert('created');
    this.articlePreviews = articleStore.articlePreviewsGeneral;
  }

  private changeTranscriptionVisibilityState() {
    this.hideTranscription = !this.hideTranscription;
  }
  private changeInstructionVisibilityState() {
    this.hideInstruction = !this.hideInstruction;
  }
  private changeControlButtonsVisibilityState() {
    this.hideControlButtons = !this.hideControlButtons;
  }
  private shuffle(): void {
    irregularVerbsStore.shuffleIrregularVerbsAll();
    irregularVerbsStore.shuffleIrregularVerbsToLearn();
    irregularVerbsStore.shuffIrregularVerbsLearnt();
  }
  private sort(): void {
    irregularVerbsStore.sortIrregularVerbsValues();
  }
}
</script>

<style scoped>
/* The side navigation menu */
.sidebar {
  margin: 0;
  padding: 0;
  /* width: 200px; */
  background-color: #dad8d8;
  position: relative;
  height: 1000px;
  overflow: auto;
}

/* Sidebar links */
/* .sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
} */

/* Active/current link */
/* .sidebar a.active {
  background-color: #4caf50;
  color: white;
} */

/* Links on mouse-over */
.sidebar .btn:hover:not(.active) {
  background-color: #555;
  color: white;
}

/* Page content. The value of the margin-left property should match the value of the sidebar's width property */
div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

/* On screens that are less than 700px wide, make the sidebar into a topbar */
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  /* .sidebar a {
    float: left;
  } */
  div.content {
    margin-left: 0;
  }
}

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
/* @media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
} */

/* Tabs */
.nav-link {
  color: #000000;
}
.nav-link:hover {
  color: #f1f7f4;
  background-color: #4caf50;
}
/* .nav-link:active {
  color: #f1f7f4;
  background-color: #4caf50;
} */

.btn {
  border-radius: 0px;
  background-color: rgb(190, 190, 190);
  border: none;
  color: rgb(0, 0, 0);
}
</style>