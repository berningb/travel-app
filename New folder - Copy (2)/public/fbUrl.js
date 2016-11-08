angular.module('app').constant('FirebaseUrl', 'http://web-app-a0d3e.firebaseio.com')
    .service('rootRef', ['FirebaseUrl', Firebase]);