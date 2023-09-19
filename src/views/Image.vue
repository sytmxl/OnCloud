<template>
  <div class="p-2">
    <div class="flex justify-between p-4">
      <div class="flex gap-4">
        <h1>镜像管理</h1>
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
      <CreateImage type="create" @close="createDialogVisible = false"></CreateImage>
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
      ],
      privateImageList: [
      {
            "attrs": {
                "Architecture": "amd64",
                "Author": "",
                "Comment": "",
                "Config": {
                    "AttachStderr": false,
                    "AttachStdin": false,
                    "AttachStdout": false,
                    "Cmd": [
                        "python",
                        "app.py"
                    ],
                    "Domainname": "",
                    "Entrypoint": null,
                    "Env": [
                        "PATH=/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                        "LANG=C.UTF-8",
                        "GPG_KEY=E3FF2839C048B25C084DEBE9B26995E310250568",
                        "PYTHON_VERSION=3.8.18",
                        "PYTHON_PIP_VERSION=23.0.1",
                        "PYTHON_SETUPTOOLS_VERSION=57.5.0",
                        "PYTHON_GET_PIP_URL=https://github.com/pypa/get-pip/raw/9af82b715db434abb94a0a6f3569f43e72157346/public/get-pip.py",
                        "PYTHON_GET_PIP_SHA256=45a2bb8bf2bb5eff16fdd00faef6f29731831c7c59bd9fc2bf1f3bed511ff1fe"
                    ],
                    "ExposedPorts": {
                        "5001/tcp": {}
                    },
                    "Hostname": "",
                    "Image": "sha256:19ca11b14492bd7801e1b63ee0b2bc460716f152ee64d0c218bec4ff51376593",
                    "Labels": null,
                    "OnBuild": null,
                    "OpenStdin": false,
                    "StdinOnce": false,
                    "Tty": false,
                    "User": "",
                    "Volumes": null,
                    "WorkingDir": "/app"
                },
                "Container": "0333e4e0a0b7bb2cefaaa9091fc177c15fa3898b6dd5cbe4338c7ddcfb76ad3c",
                "ContainerConfig": {
                    "AttachStderr": false,
                    "AttachStdin": false,
                    "AttachStdout": false,
                    "Cmd": [
                        "/bin/sh",
                        "-c",
                        "#(nop) ",
                        "CMD [\"python\" \"app.py\"]"
                    ],
                    "Domainname": "",
                    "Entrypoint": null,
                    "Env": [
                        "PATH=/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                        "LANG=C.UTF-8",
                        "GPG_KEY=E3FF2839C048B25C084DEBE9B26995E310250568",
                        "PYTHON_VERSION=3.8.18",
                        "PYTHON_PIP_VERSION=23.0.1",
                        "PYTHON_SETUPTOOLS_VERSION=57.5.0",
                        "PYTHON_GET_PIP_URL=https://github.com/pypa/get-pip/raw/9af82b715db434abb94a0a6f3569f43e72157346/public/get-pip.py",
                        "PYTHON_GET_PIP_SHA256=45a2bb8bf2bb5eff16fdd00faef6f29731831c7c59bd9fc2bf1f3bed511ff1fe"
                    ],
                    "ExposedPorts": {
                        "5001/tcp": {}
                    },
                    "Hostname": "0333e4e0a0b7",
                    "Image": "sha256:19ca11b14492bd7801e1b63ee0b2bc460716f152ee64d0c218bec4ff51376593",
                    "Labels": {},
                    "OnBuild": null,
                    "OpenStdin": false,
                    "StdinOnce": false,
                    "Tty": false,
                    "User": "",
                    "Volumes": null,
                    "WorkingDir": "/app"
                },
                "Created": "2023-09-16T08:25:50.026896124Z",
                "DockerVersion": "20.10.7",
                "GraphDriver": {
                    "Data": {
                        "LowerDir": "/var/lib/docker/overlay2/5f0ba93cf417884b80f9674878998cd9d59ce827089834a2f3d213f12f07d19c/diff:/var/lib/docker/overlay2/7dabcee82c6ed829abc0c7ba73b28c73ece93ab54b6a0d111fdda8323752e55b/diff:/var/lib/docker/overlay2/96941ddde45fbbe70d70e26bf26b7beb8f2eab4e5725f0a76ec42e4009892327/diff:/var/lib/docker/overlay2/245a360c86946ec353037c89ada7f588f71ca263ff17a04a21092aead82db142/diff:/var/lib/docker/overlay2/a3da674e9b746571919b5a01d31db80a8d03f113b46b4a5fd9225c9b8527d226/diff:/var/lib/docker/overlay2/879794ae653a070e82b82569d863e826fb9386e25863412f4e14aa7b2d62daa5/diff:/var/lib/docker/overlay2/62f0699c0c26b3933e81d0cd7fbf77e03f0cabd27157b5c0fc5026a685366a13/diff",
                        "MergedDir": "/var/lib/docker/overlay2/de6554ccfb5e8aa9945fbddb6757ab7ccb39f905d7085194394f21c87fd92e2d/merged",
                        "UpperDir": "/var/lib/docker/overlay2/de6554ccfb5e8aa9945fbddb6757ab7ccb39f905d7085194394f21c87fd92e2d/diff",
                        "WorkDir": "/var/lib/docker/overlay2/de6554ccfb5e8aa9945fbddb6757ab7ccb39f905d7085194394f21c87fd92e2d/work"
                    },
                    "Name": "overlay2"
                },
                "Id": "sha256:f4ed36b9911d306c2122a363f1ed2a4fcd795a908bf5609fa477bbc8be5b0a51",
                "Metadata": {
                    "LastTagTime": "2023-09-16T16:35:26.272739073+08:00"
                },
                "Os": "linux",
                "Parent": "sha256:19ca11b14492bd7801e1b63ee0b2bc460716f152ee64d0c218bec4ff51376593",
                "RepoDigests": [],
                "RepoTags": [
                    "myflask:0.0.1",
                    "myflask:0.0.2",
                    "myflask:latest"
                ],
                "RootFS": {
                    "Layers": [
                        "sha256:a2d7501dfb3541f3d736125cdfd748618194f60cbb5c63f4de67a92530899628",
                        "sha256:b9044eea833a0cf80a01e107632d771f92fe9a559a2e7c642c79b4d870bd5c44",
                        "sha256:aadeead4f3a7281ae4f645e497bff4a0f83468bf925b35488204634930d13607",
                        "sha256:e549c1d20a2f2e3800b7deea6525a1afd88945480488bb594189d5a189f70470",
                        "sha256:56cd9ff7a419acee9fa89bd88f1960a0302cac1fba8eff0cb1e95d7d71509db4",
                        "sha256:69e31437b994fd5e654ba475f1f6e1f6a5c86130924f2dc7d63fa420732af020",
                        "sha256:5c2d62939d9066879c00afa62fd16e5c59232de649e0b802c73e55acd8b349e0",
                        "sha256:b05b735540feef2b7d52b01e6dc618cc25a2ec8d71c0ed86d4e68b98e7d554c4"
                    ],
                    "Type": "layers"
                },
                "Size": 139262904,
                "VirtualSize": 139262904
            },
            "id": "sha256:f4ed36b9911d306c2122a363f1ed2a4fcd795a908bf5609fa477bbc8be5b0a51",
            "labels": {},
            "short_id": "sha256:f4ed36b9911d",
            "tags": [
                "myflask:0.0.1",
                "myflask:0.0.2",
                "myflask:latest"
            ]
        },
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
      const requests = [
        axios.get('/image/list'),
        axios.get('/image/listrepo')
      ];

      Promise.all(requests)
        .then((responses) => {
          const imageListResponse = responses[0];
          const repoListResponse = responses[1];

          this.privateImageList = imageListResponse.data.data;

          this.publicImageList = repoListResponse.data.data;

          this.privateImageList

          this.loading = false;
        })
        .catch((error) => {
          console.error('Error fetching image lists:', error);
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
