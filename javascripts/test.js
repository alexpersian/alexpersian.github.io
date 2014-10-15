$(document).ready(function (){
    // inner window size constants
    var WIDTH = 1280;
    var HEIGHT = 1020;

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    // set canvas size
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;

    // defines the pixel density of display
    var pixelRows = 10;
    var pixelColumns = 10;
    var pixelDensity = pixelRows * pixelColumns;

    var pixelRowPos = 0;
    var pixelColPos = 0;

    var pixelWidth = 128;
    var pixelHeight = 102;

    var colorBase = 4;
    var colorIndex = 0;

    var pixels = [];

    var colors = [
        '#000000', '#00FF00', '#0000FF', '#FF0000'

//        greyscale not used
//        '#000000', '#080808', '#101010', '#181818', '#202020', '#282828',
//        '#303030', '#383838', '#404040', '#484848', '#505050', '#585858',
//        '#606060', '#686868', '#707070', '#787878', '#808080', '#888888',
//        '#909090', '#989898', '#A0A0A0', '#A8A8A8', '#B0B0B0', '#B8B8B8',
//        '#C0C0C0', '#C8C8C8', '#D0D0D0', '#D8D8D8', '#E0E0E0', '#E8E8E8',
//        '#F0F0F0', '#F8F8F8', '#FFFFFF'
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
