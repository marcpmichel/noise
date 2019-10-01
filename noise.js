
class App {

  constructor() {
    document.body.style.backgroundColor = "black";
    this.parent = document.body;
    this.el = document.createElement('canvas');
    this.el.style.position = 'absolute';
    this.el.style.top = '0px';
    this.el.style.left = '0px';
    this.el.style.width = '100%';
    this.el.style.height = '100%';
    this.el.width = window.innerWidth / 2;
    this.el.height = window.innerHeight / 2;
    this.el.style.zIndex = 0xFE;
    this.parent.appendChild(this.el);
    this.canvasCtx = this.el.getContext('2d');
    this.canvasCtx.fillStyle = 'blue';
    this.width = this.el.width;
    this.height = this.el.height;
    this.canvasCtx.scale(1,1);
    this.canvasCtx.font = '32px sans';
    this.canvasCtx.textAlign = 'center';

    this.count = 5000;
  }

  start() {
    this.updateFn = this.update.bind(this);
    this.animId = requestAnimationFrame(this.updateFn); 
    this.update();
  }

  update() {
    // this.canvasCtx.style.fillStyle = 'black';
    this.canvasCtx.clearRect(0, 0, this.width, this.height);
    this.canvasData = this.canvasCtx.getImageData(0, 0, this.width, this.height);

    for(var i=0; i<this.count; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      // const alpha = Math.floor(Math.random()*256);
      var index = (Math.floor(x) + Math.floor(y) * this.width) * 4;
      this.canvasData.data[index + 0] = 255; // r
      this.canvasData.data[index + 1] = 255; // g
      this.canvasData.data[index + 2] = 255; // b
      this.canvasData.data[index + 3] = 255; // a
    }
    this.canvasCtx.putImageData(this.canvasData, 0, 0);
    this.animId = requestAnimationFrame(this.updateFn);
  }


}

function onReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
} 

onReady(function() {
  const app = new App();
  app.start();
});

  
