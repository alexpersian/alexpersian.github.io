/**
 * Created by alexpersian on 11/16/14.
 */

var WBAPP = (function() {

    var wb = {};

    var canvas = document.getElementById("myCanvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    wb.penColor = 'black';
    wb.penStroke = 5;
    var prevColor, prevStroke;

    wb.changeColor = function (color) {
        if (erasing === true) { wb.erase() }
        wb.penColor = color;
        console.log("pen is now " + wb.penColor);
    };

    var erasing = false;

    wb.erase = function () {
        if (erasing === false) {
            prevColor = wb.penColor;
            prevStroke = wb.penStroke;
            wb.penColor = 'white';
            wb.penStroke = 40;
            document.getElementById("eraserMode").innerHTML = "Eraser ON";
            erasing = true;
        } else {
            wb.penColor = prevColor;
            wb.penStroke = prevStroke;
            document.getElementById("eraserMode").innerHTML = "Eraser OFF";
            erasing = false;
        }
    };

    wb.getDate = function () {
        return new Date();
    };

    var button = document.getElementById('btn-save');
    button.addEventListener('click', function(e) {
        button.href = canvas.toDataURL('image/png');
    });

    return wb;
}());

