# PWA 图标规范

请将应用图标按以下规格准备并放入此目录：

| 文件名 | 尺寸 | 用途 |
|--------|------|------|
| icon-72.png | 72×72 | Android 旧设备 |
| icon-96.png | 96×96 | Android |
| icon-128.png | 128×128 | Chrome Web Store |
| icon-144.png | 144×144 | Windows 磁贴 |
| icon-152.png | 152×152 | iOS Safari 主屏图标 |
| icon-192.png | 192×192 | Android 主屏（必须）|
| icon-384.png | 384×384 | Android 启动屏 |
| icon-512.png | 512×512 | Android 启动屏（必须）|
| screenshot-mobile.png | 390×844 | 应用商店截图（可选）|

## 设计建议

- 背景色：`#F9F8F4`（与应用主色一致）
- 风格：以「番」或梅花/玉兰线稿为主体，博物志手绘风格
- **192 和 512 尺寸**需要同时提供 `maskable` 版本（主体内容在中心 80% 安全区内）
- 格式：PNG，透明背景或纯色背景均可

## 快速生成方法

如果暂时没有图标，可用以下任意工具生成：
- [favicon.io](https://favicon.io) — 用文字「番」快速生成
- [Maskable.app](https://maskable.app) — 检查 maskable 安全区
- [PWA Builder](https://www.pwabuilder.com/imageGenerator) — 批量生成所有尺寸
