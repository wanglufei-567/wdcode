## 项目规格

### 一、项目定位

`wdcode` 是 `wdcode.cn` 的长期维护 **Monorepo**，包含两个独立责任域：

- `apps/personal-website`：主域名默认个人站应用
- `infra`：内容检出、生产构建、镜像、容器网络、运行参数和公网路由的控制面

`fund-watchtower`、`DebrisRecord` 等外部项目继续在各自仓库维护源码

`DebrisRecord` 在运行机器的 `content/debris-record` 中保持独立 **Git** 历史，由 `infra` 管理检出和更新，个人站只读消费

### 二、真值文档

| 文档 | 维护内容 |
|---|---|
| `docs/ARCHITECTURE.md` | 系统边界、依赖方向、交付链路和运行时链路 |
| `docs/DEPLOYMENT.md` | 镜像、路由、验证和回滚契约 |
| `docs/CODING_STANDARD.md` | 本仓库 **AI Coding** 与工程质量规范 |
| `apps/personal-website/docs/SPEC.md` | 个人站职责和内容接入边界 |
| `apps/personal-website/docs/DESIGN.md` | 个人站视觉与交互规范 |
| `infra/docs/SPEC.md` | 基础设施职责和应用接入契约 |

详细编码规则只在 `docs/CODING_STANDARD.md` 维护

### 三、依赖方向

```text
personal-website source
  -> personal-website image

external repository source
  -> external application image

DebrisRecord repository
  -> managed Git checkout
  -> read-only runtime mount

infra manifests
  -> image references and content paths
  -> runtime services

Caddy routes
  -> runtime service endpoints
```

`infra` 通过镜像契约接入外部应用，通过只读 **Git Checkout** 接入纯内容仓库

个人站维护精选摘要和内容展示规则，不取得 `DebrisRecord` 原文所有权

### 四、域名与路径

| 入口 | 消费者 | 所有权 |
|---|---|---|
| `wdcode.cn/` | 个人站 | `apps/personal-website` |
| `wdcode.cn/notes/*` | 完整笔记目录与阅读页 | `apps/personal-website` |
| `www.wdcode.cn/*` | 永久跳转至主域名 | `infra` |
| `fund.wdcode.cn/*` | 基金观察台 | 外部 `fund-watchtower` 镜像 |

### 五、跨仓库契约

- `DebrisRecord` 提供独立维护的 **Markdown**、目录和图片
- `infra` 在当前运行机器克隆或更新内容仓库，并以只读目录挂载给个人站
- 个人站通过 **Nginx JSON Autoindex** 读取目录，通过 `ReactMarkdown` 按需渲染原文
- `fund-watchtower` 提供 Web 网关与 API 镜像及其端口、健康检查、环境变量和数据目录契约
- `infra` 选择外部镜像版本，并定向构建 `wdcode` 自有应用
