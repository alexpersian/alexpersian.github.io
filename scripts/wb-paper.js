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
        var rectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Point($WBAPP.width, $WBAPP.height));
        var rectPath = new paper.Path.Rectangle(rectangle);
        rectPath.fillColor = $WBAPP.theme.bg;
        rectPath.name = 'bg';
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
        var last = pathHit.name[pathHit.name.length - 1];

        if (pathHit && pathHit.name !== 'bg') {
            if (firstThree == 'rec' || firstThree == 'tex')  {
                paper.project.activeLayer.children['rect' + last].position = event.point;
                paper.project.activeLayer.children['text' + last].position = event.point;
            }
            else{
                pathHit.position = event.point;
            }
        }
    };
    lp.tools.move.minDistance = 1;
    lp.tools.move.maxDistance = 3;


    lp.undo = function() {
        if(paper.project.activeLayer.children.length > 0){
            console.log(paper.project.activeLayer.children[paper.project.activeLayer.children.length - 1].name);
            if(paper.project.activeLayer.children[paper.project.activeLayer.children.length - 1].name !== 'bg') {
                paper.project.activeLayer.children[paper.project.activeLayer.children.length - 1].remove();
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
            if(paths[i].name == 'plainText') {
                paths[i].fillColor = $WBAPP.theme.black;
                paths[i].strokeColor = $WBAPP.theme.black;
            }
            if(paths[i].name == 'erase') {
                paths[i].strokeColor = $WBAPP.theme.bg;
            }
            if(firstThree == 'tex') {
                paths[i].fillColor = $WBAPP.theme.black;
                paths[i].strokeColor = $WBAPP.theme.black;
            }
            if(firstThree == 'rec') {
                paths[i].fillColor = $WBAPP.theme.bg;
                paths[i].strokeColor = $WBAPP.theme.black;
            }
        }

        paper.view.draw();
    };



    // Creates paths and options for each shape available for the canvas
    // Shapes are only created if the program is in shape mode
    lp.drawShape = function(location, shape, message) {
        switch(shape) {
            case 'Terminator':
                rect = new paper.Path.Rectangle({
                    center: location,
                    size: [($WBAPP.textSize * message.length) / ( 1 + (message.length / 18)), $WBAPP.textSize],
                    fillColor: $WBAPP.theme.bg,
                    strokeColor: $WBAPP.theme.black,
                    strokeWidth: 2,
                    radius: $WBAPP.textSize / 2,
                    name: 'rect' + $WBAPP.numOfShapes.toString()
                });

                var text = new PointText({
                    point: new Point(location.x, location.y + Math.round($WBAPP.textSize / 3)),
                    content: message,
                    justification: 'center',
                    fontSize: $WBAPP.textSize,
                    name: 'text' + $WBAPP.numOfShapes.toString()
                });
                text.fillColor = $WBAPP.theme.black;
                text.strokeColor = $WBAPP.theme.black;
                break;
            case 'Process':
                rect = new paper.Path.Rectangle({
                    center: location,
                    size: [($WBAPP.textSize * message.length) / ( 1 + (message.length / 12)), $WBAPP.textSize],
                    fillColor: $WBAPP.theme.bg,
                    strokeColor: $WBAPP.theme.black,
                    strokeWidth: 2,
                    name: 'rect' + $WBAPP.numOfShapes.toString()
                });

                var text = new PointText({
                    point: new Point(location.x, location.y + Math.round($WBAPP.textSize / 3)),
                    content: message,
                    justification: 'center',
                    fontSize: $WBAPP.textSize,
                    name: 'text' + $WBAPP.numOfShapes.toString()
                });
                text.fillColor = $WBAPP.theme.black;
                text.strokeColor = $WBAPP.theme.black;
                break;
            case 'Text':
                var text = new PointText({
                    point: new Point(location.x, location.y + 13),
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
