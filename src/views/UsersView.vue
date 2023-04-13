<template>
    <div>
        <!-- 搜素表单 -->
        <el-form :inline="true" :model="seletData" class="demo-form-inline">
            <el-form-item label="姓名:">
                <el-input v-model="seletData.nickName" placeholder="请输入姓名" clearable />
            </el-form-item>
            <el-form-item label="角色:">
                <el-select v-model="seletData.role" placeholder="请选择角色">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 展示数据的表单 -->
        <el-table :data="userlist" border style="width: 100%" >
            <el-table-column prop="id" label="Id" width="180" />
            <el-table-column prop="nickName" label="姓名" width="180" />
            <el-table-column prop="role" label="商品详情">
                <template #default="scope">
                    <el-button type="primary" link size="small" v-for="(item, index) in scope.row.role" :key="index">
                        {{ item.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作">
                <template #default="scope">
                    <el-button type="primary" link size="small" @click.prevent="showDialog(scope.row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog v-model="isShow" title="编辑信息" width="480px">
        <el-form :model="active">
            <el-form-item label="姓名:" label-width="50px">
                <el-input v-model="active.nickName" autocomplete="off" input-style="width:'100px'" />
            </el-form-item>
            <el-form-item label="角色:" label-width="50px">
                <el-select v-model="active.role" placeholder="请选择角色" multiple>
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="changeUser">更改</el-button>
                <el-button type="primary" @click="isShow = false">
                    取消
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { getRoleList, getUserList } from "@/request/api/roles"
import { onMounted, reactive, toRefs, watch, ref } from "vue";
import { InitData, ListInit, roleInt } from '@/type/user'
onMounted(() => {
    getRole()
    getUsers()
})
// 请求用户列表和角色列表
const getRole = () => {
    getRoleList().then(res => {
        roleList.value = res.data

    })
}
const getUsers = () => {
    getUserList().then((res) => {
        userlist.value = res.data
    })
}
// 定义数据
const dataList = reactive(new InitData())
const { userlist, seletData, roleList, active, isShow } = toRefs(dataList)


// 查询功能
let onSubmit = () => {
    // 定义一个接收筛选完数据的数组
    // 情况一：只有一个筛选条件
    let arr: ListInit[] = []
    if (seletData.value.role || seletData.value.nickName) {//判断两其中一个有值

        if (seletData.value.nickName) {

            arr = userlist.value.filter(val => {
                return val.nickName.indexOf(seletData.value.nickName) !== -1;
            })
        }
        if (seletData.value.role) {
            arr = (seletData.value.nickName ? arr : userlist.value).filter(val => {
                return val.role.find((item: roleInt) => item.role === seletData.value.role)
            })
        }
    } else { //情况二：筛选条件为空
        arr = userlist.value;
    }
    userlist.value = arr
}
//使用监视器监视数据,当筛选条件为空时重新获取数据
watch([() => seletData.value.role, () => seletData.value.nickName], () => {
    if (seletData.value.role === 0 && seletData.value.nickName === '') {
        getUsers()
    }
})
// 弹出框
const showDialog = (row: ListInit) => {
    console.log(row);
    active.value = {
        id: row.id,
        nickName: row.nickName,
        userName: row.userName,
        role: row.role.map((val: any) => val.role || val.roleId),
    }
    isShow.value = true;
}
const changeUser = () => {
    let obj: any = userlist.value.find((val) => val.id == active.value.id)
    obj.nickName = active.value.nickName;
    obj.role = roleList.value.filter(item => active.value.role.indexOf(item.roleId) !== -1)
    console.log(obj.role)
    userlist.value.forEach((item, i) => {
        if (item.id === obj.id) {
            userlist.value[i] = obj
        }
    });
    // 关闭弹窗
    isShow.value = false
}
</script>

<style scoped></style>