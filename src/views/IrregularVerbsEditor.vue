<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <br />
      <br />
      <div>
        <label>
          File
          <input
            ref="fileInput"
            class="file-input"
            type="file"
            multiple
            v-on:change="onFileChanged"
          />
        </label>
        <button v-on:click="submitFile()">Submit file</button>
      </div>

      <!-- enctype="multipart/form-data" -->
      <!-- <form method="POST" enctype="multipart/form-data" action="http://localhost:8075/api/files">
        <table>
          <tr>
            <td>File to upload form:</td>
            <td>
              <input type="file" name="file" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input type="submit" value="Upload with form" />
            </td>
          </tr>
        </table>
      </form>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import * as api from '@/store/api';
// import axios from 'axios';
import irregularVerbsStore from '../store/modules/irregularVerbsStore';

export default class IrregularVerbsEditor extends Vue {
  private formData = new FormData();
  private files: File[] = [];

  // public uploadFile() {

  // }
  private onFileChanged(event: any) {
    // tslint:disable-next-line:prefer-const
    let files: FileList = event.target.files;
    // tslint:disable-next-line:prefer-const
    let result: File[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      alert((files.item(i) as File).name);
      result.push(files.item(i) as File);
      irregularVerbsStore.filesToUpload.push(files.item(i) as File);
      alert(result[i].name);
    }
    alert(result.length);
  }

  private submitFile() {
    // tslint:disable-next-line:prefer-const
    let fileToServer: File = irregularVerbsStore.filesToUpload[0];
    this.formData.append('file', fileToServer);
    api
      .uploadFileToServer(this.formData)
      .then(() => alert('SUCCESS!!'))
      // tslint:disable-next-line:arrow-parens
      .catch(err => alert('FAILURE!!'));
  }
}
</script>

<style scoped>
</style>