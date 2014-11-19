/**
 * Created by alexpersian on 11/16/14.
 */

var myPath;

function onMouseDown(event) {
    myPath = new Path();
    myPath.add(event.point);
    myPath.strokeColor = WBAPP.penColor;
    myPath.strokeWidth = WBAPP.penStroke;
    myPath.strokeCap = 'round';
}

function onMouseDrag(event) {
    myPath.add(event.point);
}

function onMouseUp(event) {
    myPath.simplify();
}

var rectangle = new Rectangle(new Point(0, 0), new Point(WBAPP.width, WBAPP.height));
var rectPath = new Path.Rectangle(rectangle);
rectPath.fillColor = 'white';