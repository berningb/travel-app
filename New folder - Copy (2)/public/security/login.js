angular.module('app').component('login', {
    templateUrl: 'security/login.html',
    controller: function($scope, $firebaseAuth, $location) {
         function($scope, $firebaseAuth) {
    var auth = $firebaseAuth();

    $scope.signIn = function() {
      $scope.firebaseUser = null;
      $scope.error = null;

      auth.$signInAnonymously().then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  }
    }
                $location.path('/home')
})