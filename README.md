# 图像透视变换工具 (Image Perspective Transform)

一个基于Web的交互式图像透视变换工具，允许用户通过拖动控制点实时调整图像的透视效果。

![Demo](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## ✨ 功能特性

- 🎯 **交互式控制点** - 通过拖动四个控制点实时调整透视变换
- 🔄 **实时预览** - 变换效果即时显示，无需手动刷新
- 📐 **精确坐标控制** - 支持手动输入精确的坐标值（0-1范围）
- 📱 **响应式设计** - 支持桌面和移动设备触摸操作
- 🎨 **现代化界面** - 采用苹果风格的设计，简洁美观
- ⚡ **高性能** - 使用Canvas和逐像素变换算法，确保流畅体验

## 🚀 快速开始

### 在线体验
直接访问 [GitHub Pages链接] 即可在线使用（如部署后可用）

### 本地运行

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/imgpersptrans.git
   cd imgpersptrans
   ```

2. **启动本地服务器**
   ```bash
   # 使用Python3（推荐）
   python -m http.server 8000
   
   # 或使用Node.js的http-server
   npx http-server -p 8000
   ```

3. **打开浏览器**
   访问 `http://localhost:8000` 即可使用

## 📖 使用方法

### 基本操作

1. **拖动控制点**：点击并拖动图像上的橙色控制点调整位置
2. **实时预览**：变换效果会实时显示在右侧画布中
3. **精确调整**：使用右侧的坐标输入框进行精确的位置调整

### 控制点说明

- **点1 (左上)** - 控制图像左上角的变换
- **点2 (右上)** - 控制图像右上角的变换  
- **点3 (右下)** - 控制图像右下角的变换
- **点4 (左下)** - 控制图像左下角的变换

### 功能按钮

- **应用变换** - 手动触发变换计算（通常自动触发）
- **示例** - 加载预设的变换示例
- **重置** - 恢复控制点到默认位置

## 🛠️ 技术栈

- **前端框架**：原生JavaScript (ES6+)
- **图形渲染**：HTML5 Canvas 2D API
- **数学计算**：自定义透视变换矩阵算法
- **UI框架**：Tailwind CSS
- **图标**：SVG图标
- **构建工具**：无需构建，直接使用

## 🔧 核心算法

### 透视变换原理
项目实现了基于3x3齐次坐标矩阵的透视变换算法：

```javascript
// 透视变换矩阵
[ a, b, c ]
[ d, e, f ]
[ g, h, 1 ]
```

### 主要算法函数

- `getPerspectiveTransform()` - 计算透视变换矩阵
- `applyPerspectiveTransform()` - 应用变换到图像
- `bilinearInterpolate()` - 双线性插值算法
- `solveLinearSystem()` - 线性方程组求解

## 📁 项目结构

```
imgpersptrans/
├── index.html          # 主页面文件
├── app.js              # 主要JavaScript逻辑
├── README.md           # 项目说明文档
└── assets/             # 静态资源目录（可选）
```

## 🌟 特色功能

### 实时交互
- 控制点拖动时实时更新变换效果
- 支持鼠标和触摸屏操作
- 流畅的动画过渡效果

### 精确控制
- 支持0.01精度的坐标输入
- 坐标范围限制（0-1）
- 输入验证和错误处理

### 视觉效果
- 苹果风格的UI设计
- 平滑的阴影和渐变效果
- 响应式布局适配

## 🐛 问题反馈

如果您在使用过程中遇到任何问题，请通过以下方式反馈：

1. 在GitHub Issues中提交问题
2. 描述具体的问题现象和复现步骤
3. 提供浏览器版本和设备信息

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢 [OpenCV](https://opencv.org/) 提供的透视变换算法参考
- 感谢 [Tailwind CSS](https://tailwindcss.com/) 提供的优秀CSS框架
- 感谢 [Unsplash](https://unsplash.com/) 提供的示例图片

## 📞 联系方式

- 项目主页：https://github.com/your-username/imgpersptrans
- 问题反馈：https://github.com/your-username/imgpersptrans/issues
- 邮箱：your-email@example.com

---

⭐ 如果这个项目对您有帮助，请给个Star支持一下！