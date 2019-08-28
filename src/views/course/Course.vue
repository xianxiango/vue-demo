<template>
  <div class="public-view">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-card shadow="hover" class="works">
          <div slot="header" class="clearfix">
            <span>课程设置</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div>
            <el-row :gutter="10">
              <el-col :span="8" v-for="o in list" :key="o.Title">
                <el-card class="img-card" shadow="hover">
                  <router-link :to="'content?id='+o.ID" :key="o.Title">
                    <div class="image">
                      <el-image :src="o.Url" fit="fill" lazy :key="o.Title">
                        <div slot="placeholder" class="image-slot">
                          加载中
                          <span class="dot">...</span>
                        </div>
                      </el-image>
                    </div>
                    <div class="img-title">
                      <span>{{o.Title}}</span>
                    </div>
                  </router-link>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-pagination
              background
              @size-change="handleSize"
              @current-change="handlePage"
              :current-page="page"
              :page-sizes="sizeList"
              :page-size="size"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
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
import SearchMixin from "@/mixins/search";
export default {
  mixins: [SearchMixin],
  data() {
    return {
      list: [],
      requestUrl: "infoList",
      param: {
        // 请求附带参数
        module: 3
      },
      notice: "",
      our: ""
    };
  },
  components: {
    SliderItem,
    MarqueeY
  },
  methods: {
    setTableData(data) {
      const list = [];
      data.forEach(function(element) {
        list.push({
          ID: element.ID,
          Url: element.Url,
          Title: element.Title,
          IsShow: element.IsShow,
          Content: element.Content,
          Module: element.Module,
          detail: element
        });
      }, this);
      this.list = list;
    },
    getImage() {
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
</style>

