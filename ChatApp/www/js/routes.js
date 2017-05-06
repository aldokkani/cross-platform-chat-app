angular.module('myApp').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.about', {
        url: '/about',
        views: {
            "menuContent": {
                templateUrl: "templates/about.html",
            }
        },

    })

    .state('app.chat', {
        url: '/chat',
        views: {
            "menuContent": {
                templateUrl: "templates/chat.html",
            }
        },
    })

    .state('app.activeusers', {
        url: '/activeusers',
        views: {
            "menuContent": {
                templateUrl: "templates/active-users.html",
            },
        controller: 'ActiveUsers'
        }
    })
});
