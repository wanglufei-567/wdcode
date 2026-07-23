## 个人站应用规格

### 一、职责

`apps/personal-website` 是 `https://wdcode.cn/` 的默认应用，负责：

- 个人主页和个人介绍
- 精选学习笔记的标题、摘要和正文入口
- `DebrisRecord` 中明确选定的 **Markdown** 内容投影
- 个人站视觉、交互、可访问性和前端性能
- 自身镜像的构建定义和运行契约

### 二、不负责的内容

个人站不负责：

- 监听生产宿主机 `80`、`443`
- 管理全域名 **HTTPS** 证书
- 编排或部署其他项目容器
- 保存其他项目的业务源码副本
- 成为 `DebrisRecord` 学习笔记的第二份内容真值
- 决定外部应用的镜像版本、数据卷和回滚策略
- 提供评论、搜索、订阅、登录、内容后台和动态推荐

### 三、内容投影边界

个人站维护精选文章清单，清单只保存 `slug`、标题、摘要、封面类型和 `DebrisRecord` 源文件路径

文章原文不提交到本仓库，开发和构建前由同步脚本从指定版本的 `DebrisRecord` 生成临时内容快照

内容链路：

```text
DebrisRecord Markdown
  -> scripts/sync-content.mjs
  -> src/generated/articles
  -> Vite raw import
  -> ReactMarkdown
  -> article page
```

`src/generated/articles` 是可再生构建输入，必须保持在 **Git** 忽略范围内

### 四、技术栈与页面

- **React 19** 与 **TypeScript**：页面和内容组件
- **Vite**：开发服务器和静态生产构建
- **React Router**：`/` 与 `/articles/:slug` 两个页面边界
- `react-markdown` 与 `remark-gfm`：受控渲染 **Markdown**，不启用原始 **HTML**
- 普通 **CSS**：设计令牌、响应式布局和正文排版

正式视觉规则以 [DESIGN.md](./DESIGN.md) 为准

### 五、运行契约

个人站运行契约：

- `Dockerfile` 从已经同步的 **Markdown** 快照构建静态文件
- 运行镜像使用 **Nginx**，只监听容器内部 `80`
- `GET /healthz` 返回 `200`
- `/assets/*` 使用长期不可变缓存，其他路径使用 **SPA** 回退
- 镜像不绑定宿主机端口，不管理域名和证书
- 不需要生产环境变量或密钥

生产产物是静态文件，不要求生产 **Node.js** 服务

### 六、构建边界

镜像构建前必须先在本机或流水线同步内容：

```bash
npm ci
npm run content:sync
docker build --tag registry.example/wdcode/personal-web:sha-<commit> .
```

同步脚本默认读取 `/Users/wangdong/workData/DebrisRecord` 的仓库位置，也可以通过 `DEBRIS_RECORD_PATH` 指向流水线中的明确检出目录

`Dockerfile` 会拒绝缺少 `src/generated/articles/*.md` 的构建上下文，保证镜像不会在构建时隐式访问兄弟仓库
