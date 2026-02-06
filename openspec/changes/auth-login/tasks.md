# Tasks: auth-login（可执行清单）

## 工件

- [x] 确认 specs/acceptance.md 覆盖跳转、刷新、退出

## 依赖与入口

- [x] 安装 `react-router-dom`
- [x] 在应用入口接入 Router 与 AuthProvider

## Auth

- [x] 新增 AuthContext（localStorage 持久化）
- [x] 新增 ProtectedRoute（未登录跳转并记录 from）

## 页面

- [x] 新增 LoginPage（登录后跳转到 from 或 `/`）
- [x] 抽离 TodoList 为页面组件，并新增“退出登录”
- [x] 配置路由：`/login` 与 `/`（受保护）

## 验收与验证

- [x] `npm run dev` 启动成功
- [ ] 手动按 acceptance 场景 A-E 验证通过
