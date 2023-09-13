<!--
通过内建的 <TransitionGroup> 实现“FLIP”列表过渡效果。
https://aerotwist.com/blog/flip-your-animations/
-->

<script>
import { shuffle } from 'lodash-es'

const getInitialItems = () => [1, 2, 3, 4, 5]
let id = getInitialItems().length + 1

export default {
  data() {
    return {
      items: getInitialItems()
    }
  },
  methods: {
    insert() {
      const i = Math.round(Math.random() * this.items.length)
      this.items.splice(i, 0, id++)
    },
    reset() {
      this.items = getInitialItems()
    },
    shuffle() {
      this.items = shuffle(this.items)
    },
    remove(item) {
      const i = this.items.indexOf(item)
      if (i > -1) {
        this.items.splice(i, 1)
      }
    }
  }
}
</script>

<template>
  <div>
    <button @click="insert">insert at random index</button>
    <button @click="reset">reset</button>
    <button @click="shuffle">shuffle</button>
  </div>

  <TransitionGroup tag="ul" name="fade" class="container">
    <div v-for="item in items" class="item" :key="item">
      {{ item }}
      <button @click="remove(item)">x</button>
    </div>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 0;
}

.item {
  width: 100%;
  height: 50px;
  background-color: #f3f3f3;
  /* border: 1px solid #666; */
  /* box-sizing: border-box; */
  border-radius: 10px;
  margin-top: 10px;
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(.23,1.38,.65,.99);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from {
  opacity: 0;
  transform: scale(0.5, 0.5) translate(0px, -80px);
}

.fade-leave-to {
  opacity: 0;
  /* transform: scale(0.5, 0.5) translate(0px, 0px) ; */
  /* backdrop-filter: blur(400px); */
  filter: blur(40px);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>