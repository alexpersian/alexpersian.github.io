/**
 * Created by alexpersian on 11/16/14.
 */

var canvas = document.getElementById("myCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var penColor = 'black';
var penStroke = 5;
var prevColor, prevStroke;

function changeColor(color) {
    if (erasing === true) { erase() }
    penColor = color;
    console.log("pen is now " + penColor);
}

var erasing = false;

function erase() {
    if (erasing === false) {
        prevColor = penColor;
        prevStroke = penStroke;
        penColor = 'white';
        penStroke = 30;
        document.getElementById("eraserMode").innerHTML = "Eraser ON";
        erasing = true;
    } else {
        penColor = prevColor;
        penStroke = prevStroke;
        document.getElementById("eraserMode").innerHTML = "Eraser OFF";
        erasing = false;
    }
}