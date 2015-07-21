/**
 * Created by alexpersian on 11/16/14.
 */

paper.install(window);
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Main Javascript functions and code.
var $WBAPP = (function() {

    var wb = {}, prevColor, prevStroke, first = true;

    wb.width = window.innerWidth;
    wb.height = window.innerHeight * 0.95;

    wb.canvas = $("#my-canvas")[0];
    wb.canvas.width = wb.width;
    wb.canvas.height = wb.height;

    wb.penStroke = 3;
    wb.eraseStroke = 30;

    wb.shape = '';
    wb.numOfShapes = 0;
    wb.shapeStrokeColor = '#95B1BD';
    wb.erasing = false;

    wb.themes = {
        default: {
            name: 'defalut',
            bg: 'white',
            black: 'black',
            red: 'red',
            green: 'green',
            blue: 'blue',
            penColor: 'black',
            pathName: 'black'
        },
        night: {
            name: 'night',
            bg: '#002b36',
            black: '#657b83',
            red: '#dc322f',
            green: '#488B3C',
            blue: '#268bd2',
            penColor: '#657b83',
            pathName: 'black'
        },
        ocean: {
            name: 'ocean',
            bg: createColor(43, 48, 59),
            black: createColor(101, 115, 126),
            red: createColor(191, 97, 106),
            green: createColor(163, 190, 140),
            blue: createColor(143, 161, 179),
            penColor: createColor(101, 115, 126),
            pathName: 'black'
        },
        neon: {
            name: 'neon',
            bg: createColor(0, 0, 0),
            black: createColor(176, 176, 176),
            red: createColor(251, 1, 32),
            green: createColor(161, 198, 89),
            blue: createColor(111, 179, 216),
            penColor: createColor(176, 176, 176),
            pathName: 'black'
        },
        slate: {
            name: 'slate',
            bg: '#3a3f44',
            black: '#7a8288',
            red: '#ee5f5b',
            green: '#62c462',
            blue: '#5bc0de',
            penColor: '#7a8288',
            pathName: 'black'
        }
    };

    wb.theme = wb.themes.default;
    wb.activeMode = 'draw';
    wb.priorMode = 'draw';

    wb.textSize = 40;

    /**
     * Modifies all colors to match the selected theme
     */
    wb.changeTheme = function(theme) {
        $('#theme')[0].innerHTML = "Theme: "+ theme.capitalizeFirstLetter() + " <span class=\"caret\"></span>";
        wb.theme = wb.themes[theme];

        $WBPAPER.convertTheme();
    };

    /**
     * Hacky way to handle the eraser functionality.
     * Draws over the canvas with a white pen stroke.
     * Changes the text in the eraser button to reflect the mode.
     * Saves the current pen color+width so it can be used after erasing is finished.
     */


    /**
     * Change color will grab the value from the color buttons and change the draw color to that.
     * If in night mode, it will change to the more pleasing colors.
     */
    wb.changeColor = function (color) {
        wb.theme.penColor = wb.theme[color];
        wb.theme.pathName = color;
        wb.activeMode = 'draw';
        $WBPAPER.tools.draw.activate();
        wb.toggleToolBtns();
    };

    /**
     * These two functions simple change the stroke width based on passed integer parameter.
     */
    wb.changePenWidth = function(width) {
        $('#penDisplay')[0].innerHTML = "Pen Width: " + width + " <span class=\"caret\"></span>";
        wb.penStroke = width;
        wb.activeMode = 'draw';
        $WBPAPER.tools.draw.activate();
        wb.toggleToolBtns();
    };
    wb.changeEraserWidth = function(width) {
        $('#eraseDisplay')[0].innerHTML = "Eraser Width: " + width.toString() + " <span class=\"caret\"></span>";
        wb.eraseStroke = width;
        wb.activeMode = 'erase';
        $WBPAPER.tools.erase.activate();
        wb.toggleToolBtns();
    };
    wb.changeTextSize = function(size) {
        $('#textDisplay')[0].innerHTML = "Eraser Width: " + size.toString() + " <span class=\"caret\"></span>";
        wb.textSize = size;
        wb.activeMode = 'shape';
        $WBPAPER.tools.shape.activate();
        wb.toggleToolBtns();
    };

    /**
     * Undo simply removes the most recently created path.
     */
    wb.undo = function() {
        $WBPAPER.undo();
    };

    /**
     * Clears the canvas by drawing the background over the current canvas.
     * Considers the current theme when redrawing.
     */
    wb.clear = function() {
        c = confirm('Are you sure you want to clear the canvas?');
        if (c) {
            $WBPAPER.clear();
        }
    };

    /**
     * Change shape monitors the value of the shape dropdown.
     * Draws shapes on the canvas by using Rectangle paths.
     * Shapes are created at mouse click point.
     */
    wb.changeShape = function(shape) {
        wb.shape = shape;
        $('#shapeChoice')[0].innerHTML = "<span class=\"caret\"></span> " + shape;

        if(wb.activeMode !== 'shape') {
            $('#createShape')[0].click();
        }
    };
    wb.activateShapeMode = function() {
        if (wb.activeMode !== 'shape') {
            wb.activeMode = 'shape';
            $WBPAPER.tools.shape.activate();
            wb.toggleToolBtns();
        } else {
            $WBPAPER.tools.draw.activate();
            wb.activeMode = 'draw';
            wb.toggleToolBtns();
        }
    };
    wb.activateMoveMode = function() {
        if (wb.activeMode !== 'move') {
            wb.activeMode = 'move';
            $WBPAPER.tools.move.activate();
            wb.toggleToolBtns();
        } else {
            $WBPAPER.tools.draw.activate();
            wb.activeMode = 'draw';
            wb.toggleToolBtns();
        }
    };
    wb.erase = function () {
        if (wb.activeMode !== 'erase') {
            wb.activeMode = 'erase';
            $WBPAPER.tools.erase.activate();
            wb.toggleToolBtns();
        } else {
            $WBPAPER.tools.draw.activate();
            wb.activeMode = 'draw';
            wb.toggleToolBtns();
        }
    };



    wb.toggleToolBtns = function() {
        if(wb.activeMode == 'draw') {
            $('#shapeIndicator')[0].className = "glyphicon glyphicon-unchecked";
            $('#moveIndicator')[0].className = "glyphicon glyphicon-unchecked";
            $("#eraseIndicator")[0].className = "glyphicon glyphicon-unchecked";
        }
        if(wb.activeMode == 'erase') {
            $('#shapeIndicator')[0].className = "glyphicon glyphicon-unchecked";
            $('#moveIndicator')[0].className = "glyphicon glyphicon-unchecked";
            $("#eraseIndicator")[0].className = "glyphicon glyphicon-check";
        }
        if(wb.activeMode == 'shape') {
            $('#moveIndicator')[0].className = "glyphicon glyphicon-unchecked";
            $("#eraseIndicator")[0].className = "glyphicon glyphicon-unchecked";
            $('#shapeIndicator')[0].className = "glyphicon glyphicon-check";
        }
        if(wb.activeMode == 'move') {
            $("#eraseIndicator")[0].className = "glyphicon glyphicon-unchecked";
            $('#shapeIndicator')[0].className = "glyphicon glyphicon-unchecked";
            $('#moveIndicator')[0].className = "glyphicon glyphicon-check";
        }

    };



    /**
     * Returns a date string used to timestamp save files.
     */
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

    /**
     * Prevents default page scrolling action; fixes iOS 8 drawing bug.
     */
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);


    /**
     * Ensures that drawings aren't unintentionally lost when navigating away from page.
     */
    $(window).bind('beforeunload', function() {
        return "Save your drawing before leaving!!";
    });


    /**
     * Save button grabs canvas and saves it as .png with timestamp as file name.
     */
    $('#btn-save').on('click', function() {
        this.download = wb.getDate();
        this.href = wb.canvas.toDataURL('image/svg');
    });

    /**
     * Loads a saved board from an image file. Overwrites current canvas.
     */
    $('#btn-load').on('change', function(e) {
        var file = e.target.files[0];
        var fileReader = new FileReader();

        fileReader.onload = function(e2) {
            wb.clear();
            $WBPAPER.loadRaster(e2.target.result);
        };

        fileReader.readAsDataURL(file);
    });

    /**
     * Editor and modal junk
     */
    var editor = ace.edit("editor");
    var mousePos;
    $('#show-editor').on('click', function() {
        $('#my-canvas').on('mousedown', function() {
            mousePos = {
                x: event.pageX,
                y: event.pageY
            };
            $('#my-modal').modal('show');
            editor.setTheme("ace/theme/github");
            editor.getSession().setMode("ace/mode/text");
        });
        $(this).text("Now Click");
    });
    $('#save-text').on('click', function() {
        console.log(editor.getValue());
        $WBPAPER.drawText(editor.getValue(), mousePos.x, mousePos.y);
        $('#my-modal').modal('hide');
        $('#my-canvas').off('mousedown');
        $('#show-editor').text("Input Text");
    });


    function createColor(r, g, b) {
        return new Color(r / 256, g / 256, b / 256);
    }


    return wb;
}($WBAPP = $WBAPP || {}));
