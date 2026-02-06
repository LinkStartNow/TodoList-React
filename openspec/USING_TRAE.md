# 用 Trae 执行 OpenSpec（零依赖版本）

本项目使用 `openspec/changes/<change>/` 作为“规格驱动开发”的事实来源。Trae **不会自动**因为目录存在就强制遵循流程；要让它稳定遵循，你需要在对话中显式触发流程，或使用本仓库提供的技能 `openspec-sdd`。

## 极简口令（推荐）

你可以只说一句话就够了：

- `使用 openspec-sdd`（不写 active change 时，默认会选择最新的 `openspec/changes/` 变更目录）
- `使用 openspec-sdd。readme-refresh`（你习惯显式指定时用这个）

常见场景的一句话版本：

- 只想让它开始做：`使用 openspec-sdd`
- 你改了 specs 想它重跑：`使用 openspec-sdd。按 acceptance 重新验收并继续`
- 你只想它先读完总结：`使用 openspec-sdd。先总结 proposal/specs/design/tasks`

## 最推荐用法：使用 openspec-sdd 技能

在对话里直接说：

> 使用 openspec-sdd。Active change: openspec/changes/<change>。请先读 proposal/specs/design/tasks，然后严格按 tasks 逐条完成并勾选，最后对照 acceptance 验收。

示例：

> 使用 openspec-sdd。Active change: openspec/changes/readme-refresh。

## 不用技能也能稳定：复制粘贴这段“执行协议”

把下面这段作为你每次开始写代码前的第一句话（建议固定粘贴）：

1. 只以 `openspec/changes/<change>/` 为准，不要凭感觉扩展需求  
2. 先读：proposal → specs(acceptance) → design → tasks  
3. 严格按 `tasks.md` 顺序实现，每完成一条就勾选  
4. 结束前逐条对照 `specs/acceptance.md` 验收，并给出验证命令输出

## 变更目录应该包含什么

最低配置：

- `proposal.md`
- `specs/acceptance.md`
- `design.md`
- `tasks.md`

## 常见踩坑

- **只建了目录不触发流程**：Trae 不会自动遵循，必须在对话中明确指定 Active change。
- **specs 太抽象**：验收要可执行（Given/When/Then），否则实现会漂。
- **tasks 不可执行**：tasks 必须是能“逐条勾选”的动作，不要写成大段叙述。
