<template>
  <div id="app">
    <template>
      <a-layout class="layout-top">
        <a-layout-header class="header">
          <h3 class="logo">Charts for Vue</h3>
        </a-layout-header>
        <a-layout>
          <a-layout-sider width="200" style="background: #fff">
            <a-menu
              mode="inline"
              :default-selected-keys="['/stack-bar']"
              :default-open-keys="['basic']"
              :style="{ height: '100%', borderRight: 0 }"
              @click="navigate"
            >
              <a-sub-menu key="basic">
                <span slot="title"><a-icon type="user" />基础图表</span>
                <a-menu-item key="/stack-bar">
                  堆叠柱状图
                </a-menu-item>
                <a-menu-item key="2">
                  option2
                </a-menu-item>
                <a-menu-item key="3">
                  option3
                </a-menu-item>
                <a-menu-item key="4">
                  option4
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="laptop" />进阶图表</span>
                <a-menu-item key="5">
                  option5
                </a-menu-item>
                <a-menu-item key="6">
                  option6
                </a-menu-item>
                <a-menu-item key="7">
                  option7
                </a-menu-item>
                <a-menu-item key="8">
                  option8
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub3">
                <span slot="title"><a-icon type="notification" />特殊图表</span>
                <a-menu-item key="9">
                  option9
                </a-menu-item>
                <a-menu-item key="10">
                  option10
                </a-menu-item>
                <a-menu-item key="11">
                  option11
                </a-menu-item>
                <a-menu-item key="12">
                  option12
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </a-layout-sider>
          <a-layout style="padding: 0 24px 24px">
            <a-breadcrumb style="margin: 16px 0">
              <a-breadcrumb-item>Home</a-breadcrumb-item>
              <a-breadcrumb-item>List</a-breadcrumb-item>
              <a-breadcrumb-item>App</a-breadcrumb-item>
            </a-breadcrumb>
            <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
              <router-view></router-view>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </a-layout>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  collapsed = false;

  navigate(params: any) {
    if (params.key !== this.$route.path) this.$router.push(params.key);
  }
}
</script>

<style lang="less">
@import './styles/index.less';
</style>
