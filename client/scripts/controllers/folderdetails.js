'use strict';

/**
 * @ngdoc function
 * @name bookmarksApp.controller:FolderDetailsCtrl
 * @description
 * # FolderDetailsCtrl
 * Controller of the bookmarksApp
 */
angular.module('bookmarksApp')
  .controller('FolderDetailsCtrl', function ($scope, $routeParams, $location, Folder, Bookmark) {
    //------------------------------------
    //folders related
    //------------------------------------
    //varaibles
    $scope.folder = {};
    //functionality
    $scope.folderNav = function () {
      $location.path("/folders/" + this.folder.id);
    }

    $scope.getFolder = function () {
      if (!$routeParams.id) return;
      Folder.findById({
        filter: {
          include: ["parentFolders", "childFolders", "bookmarks"]
        },
        id: $routeParams.id

      }, function (res) {
        console.log(res);
        $scope.folder = res;
      },
        function (res) {//error handling?
          console.log(res.data.error.message)
          $scope.folder = {};
        });
    }

    $scope.createFolder = function () {

      //      console.log( this.folder.bookmarks.create() );return;
      var title;
      var url;
      if (!(title = window.prompt("Bookmark Title", ""))) {
        alert("Title cannot be null"); return;
      }
      if (!(url = window.prompt("Bookmark Url", ""))) {
        alert("Url cannot be null"); return;
      }
      //console.log( title, url ,this.folder.id );
      var params = { title: title, url: url, "folderId": this.folder.id };
      Bookmark.create(params,
        function (res) {
          $scope.getFolder();
          //console.log(res);
        })

      // Folder.findById({
      //   id : this.folder.id
      // }, function(res){
      //   console.log(res)
      //   res.bookmarks.create(params,function(res2){
      //     console.log(res2)
      //   })
      //   //res.bookmarks.create({}{})
      // })

      // this.folder.bookmarks.create({ title : title, url:url }, function(res){
      //   console.log(res);
      // })

    }

    $scope.init = function () {
      $scope.getFolder();
    }
    $scope.init();

  });
