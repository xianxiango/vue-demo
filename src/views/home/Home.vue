<template>
  <div class="public-view">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>优秀作品欣赏</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <slider-item
            style="width: 700px;height: 250px;"
            :type="'left'"
            margin="'20px'"
            :speed="20"
            :imgData="demoData"
            :txtPos="['40%','10%']"
          ></slider-item>
        </el-card>
        <el-card shadow="hover" class="margin-top">
          <div slot="header" class="clearfix">
            <span>课程设置</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-row :gutter="5">
            <el-col :span="8" v-for="url in demoData" :key="url.title">
              <router-link to="student" :key="url.title">
              <el-image class="course" :key="url.title" :src="url.img" lazy>
                <div slot="placeholder" class="image-slot">
                  加载中
                  <span class="dot">...</span>
                </div>
              </el-image>
              </router-link>
            </el-col>
          </el-row>
        </el-card>
        
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>最新公告</span>
          </div>
          <div class="notice"></div>
        </el-card>
        <el-card shadow="hover" style="margin-top">
          <div slot="header" class="clearfix">
            <span>关于我们</span>
          </div>
          <div class="notice"></div>
        </el-card>
      </el-col>
    </el-row>
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
          img:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          title: "图片1"
        },
        {
          img:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          title: "图片2"
        },
        {
          img:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          title: "图片3"
        },
        {
          img:
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
          title: "图片4"
        },
        {
          img:
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
          title: "图片5"
        },
        {
          img:
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          title: "图片6"
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
.public-view {
  padding-top: 10px;
}
.notice {
  height: 480px;
}
.margin-top {
  margin-top: 10px;
}
</style>

