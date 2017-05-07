angular.module('myApp').controller('ActiveUsers', function($scope, $rootScope, $state, $ionicLoading) {
  $scope.send = function() {
    socket.emit('getOnlineUsers');
  }
  socket.on('onlineUsers', function(users) {
    $timeout(function() {
      $scope.users = users;
    })

  })
});
