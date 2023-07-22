# Editor 的页面

1. sign-in: 登录页（根据组织登录）
1. dashboard: 进入编辑器组织首页（使用量、打开量、环境变量设置、数据表编辑器、函数流编辑器、展示器列表）
1. presenters: 展示器列表
1. presenter: 展示器编辑器
1. permissions: 编辑器权限管理
1. account: 账号管理

# Editor 的不同组件的层次

```
App
    Screens
        Containers (with states)
            Pure Components
```

# Presenter Editor

1. 路由管理
   1. 新建路由
   2. 删除路由
1. 容器管理
   1. 新建容器
   1. 删除容器
1. 组件树管理
   1. 新建组件
   1. 删除组件
   1. 移动组件
1. 具体组件配置
   1. 配置详情
1. 可选组件列表
   1. 列表（根据上下文列出可用）
   1. 搜索
1. 数据仓库列表
   1. 新建数据仓库
   1. 删除数据仓库
   1. 配置数据仓库
1. 预览区
   1. 指定打开的路由页面是什么
   1. 编辑器至预览区的实时预览通信
   1. 预览区至编辑器的实时状态通信
1. 版本管理
   1. 保存
   1. Git 版本控制 (后续功能)

screens
containers
widgets
repositories
