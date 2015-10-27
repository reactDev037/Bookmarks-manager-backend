'use strict';

/**
 * @ngdoc function
 * @name bookmarksApp.controller:FolderCtrl
 * @description
 * # FolderCtrl
 * Controller of the bookmarksApp
 */
angular.module('bookmarksApp')
  .controller('FolderCtrl', function ($scope,$location,  Folder) {
   //------------------------------------
    //folders related
    //------------------------------------
    //varaibles
    $scope.folders ={};
    //functionality
    $scope.populateFolders = function () {
      Folder.tree({}, {}, function (res) {
        console.log(res);
         $scope.folders = res.folders;
      });
    }
    $scope.folderNav = function(){
      $location.path("/folders/"+this.folder.id);
    }
    $scope.init = function(){
      $scope.populateFolders();
    }
    $scope.init();

  });
