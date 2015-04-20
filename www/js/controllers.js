angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.content = [
    { 
      title: 'Things',
      type: 'list',
      id: 1,
      contentRefs: [2, 3, 4]
    },
    {
      title: 'Thing One',
      type: 'block',
      id: 2,
      content: '<p>here is the content for "thing one"</p>'
    },
    {
      title: 'Thing Two',
      type: 'block',
      id: 3,
      content: '<p>here is the content for "thing two"</p>'
    },
    {
      title: 'Thing Three',
      type: 'block',
      id: 4,
      content: '<p>here is the content for "thing three"</p>'
    }

  ];

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ItemCtrl', function($scope, $stateParams) {
  $scope.currentLocation = $stateParams.itemLocation;

  var traverse = function(object, path){
    if (path.length == 0){
      return object;
    }else{
      return traverse(object.content[path.shift()], path);
    }
  }
});





