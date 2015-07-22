/**
 * Created by alexpersian on 11/16/14.
 */

// This file handles the drawingMode functions for whiteboard.js
// Paper.js running through Javascript instead of Paperscript.
var $WBPAPER = window.onload = (function() {
    paper.setup($WBAPP.canvas);

    var lp = {
        tools: {}
    };
    lp.drawingMode = true;
    lp.shapeMode = false;

    var hitOptions = {
            segments: true,
            stroke: true,
            fill: true,
            tolerance: 5
        },
        pathHit, myPath, mousePoint = paper.view.center;



    // Covers the canvas in a white rectangle to prevent transparent background on save.
    // Drawings are created on top of this rectangle.
    lp.drawBackground = function () {
        //if(paper.project.activeLayer.children['bg']) {
        //    paper.project.activeLayer.children['bg'].remove();
        //}
        var rectangle = new paper.Path.Rectangle({
            center: paper.view.center,
            size: [$WBAPP.width, $WBAPP.height],
            fillColor: $WBAPP.theme.bg,
            name: 'bg'
        });

        paper.view.update();
    };
    lp.drawBackground();



    lp.tools.draw = new paper.Tool();
    lp.tools.draw.onMouseDown = function() {
        myPath = new paper.Path({
            strokeColor: $WBAPP.theme.penColor, // $WBAPP is the global module from whiteboard.js
            strokeWidth: $WBAPP.penStroke,
            strokeCap: 'round',
            name: $WBAPP.theme.pathName
        });
    };
    lp.tools.draw.onMouseDrag = function(event) {
        myPath.add(event.point);
    };
    lp.tools.draw.onMouseUp = function() {
        myPath.simplify();
    };
    lp.tools.draw.minDistance = 1;
    lp.tools.draw.maxDistance = 3;



    lp.tools.erase = new paper.Tool();
    lp.tools.erase.onMouseDown = function() {
        myPath = new paper.Path({
            strokeColor: $WBAPP.theme.bg, // $WBAPP is the global module from whiteboard.js
            strokeWidth: $WBAPP.eraseStroke,
            strokeCap: 'round',
            name: 'erase'
        });
    };
    lp.tools.erase.onMouseDrag = function(event) {
        myPath.add(event.point);
    };
    lp.tools.erase.onMouseUp = function() {
        myPath.simplify();
    };
    lp.tools.erase.minDistance = 1;
    lp.tools.erase.maxDistance = 3;


    lp.tools.shape = new paper.Tool();
    lp.tools.shape.onMouseDown = function(event) {
        mousePoint = event.point;
        lp.drawShape(mousePoint, $WBAPP.shape, $('#shapeText')[0].value);
    };
    lp.tools.shape.onMouseDrag = function(event) {
        var last = paper.project.activeLayer.children[paper.project.activeLayer.children.length - 1];

        if($WBAPP.shape == 'Text') {
            last.position = event.point;
        }
        else {
            var secondlast = paper.project.activeLayer.children[paper.project.activeLayer.children.length - 2];

            last.position = event.point;
            secondlast.position = event.point;
        }
    };
    lp.tools.shape.minDistance = 1;
    lp.tools.shape.maxDistance = 3;



    lp.tools.move = new paper.Tool();
    lp.tools.move.onMouseDown = function(event) {
        var hitResult = project.hitTest(event.point, hitOptions);
        if (hitResult) {
            pathHit = hitResult.item;
        }
        else {
            return;
        }
    };
    lp.tools.move.onMouseDrag = function(event) {
        var firstThree = pathHit.name[0] + pathHit.name[1]  + pathHit.name[2];
        var last = pathHit.name[pathHit.name.length - 1], numOfDigits, id;

        if (pathHit && pathHit.name !== 'bg') {
            if (firstThree == 'rec' || firstThree == 'tex')  {
                id = pathHit.name.slice(4, pathHit.name.length);

                paper.project.activeLayer.children['rect' + id].position = event.point;
                paper.project.activeLayer.children['text' + id].position = event.point;
            }
            else{
                pathHit.position = event.point;
            }
        }
    };
    lp.tools.move.minDistance = 1;
    lp.tools.move.maxDistance = 3;



    lp.tools.pan = new paper.Tool();
    lp.tools.pan.onMouseDown = function(event) {
        paper.project.activeLayer.position = event.point;
    };
    lp.tools.pan.onMouseDrag = function(event) {
        paper.project.activeLayer.position = event.point;
    };
    lp.tools.pan.minDistance = 1;
    lp.tools.pan.maxDistance = 3;


    lp.undo = function() {
        var children = paper.project.activeLayer.children;
        var lastIndex = children.length - 1;
        var id, numOfDigits;


        if(children.length > 0){
            if(children[lastIndex].name !== 'bg') {
                var firstThree = children[lastIndex].name[0] + children[lastIndex].name[1] + children[lastIndex].name[2];

                if (firstThree == 'rec' || firstThree == 'tex')  {
                    $WBAPP.numOfShapes--;
                    numOfDigits = $WBAPP.numOfShapes.toString().length;
                    id = children[lastIndex].name.slice(children[lastIndex].name.length - numOfDigits, children[lastIndex].name.length);

                    children['rect' + id].remove();
                    children['text' + id].remove();
                }
                else {
                    children[lastIndex].remove();
                }
            }
        }
        paper.view.draw();
    };




    lp.clear = function() {
        while(paper.project.activeLayer.children.length > 1){
            paper.project.activeLayer.children[paper.project.activeLayer.children.length - 1].remove();
        }
        paper.view.draw();
    };




    lp.convertTheme = function() {
        var paths = paper.project.activeLayer.children;

        for(var i = 0; i < paths.length; i++) {
            var firstThree = paths[i].name[0] + paths[i].name[1] + paths[i].name[2];

            if(paths[i].name == 'bg') {
                paths[i].fillColor = $WBAPP.theme.bg;
            }
            if(paths[i].name == 'black') {
                paths[i].strokeColor = $WBAPP.theme.black;
            }
            if(paths[i].name == 'green') {
                paths[i].strokeColor = $WBAPP.theme.green;
            }
            if(paths[i].name == 'blue') {
                paths[i].strokeColor = $WBAPP.theme.blue;
            }
            if(paths[i].name == 'red') {
                paths[i].strokeColor = $WBAPP.theme.red;
            }
            if(paths[i].name == 'yellow') {
                paths[i].strokeColor = $WBAPP.theme.yellow;
            }
            if(paths[i].name == 'plainText') {
                paths[i].fillColor = $WBAPP.theme.black;
                paths[i].strokeColor = $WBAPP.theme.black;
            }
            if(paths[i].name == 'erase') {
                paths[i].strokeColor = $WBAPP.theme.bg;
            }
            if(paths[i].identifier == 'Terminal') {
                paths[i].fillColor = $WBAPP.theme.blue;
                paths[i].strokeColor = $WBAPP.theme.black;
            }
            if(paths[i].identifier == 'Process') {
                paths[i].fillColor = $WBAPP.theme.yellow;
                paths[i].strokeColor = $WBAPP.theme.black;
            }
            if(paths[i].identifier == 'Input') {
                paths[i].fillColor = $WBAPP.theme.red;
                paths[i].strokeColor = $WBAPP.theme.black;
            }
            if(paths[i].identifier == 'Decision') {
                paths[i].fillColor = $WBAPP.theme.green;
                paths[i].strokeColor = $WBAPP.theme.black;
            }
        }

        paper.view.draw();
    };



    // Creates paths and options for each shape available for the canvas
    // Shapes are only created if the program is in shape mode
    lp.drawShape = function(location, shape, message) {
        var rect, text;

        switch(shape) {
            case 'Terminal':
                rect = new paper.Path.Rectangle({
                    center: location,
                    size: [($WBAPP.textSize * message.length) / ( 1 + (message.length / 18)), $WBAPP.textSize],
                    fillColor: $WBAPP.theme.blue,
                    strokeColor: $WBAPP.theme.black,
                    strokeWidth: 2,
                    radius: $WBAPP.textSize / 2,
                    name: 'rect' + $WBAPP.numOfShapes.toString(),
                    identifier: 'Terminal'
                });

                var text = new PointText({
                    content: message,
                    name: 'text' + $WBAPP.numOfShapes.toString()
                });
                text.style = {
                    fontFamily: 'sans-serif',
                    fontSize: $WBAPP.textSize,
                    justification: 'center'
                };

                text.fitBounds(rect.bounds);
                break;
            case 'Process':
                rect = new paper.Path.Rectangle({
                    center: location,
                    size: [($WBAPP.textSize * message.length) / ( 1 + (message.length / 12)), $WBAPP.textSize],
                    fillColor: $WBAPP.theme.yellow,
                    strokeColor: $WBAPP.theme.black,
                    strokeWidth: 2,
                    name: 'rect' + $WBAPP.numOfShapes.toString(),
                    identifier: 'Process'
                });

                var text = new PointText({
                    content: message,
                    name: 'text' + $WBAPP.numOfShapes.toString()
                });
                text.style = {
                    fontFamily: 'sans-serif',
                    fontSize: $WBAPP.textSize,
                    justification: 'center'
                };

                text.fitBounds(rect.bounds);
                break;
            case 'Decision':
                rect = new paper.Path.Rectangle({
                    center: location,
                    size: [($WBAPP.textSize * message.length) / ( 1 + (message.length / 12)), ($WBAPP.textSize * message.length) / ( 1 + (message.length / 12))],
                    fillColor: $WBAPP.theme.green,
                    strokeColor: $WBAPP.theme.black,
                    strokeWidth: 2,
                    name: 'rect' + $WBAPP.numOfShapes.toString(),
                    identifier: 'Decision'
                });
                rect._segments[0].point._x += $WBAPP.textSize + 1;
                rect._segments[1].point._x += $WBAPP.textSize + 1;
                rect._segments[1].point._y += $WBAPP.textSize + 1;
                rect._segments[2].point._y += $WBAPP.textSize + 1;
                rect.rotate(45);

                var text = new PointText({
                    content: message,
                    name: 'text' + $WBAPP.numOfShapes.toString()
                });
                text.style = {
                    fontFamily: 'sans-serif',
                    fontSize: $WBAPP.textSize,
                    justification: 'center'
                };
                text.position = rect.position;
                break;
            case 'Input':
                rect = new Path.RegularPolygon(location, 4, ($WBAPP.textSize * message.length) / 2);
                rect.fillColor = $WBAPP.theme.red;
                rect.strokeColor = $WBAPP.theme.black;
                rect.strokeWidth = 2;
                rect.name = 'rect' + $WBAPP.numOfShapes.toString();
                rect._segments[1].point._x += $WBAPP.textSize;
                rect._segments[1].point._y += $WBAPP.textSize + 15;
                rect._segments[2].point._x += $WBAPP.textSize;
                rect._segments[2].point._y += $WBAPP.textSize + 15;
                rect.identifier = 'Input';


                var text = new PointText({
                    content: message,
                    name: 'text' + $WBAPP.numOfShapes.toString()
                });
                text.style = {
                    fontFamily: 'sans-serif',
                    fontSize: $WBAPP.textSize,
                    justification: 'center'
                };
                text.position = rect.position;
                break;
            case 'Text':
                text = new PointText({
                    point: location,
                    content: message,
                    justification: 'center',
                    fontSize: $WBAPP.textSize,
                    name: 'plainText'
                });
                text.fillColor = $WBAPP.theme.black;
                text.strokeColor = $WBAPP.theme.black;
                break;
        }

        $WBAPP.numOfShapes++;

        paper.view.draw();
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
