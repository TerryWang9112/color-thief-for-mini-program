# Color Thief For Mini Program

Color thief 小程序版本，可以用来提取图片/Canvas主色/配色
灵感和算法来自于：
- [lokesh/color-thief](https://github.com/lokesh/color-thief)
- [javanli/mini-color-card](https://github.com/javanli/mini-color-card)

## 使用场景：
1. 颜色提取
2. 向 Canvas 中添加文字前可以判断出合适的文字颜色，从而避免添加的文字不可见、不容易分辨
3. Canvas 褪色滤镜 - 保留主色，其余颜色显示为黑白

[小程序代码片段](https://developers.weixin.qq.com/s/g6vE6dmY7Z9b) | [MP Snippet](https://developers.weixin.qq.com/s/g6vE6dmY7Z9b)

## 用法 - How to use

下载、拷贝 [colorThief.js](https://github.com/TerryWang9112/color-thief-for-mini-program/blob/master/utils/colorThief.js) 到你的项目中（正式使用前记得压缩代码或使用小程序自带的代码压缩功能），并引用它

```javascript
import ColorThief from '../utils/colorThief.js'


ColorThief.getPaletteWithRaw({
  width: canvasWidth,
  height: canvasHeight,
  rawData: res.data, // Uint8ClampedArray - wx.canvasGetImageData => res.data
  colorCount: 5,
  quality: 10
}, (colors) => { // color palette

  let dominantColor = colors[0]; // dominant color(RGB)
  console.log('dominant color(RGB)', colors[0]);
});
```

## 效果

![result](https://github.com/TerryWang9112/color-thief-for-mini-program/blob/master/color-thief-MP-01.png)
