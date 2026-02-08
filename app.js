// 等待页面加载
document.addEventListener('DOMContentLoaded', function() {
    // 获取Canvas元素和上下文
    const sourceCanvas = document.getElementById('sourceCanvas');
    const outputCanvas = document.getElementById('outputCanvas');
    const sourceCtx = sourceCanvas.getContext('2d');
    const outputCtx = outputCanvas.getContext('2d');
    
    // 初始化图片
    const image = new Image();
    image.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
    image.crossOrigin = 'anonymous';
    
    // 默认控制点坐标（相对于图像的比例位置）
    let points = [
        { x: 0.2, y: 0.2 }, // 左上
        { x: 0.8, y: 0.2 }, // 右上
        { x: 0.8, y: 0.8 }, // 右下
        { x: 0.2, y: 0.8 }  // 左下
    ];
    
    // 当前被拖动的点索引
    let draggingPointIndex = -1;
    
    // 图片加载完成后初始化
    image.onload = function() {
        drawSourceImage();
        createDraggablePoints();
        updateCoordinateInputs();
        applyTransform();
    };
    
    // 绘制原始图像和控制点
    function drawSourceImage() {
        const width = sourceCanvas.width;
        const height = sourceCanvas.height;
        
        // 清空画布
        sourceCtx.clearRect(0, 0, width, height);
        
        // 绘制图像
        sourceCtx.drawImage(image, 0, 0, width, height);
        
        // 绘制控制点之间的连线
        sourceCtx.strokeStyle = 'rgba(52, 152, 219, 0.7)';
        sourceCtx.lineWidth = 3;
        sourceCtx.beginPath();
        sourceCtx.moveTo(points[0].x * width, points[0].y * height);
        for (let i = 1; i < points.length; i++) {
            sourceCtx.lineTo(points[i].x * width, points[i].y * height);
        }
        sourceCtx.closePath();
        sourceCtx.stroke();
        
        // 绘制控制点
        points.forEach((point, index) => {
            sourceCtx.fillStyle = '#e74c3c';
            sourceCtx.beginPath();
            sourceCtx.arc(point.x * width, point.y * height, 10, 0, Math.PI * 2);
            sourceCtx.fill();
            sourceCtx.strokeStyle = 'white';
            sourceCtx.lineWidth = 3;
            sourceCtx.stroke();
            
            // 绘制点编号
            sourceCtx.fillStyle = 'white';
            sourceCtx.font = 'bold 12px Arial';
            sourceCtx.textAlign = 'center';
            sourceCtx.textBaseline = 'middle';
            sourceCtx.fillText(index + 1, point.x * width, point.y * height);
        });
    }
    
    // 创建可拖动的控制点
    function createDraggablePoints() {
        const pointsContainer = document.getElementById('pointsContainer');
        pointsContainer.innerHTML = '';
        
        // 确保容器有正确的位置和尺寸（相对于父容器）
        pointsContainer.style.position = 'absolute';
        pointsContainer.style.top = '0';
        pointsContainer.style.left = '0';
        pointsContainer.style.width = '100%';
        pointsContainer.style.height = '100%';
        
        points.forEach((point, index) => {
            const pointElement = document.createElement('div');
            pointElement.className = 'point-draggable';
            pointElement.dataset.index = index;
            pointElement.textContent = index + 1; // 显示点编号
            
            // 设置初始位置
            updatePointElementPosition(pointElement, index);
            
            // 添加事件监听器
            pointElement.addEventListener('mousedown', startDragging);
            pointElement.addEventListener('touchstart', startDraggingTouch);
            
            pointsContainer.appendChild(pointElement);
        });
        
        // 添加全局事件监听器
        document.addEventListener('mousemove', dragPoint);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchmove', dragPointTouch, { passive: false });
        document.addEventListener('touchend', stopDragging);
    }
    
    // 更新控制点元素位置
    function updatePointElementPosition(element, index) {
        const width = sourceCanvas.width;
        const height = sourceCanvas.height;
        const point = points[index];
        
        // 设置元素位置（相对于pointsContainer）
        element.style.left = `${point.x * 100}%`;
        element.style.top = `${point.y * 100}%`;
    }
    
    // 更新所有控制点位置
    function updateAllPointElements() {
        document.querySelectorAll('.point-draggable').forEach((element, index) => {
            updatePointElementPosition(element, index);
        });
    }
    
    // 开始拖动（鼠标）
    function startDragging(e) {
        draggingPointIndex = parseInt(e.target.dataset.index);
        e.preventDefault();
    }
    
    // 开始拖动（触摸）
    function startDraggingTouch(e) {
        if (e.touches.length === 1) {
            draggingPointIndex = parseInt(e.target.dataset.index);
            e.preventDefault();
        }
    }
    
    // 拖动控制点（鼠标）
    function dragPoint(e) {
        if (draggingPointIndex === -1) return;
        
        // 获取pointsContainer相对于视口的位置
        const pointsContainer = document.getElementById('pointsContainer');
        const containerRect = pointsContainer.getBoundingClientRect();
        
        // 计算相对于容器尺寸的坐标（0-1范围）
        const x = (e.clientX - containerRect.left) / containerRect.width;
        const y = (e.clientY - containerRect.top) / containerRect.height;
        
        // 限制坐标在0-1范围内
        points[draggingPointIndex].x = Math.max(0, Math.min(1, x));
        points[draggingPointIndex].y = Math.max(0, Math.min(1, y));
        
        drawSourceImage();
        updateAllPointElements();
        updateCoordinateInputs();
        
        // 实时更新变换效果
        applyTransform();
    }
    
    // 拖动控制点（触摸）
    function dragPointTouch(e) {
        if (draggingPointIndex === -1 || e.touches.length !== 1) return;
        
        // 获取pointsContainer相对于视口的位置
        const pointsContainer = document.getElementById('pointsContainer');
        const containerRect = pointsContainer.getBoundingClientRect();
        
        // 计算相对于容器尺寸的坐标（0-1范围）
        const x = (e.touches[0].clientX - containerRect.left) / containerRect.width;
        const y = (e.touches[0].clientY - containerRect.top) / containerRect.height;
        
        // 限制坐标在0-1范围内
        points[draggingPointIndex].x = Math.max(0, Math.min(1, x));
        points[draggingPointIndex].y = Math.max(0, Math.min(1, y));
        
        drawSourceImage();
        updateAllPointElements();
        updateCoordinateInputs();
        
        // 实时更新变换效果
        applyTransform();
        
        e.preventDefault();
    }
    
    // 停止拖动
    function stopDragging() {
        draggingPointIndex = -1;
    }
    
    // 创建坐标输入控件
    function createCoordinateInputs() {
        const coordControls = document.getElementById('coordControls');
        coordControls.innerHTML = '';
        
        const pointNames = ['点1 (左上)', '点2 (右上)', '点3 (右下)', '点4 (左下)'];
        
        pointNames.forEach((name, index) => {
            const pointControl = document.createElement('div');
            pointControl.className = 'mb-4';
            
            pointControl.innerHTML = `
                <div class="font-semibold text-danger flex items-center gap-2 mb-2 text-sm">${name}</div>
                <div class="flex gap-2">
                    <div class="flex-1">
                        <label class="block text-xs text-gray-600 mb-1">X坐标</label>
                        <input type="number" min="0" max="1" step="0.01" 
                               data-index="${index}" data-coord="x" 
                               placeholder="0-1" value="${points[index].x.toFixed(2)}"
                               class="w-full px-3 py-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>
                    <div class="flex-1">
                        <label class="block text-xs text-gray-600 mb-1">Y坐标</label>
                        <input type="number" min="0" max="1" step="0.01" 
                               data-index="${index}" data-coord="y" 
                               placeholder="0-1" value="${points[index].y.toFixed(2)}"
                               class="w-full px-3 py-2 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-primary">
                    </div>
                </div>
            `;
            
            coordControls.appendChild(pointControl);
        });
        
        // 添加输入事件监听器 - 修复选择器
        document.querySelectorAll('#coordControls input[type="number"]').forEach(input => {
            input.addEventListener('input', handleCoordinateInput);
        });
    }
    
    // 处理坐标输入
    function handleCoordinateInput(e) {
        const index = parseInt(e.target.dataset.index);
        const coord = e.target.dataset.coord;
        let value = parseFloat(e.target.value);
        
        // 限制值在0-1之间
        if (isNaN(value)) value = 0;
        value = Math.max(0, Math.min(1, value));
        
        // 更新点坐标
        points[index][coord] = value;
        
        // 更新显示
        drawSourceImage();
        updateAllPointElements();
        
        // 应用变换
        applyTransform();
    }
    
    // 更新坐标输入值
    function updateCoordinateInputs() {
        document.querySelectorAll('#coordControls input[type="number"]').forEach(input => {
            const index = parseInt(input.dataset.index);
            const coord = input.dataset.coord;
            input.value = points[index][coord].toFixed(2);
        });
    }
    
    // 应用透视变换 - 重新实现的核心功能
    function applyTransform() {
        const srcWidth = sourceCanvas.width;
        const srcHeight = sourceCanvas.height;
        const dstWidth = outputCanvas.width;
        const dstHeight = outputCanvas.height;
        
        // 清空输出画布
        outputCtx.clearRect(0, 0, dstWidth, dstHeight);
        
        // 源点：图像四个角（按顺时针顺序：左上、右上、右下、左下）
        const srcPoints = [
            [0, 0],           // 左上
            [srcWidth, 0],     // 右上
            [srcWidth, srcHeight], // 右下
            [0, srcHeight]     // 左下
        ];
        
        // 目标点：用户定义的四个点（按相同顺序）
        const dstPoints = points.map(p => [p.x * srcWidth, p.y * srcHeight]);
        
        // 计算透视变换矩阵
        const matrix = getPerspectiveTransform(srcPoints, dstPoints);
        
        // 使用逐像素变换方法（更精确）
        applyPerspectiveTransform(srcWidth, srcHeight, dstWidth, dstHeight, matrix);
        
        // 绘制目标四边形边框
        outputCtx.strokeStyle = 'rgba(52, 152, 219, 0.7)';
        outputCtx.lineWidth = 3;
        outputCtx.beginPath();
        outputCtx.moveTo(dstPoints[0][0], dstPoints[0][1]);
        for (let i = 1; i < dstPoints.length; i++) {
            outputCtx.lineTo(dstPoints[i][0], dstPoints[i][1]);
        }
        outputCtx.closePath();
        outputCtx.stroke();
    }
    
    // 计算透视变换矩阵 - 改进的实现
    function getPerspectiveTransform(src, dst) {
        // 使用更稳定的透视变换算法
        // 参考：OpenCV的getPerspectiveTransform实现
        
        // 构建系数矩阵
        const A = [];
        const b = [];
        
        for (let i = 0; i < 4; i++) {
            const [x, y] = src[i];
            const [u, v] = dst[i];
            
            // 构建方程：
            // u = (a*x + b*y + c) / (g*x + h*y + 1)
            // v = (d*x + e*y + f) / (g*x + h*y + 1)
            
            // 重写为线性方程：
            // a*x + b*y + c - g*x*u - h*y*u = u
            // d*x + e*y + f - g*x*v - h*y*v = v
            
            A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]);
            A.push([0, 0, 0, x, y, 1, -x * v, -y * v]);
            
            b.push(u);
            b.push(v);
        }
        
        // 解线性方程组 A * h = b
        const h = solveLinearSystem(A, b);
        
        // 构建3x3齐次坐标矩阵
        return [
            h[0], h[1], h[2],  // a, b, c
            h[3], h[4], h[5],  // d, e, f
            h[6], h[7], 1      // g, h, i
        ];
    }
    
    // 解线性方程组（使用高斯消元法）
    function solveLinearSystem(A, b) {
        const n = A.length;
        
        // 构建增广矩阵
        const M = A.map((row, i) => [...row, b[i]]);
        
        // 高斯消元
        for (let i = 0; i < n; i++) {
            // 找到主元
            let maxRow = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(M[j][i]) > Math.abs(M[maxRow][i])) {
                    maxRow = j;
                }
            }
            
            // 交换行
            [M[i], M[maxRow]] = [M[maxRow], M[i]];
            
            // 归一化
            const pivot = M[i][i];
            if (Math.abs(pivot) < 1e-10) {
                // 避免除以零
                throw new Error('矩阵奇异，无法求解');
            }
            for (let j = i; j <= n; j++) {
                M[i][j] /= pivot;
            }
            
            // 消元
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    const factor = M[j][i];
                    for (let k = i; k <= n; k++) {
                        M[j][k] -= factor * M[i][k];
                    }
                }
            }
        }
        
        // 提取解
        return M.map(row => row[n]);
    }
    
    // 逐像素应用透视变换（更精确的方法）
    function applyPerspectiveTransform(srcWidth, srcHeight, dstWidth, dstHeight, matrix) {
        // 获取源图像数据
        sourceCtx.drawImage(image, 0, 0, srcWidth, srcHeight);
        const srcImageData = sourceCtx.getImageData(0, 0, srcWidth, srcHeight);
        
        // 创建目标图像数据
        const dstImageData = outputCtx.createImageData(dstWidth, dstHeight);
        
        // 计算逆变换矩阵（从目标到源）
        const invMatrix = invertMatrix(matrix);
        
        // 对目标图像的每个像素进行变换
        for (let y = 0; y < dstHeight; y++) {
            for (let x = 0; x < dstWidth; x++) {
                // 使用逆变换找到源图像中对应的位置
                const srcCoords = applyMatrix(invMatrix, [x, y]);
                const srcX = srcCoords[0] / srcCoords[2]; // 齐次坐标归一化
                const srcY = srcCoords[1] / srcCoords[2];
                
                // 如果坐标在源图像范围内，进行双线性插值
                if (srcX >= 0 && srcX < srcWidth && srcY >= 0 && srcY < srcHeight) {
                    const pixel = bilinearInterpolate(srcImageData, srcX, srcY, srcWidth, srcHeight);
                    const dstIndex = (y * dstWidth + x) * 4;
                    dstImageData.data[dstIndex] = pixel[0];     // R
                    dstImageData.data[dstIndex + 1] = pixel[1]; // G
                    dstImageData.data[dstIndex + 2] = pixel[2]; // B
                    dstImageData.data[dstIndex + 3] = pixel[3]; // A
                }
            }
        }
        
        // 将结果绘制到输出canvas
        outputCtx.putImageData(dstImageData, 0, 0);
    }
    
    // 矩阵求逆
    function invertMatrix(m) {
        // 简化实现，实际应用中应使用更稳定的算法
        const det = m[0] * (m[4] * m[8] - m[5] * m[7]) -
                   m[1] * (m[3] * m[8] - m[5] * m[6]) +
                   m[2] * (m[3] * m[7] - m[4] * m[6]);
        
        if (Math.abs(det) < 1e-10) return m; // 避免奇异矩阵
        
        const invDet = 1.0 / det;
        return [
            (m[4] * m[8] - m[5] * m[7]) * invDet,
            (m[2] * m[7] - m[1] * m[8]) * invDet,
            (m[1] * m[5] - m[2] * m[4]) * invDet,
            (m[5] * m[6] - m[3] * m[8]) * invDet,
            (m[0] * m[8] - m[2] * m[6]) * invDet,
            (m[2] * m[3] - m[0] * m[5]) * invDet,
            (m[3] * m[7] - m[4] * m[6]) * invDet,
            (m[1] * m[6] - m[0] * m[7]) * invDet,
            (m[0] * m[4] - m[1] * m[3]) * invDet
        ];
    }
    
    // 应用矩阵变换
    function applyMatrix(m, point) {
        const [x, y] = point;
        return [
            m[0] * x + m[1] * y + m[2],
            m[3] * x + m[4] * y + m[5],
            m[6] * x + m[7] * y + m[8]
        ];
    }
    
    // 双线性插值
    function bilinearInterpolate(imageData, x, y, width, height) {
        const x1 = Math.floor(x);
        const y1 = Math.floor(y);
        const x2 = Math.min(x1 + 1, width - 1);
        const y2 = Math.min(y1 + 1, height - 1);
        
        const dx = x - x1;
        const dy = y - y1;
        
        // 获取四个相邻像素
        const p11 = getPixel(imageData, x1, y1, width);
        const p21 = getPixel(imageData, x2, y1, width);
        const p12 = getPixel(imageData, x1, y2, width);
        const p22 = getPixel(imageData, x2, y2, width);
        
        // 双线性插值
        const r = (1 - dx) * (1 - dy) * p11[0] + dx * (1 - dy) * p21[0] + 
                 (1 - dx) * dy * p12[0] + dx * dy * p22[0];
        const g = (1 - dx) * (1 - dy) * p11[1] + dx * (1 - dy) * p21[1] + 
                 (1 - dx) * dy * p12[1] + dx * dy * p22[1];
        const b = (1 - dx) * (1 - dy) * p11[2] + dx * (1 - dy) * p21[2] + 
                 (1 - dx) * dy * p12[2] + dx * dy * p22[2];
        const a = (1 - dx) * (1 - dy) * p11[3] + dx * (1 - dy) * p21[3] + 
                 (1 - dx) * dy * p12[3] + dx * dy * p22[3];
        
        return [Math.round(r), Math.round(g), Math.round(b), Math.round(a)];
    }
    
    // 获取像素值
    function getPixel(imageData, x, y, width) {
        const index = (y * width + x) * 4;
        return [
            imageData.data[index],     // R
            imageData.data[index + 1], // G
            imageData.data[index + 2], // B
            imageData.data[index + 3]  // A
        ];
    }
    
    // 加载示例变换
    function loadExample() {
        // 设置一个示例变换（平行四边形）
        points = [
            { x: 0.1, y: 0.2 },
            { x: 0.9, y: 0.1 },
            { x: 0.8, y: 0.9 },
            { x: 0.2, y: 0.8 }
        ];
        
        drawSourceImage();
        updateAllPointElements();
        updateCoordinateInputs();
        applyTransform();
    }
    
    // 重置点位置
    function resetPoints() {
        points = [
            { x: 0.2, y: 0.2 },
            { x: 0.8, y: 0.2 },
            { x: 0.8, y: 0.8 },
            { x: 0.2, y: 0.8 }
        ];
        
        drawSourceImage();
        updateAllPointElements();
        updateCoordinateInputs();
        applyTransform();
    }
    
    // 初始化坐标输入控件
    createCoordinateInputs();
    
    // 添加按钮事件监听器
    document.getElementById('applyTransform').addEventListener('click', applyTransform);
    document.getElementById('loadExample').addEventListener('click', loadExample);
    document.getElementById('resetPoints').addEventListener('click', resetPoints);
    
    // 添加Canvas点击事件，可以直接在画布上添加/移动点
    sourceCanvas.addEventListener('click', function(e) {
        const rect = sourceCanvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / sourceCanvas.width;
        const y = (e.clientY - rect.top) / sourceCanvas.height;
        
        // 找到最近的点并移动它
        let minDist = Infinity;
        let closestIndex = -1;
        
        points.forEach((point, index) => {
            const dist = Math.sqrt(
                Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
            );
            
            if (dist < minDist && dist < 0.1) { // 0.1是点击阈值
                minDist = dist;
                closestIndex = index;
            }
        });
        
        if (closestIndex !== -1) {
            points[closestIndex].x = x;
            points[closestIndex].y = y;
            
            drawSourceImage();
            updateAllPointElements();
            updateCoordinateInputs();
            applyTransform();
        }
    });
});