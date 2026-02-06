#!/bin/bash

# Trae Skills Installer
# 此脚本用于一键安装 Superpowers, Planning-with-Files 和 UI-UX-Pro-Max 技能库

set -e

echo "🚀 开始安装 Trae Skills..."

# 1. 检查并创建技能目录
SKILLS_DIR=".trae/skills"
TEMP_DIR=".trae/temp_installer"

if [ ! -d "$SKILLS_DIR" ]; then
    echo "📂 创建技能目录: $SKILLS_DIR"
    mkdir -p "$SKILLS_DIR"
else
    echo "ℹ️  技能目录已存在: $SKILLS_DIR"
fi

mkdir -p "$TEMP_DIR"

# 2. 安装 Superpowers
echo "⬇️  正在拉取 Superpowers..."
git clone --depth 1 https://github.com/obra/superpowers.git "$TEMP_DIR/superpowers" > /dev/null 2>&1
echo "📦 正在部署 Superpowers 技能..."
cp -r "$TEMP_DIR/superpowers/skills/"* "$SKILLS_DIR/"

# 3. 安装 Planning with Files
echo "⬇️  正在拉取 Planning with Files..."
git clone --depth 1 https://github.com/OthmanAdi/planning-with-files.git "$TEMP_DIR/planning-with-files" > /dev/null 2>&1
echo "📦 正在部署 Planning with Files 技能..."
mkdir -p "$SKILLS_DIR/planning-with-files"
cp -r "$TEMP_DIR/planning-with-files/skills/planning-with-files/"* "$SKILLS_DIR/planning-with-files/"

# 4. 安装 UI UX Pro Max
echo "⬇️  正在拉取 UI UX Pro Max..."
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git "$TEMP_DIR/ui-ux-pro-max" > /dev/null 2>&1
echo "📦 正在部署 UI UX Pro Max 技能..."
mkdir -p "$SKILLS_DIR/ui-ux-pro-max"
cp -r "$TEMP_DIR/ui-ux-pro-max/src/ui-ux-pro-max/"* "$SKILLS_DIR/ui-ux-pro-max/"
# 创建 SKILL.md (如果源仓库没有标准的 Trae 格式)
cat > "$SKILLS_DIR/ui-ux-pro-max/SKILL.md" <<EOF
---
name: ui-ux-pro-max
description: UI/UX design intelligence with searchable database for web and mobile apps. Invoke when designing layouts, choosing colors/fonts, or improving UX.
---

# UI UX Pro Max

A comprehensive design intelligence system for building professional interfaces.

## Features

- **Design Systems**: Generate tailored design systems for specific domains
- **Component Patterns**: Best practices for 50+ UI components
- **Color Palettes**: 90+ accessible color combinations
- **Typography**: 50+ Google Font pairings
- **UX Guidelines**: 90+ research-backed usability rules

## Usage

### 1. Generate a Design System

Ask to generate a design system for your specific use case:

> "Generate a design system for a [Fitness App / E-commerce Site / Dashboard]"

The system will provide:
- Visual Pattern (Layout, hierarchy)
- Color Palette (Primary, secondary, semantic)
- Typography (Headings, body, pairings)
- Key Effects (Shadows, radius, transitions)
- Anti-patterns to avoid

### 2. Search for Specific Guidelines

You can search the database for specific topics:

> "Search ui-ux-pro-max for [navigation patterns]"
> "Find color palettes for [finance apps]"
> "What are the best practices for [modal dialogs]?"

### 3. Component Implementation

Get specific implementation details for your stack:

> "Show me how to implement a [Card] component in [React/Tailwind]"

## Tools

This skill includes a Python script to search the internal database:

\`\`\`python
# Internal usage by the agent
python .trae/skills/ui-ux-pro-max/scripts/search.py "query string"
\`\`\`
EOF

# 5. 清理临时文件
echo "🧹 清理临时文件..."
rm -rf "$TEMP_DIR"

echo "✅ 安装完成！"
echo "🎉 你现在拥有了以下技能："
echo "   - 🧠 Brainstorming"
echo "   - 📝 Writing Plans"
echo "   - 📂 Planning with Files"
echo "   - 🎨 UI UX Pro Max"
echo "   - 🧪 Test Driven Development"
echo "   - 🐞 Systematic Debugging"
echo "   ...以及更多！"
echo ""
echo "💡 使用方法：直接在对话中对 Trae 说 '使用 [技能名] 帮我...'"
