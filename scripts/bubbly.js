/**
 * Created by alexpersian on 3/21/15.
 */

var $BUBBLE = (function($) {
    var bub = {};

    var _array = [];
    var startTime, stopTime, numSorted, numComp, numAccess;

    function randomArray(min, max, num) {
        var array = [];
        for (var k = 0; k < num; k++) {
            array[k] = randomInteger(min, max);
        }
        return array;
    }

    // random integer between min(inclusive) and max(inclusive)
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function swap(array, i) {
        var temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        return array;
    }

    function execTime() {
        return new Date().getTime();
    }

    function bubbleSort(array, optSort) {
        var sorted = false,
            swapped = false;

        console.log(optSort);

        numSorted = 0;
        numComp = 0;
        numAccess = 0;

        startTime = execTime();

        while(!sorted) {
            swapped = false;
            for (var j = 0; j < array.length - 1 - numSorted; j++) {
                numComp++;
                numAccess += 2;
                if (array[j] > array[j + 1]) {
                    array = swap(array, j);
                    swapped = true;
                    numAccess += 4;
                }
            }
            if (optSort) {
                numSorted++;
            }
            if (!swapped) {
                sorted = true;
            }
        }

        stopTime = execTime();
        return array;
    }

    function onGenerateClick() {
        var min = Number($('#min').val()),
            max = Number($('#max').val()),
            num = Number($('#num').val());
        _array = randomArray(min, max, num);
        $('#results').html(formatArray(_array));
    }

    function onSortClick(opt) {
        bubbleSort(_array, opt);
        $('#elements').html("Elements in Array: " + Number($('#num').val()));
        $('#compare').html("Comparisons Made: " + numComp);
        $('#access').html("Array Accesses: " + numAccess);
        $('#time').html("Time Taken: " + (stopTime - startTime) + " ms");
        $('#r-label').html("Numbers (sorted)");
        $('#results').html(formatArray(_array));
    }

    function formatArray(array) {
        var returnString = "",
            lineWidth = 20;
        for (var i = 0; i < array.length; i++) {
            returnString += array[i];
            returnString += ((i == array.length - 1) || ((i > 0) && (i % lineWidth == 0)) ? "<br>" : ", ");
        }
        return returnString;
    }

    $(document).ready(function() {
        $('#generate').click(onGenerateClick);
        $('#stupidSort').click(function() { _opt = false; onSortClick(_opt);});
        $('#smartSort').click(function() { _opt = true; onSortClick(_opt);});
        onGenerateClick();
    });

    return bub;
}(jQuery));
