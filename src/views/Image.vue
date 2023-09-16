<template>
  <div class="p-2">
    <div class="flex justify-between p-4">
      <div class="flex gap-4">
        <h1>镜像</h1>
        <el-radio-group v-model="activeTab" class=" rounded-full">
          <el-radio-button label="private">个人镜像</el-radio-button>
          <el-radio-button label="public">公共镜像</el-radio-button>
        </el-radio-group>
      </div>
      <el-button type="primary" @click="showCreateDialog">创建</el-button>
    </div>
    
    <!-- Tab Buttons -->
    <ImageList v-if="activeTab == 'private' && !loading" :image-list="privateImageList" type="private"></ImageList>
    <ImageList v-if="activeTab == 'public' && !loading" :image-list="publicImageList" type="public"></ImageList>

    <!-- Create Image Dialog -->
    <el-dialog title="创建新镜像" width="500px" v-model="createDialogVisible">
      <CreateImage @close="createDialogVisible = false"></CreateImage>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import ImageList from '@/components/ImageList.vue';
import CreateImage from '@/components/CreateImage.vue'
export default {
  components: {
    ImageList,
    CreateImage
  },
  data() {
    return {
      activeTab: 'private',
      publicImageList: [
        { id: 1, repository: 'nginx', tag: 'latest', size: '126MB', created: '2 days ago' },
        { id: 2, repository: 'ubuntu', tag: '20.04', size: '69.5MB', created: '1 week ago' },
        { id: 3, repository: 'mysql', tag: '5.7', size: '487MB', created: '3 weeks ago' },
        { id: 4, repository: 'redis', tag: '6.0', size: '98.6MB', created: '4 weeks ago' },
        { id: 5, repository: 'node', tag: '14', size: '248MB', created: '1 month ago' },
      ],
      privateImageList: [
        {
          "attrs": {
            "Architecture": "arm64",
            "Author": "",
            "Comment": "",
            "Config": {
              "AttachStderr": false,
              "AttachStdin": false,
              "AttachStdout": false,
              "Cmd": [
                "nginx",
                "-g",
                "daemon off;"
              ],
              "Domainname": "",
              "Entrypoint": [
                "/docker-entrypoint.sh"
              ],
              "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "NGINX_VERSION=1.25.2",
                "NJS_VERSION=0.8.0",
                "PKG_RELEASE=1~bookworm"
              ],
              "ExposedPorts": {
                "80/tcp": {}
              },
              "Hostname": "",
              "Image": "sha256:94684251daeb4e774bd3d6ca086153bcf90a61aeaa588819043f48cbc645bbd3",
              "Labels": {
                "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
              },
              "OnBuild": null,
              "OpenStdin": false,
              "StdinOnce": false,
              "StopSignal": "SIGQUIT",
              "Tty": false,
              "User": "",
              "Volumes": null,
              "WorkingDir": ""
            },
            "Container": "b34308b5994fef3d7ef92c53f24a0946810401b26169a524321982f224a8d234",
            "ContainerConfig": {
              "AttachStderr": false,
              "AttachStdin": false,
              "AttachStdout": false,
              "Cmd": [
                "/bin/sh",
                "-c",
                "#(nop) ",
                "CMD [\"nginx\" \"-g\" \"daemon off;\"]"
              ],
              "Domainname": "",
              "Entrypoint": [
                "/docker-entrypoint.sh"
              ],
              "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "NGINX_VERSION=1.25.2",
                "NJS_VERSION=0.8.0",
                "PKG_RELEASE=1~bookworm"
              ],
              "ExposedPorts": {
                "80/tcp": {}
              },
              "Hostname": "b34308b5994f",
              "Image": "sha256:94684251daeb4e774bd3d6ca086153bcf90a61aeaa588819043f48cbc645bbd3",
              "Labels": {
                "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
              },
              "OnBuild": null,
              "OpenStdin": false,
              "StdinOnce": false,
              "StopSignal": "SIGQUIT",
              "Tty": false,
              "User": "",
              "Volumes": null,
              "WorkingDir": ""
            },
            "Created": "2023-09-07T06:31:01.403194752Z",
            "DockerVersion": "20.10.23",
            "GraphDriver": {
              "Data": {
                "LowerDir": "/var/lib/docker/overlay2/5907f78b82e0efa3d2eb21d78aabaf50e756c8d95098c6fba6fd463bad1f5f22/diff:/var/lib/docker/overlay2/2d439957e8d7b176671aba85be078dbb8e77cee07c808d224ec978bc146a5278/diff:/var/lib/docker/overlay2/240a562ec9b8844ec317a30d4990c096a8b8bd7234a24e1109ec59f5a4cef4e0/diff:/var/lib/docker/overlay2/d30afb7c5fd35fed988a44ad499320e51c6af11dda383615414b1591ca4996a7/diff:/var/lib/docker/overlay2/b2bac8a40cc00b748f9ee29c0acda2a643a382307c2976174bdc144e0a9f4950/diff:/var/lib/docker/overlay2/16567a0c084d8755ef5e35f898ad131140ac677f5e33387c22cdefb8d1584fa3/diff",
                "MergedDir": "/var/lib/docker/overlay2/255183af66e51383d9080e1922b27d0354036b91d3ef55ad4668717fb158902d/merged",
                "UpperDir": "/var/lib/docker/overlay2/255183af66e51383d9080e1922b27d0354036b91d3ef55ad4668717fb158902d/diff",
                "WorkDir": "/var/lib/docker/overlay2/255183af66e51383d9080e1922b27d0354036b91d3ef55ad4668717fb158902d/work"
              },
              "Name": "overlay2"
            },
            "Id": "sha256:91582cfffc2d0daa6f42adb6fb74665a047310f76a28e9ed5b0185a2d0f362a6",
            "Metadata": {
              "LastTagTime": "0001-01-01T00:00:00Z"
            },
            "Os": "linux",
            "Parent": "",
            "RepoDigests": [
              "nginx@sha256:6926dd802f40e5e7257fded83e0d8030039642e4e10c4a98a6478e9c6fe06153"
            ],
            "RepoTags": [
              "nginx:latest"
            ],
            "RootFS": {
              "Layers": [
                "sha256:341de903723838835820feffc6ff0ab04ea7ffddd3886cd7e971a7156a62a45a",
                "sha256:7860726e8f40d4cabc895885bf3bf59f0681770c1cae149b06e4f8b8de8f6f0b",
                "sha256:b91f8bec61537753a9b45bb7f002a1f8280794a981ef0ba544ec42bcb135fc26",
                "sha256:1611340f9f9d036df14dbd53757f963bce172b0a5b78d0ed59cbbf8f47969864",
                "sha256:e24935dbf24032549f148de7d83c3cdbd6764db3f8a21f4e355ceb0e5b9ccc7a",
                "sha256:479036cbe23322d07b3a7e0bbd29ea984691db8e063876c267fb47164c6d5ca8",
                "sha256:d96272ee33e0d0ef740225ce55e502a318ed7a7c794043bca6344efa6c826352"
              ],
              "Type": "layers"
            },
            "Size": 192063326,
            "Variant": "v8",
            "VirtualSize": 192063326
          },
          "id": "sha256:91582cfffc2d0daa6f42adb6fb74665a047310f76a28e9ed5b0185a2d0f362a6",
          "labels": {
            "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
          },
          "short_id": "sha256:91582cfffc2d",
          "tags": [
            "nginx:latest"
          ]
        },
        {
          "attrs": {
            "Architecture": "arm64",
            "Author": "",
            "Comment": "buildkit.dockerfile.v0",
            "Config": {
              "AttachStderr": false,
              "AttachStdin": false,
              "AttachStdout": false,
              "Cmd": null,
              "Domainname": "",
              "Entrypoint": [
                "jina",
                "executor",
                "--uses",
                "config.yml",
                "--timeout-ready",
                "3600000"
              ],
              "Env": [
                "PATH=/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "LANG=C.UTF-8",
                "GPG_KEY=E3FF2839C048B25C084DEBE9B26995E310250568",
                "PYTHON_VERSION=3.8.16",
                "PYTHON_PIP_VERSION=22.0.4",
                "PYTHON_SETUPTOOLS_VERSION=57.5.0",
                "PYTHON_GET_PIP_URL=https://github.com/pypa/get-pip/raw/1a96dc5acd0303c4700e02655aefd3bc68c78958/public/get-pip.py",
                "PYTHON_GET_PIP_SHA256=d1d09b0f9e745610657a528689ba3ea44a73bd19c60f4c954271b790c71c2653",
                "PIP_NO_CACHE_DIR=1",
                "PIP_DISABLE_PIP_VERSION_CHECK=1",
                "JINA_PIP_INSTALL_CORE=",
                "JINA_PIP_INSTALL_PERF=",
                "JINA_VERSION=3.14.1",
                "JINA_VCS_VERSION=refs/tags/v3.14.1",
                "JINA_BUILD_DATE=2023-02-24T10:22:42Z"
              ],
              "Hostname": "",
              "Image": "",
              "Labels": {
                "org.opencontainers.image.authors": "hello@jina.ai",
                "org.opencontainers.image.created": "2023-02-24T10:22:42Z",
                "org.opencontainers.image.description": "Build multimodal AI services via cloud native technologies",
                "org.opencontainers.image.documentation": "https://docs.jina.ai",
                "org.opencontainers.image.licenses": "Apache 2.0",
                "org.opencontainers.image.revision": "refs/tags/v3.14.1",
                "org.opencontainers.image.source": "https://github.com/jina-ai/jina/commit/refs/tags/v3.14.1",
                "org.opencontainers.image.title": "Jina",
                "org.opencontainers.image.url": "https://github.com/jina-ai/jina",
                "org.opencontainers.image.vendor": "Jina AI Limited",
                "org.opencontainers.image.version": "3.14.1"
              },
              "OnBuild": null,
              "OpenStdin": false,
              "StdinOnce": false,
              "Tty": false,
              "User": "",
              "Volumes": null,
              "WorkingDir": "/workspace"
            },
            "Container": "",
            "ContainerConfig": {
              "AttachStderr": false,
              "AttachStdin": false,
              "AttachStdout": false,
              "Cmd": null,
              "Domainname": "",
              "Entrypoint": null,
              "Env": null,
              "Hostname": "",
              "Image": "",
              "Labels": null,
              "OnBuild": null,
              "OpenStdin": false,
              "StdinOnce": false,
              "Tty": false,
              "User": "",
              "Volumes": null,
              "WorkingDir": ""
            },
            "Created": "2023-05-26T06:24:49.520332846Z",
            "DockerVersion": "",
            "GraphDriver": {
              "Data": {
                "LowerDir": "/var/lib/docker/overlay2/4f31c4ffcd7b34b607db3f5d67e761210ecef6a232377f8c57ef5348eeb9e775/diff:/var/lib/docker/overlay2/66fdecd15114465aef9fae6e61a1fbc9ff9e092acdb6fd5d3e0bfc4f535ca655/diff:/var/lib/docker/overlay2/adc142d25e1836d85f165fc8ffa59a2d6db124370f864c59564cbe7b0cd259d9/diff:/var/lib/docker/overlay2/88643366ef0f1b67d253925dccf3db7f47d0ac6917561d33e11acae954d666b7/diff:/var/lib/docker/overlay2/322a840d250892cd524a236e7d8f8e670520c9b674231b18d79c9aad073874da/diff:/var/lib/docker/overlay2/585dd6535d04fca93dd7e80e3b0ed117fa1b8647802836fc681e9699131d58b1/diff:/var/lib/docker/overlay2/3c84d06f136f2776a296f6c48a409762ff6e21f3679851d1d3d80909ba0f7b95/diff:/var/lib/docker/overlay2/d20265c74c8882a49d91f59ea291e5bfc18ecbb3d447abd7ece71cc68e3fe05c/diff:/var/lib/docker/overlay2/4c950c83e060123510258cce6c414d2efa16eee7633c7f403cd6b863d4187eb8/diff:/var/lib/docker/overlay2/f37b993f08a1d2ee057dd4c3880d271a66951e6147a81eeca26284d9373c5009/diff:/var/lib/docker/overlay2/764711acce3f79944e4b84eb59e875b9f03c1cb4ed24c46e3c235e6dcd6d65c1/diff:/var/lib/docker/overlay2/fddaa65107769c88b335d06e4e976224333d3ada04d5b0d0e5343ad245dc69c4/diff:/var/lib/docker/overlay2/10e1f8bca6a5a57a61dd9a8c6095c581f394caa10b92aad668e1fd524b13438e/diff",
                "MergedDir": "/var/lib/docker/overlay2/8cbab638519a180c94882966a5a46a73b05d7a3ad4b856148f0da45ff153a6f0/merged",
                "UpperDir": "/var/lib/docker/overlay2/8cbab638519a180c94882966a5a46a73b05d7a3ad4b856148f0da45ff153a6f0/diff",
                "WorkDir": "/var/lib/docker/overlay2/8cbab638519a180c94882966a5a46a73b05d7a3ad4b856148f0da45ff153a6f0/work"
              },
              "Name": "overlay2"
            },
            "Id": "sha256:28fa2fbfdab56d23c30e16be11db4a07479bd37c84c874d65412516c3ffe0f72",
            "Metadata": {
              "LastTagTime": "0001-01-01T00:00:00Z"
            },
            "Os": "linux",
            "Parent": "",
            "RepoDigests": [
              "selmiss/swinir@sha256:13ad8cefd1c47923805ebc2487f7ab5bc49e1f2a2492ab7867eac7d3f08cce7a"
            ],
            "RepoTags": [
              "selmiss/swinir:latest"
            ],
            "RootFS": {
              "Layers": [
                "sha256:a49c6ceb5b3a7ffa366916db7ef211391b4bf093f14091b5d9e21d53297695a3",
                "sha256:c7c8927e9cc1394664c8ba987c31d6fc8ec68c2ed45195cadacaf5fd0bf2bc3c",
                "sha256:1d1ff3b94ec097351ff29a369627abbf60da8ff0abfc25dab7c29acd49fd23b5",
                "sha256:0e707e1d494af079f11a10df337221bb2e95b587492487c92d079fb961c9d9b3",
                "sha256:611064d03cb4f0614374dd88a69b71227530c966581b6caf1cdd6ac39b7ac507",
                "sha256:94f16d0393455890ae10854b2ada87de8699a681697c199cb8d644ca810f08c4",
                "sha256:7a3e56dbabd44f5f9a81b4fb669dd3c16f84d3648ee08442033315d532793153",
                "sha256:398e09a7d75969c5c0d452949f410683691632a3572b3bdf9249d1c7cdfb4d77",
                "sha256:6fa535b0142660b74b68d0cfabc1d2785bb3512f371c95128544db218966899c",
                "sha256:ded0d1d95c2cb187cc83e43125ae8d56fa3619b533bef0c60bc9352eac2cc7ff",
                "sha256:715c3c77cd0aa1f636206a595b44392f3ab64210d5941af45148ae2b23cea259",
                "sha256:52b849a6e3f450b4250472f6c2f191233c2734552ee2086d03560137c899fac5",
                "sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef",
                "sha256:81c1b303749b4e2ba03a2412bc421097a213e798805f6b73b1265bbf28354f7a"
              ],
              "Type": "layers"
            },
            "Size": 1722853319,
            "VirtualSize": 1722853319
          },
          "id": "sha256:28fa2fbfdab56d23c30e16be11db4a07479bd37c84c874d65412516c3ffe0f72",
          "labels": {
            "org.opencontainers.image.authors": "hello@jina.ai",
            "org.opencontainers.image.created": "2023-02-24T10:22:42Z",
            "org.opencontainers.image.description": "Build multimodal AI services via cloud native technologies",
            "org.opencontainers.image.documentation": "https://docs.jina.ai",
            "org.opencontainers.image.licenses": "Apache 2.0",
            "org.opencontainers.image.revision": "refs/tags/v3.14.1",
            "org.opencontainers.image.source": "https://github.com/jina-ai/jina/commit/refs/tags/v3.14.1",
            "org.opencontainers.image.title": "Jina",
            "org.opencontainers.image.url": "https://github.com/jina-ai/jina",
            "org.opencontainers.image.vendor": "Jina AI Limited",
            "org.opencontainers.image.version": "3.14.1"
          },
          "short_id": "sha256:28fa2fbfdab5",
          "tags": [
            "selmiss/swinir:latest"
          ]
        }
      ],
      createDialogVisible: false,
      newImage: {
        repository: '',
        tag: '',
        size: '',
        created: '',
      },
      loading: true
    };
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      axios.get('/image/list')
        .then((response) => {
          // console.log(response)
          this.privateImageList = this.publicImageList = response.data.data;
          this.loading = false
        })
        .catch((error) => {
          console.error('Error fetching user list:', error);
        });
    },
    showCreateDialog() {
      this.createDialogVisible = true;
    },
    createImage() {
      // Add validation and API call to create a new image
      this.imageList.push({ ...this.newImage, id: this.imageList.length + 1 });
      this.createDialogVisible = false;
    },
  },
};
</script>
<style scoped>
/* h1 {
  font-family: Google Sans, sans-serif
} */
</style>
