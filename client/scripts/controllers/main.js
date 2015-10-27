'use strict';

/**
 * @ngdoc function
 * @name bookmarksApp.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the bookmarksApp
 */
angular.module('bookmarksApp')
  .controller('MainCtrl', function ($scope, $location, User/*, Folder*/ /*FIXME: once i figure out how to do sub-views i will move to seperate controller*/) {
    //variables
    $scope.user = {};

    $scope.checkIfUserIsLoggedIn = function () {
      //bounce user out if not logged in
      if (!User.isAuthenticated() || !User.getCurrentId()) {
        $location.path('/login');
        return false;
      }
      else return true;
    }

    $scope.getCurrentUserInfo = function () {
      User.findById({
        id: User.getCurrentId()
      },
        function (data) {
          //success
          $scope.user = data;
        })
    }

    // //------------------------------------
    // //folders related
    // //------------------------------------
    // //varaibles
    // $scope.folders ={};
    // //functionality
    // $scope.populateFolders = function () {
    //   Folder.tree({}, {}, function (res) {
    //     console.log(res);
    //      $scope.folders = res.folders;
    //   });
    // }



    $scope.init = function () {
      if ($scope.checkIfUserIsLoggedIn()) {
        $scope.getCurrentUserInfo();
        // $scope.populateFolders();
      }
    }

    $scope.init();

  });
