var canvas = new fabric.Canvas("canvas");

canvas.setHeight(400);
canvas.setWidth(200);
canvas.renderAll();


document.getElementById('upload_image').onchange = function handleImage(e) {
    let reader = new FileReader();
    reader.onload = function(event) {

        let imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function() {

            let image = new fabric.Image(imgObj);
            image.set({
                left: 50,
                top: 50,
                padding: 10,
                cornersize: 10,
                scaleX: .2,
                scaleY: .2,
            });
            
            canvas.add(image);
        }
    }

    reader.readAsDataURL(e.target.files[0]);
}

document.querySelector('.add_text').addEventListener('click', function() {
    canvas.add(new fabric.IText('Tap and Type', { 
    fontFamily: 'arial black',
    left: 100, 
    top: 100 ,
    }));
});

// Delete active item
var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  var img = document.createElement('img');
  img.src = deleteIcon;

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = '#04AA6D';
  fabric.Object.prototype.cornerStyle = 'circle';

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24
  });


  function deleteObject(eventData, transform) {
        var target = transform.target;
        var canvas = target.canvas;
            canvas.remove(target);
        canvas.requestRenderAll();
    }

  function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size/2, -size/2, size, size);
    ctx.restore();
  }



// Zoom in and out with mouse feature

canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
});

// Zoom in slider // canvas div zoom in/out 

const slider = document.querySelector('.slider');
const output = document.querySelector('.slider_value');


var canvas_container = document.querySelector('.canvas_container');

output.innerHTML = `${Math.round(slider.value*100)}%`;

slider.oninput = function() {
    output.innerHTML = `${Math.round(this.value*100)}%`;

    zoomlevel = slider.valueAsNumber;
    canvas_container.style.webkitTransform = "scale("+zoomlevel+")";
    canvas_container.style.transform = "scale("+zoomlevel+")";
}





function zoomInOut(){ 
    console.log('something happened');
    
}

