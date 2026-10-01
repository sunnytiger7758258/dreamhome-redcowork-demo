# DreamHome · REDcowork 纯前端演示版

这是从完整 DreamHome 项目中抽取的独立前端仓库，专门用于 REDcowork 导入、继续编辑和发布。

## 这个版本做什么

- 演示“刷到家居灵感 → 暂停圈选 → 加入小工坊 → 生成演示资产”的核心闭环。
- 使用 React、TypeScript、Vite 和 Three.js。
- 所有数据、识别结果和生成进度都在浏览器内模拟，不依赖服务器。
- 保留一个本地视频、一组图文和必要的角色/UI 素材，便于稳定演示。

## 明确不包含

- Python、FastAPI、GPU 推理、数据库或文件服务。
- `/api`、`localhost` 或生产域名接口。
- API Key、环境变量或其他密钥。
- 原项目的大型 ONNX 模型、重复视频和完整 3D 素材库。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 验证状态

- `npm run build`：通过
- `npm test`：29 项测试通过
- 首屏、本地视频和圈选交互：已在浏览器中验证

## REDcowork 导入建议

导入本仓库后直接使用默认 Vite 构建流程。不要添加后端服务或真实密钥；如需调整演示内容，优先修改浏览器内 Mock 数据和 `public/` 下的轻量素材。
