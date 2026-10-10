# 梅之夏静态资源

Astro 纯静态站点，站点地址为 https://static.blog.mcenahle.page。

## 开发

使用 Node.js 22.12+（或更新的受支持版本）和 pnpm 10。

```sh
pnpm install
pnpm dev
pnpm build
pnpm verify
pnpm preview
```

构建产物位于 `dist/`，部署到静态托管平台即可。需要托管平台将未匹配的路径指向 `404.html` 并返回 HTTP 404 状态。本站无需服务器适配器或数据库。

## 路由与迁移

- `/`：首页
- `/subscribe/`：原 RSS 订阅页
- `/comment-picture-save-policy/`：原评论图片存储说明
- `/privacy/`：本站技术与隐私说明
- `404.html`：未找到页面

原始 `resources/` 保留作为迁移参考。原有友情链接及编辑链接均保留在页面或公共页脚中。原相对 `/feed.xml` 链接修正为原文已有的 `https://blog.mcenahle.page/feed.xml`；返回主站链接指向博客主站。未改动评论图片存储规则。

样式和 SVG 图标由本站提供；仅 RSS 复制按钮使用少量客户端 JavaScript，失败时可手动复制。没有第三方运行时脚本、统计、Cookie 或本地存储。确定托管平台后，请补充隐私页中的托管日志说明；调整路由时同步更新 `public/sitemap.xml`。
