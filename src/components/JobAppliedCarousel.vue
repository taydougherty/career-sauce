<template>
  <section>
    <div>
      <h3>In The Oven <span class="explanation">(Job applications sent.)</span></h3> 
      <!-- Carousel  -->
      <vue-horizontal-list :items="items">
        <template v-slot:default="{ item }">
          <!-- Slide -->
          <div class="slide" :style="{ backgroundColor: randomColor() }">
            <div class="aspect r-10-12 border-3 overflow-hidden">
              <div class="relative wh-100 lh-0">
                <div class="bg-overlay absolute-0 wh-100 p-24 flex-end">
                  <h4 class="m-0 text-ellipsis-2l text-center white">
                    {{ item.company }}
                  </h4>
                </div>
              </div>
            </div>
            <p class="mt-4 text-ellipsis-2l">{{ item.position }}</p>
            <!-- More info modal -->
            <JobAppCard v-bind:item="item" />
          </div>
        </template>
      </vue-horizontal-list>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import VueHorizontalList from "vue-horizontal-list";
import JobAppCard from "./jobAppCard/JobAppCard";
import ApplicationService from "../Services/ApplicationService";
import randomColor from "../helpers/randomColor"

export default {
  name: "AppliedCarousel",
  components: {
    VueHorizontalList,
    JobAppCard,
  },
  mixins: 
    [randomColor]
  ,
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  created() {
    // API call
    ApplicationService.status(this.user.id, "In The Oven").then(response => {
      let data = response.data;
      let list = [];

      for (let i = 0; i < data.length; i++) {
        list.push(data[i]);
      }
      this.items = list.reverse();
    });
  },
};
</script>

<style scoped lang="less">
section > div {
  margin: 20px 50px 20px 50px;
}

// modal css
h3 {
  text-align: left;
}

.explanations {
  text-align: left;
  float: left;
}

.slide {
  z-index: -1;
  border-radius: 25px;
  padding: 20px;
  color: white;
}
</style>
