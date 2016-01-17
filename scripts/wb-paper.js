/**
 * Created by alexpersian on 11/16/14.
 */

// This file handles the drawingMode functions for whiteboard.js
// Paper.js running through Javascript instead of Paperscript.
var $WBPAPER = window.onload = (function() {

    var lp = {};

    paper.setup($WBAPP.canvas);

    var myPath;
    var tool = new paper.Tool();
    var mousePoint = paper.view.center;
    lp.drawingMode = true;
    lp.shapeMode = false;

    // TODO: Hit detection and movable shapes
    //var shapePath;
    //var hitOptions = {
    //    segments: true
    //};

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

        // Create shape if in shapeMode
        if (lp.shapeMode) {
            mousePoint = event.point;
            lp.drawShape(mousePoint, $WBAPP.shape);
        }

        // TODO: Hit detection and movable shapes
        //var hitResult = paper.project.hitTest(event.point);
        //if (hitResult) {
        //    console.log(hitResult.type);
        //    shapePath = hitResult.item;
        //}

        // Draw paths if in drawingMode
        if (lp.drawingMode) {
            myPath = new paper.Path({
                strokeColor: $WBAPP.penColor, // $WBAPP is the global module from whiteboard.js
                strokeWidth: $WBAPP.penStroke,
                strokeCap: 'round'
            });
            //myPath.add(event.point);
        }
    };

    tool.onMouseDrag = function(event) {

        // TODO: Movable shapes
        //if (shapePath && !lp.drawingMode) {
        //    shapePath.point += event.delta;
        //}

        var touches = event.touches;

        if (touches.length === paths.length) {
            for (var i = 0; i < touches.length; i++) {
                myPath = paths[i];
                var point = self.view.getEventPoint(touches[i]);
                myPath.add(point);
                self.view.draw();
            }
        }

        //if (lp.drawingMode) {
        //    myPath.add(event.point);
        //}
    };

    tool.onMouseUp = function() {
        if (!$WBAPP.erasing && lp.drawingMode) {
            myPath.simplify();
        }

        // TODO: Movable shapes
        //shapePath = null;
    };

    lp.removePath = function() {
        if (myPath) {
            myPath.remove();
            paper.view.update();
        }
    };

    // Creates paths and options for each shape available for the canvas
    // Shapes are only created if the program is in shape mode
    lp.drawShape = function(location, shape) {
        if (lp.shapeMode) {
            switch(shape) {
                case 'Terminator':
                    new paper.Path.Rectangle({
                        center: location,
                        size: [200, 60],
                        fillColor: '#F7D4C9',
                        strokeColor: $WBAPP.shapeStrokeColor,
                        strokeWidth: 2,
                        radius: 30
                    });
                    break;
                case 'Process':
                    new paper.Path.Rectangle({
                        center: location,
                        size: [200, 60],
                        fillColor: '#FEE9BC',
                        strokeColor: $WBAPP.shapeStrokeColor,
                        strokeWidth: 2
                    });
                    break;
                default:
                    break;
            }
        }
    };

    // Loads the chosen image as a raster and places it in the center of the canvas.
    lp.loadRaster = function(image) {
        new paper.Raster({
            source: image,
            position: paper.view.center
        });
    };

    lp.drawText = function(text, x, y) {
        var color;
        if ($WBAPP.night) {
            color = "white";
        } else {
            color = "black";
        }
        new paper.PointText({
            point: [x, y],
            content: text,
            fillColor: color,
            fontFamily: 'Source Code Pro',
            fontSize: '24'
        });
    };

    return lp;
})();
