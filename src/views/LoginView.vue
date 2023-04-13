<template>
    <div>
        <div class="total">
            <div class="login-box">
                <el-form ref="formRef" :model="ruleForm" status-icon :rules="rules" label-width="70px" class="demo-ruleForm"
                    :hide-required-asterisk="true">
                    <h2>小吴后台管理系统</h2>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { LoginFormInt } from '../type/login'
import { login } from '.././request/api/login'
import type { FormInstance } from 'element-plus'
// 路由跳转的方法
import { useRouter } from 'vue-router'
const formRef = ref<FormInstance>()
const router = useRouter()//执行这个方法就相当于产生 $router
// 登录数据
const ruleForm: LoginFormInt = reactive({
    username: 'admin',
    password: '123456',
})
// 校验规则
const rules = reactive({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 3, max: 5, message: '用户名长度在3-5位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 5, max: 16, message: '密码长度在5-16位', trigger: 'blur' },
    ],
})
// 登录功能
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // 对表单进行验证
    formEl.validate(async (valid) => {

        if (valid) {
            const res = await login(ruleForm)
            //    console.log(res.data);
            // 将登录的信息进行储存
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.data.username)
            // 跳转到首页
            router.push('./')
        } else {
            console.log('error submit!')
            return false
        }
    })
}
const resetForm = () => {
    ruleForm.username = ''
    ruleForm.password = ''
}
</script>
Z
<style scoped lang="scss">
.total {
    width: 100%;
    height: 100vh;
    background: url(../assets/background.jpg) no-repeat center;
    background-size: 100% 100%;
    position: relative;

    .login-box {
        h2 {
            margin: 10px 0 10px 0px;
            text-align: center;
            color: #fff;
        }

        top: 30%;
        left: 40%;
        padding:0 40px;
        width: 380px;
        height: 200px;
        position: absolute;
        background-color: rgba($color: #eed2c4, $alpha: 0.1);
        border-radius:8px;
    }
}
</style>    