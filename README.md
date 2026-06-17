# 我的旅行地图

一个使用 React + Vite 搭建的个人旅游打卡网站，用来记录去过的城市、旅行打卡地、城市图集、旅途故事和精选照片。

## 运行

```bash
npm.cmd install
npm.cmd run dev
```

默认本地地址通常是 `http://127.0.0.1:5173/`。

## 构建

```bash
npm.cmd run build
```

## 内容维护

- `src/data/travelData.js`：城市、照片、故事和统计数据都在这里，后续替换真实内容优先改这个文件。
- `src/App.jsx`：页面模块和交互逻辑，包括城市点亮、城市详情和相册切换。
- `src/styles.css`：清新明亮的旅行主题样式。

新增城市时，在 `cities` 数组里复制一个城市对象，补充 `id`、`name`、`coordinate`、`cover` 和 `photos` 即可。
