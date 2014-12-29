/**
 * Created by alexpersian on 11/16/14.
 */

// This file handles the drawing functions for whiteboard.js
// Paper.js running through Javascript instead of paperscript.

var $WBPAPER = window.onload = (function() {

    paper.setup($WBAPP.canvas);

    var lp = {};

    var myPath, shapePath;
    var tool = new paper.Tool();
    var mousePoint = paper.view.center;
    lp.drawing = true;

    var hitOptions = {
        fill: true,
        item: true
    };

    // Covers the canvas in a white rectangle to prevent transparent background on save.
    // Drawings are created on top of this rectangle.
    lp.drawBackground = function () {
        var rectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Point($WBAPP.width, $WBAPP.height));
        var rectPath = new paper.Path.Rectangle(rectangle);
        rectPath.fillColor = $WBAPP.bgColor;
        paper.view.update();
    };
    lp.drawBackground();

    tool.onMouseDown = function(event) {
        var hitResult = paper.project.hitTest(event.point, hitOptions);
        if (hitResult) {
            console.log(hitResult);
            shapePath = hitResult.item;
        }

        if (lp.drawing) {
            myPath = new paper.Path({
                strokeColor: $WBAPP.penColor, // $WBAPP is the global module from whiteboard.js
                strokeWidth: $WBAPP.penStroke,
                strokeCap: 'round'
            });
            myPath.add(event.point);
        }

    };

    tool.onMouseDrag = function(event) {
        if (shapePath && !lp.drawing) {
            shapePath.position += event.delta;
        }
        if (lp.drawing) {
            myPath.add(event.point);
        }
    };

    tool.onMouseUp = function(event) {
        if (!$WBAPP.erasing && lp.drawing) { myPath.simplify(); }
        shapePath = null;
    };

    lp.drawShape = function(shape) {
        if (!lp.drawing) {
            switch(shape) {
                case 'Start/End':
                    console.log(shape);
                    var rect = new paper.Rectangle([0, 0], [200, 60]);
                    rect.center = mousePoint;
                    var path = new paper.Path.Rectangle(rect, 30);
                    path.fillColor = '#F7D4C9';
                    break;
                case 'Input/Output':
                    console.log(shape);
                    var rect = new paper.Rectangle([0, 0], [200, 60]);
                    rect.center = mousePoint;
                    var path = new paper.Path.Rectangle(rect, 30);
                    path.fillColor = '#FEE9BC';
                    break;
                case 'Process':
                    console.log(shape);
                    var rect = new paper.Rectangle([0, 0], [200, 60]);
                    rect.center = mousePoint;
                    var path = new paper.Path.Rectangle(rect, 30);
                    path.fillColor = '#D2C3D4';

                    break;
                case 'Decision':
                    console.log(shape);
                    var rect = new paper.Rectangle([0, 0], [200, 60]);
                    rect.center = mousePoint;
                    var path = new paper.Path.Rectangle(rect, 30);
                    path.fillColor = '#BDE1F0';
                    break;
                default:
                    break;
            }
        }
    };

    //lp.clearCanvas = function() {
    //    if (project._activeLayer.hasChildren()) {
    //        project.view.remove();
    //    }
    //};

    // TODO: Fix loading functionality
    //lp.loadRaster = function(image) {
    //    console.log("blaaaaaarrrrgg");
    //    lp.clearCanvas();
    //    var raster = new paper.Raster({
    //        source: image,
    //        position: view.center
    //    });
    //};

    return lp;
})();
