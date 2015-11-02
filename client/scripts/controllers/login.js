'use strict';

/**
 * @ngdoc function
 * @name bookmarksApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bookmarksApp
 */
angular.module('bookmarksApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, $uibModal, User) {

    //variables
    $scope.showError = false;
    $scope.error_msg = "";
    $scope.user = {};

    $scope.init = function(){
      //check if user is logged in
      if (User.isAuthenticated() || User.getCurrentId()) {
        $location.path('/main')
      }
    }

    $scope.register = function(){
      //var modal = 
      $uibModal.open({
        animation: true,
        templateUrl: 'views/ui-util/register-modal.html',
        controller: 'RegisterCtrl',
        size: 'sm'
      });
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

    $scope.init();

  });
