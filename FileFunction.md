# Project Notes (给未来的我)

## 运行相关（别删）
- src/：网站源码（页面、组件、布局、内容渲染逻辑）
- public/：静态资源（favicon、og 图、头像、图片等），会原样输出到站点根目录
- astro.config.*：Astro 构建配置（插件、构建行为等）
- package.json：依赖与脚本命令（dev/build 等）
- package-lock.json / pnpm-lock.yaml：锁定依赖版本，保证 CI/Cloudflare Pages 构建一致
- .gitignore：告诉 git 忽略哪些文件（node_modules、dist 等）

## 代码风格与质量（可选，但推荐保留）
- eslint.config.js：ESLint 规则配置，用于代码检查（不影响运行，只影响提示/规范）
- .prettierrc.mjs：Prettier 格式化规则配置（保存/格式化时使用）
- .prettierignore：告诉 Prettier 哪些文件不需要格式化

## 可删（如果不用对应功能）
- Dockerfile / docker-compose.yml：Docker 本地运行/部署用（不用 Docker 就可删）
- .vscode/：VSCode 工作区设置（不需要统一设置就可删）
- cz.yaml：提交信息规范工具配置（commitizen/cz-git），不用可删
- AstroPaper-lighthouse-score.svg：README 展示用图片，不影响站点
- pnpm-lock.yaml：
pnpm 的依赖锁文件，用于保证本地、CI、Cloudflare Pages 使用完全一致的依赖版本。
不参与运行，但必须提交到 Git。
