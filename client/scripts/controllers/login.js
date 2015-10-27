'use strict';

/**
 * @ngdoc function
 * @name bookmarksApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bookmarksApp
 */
angular.module('bookmarksApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, User) {

    //variables
    $scope.showError = false;
    $scope.error_msg = "";
    $scope.user = {};

    //check if user is logged in
    if (User.isAuthenticated() || User.getCurrentId()) {
      $location.path('/main')
    }

    $scope.login = function () {
      var parameters = {};
      var postData = {
        "email": $scope.user.email,
        "password": $scope.user.password
      };

      User.login(
        parameters,
        postData,
        function onSuccess(res, headers) {
          //logged in
          $location.path('/');
          $rootScope.$emit('loginEvent', 'succesful login');
        },
        function onError(res, headers) {
          //failed to login
          $scope.showError = true;
          $scope.error_msg = res.data.error.message;
          //update header
          $rootScope.$emit('loginEvent', 'fail login');
        })
    }

  });
