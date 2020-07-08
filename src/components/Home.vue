<template>
  <div>
    <h2>
      Keep track of your job applications and interviews using the carousels
      below!
    </h2>
    <div v-if="isUserLoggedIn">
      <JobWishCarousel id="carousel" :userId="user.id" />
      <JobAppliedCarousel id="carousel" :userId="user.id" />
      <JobInterviewCarousel id="carousel" :userId="user.id" />
      <JobOfferCarousel id="carousel" :userId="user.id" />
      <JobRejectedCarousel id="carousel" :userId="user.id" />
    </div>

    <div v-else>
      <h1>Please Log In</h1>
      <Login />
    </div>
  </div>
</template>

<script>
import JobAppliedCarousel from "./JobAppliedCarousel";
import JobInterviewCarousel from "./JobInterviewCarousel";
import JobOfferCarousel from "./JobOfferCarousel";
import JobRejectedCarousel from "./JobRejectedCarousel";
import JobWishCarousel from "./JobWishCarousel";
import Login from "../components/Login";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    JobAppliedCarousel,
    JobInterviewCarousel,
    JobOfferCarousel,
    JobRejectedCarousel,
    JobWishCarousel,
    Login
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  data() {
    return {};
  },
};
</script>

<style lang="less">
#carousel {
  background-color: #faf9fe;
  border-radius: 25px;
  border: 2px solid lightgray;
  margin: 10px;
  height: 20%;
}
</style>
