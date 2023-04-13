export interface listInit {
    id:number,
    userId:number,
    title:string,
    introduce:string,
}
interface selectData {
    title:string,
    introduce:string,
    page:number,//页码
    count:number//总条数
    pageSize:number //每页默认显示的条数
}
export class initData {
    list:listInit[] =[] //这里定义展示的内容数据list数组中的元素必须是listInit类型
    selectData:selectData={
        title:'',
        introduce:'',
        page:1,
        count:0,
        pageSize:8,
    }
}