/**
 * Created by alexpersian on 12/10/14.
 */


var $BBAPP = (function() {

    var bb = {};

    bb.canvas = document.getElementById('myCanvas');

    bb.height = window.innerHeight * 0.98;
    bb.width = window.innerWidth * 0.99;

    bb.canvas.height = bb.height;
    bb.canvas.width = bb.width;

    bb.penColor = '#586e75';
    bb.bgColor = '#012129';
    bb.eraseColor = '#012129';

    bb.penStroke = 2;
    bb.eraseStroke = 50;
    bb.drawStroke = bb.penStroke;

    return bb;

}($BBAPP = $BBAPP || {}));