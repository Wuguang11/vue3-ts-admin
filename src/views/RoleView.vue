<template>
    <div>
        <!-- 搜素表单 -->
        <el-form :inline="true" class="demo-form-inline">

            <el-form-item>
                <el-button type="primary" @click="addRole">添加角色</el-button>
            </el-form-item>
        </el-form>
        <!-- 展示数据的表单 -->
        <el-table :data="roleList" border style="width: 100%">
            <el-table-column prop="roleId" label="Id" width="180" />
            <el-table-column prop="roleName" label="角色名" width="180" />
            <el-table-column prop="authority" label="权限">
                <template #default="scope">
                    <el-button type="primary" link size="small" @click="chageRole(scope.row)">
                        修改权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs, reactive } from "vue";
import { getRoleList } from "@/request/api/roles"
import { dataInit, roleListInt } from "@/type/role"
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
onMounted(() => {
    getRoles()
})
// 初始化数据
const { roleList } = toRefs(reactive(new dataInit()))
const getRoles = () => {
    getRoleList().then(res => {
        roleList.value = res.data;
    })
}
const addRole = () => {
    ElMessageBox.prompt('请输入要添加的角色名称', '修改权限', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    })
        .then(({ value }) => {
            if (value) {
                roleList.value.push({
                    roleId: roleList.value.length + 1,
                    roleName: value,
                    authority: []
                })
                ElMessage({
                    type: 'success',
                    message: `${value} 角色添加成功！`,
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '用户取消添加角色！',
            })
        })

}
const router = useRouter()
const chageRole = (val: roleListInt) => {
    router.push({
        name: 'autauthority',
        query: {
            roleId: val.roleId,
            authority: val.authority,
        }
    })

}
</script>

<style scoped></style>