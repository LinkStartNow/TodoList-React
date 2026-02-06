# Design: auth-login（React Router + AuthContext）

## 路由

- 使用 `react-router-dom` v6
- 路由表：
  - `/login`：登录页
  - `/`：受保护路由，渲染 TodoList 页面

## 登录态模型

- storage：localStorage
- key：`auth:user`
- value：JSON 字符串，例如：
  - `{ "username": "xxx", "loggedInAt": 1700000000000 }`

## AuthContext

- `AuthProvider`：
  - 初始化时从 storage 读取 user
  - 提供 `login(username)` 与 `logout()`
  - `isAuthenticated = Boolean(user)`
- 不在 context 中放路由逻辑，跳转由页面层完成（避免耦合）

## 受保护路由

- `ProtectedRoute`：
  - 未登录：`Navigate` 到 `/login`，并通过 `state.from` 记录原本想访问的 location
  - 已登录：渲染 children
- `/login` 页面：
  - 已登录则直接 `Navigate` 到 `/`
  - 登录成功后跳转到 `state.from`（若存在），否则 `/`

## UI

- 登录页使用简单输入框与按钮，不新增 UI 依赖
- TodoList 页面顶部增加“退出登录”按钮

