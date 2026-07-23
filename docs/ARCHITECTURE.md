## wdcode 架构设计

### 一、责任面

`wdcode` 把应用生产、部署控制和公网入口定义为三个独立责任面

```text
应用生产面
  apps/personal-website -> personal-web image
  external repositories -> external application images

内容接入面
  DebrisRecord Git -> managed checkout -> read-only mount

部署控制面
  infra -> builds, image versions, content paths, networks, volumes

公网入口面
  Caddy :80/:443 -> runtime services
```

- 应用生产面回答应用如何实现和构建
- 内容接入面回答原始笔记如何进入个人站运行时
- 部署控制面回答生产环境运行哪些镜像以及如何运行
- 公网入口面回答请求进入哪个运行实例

### 二、对象边界

| 对象 | 真值所有者 | 消费者 |
|---|---|---|
| 应用源码 | 对应应用仓库 | 构建流程 |
| **Dockerfile** 和运行契约 | 对应应用仓库 | 构建流程、`infra` |
| 不可变镜像 | 应用发布流程 | 生产 **Compose** |
| 笔记原文和目录 | `DebrisRecord` | 个人站运行时 |
| 内容检出路径 | `infra` | **Docker Compose**、个人站 |
| 镜像版本和运行参数 | `infra` | **Docker Compose** |
| 域名与路径路由 | `infra` | **Caddy** |
| 运行实例 | **Docker Runtime** | **Caddy**、运维人员 |

`infra` 通过镜像契约接入外部应用，通过只读检出契约接入 `DebrisRecord`

### 三、Monorepo 内部边界

```text
apps/personal-website
  owns -> 页面、笔记路由、Markdown 阅读态、前端行为、自身镜像
  excludes -> 笔记原文、全局路由、外部应用部署、生产密钥

infra
  owns -> 内容检出、构建入口、路由、镜像版本、网络、数据卷、部署控制
  excludes -> 页面实现、基金业务逻辑、笔记原文
```

两个责任域通过镜像和挂载契约连接，不通过源码导入形成反向依赖

### 四、内容边界

`DebrisRecord` 是学习笔记原文真值

每台运行机器在 `content/debris-record` 中维护独立 **Git Checkout**

个人站维护精选文章摘要和展示规则，正文、目录和图片始终从只读挂载的当前工作区读取

```text
DebrisRecord Git
  -> infra clone / pull
  -> content/debris-record
  -> Docker read-only mount
  -> Nginx JSON directory / raw files
  -> React notes UI / ReactMarkdown
```

### 五、运行时链路

#### 5.1 个人站

```text
Browser
  -> wdcode.cn:443
  -> Caddy terminates TLS
  -> personal-web:80
  -> Nginx serves app files / note-content
  -> React Router renders / or /notes/*
```

个人站镜像内的 **Nginx** 不管理域名、证书或其他应用路由，笔记目录通过 JSON Autoindex 提供，Markdown 和图片按需读取

#### 5.2 基金观察台

```text
Browser / Fund miniprogram
  -> fund.wdcode.cn:443
  -> Caddy
  -> fund-web:80 / Nginx
      -> /api/* -> fund-api:5174
      -> other paths -> static files / SPA fallback
```

**Caddy** 只选择基金应用，基金 Web 镜像内的 **Nginx** 负责应用内部路由

基金 API 端口只在 **Docker** 私有网络内暴露

### 六、交付链路

```text
wdcode source on target host
  -> typecheck, test, targeted image build
  -> immutable image
  -> Compose targeted service update
  -> health checks

DebrisRecord source
  -> git pull
  -> mounted files update
  -> next request reads current content
```

应用构建和内容更新相互独立，修改笔记不触发个人站镜像重建

### 七、数据与密钥

- 持久化状态不写入容器可写层
- 应用仓库声明容器路径和数据语义
- `infra` 定义宿主机路径、挂载、备份和恢复方式
- `DebrisRecord` 挂载为只读目录，不进入个人站镜像
- **Caddy** 证书状态使用持久化卷
- **Git** 只保存变量结构，不保存生产值

### 八、发布隔离

| 变化 | 默认动作 |
|---|---|
| 个人站页面变化 | 定向更新 `personal-web` |
| 笔记正文或目录变化 | 更新 `content/debris-record`，不重建容器 |
| 基金 Web 变化 | 定向更新 `fund-web` |
| 基金 API 变化 | 定向更新 `fund-api` |
| **Caddy** 路由变化 | 校验配置并受控重载 |
| 数据挂载变化 | 备份并验证兼容性后更新 |
| 环境变量变化 | 只重建受影响服务 |

只有 **Caddy** 可以发布宿主机 `80/443`，应用服务不得绕过统一入口
