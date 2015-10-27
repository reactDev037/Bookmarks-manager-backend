'use strict';

/**
 * @ngdoc overview
 * @name bookmarksApp
 * @description
 * # bookmarksApp
 *
 * Main module of the application.
 */
angular
  .module('bookmarksApp', [
    'ngResource',
    'ngRoute',
    'lbServices'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/folders', {
        templateUrl: 'views/folder.html',
        controller: 'FolderCtrl'
      })
      .when('/folders/:id', {
        templateUrl: 'views/folder-details.html',
        controller: 'FolderDetailsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
