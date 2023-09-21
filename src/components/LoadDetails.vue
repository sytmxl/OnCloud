<template>
    <h2 style="margin-top: 0;">基本信息</h2>
    <ul>
      <li><strong>可用副本：</strong>{{ displayOrNoInfo(detailData.available_replicas) }}</li>
      <li><strong>创建时间：</strong>{{ getRelativeDateTime(displayOrNoInfo(detailData.creation_timestamp)) }}</li>
      <li>
        <strong>标签：</strong>
        <li class="ml-4" v-for="(value, key) in detailData.labels" :key="key">
          {{ key }}: {{ value }}
        </li>
      </li>
      <li><strong>名称：</strong>{{ displayOrNoInfo(detailData.name) }}</li>
      <li><strong>命名空间：</strong>{{ displayOrNoInfo(detailData.namespace) }}</li>
      <li><strong>副本数：</strong>{{ displayOrNoInfo(detailData.replicas) }}</li>
      <li><strong>不可用副本：</strong>{{ displayOrNoInfo(detailData.unavailable_replicas) }}</li>
      <li><strong>NodePort：</strong>{{ displayOrNoInfo(detailData.serve_port) }}</li>
    </ul>

    <h2 style="margin-top: 20px;">容器信息</h2>
    <div v-for="(container, index) in detailData.containers" :key="index" class="container-card">
      <ul>
        <li><strong>容器名称：</strong>{{ displayOrNoInfo(container.name) }}</li>
        <li><strong>容器镜像：</strong>{{ displayOrNoInfo(container.image) }}</li>
        <li>
          <strong>环境变量：</strong>
          <ul v-if="container.env">
            <li class="ml-4" v-for="envVar in container.env" :key="envVar.name">
              {{ displayOrNoInfo(envVar.name) }}：{{ displayOrNoInfo(envVar.value) }}
            </li>
          </ul>
          <p class="inline" v-else>无信息</p>
        </li>
        <li>
          <strong>端口：</strong>{{ container.ports ? container.ports.join(', ') : '无信息' }}
        </li>
        <li><strong>镜像：</strong>{{ displayOrNoInfo(container.image) }}</li>
        <li>
          <strong>Liveness Probe：</strong>
          <div class="surface p-4 rounded-2xl">
            <li><strong>HTTP Path：</strong>{{ displayOrNoInfo(container.liveness_probe.http_get.path) }}</li>
            <li><strong>HTTP Port：</strong>{{ displayOrNoInfo(container.liveness_probe.http_get.port) }}</li>
            <li><strong>初始延迟：</strong>{{ displayOrNoInfo(container.liveness_probe.initial_delay_seconds) }} 秒</li>
            <li><strong>周期：</strong>{{ displayOrNoInfo(container.liveness_probe.period_seconds) }} 秒</li>
          </div>
        </li>
        <li><strong>资源：</strong></li>
        <div class="surface p-4 rounded-2xl">
          <li><strong>内存限制：</strong>{{ displayOrNoInfo(container.resources.limits.memory) }}</li>
          <li><strong>CPU 请求：</strong>{{ displayOrNoInfo(container.resources.requests.cpu) }}</li>
          <li><strong>内存请求：</strong>{{ displayOrNoInfo(container.resources.requests.memory) }}</li>
        </div>
        <li><strong>安全上下文：</strong></li>
        <div class="surface p-4 rounded-2xl">
          <li><strong>Capabilities Add：</strong>{{ displayOrNoInfo(container.security_context.capabilities.add.join(', ')) }}</li>
          <li><strong>Capabilities Drop：</strong>{{ displayOrNoInfo(container.security_context.capabilities.drop.join(', ')) }}</li>
          <li><strong>Selinux Options Level：</strong>{{ displayOrNoInfo(container.security_context.selinux_options.level) }}</li>
        </div>
      </ul>
    </div>

    
</template>


<script>
import { getRelativeDateTime } from '@/utils';
export default {
  props: {
    detailData: Object, // 传入的详情数据，假设是一个包含 JSON 数据的对象
  },
  methods: {
    displayOrNoInfo(value) {
      return value || '无信息';
    },
    getRelativeDateTime(input) {
      return getRelativeDateTime(input)
    },
  },
};
</script>
<style scoped lang="scss">
@import '../assets/detail.scss'
</style>
