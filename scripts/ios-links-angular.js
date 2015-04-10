/**
 * Created by alexpersian on 4/10/15.
 */

var myApp = angular.module('myApp', []);

myApp.controller('LinkController', ['$scope', function($scope) {
    $scope.links = [
        {
            name:   'Vector images in Xcode 6',
            url:    'https://stackoverflow.com/questions/25818845/how-do-vector-images-work-in-xcode-6-i-e-pdf-files'
        },
        {
            name:   'iPhone Screens Demystified',
            url:    'http://www.paintcodeapp.com/news/iphone-6-screens-demystified'
        },
        {
            name:   'Explanation of strong and weak in iOS',
            url:    'http://stackoverflow.com/questions/9262535/explanation-of-strong-and-weak-storage-in-ios5'
        },
        {
            name:   'Why are IBOutlet properties declared with exclamation points?',
            url:    'https://s3.amazonaws.com/udacity-hosted-downloads/ud585/docs/Optionals.pdf'
        },
        {
            name:   'UIViewController life cycle',
            url:    'http://i.stack.imgur.com/eYCHy.jpg'
        },
        {
            name:   'Class hierarchy of NSObject',
            url:    'http://img.my.csdn.net/uploads/201210/18/1350528267_1570.jpg'
        },
        {
            name:   'Simple AVAudioPlayer implementation',
            url:    'http://stackoverflow.com/questions/19638497/ios-7-simple-audio-controls-with-avaudioplayer/'
        }
    ]
}]);
