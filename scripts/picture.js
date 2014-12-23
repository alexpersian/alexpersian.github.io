$(document).ready(function (){
    // inner window size constants
    var WIDTH = window.innerWidth - 48;
    var HEIGHT = window.innerHeight - 68;

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    // set canvas size
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // defines the pixel density of display
    var pixelRows = 10;
    var pixelColumns = 10;
    var pixelDensity = pixelRows * pixelColumns;

    var pixelRowPos = 0;
    var pixelColPos = 0;

    var pixelWidth = 150;
    var pixelHeight = 80;

    var colorBase = 4;
    var colorIndex = 0;

    var pixels = [];

    var colors = [
        '#000000', '#FF0000', '#00FF00', '#0000FF'
    ];

    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    function draw() {
        for (var i = 0; i < pixelRows * pixelColumns; i++) {

            context.beginPath();
            context.rect(pixelColPos, pixelRowPos, pixelWidth, pixelHeight);
            context.fillStyle = colors[colorIndex];
            context.fill();

            pixels[i] = createPixel(pixelColPos, pixelRowPos, pixelWidth, pixelHeight, colorIndex);

            if (pixelColPos == pixelWidth * (pixelColumns - 1)) {
                pixelRowPos += pixelHeight;
                pixelColPos = 0;
            } else {
                pixelColPos += pixelWidth;
            }
        }
    }draw();

    var pixelsLength = pixels.length;

    function createPixel(colPos, rowPos, width, height, color) {
        return {
            colPos: colPos,
            rowPos: rowPos,
            width: width,
            height: height,
            color: color
        };
    }

    function redraw() {
        if (pixels[pixelsLength - 1].color < colorBase - 1) {
            add(0);
        }

        for (var i = 0; i < pixelsLength; i++) {
            context.beginPath();
            context.rect(
                pixels[i].colPos,
                pixels[i].rowPos,
                pixels[i].width,
                pixels[i].height);
            context.fillStyle = colors[pixels[i].color];
            context.fill();
        }
        requestAnimationFrame(redraw);
    }

    function add(x) {
        if (pixels[x].color == colorBase - 1 && x < pixelDensity) {
            pixels[x].color = 0;
            add(x + 1);
        } else {
            pixels[x].color++;
        }
    }

    function start() {
        redraw();
    }
    window.start = start;
});
