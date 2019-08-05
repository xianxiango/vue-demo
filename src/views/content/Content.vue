<template>
  <div class="public-view">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-card shadow="hover" class="works">
          <div slot="header" class="clearfix">
            <span>{{content.Title}}</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="synopsis-content">
            <div v-html="content.Content"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>最新公告</span>
          </div>
          <div class="notice">
            <!-- <marquee direction="up" scrollamount="5">
                <div v-model="notice">
                </div>
                
            </marquee>-->
            <marqueeY :lists="notice" v-if="notice!=''" />
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
      content: {},
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
      fetchData("infoContent", { id: this.$route.query.id }).then(data => {
        // console.log(data);
        this.content = data.list;
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
    console.log(this.$route.query.id);
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

