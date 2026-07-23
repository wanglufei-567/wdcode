## 项目规格

### 一、项目定位

`wdcode` 是 `wdcode.cn` 的长期维护 **Monorepo**，包含两个独立责任域：

- `apps/personal-website`：主域名默认个人站应用
- `infra`：生产镜像、容器网络、运行参数和公网路由的控制面

`fund-watchtower`、`DebrisRecord` 等外部项目继续在各自仓库维护源码

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

infra manifests
  -> image references
  -> runtime services

Caddy routes
  -> runtime service endpoints
```

`infra` 只消费应用镜像及其公开运行契约，不依赖外部仓库内部源码结构

个人站可以维护外部内容的摘要、分类和链接，不取得外部项目的部署所有权

### 四、域名与路径

| 入口 | 消费者 | 所有权 |
|---|---|---|
| `wdcode.cn/` | 个人站 | `apps/personal-website` |
| `wdcode.cn/articles/*` | 个人站正文 | `apps/personal-website` |
| `www.wdcode.cn/*` | 永久跳转至主域名 | `infra` |
| `fund.wdcode.cn/*` | 基金观察台 | 外部 `fund-watchtower` 镜像 |

### 五、跨仓库契约

- `DebrisRecord` 提供明确版本的 **Markdown** 原文
- 个人站通过构建期同步生成可再生文章输入
- `fund-watchtower` 提供 Web 网关与 API 镜像及其端口、健康检查、环境变量和数据目录契约
- `infra` 选择镜像版本并配置运行环境
