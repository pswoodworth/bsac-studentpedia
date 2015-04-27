angular.module('readThis.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


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






