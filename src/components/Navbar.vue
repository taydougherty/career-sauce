<template>
  <div id="navbar">
    <b-navbar type="dark" variant="dark">
      <!-- If logged in display user first name -->
      <b-navbar-brand v-if="isUserLoggedIn">Welcome {{ this.firstName }}!</b-navbar-brand>

      <!-- If not logged in display company name -->
      <b-navbar-brand v-else>Welcome to Career Sauce!</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- Display if user is logged in -->
          <AddJobButton v-if="isUserLoggedIn" :userId="user.id" />
          <AccountSettings v-if="isUserLoggedIn" :userId="user.id" />

          <!-- Display if user is not logged in -->
          <b-button
            id="btn"
            type="submit"
            @click="register"
            v-if="!isHidden && !isUserLoggedIn"
          >Register</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddJobButton from "./AddJobButton";
import AccountSettings from "./AccountSettings";
import AuthenticationService from "../Services/AuthenticationService";

export default {
  name: "NavBar",
  components: {
    // Pull components to display when user is logged in
    AddJobButton,
    AccountSettings
  },
  data() {
    return {
      firstName: "",
      userInfo: {},
      isHidden: false
    };
  },
  computed: {
    // Check state if user is logged in
    ...mapState(["isUserLoggedIn", "user"])
  },
  props: ["userId"],
  mounted() {
    // Display user's first name
    this.firstName = this.user.firstname;
  },
  updated() {
    // Check for user ID to pull user specific information
    this.getUser(this.user.id);
  },
  methods: {
    async getUser(id) {
      try {
        // Pull user data using ID from database
        let resp = await AuthenticationService.getUser(id);
        this.userInfo = resp.data;
        this.firstName = this.userInfo.firstname;
      } catch (err) {
        console.log(err);
      }
    },
    register(e) {
      e.preventDefault();
      // Hide register button when user is on register page
      this.isHidden = true;
      this.$router.push("/register");
    }
  }
};
</script>

<style>
#navbar {
  height: 50px;
  margin-bottom: 20px;
}
#btn {
  background-color: #f05742;
  border-color: #f05742;
}
@media (max-width: 400px) {
  .navbar-brand {
    font-size: 1rem !important;
  }
  .navbar-nav > #btn {
    font-size: 0.75rem !important;
  }
}
</style>
