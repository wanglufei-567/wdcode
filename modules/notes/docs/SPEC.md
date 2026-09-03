## 笔记模块规格

### 一、职责

`@wdcode/notes` 是个人站的笔记业务模块，负责：

- `/notes/*` 路由声明
- `DebrisRecord` 目录读取和 Markdown 阅读态
- 笔记路径、内部链接、相对图片和目录导航映射
- 开发环境 `/note-content/*` 只读内容适配器

### 二、不负责的内容

- 不拥有或复制 `DebrisRecord` 原文
- 不实现个人站首页、作品展示或全局导航
- 不管理生产挂载、镜像、域名和容器
- 不依赖 `apps/personal-website` 或其他业务模块内部源码

### 三、接入契约

模块公开 `createNotesModule` 供主应用在构建时注册路由，同时公开 `toNoteRoute` 供首页生成笔记入口

生产环境仍由个人站 **Nginx** 将只读 `/srv/notes` 映射为 `/note-content/*`，模块只消费该 HTTP 契约

详细编码规则以根目录 [`docs/CODING_STANDARD.md`](../../../docs/CODING_STANDARD.md) 为准
