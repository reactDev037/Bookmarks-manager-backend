'use strict';

/**
 * @ngdoc function
 * @name bookmarksApp.controller:FolderCtrl
 * @description
 * # FolderCtrl
 * Controller of the bookmarksApp
 */
angular.module('bookmarksApp')
  .controller('FolderCtrl', function ($scope, $location, Folder, User) {
    //------------------------------------
    //folders related
    //------------------------------------
    //varaibles
    $scope.folders = {};
    //functionality
    $scope.getFolders = function () {
      // Folder.tree({}, {}, function (res) {
      //   console.log(res);
      //    $scope.folders = res.folders;
      // });
      Folder.find({
        filter: {
          where: {
            "and": [
              { userId: User.getCurrentId() },
              { parentId: 0 }
            ]

            // parentId : {
            //   "inq" : 0
            // }
          }
        }
      },
        function (res) {
          $scope.folders = res;
        });
    }
    $scope.folderNav = function () {
      $location.path("/folders/" + this.folder.id);
    }
    $scope.createFolder = function () {
      var name;
      if (!(name = window.prompt("Folder Name", ""))) {
        alert("Folder name cannot be null"); return;
      }
      var params = {
        name: name,
        userId: User.getCurrentId(),
        parentId: 0
      };
      Folder.create(params, function () {
        $scope.getFolders();
      });
    }
    $scope.init = function () {
      $scope.getFolders();
    }
    $scope.init();

  });
