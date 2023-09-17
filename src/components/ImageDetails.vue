<template>
  <div>
    <h2 style="margin-top: 0;">基本信息</h2>
    <ul>
      <li><strong>镜像 ID：</strong>{{ displayOrNoInfo(detailData.id) }}</li>
      <li><strong>Short ID：</strong>{{ displayOrNoInfo(detailData.short_id) }}</li>
      <li><strong>创建时间：</strong>{{ displayOrNoInfo(detailData.attrs.Created) }}</li>
      <li><strong>Docker 版本：</strong>{{ displayOrNoInfo(detailData.attrs.DockerVersion) }}</li>
      <li><strong>操作系统：</strong>{{ displayOrNoInfo(detailData.attrs.Os) }}</li>
      <li><strong>Variant：</strong>{{ displayOrNoInfo(detailData.attrs.Variant) }}</li>
      <li><strong>Virtual Size：</strong>{{ displayOrNoInfo(detailData.attrs.VirtualSize) }}</li>
    </ul>

    <h2>标签和维护者</h2>
    <ul>
      <li><strong>维护者：</strong>{{ displayOrNoInfo(detailData.attrs.Config.Labels?.maintainer) }}</li>
      <li><strong>标签：</strong>{{ displayOrNoInfo(detailData.attrs.RepoTags?.[0]) }}</li>
    </ul>

    <h2>配置信息</h2>
    <ul>
      <li><strong>Architecture：</strong>{{ displayOrNoInfo(detailData.attrs.Architecture) }}</li>
      <li><strong>Author：</strong>{{ displayOrNoInfo(detailData.attrs.Author) }}</li>
      <li><strong>Comment：</strong>{{ displayOrNoInfo(detailData.attrs.Comment) }}</li>
      <li><strong>Domainname：</strong>{{ displayOrNoInfo(detailData.attrs.Config.Domainname) }}</li>
      <li v-if="detailData.attrs.Config.Entrypoint"><strong>Entrypoint：</strong>{{ displayOrNoInfo(detailData.attrs.Config.Entrypoint.join(', ')) }}</li>
      <li><strong>Hostname：</strong>{{ displayOrNoInfo(detailData.attrs.Config.Hostname) }}</li>
      <li><strong>Image：</strong>{{ displayOrNoInfo(detailData.attrs.Config.Image) }}</li>
      <li>
        <strong>环境变量：</strong>
        <ul>
          <li v-for="envVar in detailData.attrs.Config.Env">{{ displayOrNoInfo(envVar) }}</li>
        </ul>
      </li>
      <li><strong>StopSignal：</strong>{{ displayOrNoInfo(detailData.attrs.Config.StopSignal) }}</li>
      <li><strong>Tty：</strong>{{ displayOrNoInfo(detailData.attrs.Config.Tty) }}</li>
      <li><strong>User：</strong>{{ displayOrNoInfo(detailData.attrs.Config.User) }}</li>
      <li><strong>WorkingDir：</strong>{{ displayOrNoInfo(detailData.attrs.Config.WorkingDir) }}</li>
    </ul>

    <h2>图形驱动信息</h2>
    <ul>
      <li><strong>LowerDir：</strong>{{ displayOrNoInfo(detailData.attrs.GraphDriver.Data.LowerDir) }}</li>
      <li><strong>MergedDir：</strong>{{ displayOrNoInfo(detailData.attrs.GraphDriver.Data.MergedDir) }}</li>
      <li><strong>UpperDir：</strong>{{ displayOrNoInfo(detailData.attrs.GraphDriver.Data.UpperDir) }}</li>
      <li><strong>WorkDir：</strong>{{ displayOrNoInfo(detailData.attrs.GraphDriver.Data.WorkDir) }}</li>
      <li><strong>图形驱动名称：</strong>{{ displayOrNoInfo(detailData.attrs.GraphDriver.Name) }}</li>
    </ul>
  </div>
</template>


<script>
export default {
  props: {
    detailData: Object, // 传入的详情数据，假设是一个包含 JSON 数据的对象
  },
  methods: {
    displayOrNoInfo(value) {
      return value || '无信息';
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
