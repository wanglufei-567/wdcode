## 个人站应用规格

### 一、职责

`apps/personal-website` 是 `https://wdcode.cn/` 的默认应用，负责：

- 个人主页和个人介绍
- 精选学习笔记的标题、摘要和正文入口
- 站点级导航、路由注册和公共页头页脚
- `modules/*` 业务模块的构建时装配与错误隔离
- 个人站视觉、交互、可访问性和前端性能
- 自身镜像的构建定义和运行契约

### 二、不负责的内容

个人站不负责：

- 监听生产宿主机 `80`、`443`
- 管理全域名 **HTTPS** 证书
- 编排或部署其他项目容器
- 保存其他项目的业务源码副本
- 拥有 `/notes/*` 的目录读取和阅读态业务实现
- 拥有 `/works/*` 的案例内容与在线演示适配
- 成为 `DebrisRecord` 学习笔记的第二份内容真值
- 决定外部应用的镜像版本、数据卷和回滚策略
- 提供评论、搜索、订阅、登录、内容后台和动态推荐

### 三、模块装配边界

主应用通过 `@wdcode/site-module-contract` 接收业务模块声明，在构建时生成站点导航和路由

当前注册 `@wdcode/notes` 与 `@wdcode/works-showcase`，它们共享主应用注入的公共页头、页脚、单一 **React** 运行时和单一 **Router**

模块不单独启动服务、不生成独立镜像，也不能反向导入 `apps/personal-website` 或直接依赖其他业务模块

### 四、内容接入边界

个人站维护精选文章清单，清单只保存标题、摘要、封面类型和 `DebrisRecord` 源文件路径

文章原文不提交到本仓库，也不复制进个人站镜像

每台运行机器在 `content/debris-record` 中维护独立内容仓库，通过 **Docker Bind Mount** 只读映射到个人站容器的 `/srv/notes`

内容链路：

```text
DebrisRecord Git Checkout
  -> /srv/notes read-only mount
  -> Nginx JSON Autoindex / raw Markdown
  -> React notes route
  -> ReactMarkdown reading view
```

目录请求只展示子目录和 Markdown 文件，`.git` 与隐藏文件不得进入公开读取链路

笔记模块维护精选文章以外的目录发现、原文读取和阅读态实现

### 五、技术栈与页面

- **React 19** 与 **TypeScript**：页面和内容组件
- **Vite**：开发服务器和静态生产构建
- **React Router**：一个站点级路由器，消费主应用和业务模块注册的路由
- `react-markdown` 与 `remark-gfm`：受控渲染 **Markdown**，不启用原始 **HTML**
- 普通 **CSS**：设计令牌、响应式布局和正文排版

正式视觉规则以 [DESIGN.md](./DESIGN.md) 为准

### 六、运行契约

个人站运行契约：

- `Dockerfile` 只构建网站程序，不读取或复制 `DebrisRecord`
- 运行镜像使用 **Nginx**，只监听容器内部 `80`
- `/note-content/*` 从 `/srv/notes` 提供 JSON 目录、Markdown 和图片
- `GET /healthz` 返回 `200`
- `/assets/*` 使用长期不可变缓存，其他路径使用 **SPA** 回退
- 镜像不绑定宿主机端口，不管理域名和证书
- 运行时必须由 **Compose** 提供有效的只读内容挂载

生产产物是静态文件，不要求生产 **Node.js** 服务

### 七、构建与内容更新

个人站镜像在当前运行机器定向构建：

```bash
npm ci --ignore-scripts
docker compose build personal-web
```

内容仓库由 `infra/scripts/sync-debris-record.sh` 初始化或更新：

```bash
./infra/scripts/sync-debris-record.sh
```

修改笔记不重新构建镜像，下一次目录或正文请求直接读取当前工作区
