<script lang="ts" setup>
import { routerPush } from '@/router';
const width = ref('180px');
const VITE_TITLE = import.meta.env.VITE_TITLE;
const path = useRoute().path;

const menuDefaultActive = ref(path);
</script>

<template>
  <el-container>
    <el-aside :width="width">
      <div class="aside-top">
        <div @click="routerPush({ name: 'Home' })" class="title">
          {{ VITE_TITLE }}
        </div>
        <div class="pl-2 pr-2 mt-3">
          <el-menu
            style="border: 0"
            :default-active="menuDefaultActive"
            :router="true"
            background-color="#f2f2f2"
          >
            <el-menu-item index="/user">
              <!-- <i-ep-user height="20" width="20"></i-ep-user> -->
              <span class="ml-2">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/eps">
              <!-- <i-ep-bell height="20" width="20"></i-ep-bell> -->
              <span class="ml-2">视频通讯</span>
            </el-menu-item>
            <el-menu-item index="/register">
              <!-- <i-ep-document height="20" width="20"></i-ep-document> -->
              <span class="ml-2">注册</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </el-aside>
    <div class="section-left" :style="'width:' + width"></div>
    <div class="layout-main">
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component
            v-if="route.meta && route.meta.keepAlive"
            :is="Component"
            :key="route.meta.usePathKey ? route.fullPath : undefined"
          />
        </keep-alive>
        <component
          v-if="!(route.meta && route.meta.keepAlive)"
          :is="Component"
          :key="route.meta.usePathKey ? route.fullPath : undefined"
        />
      </router-view>
    </div>
  </el-container>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
