/**
 * Created by alexpersian on 11/4/14.
 */

var path = new Path.Circle({
    center: view.center,
    radius: 30,
    strokeColor: 'black'
});

var raster = new Raster('images/ron.jpg');

function onResize(event) {
    raster.position = view.center;
    path.position = view.center;
}

raster.scale(0.8);
raster.rotate(50);

var path1;

tool.distanceThreshold = 10;

function onMouseDown(event) {
    path1 = new Path();
    path1.add(event.point);
    path1.strokeColor = 'blue';
}

function onMouseDrag(event) {
    path1.add(event.point);
}