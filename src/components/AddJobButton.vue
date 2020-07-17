<template>
  <div>
    <!-- Opens modal  -->
    <b-button class="inline" id="btn" @click="showAddModal()">Add Job</b-button>

    <!-- Add Modal -->
    <b-modal v-model="showModal" title="Enter Job Information" hide-footer>
      <b-form @reset="onReset" v-if="show">
        <!-- Company -->
        <b-form-group id="input-group-1" label="Company:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.Company"
            required
            placeholder="Enter company name"
          ></b-form-input>
        </b-form-group>

        <!-- Position -->
        <b-form-group
          id="input-group-2"
          label="Position Title:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.Position"
            required
            placeholder="Enter title of position applied"
          ></b-form-input>
        </b-form-group>

        <!-- Description -->
        <b-form-group
          id="input-group-2"
          label="Job Description:"
          label-for="input-2"
        >
          <b-form-textarea
            id="textarea-default"
            size="sm"
            v-model="form.Description"
            placeholder="Description..."
          ></b-form-textarea>
        </b-form-group>

        <!-- Location -->
        <b-form-group id="input-group-2" label="Location:" label-for="input-2">
          <b-form-input
            id="input-3"
            v-model="form.Location"
            required
            placeholder="Enter location of position applied"
          ></b-form-input>
        </b-form-group>

        <!-- Source -->
        <b-form-group id="input-group-2" label="Source:" label-for="input-2">
          <b-form-input
            id="input-4"
            v-model="form.Source"
            required
            placeholder="Enter job posting URL"
          ></b-form-input>
        </b-form-group>

        <!-- Status -->
        <b-form-group
          id="input-group-3"
          label="Status:"
          label-for="input-3"
          text="Please Select One"
        >
          <b-form-select
            id="input-5"
            v-model="form.Status"
            :options="Statuses"
            required
          ></b-form-select>
        </b-form-group>
        <b-button
          type="submit"
          id="btn"
          @click="
            onSubmit();
            toast('b-toaster-top-right');
          "
          >Submit</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import ApplicationService from "../Services/ApplicationService";
import { mapState } from "vuex";

export default {
  name: "AddJobButton",
  data() {
    return {
      showModal: false,
      form: {
        Company: "",
        Position: "",
        Description: "",
        Location: "",
        Source: "",
        Status: "",
      },
      Statuses: [
        "Grocery List",
        "In The Oven",
        "Taste Test",
        "Well Done",
        "Burnt",
      ],
      show: true,
      error: null,
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    // API post request
    async onSubmit() {
      try {
        await ApplicationService.addApplication({
          position: this.form.Position,
          company: this.form.Company,
          location: this.form.Location,
          status: this.form.Status,
          source: this.form.Source,
          description: this.form.Description,
          UserId: this.user.id,
        });
        this.showModal = false;
        this.form.Company = "";
        this.form.Position = "";
        this.form.Location = "";
        this.form.Status = "";
        this.form.Source = "";
        this.form.Description = "";
      } catch (err) {
        this.error = err.response.data.error;
        console.log("ASYNC CATCH ERROR");
      }
      location.reload();
    },

    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.Company = "";
      this.form.Position = "";
      this.form.Location = "";
      this.form.Status = "";
      this.form.Description = "";
      this.form.Source = "";
    },

    showAddModal() {
      this.showModal = true;
      this.$bvModal.show("modal");
    },

    toast() {
      this.$bvToast.toast(`Your job application has been added!`, {
        title: "Success",
        autoHideDelay: 5000,
        solid: true,
      });
    },
  },
};
</script>

<style>
.inline {
  display: inline-block;
  margin-right: 10px;
}
#btn {
  background-color: #f05742;
  border-color: #f05742;
}
</style>
