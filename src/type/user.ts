export interface ListInit {
  id: number;
  nickName: string;
  role: roleInt[];
  userName: string;
}
export interface roleInt {
  role: number;
  roleName: string;
}
export interface selectInit {
  role: number;
  nickName: string;
}
interface roleListInit {
  authority: number[];
  roleId: number;
  roleName: string;
}
export interface ActiveInit {
  id: number;
  nickName: string;
  role: number[];
  userName: string;
}
export class InitData {
  // 筛选条件
  seletData: selectInit = {
    role: 0,
    nickName: "",
  };
  userlist: ListInit[] = []; //接受获取到的用户列表的数据
  roleList: roleListInit[] = []; //接收角色列表的数据
  isShow = false; //是否显示弹窗
  active: ActiveInit = {
    //当前选中表格行的数据
    id: 0,
    nickName: "",
    role: [],
    userName: "",
  };
}
