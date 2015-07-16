// this is kind of a gnarley way to bootstrap an angular app,
// but is kind of a necessary step when working with ionic 
// with this type of content

(function() {

var contentReq = null;
var eventsReq = null;
var allContent = {};

var loadingScreenDisplayWaitOver = false;
var countdown = window.setTimeout(function(){
  loadingScreenDisplayWaitOver = true;
}, 2000);

function fetchData() {
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");
    var $q = initInjector.get('$q');

    eventsReq = $http.get('http://student-rights.herokuapp.com/events');

    var cachedContent = null;
    try{
      cachedContent = window.localStorage.getItem('bsr-content');
    }catch(err){
      'local storage not supported'
    };

    if (cachedContent === null){
      return $http.get('http://student-rights.herokuapp.com/content').success(function(data, status){
        try{
          window.localStorage.setItem('bsr-content', JSON.stringify(data));
        }catch(err){
          console.log('local storage not supported');
          allContent = data;
        };
      });
    }else{
      contentReq = $http.get('http://student-rights.herokuapp.com/content');

      function defer() {
        return $q(function(resolve, reject) {
          resolve('success');
        });
      }
      return defer();
    };
};

function bootstrap(){
      angular.element(document).ready(function() {
        angular.bootstrap(document, ['readThis']);
    });
};

function bootstrapApplication() {
  if (loadingScreenDisplayWaitOver){
    bootstrap();
  }else{
    window.setTimeout(function(){
      bootstrap();
    }, 1500);
  }
};

angular.module('readThis', ['ionic', 'readThis.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function($http, $rootScope, $timeout){
  $rootScope.allContent = JSON.parse(window.localStorage.getItem('bsr-content')) || allContent;
  $rootScope.ngLoaded = true;
  if (contentReq != null){
    contentReq.success(function(data){
      $rootScope.allContent = data;
      try{
          window.localStorage.setItem('bsr-content', JSON.stringify(data));
        }catch(err){
          console.log('local storage not supported');
        };
    });
  };
  eventsReq.success(function(data){
    $rootScope.events = data;
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html"
      }
    }
  })

  .state('app.events', {
    url: "/events",
    views: {
      'menuContent': {
        templateUrl: "templates/events.html"
      }
    }
  })

  .state('app.item', {
    url: "/item/*itemLocation",
    views: {
      'menuContent': {
        templateUrl: "templates/item.html",
        controller: 'ItemCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

fetchData().then(bootstrapApplication);

}());


