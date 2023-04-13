<template>
    <div>
        <el-tree :data="list" show-checkbox node-key="roleId" :default-checked-keys="authority" :props="defaultProps"
            :check-strictly="true" ref="treeRef" />
        <el-button @click="changeAuth" type="primary">更改权限</el-button>
    </div>
</template>

<script setup lang="ts">
import { toRefs, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { dataInit, ListInt } from '@/type/authority';
import { getAuthoristyList } from '@/request/api/authority'
const router = useRoute()
const query: any = router.query

const { id, authority, list, treeRef } = toRefs(reactive(new dataInit(query.id, query.authority)));
authority.value = query.authority
onMounted(() => {
    getAuthoristyList().then((res) => {
        console.log(res);
        list.value = res.data
    })
})
// 树形控件使用的数据
const defaultProps = {
    children: 'roleList',
    label: 'name',
}
// 修改权限
const changeAuth = () => {
    console.log(treeRef.value.getCheckedKeys().sort(function (a: number, b: number) { return a - b }));
    // 传给后台进行修改

}
</script>   

<style scoped></style>  