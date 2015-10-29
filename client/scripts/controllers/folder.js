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
      name = window.prompt("Folder Name", "");
      if (name === null) return;
      if (!name) {
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
    $scope.editFolder = function () {
      var name;
      name = window.prompt("Folder Name", this.folder.name);
      if (name === null) return;
      if (!name) {
        alert("Folder name cannot be null"); return;
      }
      var params = {
        where: {
          id: this.folder.id
        }
      }
      var postData = {
        name: name
      };
      Folder.update(params, postData, function () {
        $scope.getFolders();
      });
    }
    $scope.deleteFolder = function(){
      var params = { id : this.folder.id };
      Folder.removeById( params, function(){
        $scope.getFolders();
      })
    }

    $scope.init = function () {
      $scope.getFolders();
    }
    $scope.init();

  });
