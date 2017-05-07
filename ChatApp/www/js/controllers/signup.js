angular.module('ChatApp').controller('signup', function($scope, $state, User, $ionicPopup) {
  $scope.user = {};
  $scope.signup = function(valid) {
    valid = valid ? valid && ($scope.user.password == $scope.user.confirmpassword) : false;
    if (valid) {
      User.checkunique($scope.user.username).then(function(username) {
        if (username.status == 1) {
          User.signup($scope.user).then(function(data) {
            if (data.status == 1) {
              $state.go('app.activeusers');
            } else {
              $ionicPopup.show({
                template: "can't register try again later",
                title: 'Error',
                subTitle: 'please try again',
                scope: $scope,
                buttons: [{
                  text: '<b>Ok</b>',
                  type: 'button-positive',
                  onTap: function() {
                    $state.go('home')

                  }

                }]
              });
            }


          })
        } else {
          $ionicPopup.show({
            template: "username already exist",
            title: 'Error',
            subTitle: 'please enter another username',
            scope: $scope,
            buttons: [{
              text: '<b>Ok</b>',
              type: 'button-positive',
              onTap: function() {
                $state.go('home')

              }

            }]
          });

        }

      })

    }
  }
})
