## 部署规范

### 一、生产拓扑

```text
Internet :80/:443
  -> Caddy
      -> wdcode.cn/*     -> personal-web:80
      -> www.wdcode.cn/* -> https://wdcode.cn/*
      -> fund.wdcode.cn/* -> fund-web:80
           -> /api/*     -> fund-api:5174
           -> other      -> static files / SPA fallback
```

- 只有 **Caddy** 发布宿主机公网端口
- 应用容器只暴露 **Docker** 私有网络端口
- **API** 不直接发布到公网
- 持久化状态独立于容器可写层
- 生产密钥、证书状态和业务数据不进入镜像与 **Git**

### 二、配置真值

| 配置 | 路径 | 维护内容 |
|---|---|---|
| 个人站镜像 | `apps/personal-website/Dockerfile` | 静态站构建和运行契约 |
| 个人站静态服务器 | `apps/personal-website/config/nginx/default.conf` | 静态资源、健康检查和 **SPA** 回退 |
| 公网入口 | `infra/caddy/Caddyfile` | HTTPS、主域名路由和 `www` 跳转 |
| 生产编排 | `infra/compose/compose.production.yml` | 镜像、网络、健康检查和数据挂载 |
| 环境模板 | `infra/.env.example` | 镜像引用和数据目录变量 |

### 三、部署变量

| 变量 | 含义 |
|---|---|
| `PERSONAL_WEB_IMAGE` | 个人站不可变镜像引用 |
| `FUND_WEB_IMAGE` | 基金 Web 网关不可变镜像引用 |
| `FUND_API_IMAGE` | 基金 API 不可变镜像引用 |
| `FUND_DATA_PATH` | 基金持久化数据的宿主机绝对目录 |

生产 `.env` 不提交到 **Git**

### 四、个人站镜像

构建前先同步精选文章：

```bash
cd apps/personal-website
npm ci
DEBRIS_RECORD_PATH=/workspace/DebrisRecord npm run content:sync
docker build --platform linux/amd64 --tag wdcode/personal-web:<version> .
```

运行镜像只包含 **Nginx** 和静态产物，容器内部监听 `80`，健康检查为 `GET /healthz`

### 五、配置校验

```bash
docker compose \
  --env-file infra/.env \
  -f infra/compose/compose.production.yml \
  config

docker run --rm \
  -v "$PWD/infra/caddy/Caddyfile:/etc/caddy/Caddyfile:ro" \
  caddy:2.11.4-alpine \
  caddy validate --config /etc/caddy/Caddyfile
```

### 六、定向发布

应用更新只部署对应服务：

```bash
docker compose \
  --env-file infra/.env \
  -f infra/compose/compose.production.yml \
  pull personal-web

docker compose \
  --env-file infra/.env \
  -f infra/compose/compose.production.yml \
  up -d --no-deps personal-web
```

路由变化先校验 **Caddyfile**，再受控重载 **Caddy**

### 七、验证

个人站发布验证：

- 首页返回 `200`
- 正文深链接直接访问返回 `200`
- `GET /healthz` 返回 `200`
- 静态资源具有正确缓存策略
- 桌面端和移动端没有水平溢出

基金 API 验证：

- `fund.wdcode.cn` 首页和深链接返回 `200`
- `fund.wdcode.cn/api/health` 返回 `200`
- 挂载目录中的 `store.json` 可读写
- 容器重建后业务数据保持完整

入口验证：

- HTTP 正确跳转 HTTPS
- TLS 证书匹配域名
- 主域名路径进入个人站
- `www.wdcode.cn` 永久跳转主域名
- `fund.wdcode.cn` 整体进入基金 Web 网关

### 八、回滚

- 应用回滚恢复上一不可变镜像
- 路由回滚恢复上一份已验证 **Caddy** 配置
- 数据结构不兼容时同时处理镜像和数据恢复
- 删除或替换生产数据目录前必须完成可恢复备份
