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
                  <el-image class="course" :key="url.Title" :src="url.Url" lazy>
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
                  <el-image class="course" :key="url.Title" :src="url.Url" lazy>
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
              <marquee direction="up" scrollamount="5">
                广州乔古形象设计有限公司是由知名造型师李达创立，联合旗下数十位星级化妆造型师及导师团队共同打造新时代风尚美妆品牌。合作艺人明星众多，常活跃于各大品牌时装发布会台前幕后，包括国际四大时装周、中国国际时装周都能看到我们造型师的身影。旗下造型师们都拥有扎实的技术功底，妆感时尚干净，发型造型能力突出，注重技术的全面性，因此深受艺人歌手演员们的喜爱旗下每位签约造型师都必须拥有过硬的全能型技术能力和服务水平，注重技术能力之余更加注重服务水平和为人处事，势必打造最优质的服务团队。
                旗下喬古造型美妆学院的化妆培训优势在于教学导师们都是中国一线的造型师，化妆造型培训教学内容定期更新以顺应时尚的更替，针对时下的流行时尚系统分解传授技巧，注重妆发整体能力的教学，培养学员的创新能力，导师们都拥有多年的工作经验，所涉及的化妆类型多样，广告、T台、平面、舞台
              </marquee>
            </div>
          </el-card>
          <el-card shadow="hover" class="margin-top">
            <div slot="header" class="clearfix">
              <span>关于我们</span>
            </div>
            <div class="notice">
              广州乔古形象设计有限公司是由知名造型师李达创立，联合旗下数十位星级化妆造型师及导师团队共同打造新时代风尚美妆品牌。合作艺人明星众多，常活跃于各大品牌时装发布会台前幕后，包括国际四大时装周、中国国际时装周都能看到我们造型师的身影。旗下造型师们都拥有扎实的技术功底，妆感时尚干净，发型造型能力突出，注重技术的全面性，因此深受艺人歌手演员们的喜爱旗下每位签约造型师都必须拥有过硬的全能型技术能力和服务水平，注重技术能力之余更加注重服务水平和为人处事，势必打造最优质的服务团队。
              旗下喬古造型美妆学院的化妆培训优势在于教学导师们都是中国一线的造型师，化妆造型培训教学内容定期更新以顺应时尚的更替，针对时下的流行时尚系统分解传授技巧，注重妆发整体能力的教学，培养学员的创新能力，导师们都拥有多年的工作经验，所涉及的化妆类型多样，广告、T台、平面、舞台
            </div>
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
// import SearchMixin from "@/mixins/search";
export default {
  // mixins: [SearchMixin],
  data() {
    return {
      banner:[],
      excellent: [],
      student: [],
      course: []
    };
  },
  components: {
    SliderItem
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
      fetchData("infoList", { module: 3, page_no: 1, page_size: 10 }).then(
        data => {
          this.course = data.list;
        }
      );
      fetchData("infoList", { module: 4, page_no: 1, page_size: 10 }).then(
        data => {
          this.student = data.list;
        }
      );
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
  height: 440px;
}
.public-view {
  padding-top: 10px;
}
.notice {
  height: 500px;
  line-height: 30px;
  font-size: 12px;
  overflow: hidden;
}
.margin-top {
  margin-top: 10px;
}
.course {
  display: flex;
  align-items: center;
  height: 160px;
}
.course-img {
  margin-bottom: 20px;
}
</style>

