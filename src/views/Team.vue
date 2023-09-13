<template>
  <div>
    <h1>团队管理</h1>

    <!-- 创建团队部分 -->
    <el-card>
      <h2>创建新团队</h2>
      <el-form ref="createTeamForm" :model="newTeam" label-position="top">
        <el-form-item label="团队名称">
          <el-input v-model="newTeam.name"></el-input>
        </el-form-item>
        <el-button type="primary" @click="createTeam">创建</el-button>
      </el-form>
    </el-card>

    <!-- 加入团队部分 -->
    <el-card>
      <h2>加入团队</h2>
      <el-form ref="joinTeamForm" :model="joinTeam" label-position="top">
        <el-form-item label="团队代码">
          <el-input v-model="joinTeam.code"></el-input>
        </el-form-item>
        <el-button type="success" @click="joinExistingTeam">加入</el-button>
      </el-form>
    </el-card>

    <!-- 团队成员列表部分 -->
    <el-card>
      <h2>团队成员</h2>
      <el-table :data="teamMembers" border>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTeam: {
        name: '',
      },
      joinTeam: {
        code: '',
      },
      teamMembers: [
        { name: 'Alice', role: '领袖' },
        { name: 'Bob', role: '成员' },
        { name: 'Charlie', role: '成员' },
      ],
    };
  },
  methods: {
    createTeam() {
      // 实现创建新团队的逻辑并将其添加到列表中
    },
    joinExistingTeam() {
      // 实现加入现有团队的逻辑并更新成员列表
    },
  },
};
</script>

<style>
/* 如果需要，可以在这里添加自定义样式 */
</style>
