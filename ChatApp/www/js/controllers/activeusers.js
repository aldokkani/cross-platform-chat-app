angular.module('ChatApp').controller('activeusers', function($scope, $timeout, $state){
    console.log("ActiveUsersCtrl");
    $scope.onlineUsers = [];

    socket.emit('getOnlineUsers');
    socket.on('onlineUsers', function(users) {
        $timeout(function(){
            $scope.onlineUsers = users;
        })
    });
});
