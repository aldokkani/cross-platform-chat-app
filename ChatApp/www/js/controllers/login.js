angular.module('ChatApp').controller('login', function($scope, $state, User, $ionicPopup) {
  $scope.user = {};

  $scope.login = function(valid) {
    if (valid) {

      User.login($scope.user).then(function(data) {

        if (data.status == 1) {
            console.log(data);
            if ($scope.user.check) {
              localStorage.setItem('user', JSON.stringify({
                "check": 1,
                "fullname": data.user.fullname,
                "username": data.user.username
              }));
            } else {
              localStorage.setItem('user', JSON.stringify({
                "check": 0,
                "fullname": data.user.fullname,
                "username": data.user.username
              }));
            }
            socket.emit("login", $scope.user.username);
          $state.go('app.activeusers');
        } else {
            // $scope.usernotfound = true;
          $ionicPopup.show({
            template: "Invalid username or password",
            title: 'Error',
            subTitle: 'Please Enter valid username or password ',
            scope: $scope,
            buttons: [{
              text: '<b>Ok</b>',
              type: 'button-positive',
              onTap: function() {
                $state.go('login')

              }

            }]
          });
        console.log("");
        }


      })

    }

  }
})
