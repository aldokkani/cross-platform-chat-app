// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var socket = io("http://localhost:3000");

angular.module('ChatApp', ['ionic']) //###, 'starter.controllers'])

  .run(function($ionicPlatform, $state, $location) {

    var data = JSON.parse(localStorage.getItem('user'));
    console.log("app.js");
    if (data && data.check == 1) {
      //   $state.go('app.activeusers');
      socket.emit("login", data.username);
      $location.url('/app/activeusers');
    }

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
          var date= new Date();

        cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Push Notification",
        text: "Hello Eng Peter :D ",
        at:date,

        data: { meetingId:"123#fg8" }
        });
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

    });
  })
