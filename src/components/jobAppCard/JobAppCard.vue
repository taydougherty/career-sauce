<template id="homeContainer">
  <div>
    <div>
      <!-- Button for Modal -->
      <b-button id="btn" @click="showMoreInfo(item)">More Info</b-button>

      <!-- Modal -->
      <b-modal class="modalInfo" title="Job Info" v-model="showModal" @hidden="clearMoreinfo" no-stacking hide-footer>
        <h3 class="my-4">Company: <span class="jobInfo">{{ moreInfo.company }}</span></h3>
        <h3 class="my-4">Position: <span class="jobInfo">{{ moreInfo.position }}</span></h3>
        <h3 class="my-4">Description: <span class="jobInfo">{{ moreInfo.description }}</span></h3>
        <h3 class="my-4">Location: <span class="jobInfo">{{ moreInfo.location }}</span></h3>
        <h3 class="my-4">Source: <span class="jobInfo">{{ moreInfo.source }}</span></h3>
        <h3 class="my-4">Status: <span class="jobInfo">{{ moreInfo.status }}</span></h3>
        <!-- Need to make a post request onChange function to update status  -->
        <h4>
          Update Status:
          <b-form-select
            v-model="selected"
            :options="this.statusOptions"
            @change.native="onChange"
          >
          </b-form-select>
        </h4>
        <b-button
          id="btn"
          class="removeButton"
          @click="deleteJobApplication(moreInfo)"
          >Remove</b-button
        >
      </b-modal>
    </div>
  </div>
</template>
<script>
import ApplicationService from "../../Services/ApplicationService";

export default {
  data() {
    return {
      showModal: false,
      moreInfo: {},
      selected: null,
      statusOptions: [
        { value: null, text: 'Please Select One', disabled: true },
        { value: 'Grocery List', text: 'Grocery List' },
        { value: 'In The Oven', text: 'In The Oven' },
        { value: 'Taste Test', text: 'Taste Test' },
        { value: 'Well Done', text: 'Well Done' },
        { value: 'Burnt', text: 'Burnt' },
      ]
    };
  },
  name: "JobAppCard",
  props: ["item"],
  methods: {
    async onChange(event) {
      this.moreInfo.status = event.target.value;
      try {
        await ApplicationService.updateApplication(this.moreInfo);
      } catch (err) {
        console.log(err);
      }
      location.reload();
    },
    clearMoreinfo() {
      this.moreInfo = {};
    },
    showMoreInfo(item) {
      this.showModal = true;
      this.moreInfo = item;
      this.$bvModal.show("modal");
    },
    deleteJobApplication(moreInfo) {
      ApplicationService.deleteApplication(moreInfo);
      location.reload();
    },
  },
};
</script>

<style lang="less">
#btn {
  background-color: #f05742;
  border-color: #f05742;
}
.removeButton {
  float: right;
}

.my-4 {
  border-bottom: 2px solid lightgray;
}

.jobInfo {
  font-size: 20px;
  float: right;
}
</style>
