# Specs: auth-login（验收标准）

## 场景 A：未登录访问受保护路由会跳转

**Given** localStorage 中不存在登录态  
**When** 我访问 `/`  
**Then** 页面自动跳转到 `/login`，且 TodoList 内容不可见

## 场景 B：登录成功会跳回首页

**Given** 我在 `/login`  
**When** 我填写用户名并点击登录  
**Then** 登录态被写入 localStorage，并跳转到 `/`

## 场景 C：访问受保护路由后再登录会回到原路径

**Given** localStorage 中不存在登录态  
**When** 我直接访问 `/`  
**Then** 被跳转到 `/login`  
**When** 我登录成功  
**Then** 自动回到 `/`（或保持为最初想访问的受保护路径）

## 场景 D：刷新后登录态保持

**Given** 我已登录并在 `/`  
**When** 我刷新页面  
**Then** 仍保持登录态并停留在 `/`，不应再次跳到 `/login`

## 场景 E：退出登录

**Given** 我已登录并在 `/`  
**When** 我点击退出登录  
**Then** 登录态从 localStorage 清除，并跳转到 `/login`

