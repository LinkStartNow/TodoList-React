# Trae Skills 迁移指南

为了方便在其他项目中使用 Trae 强大的 AI 开发技能（Superpowers + Planning with Files + UI UX Pro Max），你可以选择以下任一方式进行迁移。

## 方式一：使用一键安装脚本（推荐）

这种方式会从 GitHub 拉取最新版本的技能库，适合在新环境或新项目中使用。

**注意**：此脚本仅安装公开的开源技能（Superpowers, Planning-with-Files, UI-UX-Pro-Max）。如果你有本地自定义技能（如 frontend-design），请使用方式二。

1. 将 `install_skills.sh` 脚本复制到你的新项目根目录。
2. 在终端运行以下命令：
   ```bash
   bash install_skills.sh
   ```
3. 等待安装完成即可。

## 方式二：直接复制技能包（完全克隆）

这是**最完整**的迁移方式，它会将当前项目中的所有技能（包括 frontend-design 等本地技能）原封不动地打包带走。

1. 将 `trae_skills.zip` 文件复制到你的新项目根目录。
2. 解压文件：
   ```bash
   unzip trae_skills.zip
   ```
   *注意：解压后会自动创建 `.trae/skills` 目录。*

## 验证安装

安装完成后，你可以对 Trae 说：
> "使用 **using-superpowers** 技能介绍一下你自己"

如果 Trae 能正确响应，说明技能已成功安装！

## 包含的技能

*   **Superpowers**: 完整的 AI 工程化开发套件 (TDD, Debugging, Review 等)
*   **Planning with Files**: 基于文件的长周期任务规划
*   **UI UX Pro Max**: 专业的 UI/UX 设计系统生成器
*   **Frontend Design**: 高级前端审美与实现指导
*   ...以及更多高级工程能力
