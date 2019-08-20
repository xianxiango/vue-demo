<template>
  <div class="app-wrapper" :class="classObj">
    <div class="header">
      <div class="header-body">
        <div>
          <div class="logo-box">
            <div class="logo">
              <div>G.M.N 美妆工作室</div>
              <div class="en">G.M.N STUDIO</div>
            </div>
          </div>
        </div>
        <div class="rexian-box">
          <div class="rexian">招生热线：18011784774</div>
        </div>
      </div>
    </div>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <!-- <el-scrollbar class="sidebar-container" wrapClass="scrollbar-wrapper"> -->
    <el-menu
      mode="horizontal"
      :show-timeout="200"
      :default-active="$route.path"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened="true"
      v-bind:class="{ 'topMenu': istopMenu}"
    >
      <sidebar-item :routes="routers"></sidebar-item>
    </el-menu>
    <!-- </el-scrollbar> -->

    <div class="main-container">
      <!-- <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

        <breadcrumb class="breadcrumb-container"></breadcrumb>

        <div class="right-menu">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ username }}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="isResetPassword = true">修改密码</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="exit">退出登录</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </el-menu>-->

      <!-- <tags-view></tags-view> -->
      <section class="app-main">
        <!-- <transition name="fade" mode="out-in">
          <keep-alive :exclude="noCachedViews">
            <router-view></router-view>
          </keep-alive>
        </transition>-->

        <router-view></router-view>
      </section>
    </div>
    <el-backtop target=".app" :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >UP</div>
    </el-backtop>

    <div class="footer margin-top">
      <div class="footer-box">
        <div class="footer-content"></div>
        <div class="footer-content">
          <div class>
            <div>联系人：黎先生</div>
            <div>咨询热线：18011784774</div>
            <div>QQ:444270394 微信：wg_LWG</div>
            <div>地址：广州市南沙区金岭北路326号二楼G.M.N STUDIO</div>
            <div>
              <a href="http://beian.miit.gov.cn/">粤ICP备19100392号</a>
            </div>
          </div>
          <div class="footer-content-img">
            <img class="img" src="static\images\wx.jpg" alt="南沙学化妆 美妆" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
import Cookies from "js-cookie";
import { fetchData } from "@/api";
import ResizeMixin from "@/mixins/resize";
// import TagsView from "@/components/TagsView";
// import Hamburger from "@/components/Hamburger";
// import Breadcrumb from "@/components/Breadcrumb";
import SidebarItem from "@/components/Sidebar";
export default {
  name: "Main",
  components: {
    // TagsView,
    // Hamburger,
    // Breadcrumb,
    SidebarItem
  },
  mixins: [ResizeMixin],
  data() {
    return {
      oldPsw: "",
      newPsw: "",
      isResetPassword: false,
      istopMenu: false
    };
  },
  computed: {
    routers() {
      return this.$store.state.routers;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    sidebar() {
      return this.$store.state.sidebar;
    },
    device() {
      return this.$store.state.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    },
    noCachedViews() {
      return this.$store.state.noCachedViews;
    }
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);

      if (scrollTop > 100) {
        this.istopMenu = true;
      } else {
        this.istopMenu = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  .footer-box {
    display: flex;
    width: 1000px;
    margin: 0 auto;
  }
}
.footer-content {
  display: flex;
  .footer-content-img {
    margin-left: 20px;
  }
  img {
    width: 100px;
  }
  div {
    text-align: right;
  }
  padding-top: 55px;
  flex: 1;
  color: rgb(191, 203, 217);
  font-size: 12px;
  line-height: 1.8;
}
.topMenu {
  position: fixed;
  width: 100%;
  z-index: 9999;
  top: 0;
}
.header {
  background: #fff;
}
.header-body {
  margin: 0 auto;
  width: 1000px;
  height: 165px;
  display: flex;
  background: #fff;
  div {
    .logo-box {
      height: 165px;
      display: flex;
      align-items: center;
      .logo {
        padding-left: 30px;
        font-size: 26px;
        .en {
          font-size: 13px;
        }
      }
    }

    flex: 1;
  }
  .rexian-box {
    display: flex;
    .rexian {
      text-align: center;
      padding-bottom: 30px;
      align-self: flex-end;
    }
  }
}
</style>
