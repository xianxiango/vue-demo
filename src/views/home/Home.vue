<template>
  <div class="public-view">
    <!-- <vue-img-slider
      style="width: 400px;height: 400px;"
      :type="'left'"
      margin="'20px'"
      :speed="20"
      :imgData="demoData"
      :txtPos="['40%','10%']"
    ></vue-img-slider> -->
  </div>
</template>

<script>
import Moment from "moment";
import { fetchData } from "@/api";
import SliderItem from "@/components/Slider";
export default {
  data() {
    return {
      demoData: [
        {
          img: "http://f12.baidu.com/it/u=1981748892,3031683197&fm=72",
          title: "图片1"
        },
        {
          img: "http://f10.baidu.com/it/u=3243370105,1125765815&fm=72",
          title: "图片2"
        }
      ]
    };
  },
  components: {
    SliderItem
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
</style>

