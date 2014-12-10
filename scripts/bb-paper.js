/**
 * Created by alexpersian on 12/10/14.
 */


var $BBPAPER = window.onload = (function() {

    var lb = {};

    paper.install(window);
    paper.setup($BBAPP.canvas);

    var path;
    var tool = new paper.Tool();

    var rectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Point($BBAPP.width, $BBAPP.height));
    var rectPath = new paper.Path.Rectangle(rectangle);
    rectPath.fillColor = $BBAPP.bgColor;

    tool.onMouseDown = function(event) {
        path = new paper.Path({
            strokeColor: $BBAPP.penColor,
            strokeWidth: $BBAPP.penStroke,
            strokeCap: 'round'
        });
        path.add(event.point);
    };

    tool.onMouseDrag = function(event) {
        path.add(event.point);
    };

    tool.onMouseUp = function(event) {
        path.simplify();
    };

    return lb;

}($BBPAPER = $BBPAPER || {}));