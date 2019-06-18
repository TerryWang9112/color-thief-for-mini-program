import ColorThief from '../utils/colorThief.js'

Page({
  data: {
    canvasWidth: null,
    canvasHeight: null
  },
  chooseImage: function() {

    console.log('invoke chooseImage function');
  },
  tapcanvas: function() {
    
    console.log('invoke tapcanvas function')
  },
  onLoad: function() {

    const res = wx.getSystemInfoSync();
    this.windowWidth = res.windowWidth;
    this.windowHeight = res.windowHeight;

    let _this = this;

    const IMG_URL = 'https://6163-accuweather-2l4ce-1259316911.tcb.qcloud.la/image/aw-beijing-02.jpg?sign=ee5028948944feba849da274b1c18bf1&t=1558917973';

    wx.getImageInfo({
      src: IMG_URL,
      success: (imgInfo) => {

        let img_width = imgInfo.width,
          img_height = imgInfo.height;

        console.log(imgInfo);

        let canvasCtx = wx.createCanvasContext('img-canvas', this);

        let scale = 1.2 * this.windowWidth / Math.max(img_width, img_height);
        let canvasWidth = Math.floor(scale * img_width);
        let canvasHeight = Math.floor(scale * img_height);

        console.log('scale', scale);

        _this.setData({
          canvasWidth: canvasWidth,
          canvasHeight: canvasHeight
        });

        canvasCtx.drawImage(imgInfo.path, 0, 0, canvasWidth, canvasHeight);
        canvasCtx.draw(false, () => {
          _this.colorPalette();
        });
      }
    });
  },

  colorPalette: function() {

    let _this = this,
      canvasWidth = this.data.canvasWidth,
      canvasHeight = this.data.canvasHeight;

    wx.canvasGetImageData({
      canvasId: 'img-canvas',
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      success(res) {

        console.log(res);

        ColorThief.getPaletteWithRaw({
          width: canvasWidth,
          height: canvasHeight,
          rawData: res.data,
          colorCount: 5,
          quality: 10
        }, (colors) => { // color palette

          let dominantColor = colors[0]; // dominant color(RGB)
          console.log('dominant color(RGB)', colors[0]);

          _this.setData({
            dominantColor: `RGB(${colors[0]})`
          });
        });
      }
    });
  },

  reverseColor: function() {

    let r = 255 - dominantColor[0],
      g = 255 - dominantColor[1],
      b = 255 - dominantColor[2];
      
    console.log('reversed color', r, g, b);
  },

  blackOrWhite: function(r, g, b) {
    
    let bw = (r + g + b) / 3;

    if (bw >= 100) {
      bw = 255;
    } else {
      bw = 0;
    }
    
    // r g b
    console.log('black or white', bw, bw, bw);
  }
})