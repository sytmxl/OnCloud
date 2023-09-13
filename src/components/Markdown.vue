<template>
  <div class="markdown-editor flex flex-col surface-variant p-4 rounded-3xl">
    <div v-for="(line, index) in markdownLines" :key="index" class="w-full flex items-center">
      <!-- <div class="primary-text">{{ index }}  &nbsp;</div> -->

      <div v-if="activeLine !== index" class=" flex-1">
        <div @click="activateLine(index)" v-html="renderedMarkdownLines[index]" class=" cursor-text"></div>
      </div>
      <div v-show="activeLine == index" class="flex-1">
        <input type="text" placeholder="Type here" class="surface-variant w-full" v-model="line.content" @keydown.enter="insertNewLine" @blur="renderLine(index)" ref="input" :class="index" />
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  data() {
    return {
      markdownContent: '',
      markdownLines: [{content: 'Type here'}],
      renderedMarkdownLines: ['Type here'],
      activeLine: 0,
    };
  },
  created() {
    this.md = new MarkdownIt();
  },
  methods: {
    activateLine(index=this.activeLine) {
      this.activeLine = index;
      this.$nextTick(() => {
        this.$refs.input[this.activeLine].focus();
      });
    },
    renderLine(index) {
      this.renderedMarkdownLines[index] = this.md.render(this.markdownLines[index].content || '&nbsp;'); // empty process
    },
    insertNewLine() {
      this.markdownLines.splice(this.activeLine + 1, 0, {content:''});
      this.renderedMarkdownLines.splice(this.activeLine + 1, 0, '');
      this.activeLine++;
      console.log(this.markdownLines, this.renderedMarkdownLines)
      this.activateLine()
    },
  },
};
</script>

<style scoped>
/* Add scoped styling for the editor and preview here */
.markdown-editor {
  display: flex;
}

.markdown-line {
  display: flex;
  margin: 10px 0;
}

.rendered-line {
  cursor: pointer;
  padding: 5px;
  background-color: #f5f5f5;
}

.edit-line {
  width: 100%;
  min-height: 30px;
  padding: 5px;
  resize: vertical;
  border: 1px solid #ccc;
  overflow: auto;
}

.preview-line {
  flex: 1;
  padding: 5px;
  background-color: #f5f5f5;
}
input:focus {
  border: none;
  outline: none;
}
</style>
