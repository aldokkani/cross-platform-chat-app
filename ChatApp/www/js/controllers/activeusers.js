angular.module('ChatApp').controller('activeusers', function($location, $scope, $rootScope, $timeout, $state){
    console.log("ActiveUsersCtrl");
    $scope.onlineUsers = [];
    var online = true;

    socket.emit('getOnlineUsers');
    socket.on('onlineUsers', function(users) {
        $timeout(function(){
            $scope.onlineUsers = users;
        })
    });

    // Apear offline feature
    $scope.offline = function() {
        if (online) {
            socket.emit('logout', $rootScope.user.username);
            online = false;
        } else {
            socket.emit('login', $rootScope.user.username);
            online = true;
        }
    }

    $scope.privateMsg = function(user){
        $rootScope.privateUser = user;
        $state.go('app.privatechat')
           
    }

});
