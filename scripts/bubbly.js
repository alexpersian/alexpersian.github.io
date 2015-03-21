/**
 * Created by alexpersian on 3/21/15.
 */

var $BUBBLE = (function() {
    var bub = {};

    var array = [];
    var sorted, swapped;

    var swap = function(A, i) {
        var temp = A[i];
        A[i] = A[i + 1];
        A[i + 1] = temp;
        console.log("Swapped!");
        return A;
    };

    var bubbleSort = function(A) {
        sorted = false;
        while(!sorted) {
            swapped = false;
            for (var i = 0; i < A.length - 1; i++) {
                if (A[i] > A[i+1]) {
                    A = swap(A, i);
                    swapped = true;
                }
            }
            if (!swapped) {
                sorted = true;
            }
        }
        console.log(A);
        return A;
    };

    bub.getNumbers = function() {
        var things = $('input').val();
        array = things.split(",");
        for (var i = 0; i < array.length; i++) {
            array[i] = +array[i];
        }
        console.log(things);
        display.innerHTML = bubbleSort(array);
    };

    return bub;
}($BUBBLE = $BUBBLE || {}));
