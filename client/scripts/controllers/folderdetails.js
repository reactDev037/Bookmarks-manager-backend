'use strict';

/**
 * @ngdoc function
 * @name bookmarksApp.controller:FolderDetailsCtrl
 * @description
 * # FolderDetailsCtrl
 * Controller of the bookmarksApp
 */
angular.module('bookmarksApp')
  .controller('FolderDetailsCtrl', function ($scope, $routeParams, $location, Folder, Bookmark, User) {
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
      var name;
      name = window.prompt("Folder Name", "");
      if ( name === null ) return;
      if (!name) {
        alert("Folder name cannot be null"); return;
      }
      var params = {
        name: name,
        "parentId": this.folder.id,
        userId: User.getCurrentId()
      };
      Folder.create(params, function () {
        $scope.getFolder();
      });
    }
    $scope.createBookmark = function () {

      //      console.log( this.folder.bookmarks.create() );return;
      var title;
      var url;
      title = window.prompt("Bookmark Title", "");
      if ( title === null ) return;
      if ( !title ) {
        alert("Title cannot be null"); return;
      }
      url = window.prompt("Bookmark Url", "");
      if ( url === null ) return;
      if ( !url ) {
        alert("Url cannot be null"); return;
      }
      var params = {
        title: title,
        url: url,
        folderId: this.folder.id
      };
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
    $scope.deleteFolder = function(){
      var params = { id : this.folder.id };
      Folder.removeById( params, function(){
        $scope.getFolder();
      })
    }

    $scope.editFolder = function(){
      var name;
      name = window.prompt("Folder Name", this.folder.name );
      if ( name === null ) return;
      if (!name) {
        alert("Folder name cannot be null"); return;
      }
      var params = {
        where : {
          id : this.folder.id
        }
      }
      var postData = {
        name: name
      };
      Folder.update( params, postData, function(){
        $scope.getFolder();
      });
    }


    $scope.deleteBookmark = function(){
      //console.log( this );
      var params = { id : this.bookmark.id };
      //console.log ( params );
      Bookmark.removeById( params,function(){
        $scope.getFolder();
      })
    }

    $scope.editBookmark = function(){
      var title;
      var url;
      title = window.prompt("Bookmark Title", this.bookmark.title);
      if ( title === null ) return;
      if ( !title ) {
        alert("Title cannot be null"); return;
      }
      url = window.prompt("Bookmark Url", this.bookmark.url);
      if ( url === null ) return;
      if ( !url ) {
        alert("Url cannot be null"); return;
      }

      var params = {
        where : {
          id : this.bookmark.id
        }
      };
      var postData = {
        title: title,
        url : url
      }
      Bookmark.update ( params , postData , function(res){
        //success
        $scope.getFolder();
      });
    }
    $scope.init = function () {
      $scope.getFolder();
    }
    $scope.init();

  });
