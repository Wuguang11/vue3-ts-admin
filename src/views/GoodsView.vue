<template>
    <div>
        <!-- 搜素表单 -->
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="商品种类:">
                <el-input v-model="selectData.title" placeholder="请输入种类" clearable />
            </el-form-item>
            <el-form-item label="商品详情:">
                <el-input v-model="selectData.introduce" placeholder="请输入详情" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryHandle()">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 展示数据的表单 -->
        <el-table :data="dataList.comList" border style="width: 100%" height="560">
            <el-table-column prop="id" label="Id" width="180" />
            <el-table-column prop="title" label="商品名称" width="180" />
            <el-table-column prop="introduce" label="商品详情" />
        </el-table>
        <!-- 分页 -->
        <div class="fenye">
            <el-pagination layout="prev, pager, next,total" :total="list.length" @current-change="currrentChange"
                @size-change="sizeChange" :page-size="selectData.pageSize" />
        </div>
    </div>
</template>

<script setup name="商品列表" lang="ts">
import { getGoodsList } from "@/request/api/goods"
import { reactive, toRefs, onMounted, computed, watch } from "vue";
import { initData, listInit } from "@/type/goods"
const data = reactive(new initData())
const { selectData, list } = toRefs(data) //对类的实例对象进行解构
onMounted(() => {
    getGoodsList().then(res => {
        data.list = res.data;
    })
})
// 查询
let queryHandle = () => {
    // 定义一个接收筛选完数据的数组
    // 情况一：只有一个筛选条件
    let arr: listInit[] = []
    if (selectData.value.introduce || selectData.value.title) {//判断两其中一个有值
        if (selectData.value.introduce) {
            arr = data.list.filter(val => {
                return val.introduce.indexOf(selectData.value.introduce) !== -1;
            })
        }
        if (selectData.value.title) {
            arr = data.list.filter(val => {
                return val.title.indexOf(selectData.value.title) !== -1;
            })
        }
    } else { //情况二：筛选条件为空
        arr = data.list;
    }
    data.list = arr
}
//使用监视器监视数据,当筛选条件为空时重新获取数据
watch([() => data.selectData.title, () => data.selectData.introduce], () => {
    if (data.selectData.title === '' && data.selectData.introduce === '') {
        getGoodsList().then(res => {
            data.list = res.data;
        })
    }
})
// 分页
function currrentChange(page: number) {
    data.selectData.page = page;
}
function sizeChange(pageSize: number) {
    data.selectData.pageSize = pageSize;

}
const dataList = reactive({
    //切割数据做前端分页
    comList: computed(() => {
        return data.list.slice((data.selectData.page - 1) * data.selectData.pageSize, data.selectData.page * data.selectData.pageSize)
    })
})


</script>

<style lang="scss" scoped>
.fenye {
    margin-top: 10px;
    margin-left: 65vw;
}
</style>