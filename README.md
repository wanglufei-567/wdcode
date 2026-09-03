## wdcode

`wdcode` 是 `wdcode.cn` 的长期维护 **Monorepo**，包含个人站应用、站内业务模块、稳定契约和生产基础设施配置

外部项目继续在各自仓库维护源码，可以作为展示案例投影到个人站，也可以在需要独立运行时通过不可变 **Docker** 镜像接入 `infra`

### 一、职责边界

```text
apps/personal-website
  -> 个人主页、站点壳、模块装配和个人站镜像

modules/notes
  -> 笔记目录、读取与阅读态

modules/works-showcase
  -> 工程实践项目注册、案例展示与外部演示入口

packages/site-module-contract
  -> 主应用与业务模块之间的稳定注册契约

external repositories
  -> 外部应用源码和应用镜像

infra
  -> 镜像版本、运行参数、容器网络和公网路由
```

应用仓库负责镜像，`infra` 负责运行，**Caddy** 负责公网入口

### 二、个人站

- 使用 **React**、**TypeScript**、**Vite** 和 **React Router**
- 首页展示个人介绍和精选文章
- `/notes/*` 按 `DebrisRecord` 目录展示全部 **Markdown** 笔记
- `/works/*` 展示经过证据核验的个人项目案例
- 精选文章直接进入完整笔记页中的对应路径
- 运行镜像使用 **Nginx** 提供静态文件、笔记目录、原文读取、健康检查和 **SPA** 回退
- `DebrisRecord` 在每台运行机器独立检出，并以只读目录挂载给个人站
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
  modules/
    notes/
      docs/SPEC.md
    works-showcase/
      docs/DESIGN.md
      docs/SPEC.md
  packages/
    site-module-contract/
      docs/SPEC.md
  content/
    debris-record/
      -> 独立 Git Checkout，不进入 wdcode Git 历史
  infra/
    caddy/Caddyfile
    compose/compose.production.yml
    scripts/sync-debris-record.sh
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
8. [笔记模块规格](modules/notes/docs/SPEC.md)
9. [工程实践模块规格](modules/works-showcase/docs/SPEC.md)
10. [工程实践模块设计规范](modules/works-showcase/docs/DESIGN.md)
