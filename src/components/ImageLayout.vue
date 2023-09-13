<template>
  <div v-if="imageList">
    <div v-if="imageList.length != 3 && imageList.length != 1" class="flex flex-col overflow-hidden ratio round-outline gap-1 relative">
      <div class="flex flex-1 overflow-hidden centered gap-1" v-for="(rowImages, rowIndex) in imageRows" :key="rowIndex">
        <div class="centered overflow-hidden flex-1 h-full" v-for="(imageUrls, index) in rowImages" @click="this.$emit('show-big', imageList, rowIndex * 3 + index)">
          <img :src="imageUrls[2]" class="" alt="">
        </div>
      </div>
    </div>
    <!-- for 3 pics -->
    <div v-else-if="imageList.length != 1" class="flex overflow-hidden ratio centered round-outline gap-1 relative">
      <div class="flex-1 h-full" @click="this.$emit('show-big', imageList, 0)">
        <img :src="imageList[0][2]" class=" " alt="">
      </div>
      <div class="flex-1 flex flex-col gap-1">
        <div class="centered overflow-hidden flex-1 h-full" @click="this.$emit('show-big', imageList, 1)">
          <img :src="imageList[1][2]" class=" " alt="">
        </div>
        <div class="centered overflow-hidden flex-1 h-full" @click="this.$emit('show-big', imageList, 2)">
          <img :src="imageList[2][2]" class=" " alt="">
        </div>
      </div>
    </div>
    <!-- for 1 pic -->
    <div v-else class=" overflow-hidden round-outline max-h-96 centered" @click="this.$emit('show-big', imageList, 0)">
      <img :src="imageList[0][2]" class=" " alt="">
    </div>
    
    <!-- <div class="flex justify-center mt-4">
      <button @click="addImage" class="btn btn-primary mx-2">Add Image</button>
      <button @click="removeImage" class="btn btn-secondary mx-2" :disabled="imageList.length === 0">Remove Image</button>
    </div> -->
  </div>
</template>

<script>
export default {
  emits: ['showBig'],
  data() {
    return {
      // imageList: ["https://plus.unsplash.com/premium_photo-1691917243192-cf1638ffdb42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"],
      currentIndex: 1,
      imagePaths: ["https://plus.unsplash.com/premium_photo-1691917243192-cf1638ffdb42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"], // Add more image paths
      imagesPerRow: 3,
    };
  },
  props: {
    imageList: Array
  },
  computed: {
    imageRows() {
      const rows = [];
      const imagesPerRow = this.imageList.length == 4 ? 2 : this.imagesPerRow
      for (let i = 0; i < this.imageList.length; i += imagesPerRow) {
        rows.push(this.imageList.slice(i, i + imagesPerRow));
      }
      return rows;
    },
  },
  methods: {
    addImage() {
      this.currentIndex++;
      if (this.currentIndex >= this.imagePaths.length) this.currentIndex = 0
      this.imageList.push(this.imagePaths[this.currentIndex]);
      // console.log(this.imageList)
    },
    removeImage() {
      if (this.imageList.length > 0) {
        this.imageList.pop();
      }
    },
  },
};
</script>
<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.ratio {
  aspect-ratio: 16 / 10;
}
.round-outline {
  border-radius: 21px;
}
</style>
