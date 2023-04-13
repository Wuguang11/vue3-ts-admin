/* eslint-disable */
// 这个文件是告诉ts vue文件是做什么的 
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
  