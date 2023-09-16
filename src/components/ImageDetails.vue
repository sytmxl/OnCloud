<template>
  <h2>基本信息</h2>
  <ul>
    <li><strong>镜像 ID：</strong>{{ detailData.id }}</li>
    <li><strong>Short ID：</strong>{{ detailData.short_id }}</li>
    <!-- <li><strong>状态：</strong>{{ detailData.attrs.status }}</li> -->
    <li><strong>创建时间：</strong>{{ detailData.attrs.Created }}</li>
    <li><strong>Docker 版本：</strong>{{ detailData.attrs.DockerVersion }}</li>
    <li><strong>操作系统：</strong>{{ detailData.attrs.Os }}</li>
    <li><strong>Variant：</strong>{{ detailData.attrs.Variant }}</li> 
    <li><strong>Virtual Size：</strong>{{ detailData.attrs.VirtualSize }}</li>
  </ul>

  <h2>标签和维护者</h2>
  <ul>
    <li>
      <strong>维护者：</strong>
      {{ detailData.labels.maintainer }}
    </li>
  </ul>

  <h2>配置信息</h2>
  <ul>
    <li><strong>Architecture：</strong>{{ detailData.attrs.Architecture }}</li>
    <li><strong>Author：</strong>{{ detailData.attrs.Author }}</li>
    <li><strong>Comment：</strong>{{ detailData.attrs.Comment }}</li>
    <li><strong>Domainname：</strong>{{ detailData.attrs.Config.Domainname }}</li>
    <li><strong>Entrypoint：</strong>{{ detailData.attrs.Config.Entrypoint.join(', ') }}</li>
    <li><strong>Hostname：</strong>{{ detailData.attrs.Config.Hostname }}</li>
    <li><strong>Image：</strong>{{ detailData.attrs.Config.Image }}</li>
    <li>
      <strong>环境变量：</strong>
      <ul>
        <li v-for="envVar in detailData.attrs.Config.Env">{{ envVar }}</li>
      </ul>
    </li>
    <li><strong>StopSignal：</strong>{{ detailData.attrs.Config.StopSignal }}</li>
    <li><strong>Tty：</strong>{{ detailData.attrs.Config.Tty }}</li>
    <li><strong>User：</strong>{{ detailData.attrs.Config.User }}</li>
    <li><strong>WorkingDir：</strong>{{ detailData.attrs.Config.WorkingDir }}</li>
  </ul>

  <h2>图形驱动信息</h2>
  <ul>
    <li><strong>LowerDir：</strong>{{ detailData.attrs.GraphDriver.Data.LowerDir }}</li>
    <li><strong>MergedDir：</strong>{{ detailData.attrs.GraphDriver.Data.MergedDir }}</li>
    <li><strong>UpperDir：</strong>{{ detailData.attrs.GraphDriver.Data.UpperDir }}</li>
    <li><strong>WorkDir：</strong>{{ detailData.attrs.GraphDriver.Data.WorkDir }}</li>
    <li><strong>图形驱动名称：</strong>{{ detailData.attrs.GraphDriver.Name }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    detailData: Object, // 传入的详情数据，假设是一个包含 JSON 数据的对象
    dialogVisible: Boolean
  },
  mounted() {
    console.log(this.detailData)
  },
  methods: {
    jsonToMarkdown(jsonData) {
      console.log(jsonData)
      if (!jsonData) return ''; // 避免空数据

      let markdown = '';

      for (const key in jsonData) {
        if (Object.hasOwnProperty.call(jsonData, key)) {
          const value = jsonData[key];
          markdown += `**${key}:** ${value}\n\n`;
        }
      }

      return markdown;
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
