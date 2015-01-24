/**
 * Created by alexpersian on 11/16/14.
 */

// Main Javascript functions and code.
var $WBAPP = (function() {

    var wb = {};

    wb.canvas = document.getElementById("myCanvas");

    wb.width = window.innerWidth;
    wb.height = window.innerHeight * 0.95;

    wb.canvas.width = wb.width;
    wb.canvas.height = wb.height;

    wb.penColor = 'black';
    wb.bgColor = 'white';
    wb.penStroke = 3;
    wb.eraseStroke = 30;
    var prevColor, prevStroke;

    wb.shape = '';
    wb.shapeStrokeColor = '#95B1BD';
    wb.night = false;
    wb.erasing = false;

    // Prevents default page scrolling action; fixes iOS 8 drawing bug.
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);

    // Ensures that drawings aren't unintentionally lost when navigating away from page.
    $(window).bind('beforeunload', function() {
        return "Save your drawing before reloading!";
    });

    // Hacky way to handle the eraser functionality.
    // Draws over the canvas with a white pen stroke.
    // Changes the text in the eraser button to reflect the mode.
    // Saves the current pen color+width so it can be used after erasing is finished.
    wb.erase = function () {
        if (wb.erasing !== false) {
            wb.penColor = prevColor;
            wb.penStroke = prevStroke;
            document.getElementById("erase").innerHTML =
                "Erase <span class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\"></span>";
            wb.erasing = false;
        } else {
            prevColor = wb.penColor;
            prevStroke = wb.penStroke;
            wb.penColor = wb.bgColor;
            wb.penStroke = wb.eraseStroke;
            document.getElementById("erase").innerHTML =
                "Erase <span class=\"glyphicon glyphicon-check\" aria-hidden=\"true\"></span>";
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

    wb.changeColor = function (color) {
        if (wb.erasing === true) { wb.erase(); }
        if (wb.night) {
            switch (color) {
                case 'black':
                    wb.penColor = '#495F66';
                    break;
                case 'red':
                    wb.penColor = '#dc322f';
                    break;
                case 'blue':
                    wb.penColor = '#268bd2';
                    break;
                case 'green':
                    wb.penColor = '#859900';
                    break;
            }
        } else {
            wb.penColor = color;
        }
    };

    wb.changePenWidth = function(width) {
        if (!wb.erasing) {
            wb.penStroke = width;
            document.getElementById('penDisplay').innerHTML = "Pen Width: " + width + " <span class=\"caret\"></span>";
        } else {
            prevStroke = width;
            document.getElementById('penDisplay').innerHTML = "Pen Width: " + width + " <span class=\"caret\"></span>";
        }
    };

    wb.changeEraserWidth = function(width) {
        if (wb.erasing) {
            wb.eraseStroke = width;
            wb.penStroke = wb.eraseStroke;
            document.getElementById('eraseDisplay').innerHTML = "Eraser Width: " + width + " <span class=\"caret\"></span>";
        } else {
            wb.eraseStroke = width;
            document.getElementById('eraseDisplay').innerHTML = "Eraser Width: " + width + " <span class=\"caret\"></span>";
        }
    };

    wb.nightTheme = function() {
        if (!wb.night) {
            document.getElementById('night').innerHTML = "Night Theme <span class=\"glyphicon glyphicon-check\" aria-hidden=\"true\"></span>";
            wb.bgColor = '#01191F';
            wb.shapeStrokeColor = '#E3F6FF';
            switch (wb.penColor) {
                case 'black':
                    wb.penColor = '#495F66';
                    break;
                case 'red':
                    wb.penColor = '#dc322f';
                    break;
                case 'blue':
                    wb.penColor = '#268bd2';
                    break;
                case 'green':
                    wb.penColor = '#859900';
                    break;
            }
            wb.night = true;
        } else {
            document.getElementById('night').innerHTML = "Night Theme <span class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\"></span>";
            wb.bgColor = '#ffffff';
            wb.shapeStrokeColor = '#95B1BD';
            switch (wb.penColor) {
                case '#495F66':
                    wb.penColor = 'black';
                    break;
                case '#dc322f':
                    wb.penColor = 'red';
                    break;
                case '#268bd2':
                    wb.penColor = 'blue';
                    break;
                case '#859900':
                    wb.penColor = 'green';
                    break;
            }
            wb.night = false;
        }
        $WBPAPER.drawBackground();
    };

    wb.undo = function() {
        $WBPAPER.removePath();
    };

    wb.clear = function() {
        if (!wb.night) {
            wb.bgColor = '#ffffff';
        } else {
            wb.bgColor = '#01191F';
        }
        $WBPAPER.drawBackground();
    };

    // TODO: Add functionality for shapes
    wb.changeShape = function(shape) {
        wb.shape = shape;
        document.getElementById('shapeChoice').innerHTML = shape + " <span class=\"caret\"></span>";
    };

    wb.createShape = function() {
        if ($WBPAPER.drawingMode) {
            $WBPAPER.drawingMode = false;
            $WBPAPER.shapeMode = true;
            document.getElementById('createShape').className = "glyphicon glyphicon-unchecked";
            document.getElementById('createShape').className = "glyphicon glyphicon-check";
        } else {
            $WBPAPER.drawingMode = true;
            $WBPAPER.shapeMode = false;
            document.getElementById('createShape').className = "glyphicon glyphicon-check";
            document.getElementById('createShape').className = "glyphicon glyphicon-unchecked";
        }
    };

    // Save button grabs canvas and saves it as .png with timestamp as file name.
    $('#btn-save').on('click', function(e) {
        this.download = wb.getDate();
        this.href = wb.canvas.toDataURL('image/svg');
    });

    // TODO: Fix loading functionality
    $('#btn-load').on('change', function(e) {
        var file = e.target.files[0];
        var fileReader = new FileReader();

        fileReader.onload = function(e2) {
            wb.clear();
            $WBPAPER.loadRaster(e2.target.result);
        };

        fileReader.readAsDataURL(file);
    });

    return wb;
}($WBAPP = $WBAPP || {}));
