/**
 * Created by alexpersian on 11/16/14.
 */

var WBAPP = (function() {

    var wb = {};

    wb.canvas = document.getElementById("myCanvas");

    wb.width = window.innerWidth;
    wb.height = window.innerHeight * 0.944;

    wb.canvas.width = wb.width;
    wb.canvas.height = wb.height;

    wb.penColor = 'black';
    wb.penStroke = 5;
    wb.eraseStroke = 50;
    var prevColor, prevStroke;

    wb.changeColor = function (color) {
        if (erasing === true) { wb.erase() }
        wb.penColor = color;
    };

    var erasing = false;

    wb.erase = function () {
        if (erasing !== false) {
            wb.penColor = prevColor;
            wb.penStroke = prevStroke;
            document.getElementById("erase").innerHTML =
                "<span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span> Eraser OFF";
            erasing = false;
        } else {
            prevColor = wb.penColor;
            prevStroke = wb.penStroke;
            wb.penColor = 'white';
            wb.penStroke = wb.eraseStroke;
            document.getElementById("erase").innerHTML =
                "<span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span> Eraser ON";
            erasing = true;
        }
    };

    wb.getDate = function () {

        var d = new Date();

        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var hour = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();

        return (year + "-" + month + "-" + day + "_" + hour + ":" + min + ":" + sec);
    };

    var button = document.getElementById('btn-save');
    button.addEventListener('click', function(e) {
        button.download = wb.getDate();
        button.href = wb.canvas.toDataURL('image/png');
    });

    $("#penWidth").change(function () {
        var $dropdown = $(this);
        wb.penStroke = $dropdown.val();
    });

    $("#eraseWidth").change(function () {
        var $dropdown = $(this);
        wb.eraseStroke = $dropdown.val();
        if (erasing === true) { wb.penStroke = wb.eraseStroke; }
    });

    return wb;
}());
