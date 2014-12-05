/**
 * Created by alexpersian on 11/16/14.
 */

// Main Javascript functions and code.
var $WBAPP = (function() {

    var wb = {};

    wb.canvas = document.getElementById("myCanvas");

    wb.width = window.innerWidth;
    wb.height = window.innerHeight * 0.928;

    wb.canvas.width = wb.width;
    wb.canvas.height = wb.height;

    wb.penColor = 'black';
    wb.penStroke = 5;
    wb.eraseStroke = 50;
    var prevColor, prevStroke;

    wb.changeColor = function (color) {
        if (wb.erasing === true) { wb.erase(); }
        wb.penColor = color;
    };

    // Hacky way to handle the eraser functionality.
    // Draws over the canvas with a white pen stroke.
    // Changes the text in the eraser button to reflect the mode.
    // Saves the current pen color+width so it can be used after erasing is finished.
    wb.erasing = false;
    wb.erase = function () {
        if (wb.erasing !== false) {
            wb.penColor = prevColor;
            wb.penStroke = prevStroke;
            document.getElementById("erase").innerHTML =
                "<span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span> Eraser OFF";
            wb.erasing = false;
        } else {
            prevColor = wb.penColor;
            prevStroke = wb.penStroke;
            wb.penColor = 'white';
            wb.penStroke = wb.eraseStroke;
            document.getElementById("erase").innerHTML =
                "<span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span> Eraser ON";
            wb.erasing = true;
        }
    };

    // Returns a date string used to timestamp save files.
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

    // Save button grabs canvas and saves it as .png with timestamp as file name.
    var saveButton = document.getElementById('btn-save');
    saveButton.addEventListener('click', function(e) {
        saveButton.download = wb.getDate();
        saveButton.href = wb.canvas.toDataURL('image/svg');
    });

    // Load a saved whiteboard file onto the canvas.
    // TODO: Fix loading functionality
    //document.getElementById('btn-load').addEventListener('change', function(e) {
    //
    //    var reader = new FileReader();
    //    reader.onload = function(event) {
    //        console.log("omg freak out");
    //        var imgur = new Image();
    //        imgur.onload = function() {
    //            console.log("blarg");
    //            $WBPAPER.loadRaster(img);
    //        };
    //        imgur.src = event.target.result;
    //    };
    //    reader.readAsDataURL(this.files[0]);
    //
    //}, false);

    wb.changePenWidth = function(width) {
        wb.penStroke = width;
        document.getElementById('penDisplay').innerHTML = "Pen Width: " + width + " <span class=\"caret\"></span>";
    };

    wb.changeEraserWidth = function(width) {
        wb.eraseStroke = width;
        if (wb.erasing == true) {wb.penStroke = wb.eraseStroke; }
        document.getElementById('eraseDisplay').innerHTML = "Eraser Width: " + width + " <span class=\"caret\"></span>";
    };

    // Ensures that drawings aren't unintentionally lost when navigating away from page.
    $(window).bind('beforeunload', function(){
        return "Save your drawing before reloading!";
    });

    // Prevents default page scrolling action; fixes iOS 8 drawing bug.
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);

    return wb;
}($WBAPP = $WBAPP || {}));
