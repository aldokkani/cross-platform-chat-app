angular.module('ChatApp').controller('AppCtrl', function($scope, $rootScope, $state , $ionicLoading){

    socket.emit('getOnlineUsers');

    socket.on('onlineUsers', function(users) {
        $timeout(function(){
            $scope.onlineUsers = users;
        })
    });

    socket.on('message', function(){
        
    });

    console.log('heres')
    $scope.logout = function() {
        localStorage.clear()
        $state.go('app.activeusers')
    }
});
