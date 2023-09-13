<template>
  <el-popover
    placement="top"
    width="200"
    :visible="visible"
    trigger="click"
    popper-class="confirm-popover"
  >
    <p>{{ message }}</p>
    <div style="text-align: right; margin: 10px 0;">
      <el-button size="mini" @click="handleCancel">Cancel</el-button>
      <el-button size="mini" type="danger" @click="handleConfirm">Confirm</el-button>
    </div>
    <span slot="reference">
      <slot></slot>
    </span>
  </el-popover>
</template>

<script>
export default {
  name: 'ConfirmPop',
  props: {
    visible: Boolean,
    message: String,
  },
  methods: {
    handleCancel() {
      this.$emit('cancel');
    },
    handleConfirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style scoped>
.confirm-popover .el-popover__reference {
  cursor: pointer;
}
</style>
