<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <el-row :gutter="20">
          <el-col :span="2" class="logo">
            <img src="@/assets/logo.png" alt="图片加载失败" />
          </el-col>
          <el-col :span="17">
            <h2>小吴后台管理系统</h2>
          </el-col>
          <el-col :span="3" style="line-height: 60px; color: #fff">
            <h4>
              欢迎您，<span>{{ username }}</span>
            </h4>
          </el-col>
          <el-col :span="2" style="margin-top: 15px">
            <el-button @click="logout">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu active-text-color="skyblue" background-color="#2775b6" class="el-menu-vertical-demo"
            :default-active="active" text-color="#fff" router>
            <el-menu-item v-for="item in list" :key="item.path" :index="item.path">
              <el-icon>
                <Menu />
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Menu } from "@element-plus/icons-vue";
// 用户名
const username = ref("");
username.value = (
  localStorage.getItem("username") ? localStorage.getItem("username") : "用户"
) as string;
// 动态设置二级路由
const router = useRouter();
const list = router.getRoutes().filter((v) => v.meta.isShow);
// 设置当前选择的列表
const route = useRoute()
const active = route.path
// 退出登录
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
<style lang="scss" scoped>
.header {
  background-color: #1661ab;

  img {
    width: 40px;
    height: 50px;
  }

  h2 {
    line-height: 50px;
    color: #fff;
    text-align: center;
    font-size: 35px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: calc(100vh - 60px);
}
</style>
