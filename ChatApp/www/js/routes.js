angular.module('myApp').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

.state('home',{
 url:'/home',
 templateUrl:'templates/home.html'

})
.state('signup',{
 url:'/signup',
 templateUrl:'templates/signup.html',
 controller:'signup'


})
.state('login',{
 url:'/login',
 templateUrl:'templates/login.html',
 controller:'login'

})
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
