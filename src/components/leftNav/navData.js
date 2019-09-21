
let obj={
  data: [{
    name:'首页',
    key:'0',
    path:'/admin/home'
  },
  {
    name:'banner管理',
    key:'1',
    path:'/admin/banner/',
    children:[
      {
        name:'banner列表',
        path:'/admin/banner/list',
        key:'1-0'
      },
      {
        name:'banner添加',
        path:'/admin/banner/add',
        key:'1-1'
      },
    ]
  },
  {
    name:'商品管理',
    key:'2',
    path:'/admin/food/',
    children:[
      {
        name:'商品列表',
        path:'/admin/food/list',
        key:'2-0'
      },
      {
        name:'商品添加',
        path:'/admin/food/add',
        key:'2-1'
      },
    ]
  },
  {
    name:'用户管理',
    key:'3',
    path:'/admin/food/',
    children:[
      {
        name:'用户列表',
        path:'/admin/food/list',
        key:'3-0'
      },
      {
        name:'用户添加',
        path:'/admin/food/add',
        key:'3-1'
      },
    ]
  },
 
  ]
}
export default obj