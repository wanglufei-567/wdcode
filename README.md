## wdcode

`wdcode` 是 `wdcode.cn` 的长期维护 **Monorepo**，包含个人站应用和生产基础设施配置

外部项目继续在各自仓库维护源码，通过不可变 **Docker** 镜像接入 `infra`

### 一、职责边界

```text
apps/personal-website
  -> 个人主页、精选文章和个人站镜像

external repositories
  -> 外部应用源码和应用镜像

infra
  -> 镜像版本、运行参数、容器网络和公网路由
```

应用仓库负责镜像，`infra` 负责运行，**Caddy** 负责公网入口

### 二、个人站

- 使用 **React**、**TypeScript**、**Vite** 和 **React Router**
- 首页展示个人介绍和精选文章
- 正文由 `DebrisRecord` 中明确选择的 **Markdown** 文件生成
- 运行镜像使用 **Nginx** 提供静态文件、健康检查和 **SPA** 回退
- `https://wdcode.cn/` 是个人站默认入口

### 三、目录

```text
wdcode/
  apps/
    personal-website/
      config/nginx/default.conf
      docs/DESIGN.md
      docs/SPEC.md
      Dockerfile
  infra/
    caddy/Caddyfile
    compose/compose.production.yml
    docs/SPEC.md
  docs/
    ARCHITECTURE.md
    CODING_STANDARD.md
    DEPLOYMENT.md
    SPEC.md
```

### 四、文档入口

1. [项目规格](docs/SPEC.md)
2. [架构设计](docs/ARCHITECTURE.md)
3. [**AI Coding** 工程规范](docs/CODING_STANDARD.md)
4. [部署规范](docs/DEPLOYMENT.md)
5. [个人站规格](apps/personal-website/docs/SPEC.md)
6. [个人站设计规范](apps/personal-website/docs/DESIGN.md)
7. [基础设施规格](infra/docs/SPEC.md)
