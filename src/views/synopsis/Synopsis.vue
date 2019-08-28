<template>
  <div class="public-view">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-card shadow="hover" class="works">
          <div slot="header" class="clearfix">
            <span>学院简介</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="synopsis-content">
            <div v-html="synopsis"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>最新公告</span>
          </div>
          <div class="notice">
            <div class="notice">{{notice}}</div>
            <!-- <marqueeY :lists="notice" v-if="notice!=''" /> -->
          </div>
        </el-card>
        <el-card shadow="hover" class="margin-top">
          <div slot="header" class="clearfix">
            <span>关于我们</span>
          </div>
          <div class="notice">{{our}}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Moment from "moment";
import { fetchData } from "@/api";
import SliderItem from "@/components/Slider";
import MarqueeY from "@/components/MarqueeY";
export default {
  data() {
    return {
      banner: [],
      synopsis: "",
      notice: "",
      our: ""
    };
  },
  components: {
    SliderItem,
    MarqueeY
  },
  methods: {
    getImage() {
      fetchData("infoText", { module: 1 }).then(data => {
        this.synopsis = data.list[0].Content;
      });
      fetchData("infoText", { module: 2 }).then(data => {
        this.notice = data.list[0].Content;
      });
      fetchData("infoText", { module: 3 }).then(data => {
        this.our = data.list[0].Content;
      });
    }
  },
  created() {
    this.getImage();
  }
};
</script>

<style lang="less" scoped>
.synopsis-content {
  // height: 350px;
  font-size: 12px;
  line-height: 1.8;
}


</style>

