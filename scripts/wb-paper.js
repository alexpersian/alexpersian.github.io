/**
 * Created by alexpersian on 11/16/14.
 */

// This file handles the drawing functions for whiteboard.js

paper.install(window);
var PAPER = window.onload = function() {
    paper.setup(WBAPP.canvas);

    var localPaper = {};

    var myPath;
    var tool = new Tool();

    tool.onMouseDown = function(event) {
        myPath = new paper.Path({
            strokeColor: WBAPP.penColor, // WBAPP is the global module from whiteboard.js
            strokeWidth: WBAPP.penStroke,
            strokeCap: 'round'
        });
        myPath.add(event.point);
    };

    tool.onMouseDrag = function(event) {
        myPath.add(event.point);
    };

    tool.onMouseUp = function(event) {
        if (!WBAPP.erasing) { myPath.simplify(); }
    };

    // Covers the canvas in a white rectangle to prevent transparent background on save.
    // Drawings are created on top of this rectangle.
    var rectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Point(WBAPP.width, WBAPP.height));
    var rectPath = new paper.Path.Rectangle(rectangle);
    rectPath.fillColor = 'white';

    // TODO: Fix loading functionality
    localPaper.loadRaster = function(image) {
        console.log("fail)");
        paper.remove();
        var raster = new paper.Raster({
            source: image,
            position: view.center
        });
    };

    return localPaper;
};