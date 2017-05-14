angular.module('ChatApp').controller('signup', function($scope, $state, User, $ionicPopup) {
  $scope.user = {};
  console.log("singupctr");
  $scope.signup = function(valid){
      $scope.usernameIsUnique = false;

      if (valid) {
          User.checkunique($scope.user.username).then(function(username) {
              console.log(username);
              if (username.status) {
                  User.signup($scope.user).then(function(success) {
                      if (success.status) {
                          socket.emit("login", $scope.user.username);
                          localStorage.setItem('user', JSON.stringify({
                            "check": 0,
                            "fullname": $scope.user.firstname+" "+$scope.user.lastname,
                            "username": $scope.user.username
                          }));
                          $state.go('app.activeusers');
                      } else {
                          $ionicPopup.show({
                            template: "Server error please try again later",
                            title: 'Error',
                            subTitle: '',
                            scope: $scope,
                            buttons: [{
                              text: '<b>Ok</b>',
                              type: 'button-positive',
                              onTap: function() {
                                $state.go('signup')

                              }

                            }]
                          });
                      }
                  }, function(err) {
                      $ionicPopup.show({
                        template: "Server error please try again later",
                        title: 'Error',
                        subTitle: '',
                        scope: $scope,
                        buttons: [{
                          text: '<b>Ok</b>',
                          type: 'button-positive',
                          onTap: function() {
                            $state.go('signup')

                          }

                        }]
                      });
                  })
              } else {
                  $scope.usernameIsUnique = true;
              }
          }, function(err) {
              console.log(err);
              $ionicPopup.show({
                template: "Server error please try again later",
                title: 'Error',
                subTitle: '',
                scope: $scope,
                buttons: [{
                  text: '<b>Ok</b>',
                  type: 'button-positive',
                  onTap: function() {
                    $state.go('signup')

                  }

                }]
              });

          });
      }
  }


// $ionicPopup.show({
//   template: "username already exist",
//   title: 'Error',
//   subTitle: 'please enter another username',
//   scope: $scope,
//   buttons: [{
//     text: '<b>Ok</b>',
//     type: 'button-positive',
//     onTap: function() {
//       $state.go('home')
//
//     }
//
//   }]
});
