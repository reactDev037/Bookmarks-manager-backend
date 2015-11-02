'use strict';

angular.module('bookmarksApp')
  .controller('RegisterCtrl', function ($scope, $uibModal, $uibModalInstance,$rootScope, $location, User ){
  	$scope.user = {};
  	$scope.user.username = "";
  	$scope.user.password = "";
  	$scope.showError = false;
  	$scope.registerOk = function(button){
      User.create(
      	$scope.user,
      	function(res){
      		//success
      		if ( res.id ){
      			User.login( $scope.user,function(res){
      				$location.path('/');
      				$rootScope.$emit('loginEvent', 'succesful login');
      				$uibModalInstance.close()
      			})
      		}
      		
      	},
      	function (res){
      		$scope.showError = true;
      		$scope.error_msg = res.data.error.message;
      	}
      );
    }
    $scope.RegisterCancel = function(){
      $uibModalInstance.close()
    }
  });