<template>
  <div>
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
    </ul>

    <h2>容器信息</h2>
    <ul v-for="container in detailData.containers" :key="container.name">
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
li {
  list-style: none;
}
h2 {
  @apply mt-6 mb-2
}
strong {
  // background: var(--md-sys-color-primary);
  color: var(--md-sys-color-primary);
  // @apply rounded-full p-1
}
</style>
