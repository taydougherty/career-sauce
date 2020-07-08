<template>
  <div id="accountSettings">
    <div>
      <b-avatar button id="btn" @click="showAddModal(user)"></b-avatar>
    </div>
    <!-- Add Modal -->
    <b-modal title="Edit Account Information" v-model="showModal" hide-footer>
      <b-form v-if="show">
        <!-- <b-form @reset="onReset" v-if="show"> -->

        <!-- Update First Name -->
        <b-form-group
          id="input-group-1"
          label="First Name:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="userInfo.firstname"
            placeholder="New first name"
          ></b-form-input>
        </b-form-group>

        <!-- Update Last Name -->
        <b-form-group id="input-group-1" label="Last Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="userInfo.lastname"
            placeholder="New last name"
          ></b-form-input>
        </b-form-group>

        <!-- Update Email -->
        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="userInfo.email"
            placeholder="New email address"
          ></b-form-input>
        </b-form-group>

        <!-- Update Password FOR FUTURE USE-->
        <!-- <b-form-group id="input-group-1" label="Password:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.password"
            placeholder="New password"
            :state="passwordState"
            aria-describedby="input-1-feedback"
        ></b-form-input>-->

        <!-- This will only be shown if the preceding input has an invalid state -->
        <!-- <b-form-invalid-feedback id="input-1-feedback">
            Please enter a valid password
          </b-form-invalid-feedback>
        </b-form-group>-->
        <br />
        <!-- Submit button -->
        <b-button type="submit" variant="success" @click="updateInfo"
          >Update</b-button
        >
        <br />
        <!-- Delete Account button -->
        <br />
        <b-button type="submit" variant="danger" @click="deleteAccount"
          >Delete Account</b-button
        >
        <br />
        <!-- Sign out button -->
        <br />
        <b-button
          variant="dark"
          type="submit"
          @click="logout"
          v-if="isUserLoggedIn"
          >Sign Out</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AuthenticationService from "../Services/AuthenticationService";

export default {
  name: "AccountSettings",
  data() {
    return {
      showModal: false,
      userInfo: {},
      show: true,
      error: null,
    };
  },
  computed: {
    // Check if user is logged in
    ...mapState(["isUserLoggedIn", "user"]),
    // ******************** FOR FUTURE USE ********************
    // passwordState() {
    //   return this.form.password.length > 7 ? true : false;
    // },
  },
  props: ["UserId"],
  methods: {
    async updateInfo() {
      try {
        // Update new user information in database
        await AuthenticationService.updateUserInfo({
          firstname: this.userInfo.firstname,
          lastname: this.userInfo.lastname,
          email: this.userInfo.email,
          id: this.user.id,
        });
        this.$router.push("/home");
        location.reload();
      } catch (err) {
        this.error = err.response.data.error;
        console.log(this.error);
      }
    },

    async deleteAccount() {
      try {
        // Delete user account
        await AuthenticationService.deleteUser(this.user);
        this.$store.dispatch("setToken", null);
        this.$store.dispatch("setUser", null);

        window.localStorage.clear();
        window.sessionStorage.clear();
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      } catch (err) {
        this.error = err.response.data.error;
        console.log(this.error);
      }
    },
    async logout(e) {
      // User logout
      e.preventDefault();
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.showModal = false;
      this.$router.push("/");
    },
    showAddModal() {
      this.showModal = true;
      this.$bvModal.show("modal");
    },
  },
};
</script>

<style>
#btn {
  background-color: #f05742;
  border-color: #f05742;
}
</style>
