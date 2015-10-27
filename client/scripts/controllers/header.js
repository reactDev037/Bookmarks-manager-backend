angular.module('bookmarksApp')
  .controller('headerCtrl', function ($scope, $rootScope, $location, User) {
    
    //listening to login events
    $rootScope.$on('loginEvent', function (event, data) {
      $scope.loginStatusUpdate();
    });
    
    //check if user logged in 
    //and then redirect user to login page 
    //and update the header 
    $scope.loginStatusUpdate = function () {
      if (!User.isAuthenticated() || !User.getCurrentId()) {
        $location.path('/login');
        $scope.isLoggedIn = false;
      }
      else {
        $scope.isLoggedIn = true;
      }
    }

    $scope.logout = function () {
      User.logout({}, {},
        function success(res, headers) {
          $location.path('/');
          $rootScope.$emit('loginEvent', 'succesful login');
        });
    }

    $scope.init = function () {
      $scope.loginStatusUpdate();
    }

    $scope.init();
  });
