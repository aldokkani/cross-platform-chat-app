angular.module('ChatApp').controller('AppCtrl', function($scope, $timeout, $state){
    console.log('AppCtrl');
    var localuser =  JSON.parse(localStorage.getItem("user"));

    $scope.logout = function() {
        localStorage.clear()
        socket.emit('logout', localuser.username);
        $state.go('home');
    }

});
