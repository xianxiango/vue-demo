<template>
  <div>
    <div class="banner-box">
      <!-- <el-carousel :interval="4000" type="card" height="450px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>-->
      <el-carousel :interval="5000" arrow="always" height="450px">
        <el-carousel-item v-for="item in banner" :key="item.Title">
          <router-link to="student" :key="item.Title">
            <img :src="item.Url" style="width:100%;height:100%" />
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="public-view">
      <el-row :gutter="10">
        <el-col :span="18">
          <el-card shadow="hover" class="works">
            <div slot="header" class="clearfix">
              <span>优秀作品欣赏</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <slider-item
              style="width: 700px;height: 250px;"
              :type="'left'"
              margin="'20px'"
              :speed="20"
              :imgData="excellent"
              :txtPos="['40%','10%']"
              v-if="excellent.length!=0"
            ></slider-item>
          </el-card>
          <el-card shadow="hover" class="margin-top course-box">
            <div slot="header" class="clearfix">
              <span>课程设置</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <el-row :gutter="20">
              <el-col :span="8" v-for="url in course" :key="url.Title" class="course-img">
                <router-link to="student" :key="url.Title">
                  <el-image class="course home-image" :key="url.Title" :src="url.Url" lazy>
                    <div slot="placeholder" class="image-slot">
                      加载中
                      <span class="dot">...</span>
                    </div>
                  </el-image>
                </router-link>
              </el-col>
            </el-row>
          </el-card>

          <el-card shadow="hover" class="margin-top course-box">
            <div slot="header" class="clearfix">
              <span>优秀学员</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <el-row :gutter="20">
              <el-col :span="8" v-for="url in student" :key="url.Title" class="course-img">
                <router-link to="student" :key="url.Title">
                  <el-image class="course home-image" :key="url.Title" :src="url.Url" lazy>
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
  </div>
</template>

<script>
import Moment from "moment";
import { fetchData } from "@/api";
import SliderItem from "@/components/Slider";
import MarqueeY from "@/components/MarqueeY";
// import SearchMixin from "@/mixins/search";
export default {
  // mixins: [SearchMixin],
  data() {
    return {
      banner: [],
      excellent: [],
      student: [],
      course: [],
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
      fetchData("infoList", { module: 1, page_no: 1, page_size: 10 }).then(
        data => {
          // console.log(data);
          this.banner = data.list;
        }
      );
      fetchData("infoList", { module: 2, page_no: 1, page_size: 10 }).then(
        data => {
          // console.log(data);
          this.excellent = data.list;
        }
      );
      fetchData("infoList", { module: 3, page_no: 1, page_size: 6 }).then(
        data => {
          this.course = data.list;
        }
      );
      fetchData("infoList", { module: 4, page_no: 1, page_size: 6 }).then(
        data => {
          this.student = data.list;
        }
      );
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
.works {
  height: 350px;
}
.course-box {
  height: 520px;
}

</style>

