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