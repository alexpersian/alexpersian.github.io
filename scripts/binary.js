/**
 * Created by alexpersian on 3/28/15.
 */

var pivot;

function binarySearch(array, target, startIndex, stopIndex) {
    // Pivot becomes the middle index of the array
    pivot = Math.floor((stopIndex + startIndex) / 2);
    // If start and stop are the same, or they are one apart, stop searching.
    // This indicates that the array is fully searched, and the target hasn't been found.
    if (stopIndex == startIndex || Math.abs(stopIndex - startIndex) == 1) {
        $('#result').html('not found. Try a new search.');
        return -1;
    } else { // Otherwise, search the array.
        if (array[pivot] == target) {
            // Target has been found at the pivot's index.
            $('#result').html(String(pivot));
            return -1;
        } else {
            if (target < array[pivot]) {
                // Recursively call the search with the bottom half.
                stopIndex = pivot;
                binarySearch(array, target, startIndex, stopIndex);
            } else {
                // Recursively call the search with the top half.
                startIndex = pivot;
                binarySearch(array, target, startIndex, stopIndex);
            }
        }
    }
}

function generateRandomArray(num) {
    var array = [];
    for (var i = 0; i < num; i++) {
        array[i] = Number(Math.floor(Math.random() * 1000));
    }
    return array;
}

function sortArray(away) {
    return away.sort(function(a, b) {return a - b});
}

$('#submit').on('click', function() {
    var a = generateRandomArray($('#number').val());
    sortArray(a);
    var t = Number($('#target').val());
    console.log(a);
    console.log(t);
    binarySearch(a, t, 0, a.length);
});
