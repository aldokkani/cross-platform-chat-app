angular.module('ChatApp').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('home', {
      cache: false,
      url: '',
      templateUrl: 'templates/home.html'

    })
    .state('signup', {
      cache: false,
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signup'


    })
    .state('login', {
      cache: false,
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'login'

    })
    .state('app', {
      cache: false,
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
        },
      },

    })

    .state('app.chat', {
      cache: false,
      url: '/chat',
      views: {
        "menuContent": {
          templateUrl: "templates/chat.html",
          controller: 'chat'
        }
      },
    })

    .state('app.privatechat', {
      cache: false,
      url: '/private-chat',
      views: {
        "menuContent": {
          templateUrl: "templates/chat.html",
          controller: 'privateChat'
        }
      },
    })

    .state('app.activeusers', {
      cache: false,
      url: '/activeusers',
      views: {
        "menuContent": {
          templateUrl: "templates/active-users.html",
          controller: 'activeusers'
        },
      }
    })
});
