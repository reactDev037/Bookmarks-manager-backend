'use strict';

/**
 * @ngdoc function
 * @name bookmarksApp.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the bookmarksApp
 */
angular.module('bookmarksApp')
  .controller('MainCtrl', function ($scope, User, Folder) {
    //bounce user out if not logged in
    if (!User.isAuthenticated() || !User.getCurrentId()) {
      $location.path('/login')
    }

    $scope.user = {};

    User.findById({
      id: User.getCurrentId()
    },
      function (data) {
        //success
        $scope.user = data;
      })
    Folder.tree({}, {}, function (res) {
      console.log(res);
    });

  });
