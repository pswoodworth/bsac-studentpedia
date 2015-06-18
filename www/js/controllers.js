angular.module('readThis.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/disclaimer.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    if (window.localStorage.getItem('bsr-modal-dismissed') === null){
      $scope.modal.show();
    };
  });

  $scope.dismissDisclaimer = function(){
    $scope.modal.hide();
    try{
      window.localStorage.setItem('bsr-modal-dismissed', true);
    }catch(err){
      console.log('local storage not supported.')
    }
  };

  $scope.iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );

  $scope.webclip = window.navigator.standalone;

})

.controller('ItemCtrl', function($scope, $stateParams) {
  $scope.currentLocation = $stateParams.itemLocation;

  var traverse = function(object, path){
    if (path.length == 0){
      return object;
    }else{
      return traverse(object.content[path.shift()], path);
    }
  };

  var getPath = function(){
    return $stateParams.itemLocation.split('/');
  };

  $scope.item = traverse($scope.allContent, getPath());


})

.controller('HomeCtrl', function($scope, $stateParams) {
  $scope.getMoment = function(date){
    return moment(date).format("dddd, MMMM Do [at] h:mm");
  }
})

.directive('ngBindHtmlUnsafe', function($sce){
    return {
        scope: {
            ngBindHtmlUnsafe: '=',
        },
        template: "<div ng-bind-html='trustedHtml'></div>",
        link: function($scope, iElm, iAttrs, controller) {
            $scope.updateView = function() {
                $scope.trustedHtml = $sce.trustAsHtml($scope.ngBindHtmlUnsafe);
            }

            $scope.$watch('ngBindHtmlUnsafe', function(newVal, oldVal) {
                $scope.updateView(newVal);
            });
        }
    };
});






