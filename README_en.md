# Image Perspective Transform Tool

A web-based interactive image perspective transformation tool that allows users to adjust image perspective effects in real-time by dragging control points.

![Demo](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## ✨ Features

- 🎯 **Interactive Control Points** - Real-time perspective adjustment by dragging four control points
- 🔄 **Live Preview** - Transformation effects update instantly without manual refresh
- 📐 **Precise Coordinate Control** - Manual input of precise coordinate values (0-1 range)
- 📱 **Responsive Design** - Supports desktop and mobile touch operations
- 🎨 **Modern UI** - Apple-style design, clean and beautiful interface
- ⚡ **High Performance** - Uses Canvas and pixel-by-pixel transformation algorithms for smooth experience

## 🚀 Quick Start

### Online Demo
Visit [GitHub Pages Link] to use it online (if deployed)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/imgpersptrans.git
   cd imgpersptrans
   ```

2. **Start local server**
   ```bash
   # Using Python3 (recommended)
   python -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server -p 8000
   ```

3. **Open browser**
   Visit `http://localhost:8000` to start using

## 📖 Usage Guide

### Basic Operations

1. **Drag Control Points**: Click and drag the orange control points on the image to adjust positions
2. **Live Preview**: Transformation effects are displayed in real-time on the right canvas
3. **Precise Adjustment**: Use the coordinate input boxes on the right for precise position adjustments

### Control Points Description

- **Point 1 (Top-Left)** - Controls transformation of the top-left corner
- **Point 2 (Top-Right)** - Controls transformation of the top-right corner  
- **Point 3 (Bottom-Right)** - Controls transformation of the bottom-right corner
- **Point 4 (Bottom-Left)** - Controls transformation of the bottom-left corner

### Function Buttons

- **Apply Transform** - Manually trigger transformation calculation (usually automatic)
- **Load Example** - Load preset transformation examples
- **Reset Points** - Restore control points to default positions

## 🛠️ Technology Stack

- **Frontend Framework**: Vanilla JavaScript (ES6+)
- **Graphics Rendering**: HTML5 Canvas 2D API
- **Mathematical Calculations**: Custom perspective transformation matrix algorithms
- **UI Framework**: Tailwind CSS
- **Icons**: SVG icons
- **Build Tools**: No build required, use directly

## 🔧 Core Algorithms

### Perspective Transformation Principle
The project implements perspective transformation algorithms based on 3x3 homogeneous coordinate matrices:

```javascript
// Perspective transformation matrix
[ a, b, c ]
[ d, e, f ]
[ g, h, 1 ]
```

### Main Algorithm Functions

- `getPerspectiveTransform()` - Calculate perspective transformation matrix
- `applyPerspectiveTransform()` - Apply transformation to image
- `bilinearInterpolate()` - Bilinear interpolation algorithm
- `solveLinearSystem()` - Linear equation system solver

## 📁 Project Structure

```
imgpersptrans/
├── index.html          # Main HTML file
├── app.js              # Main JavaScript logic
├── README.md           # Chinese documentation
├── README_en.md        # English documentation
└── assets/             # Static resources directory (optional)
```

## 🌟 Key Features

### Real-time Interaction
- Real-time transformation updates while dragging control points
- Supports mouse and touch screen operations
- Smooth animation transitions

### Precise Control
- Coordinate input with 0.01 precision
- Coordinate range limitation (0-1)
- Input validation and error handling

### Visual Effects
- Apple-style UI design
- Smooth shadows and gradient effects
- Responsive layout adaptation

## 🐛 Issue Reporting

If you encounter any issues while using the tool, please report them through:

1. Submit an issue on GitHub Issues
2. Describe the specific problem and reproduction steps
3. Provide browser version and device information

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to [OpenCV](https://opencv.org/) for perspective transformation algorithm references
- Thanks to [Tailwind CSS](https://tailwindcss.com/) for the excellent CSS framework
- Thanks to [Unsplash](https://unsplash.com/) for sample images

## 📞 Contact

- Project Homepage: https://github.com/your-username/imgpersptrans
- Issue Tracker: https://github.com/your-username/imgpersptrans/issues
- Email: your-email@example.com

---

⭐ If this project is helpful to you, please give it a Star!