angular.module('ChatApp').controller('AppCtrl', function($scope, $rootScope, $timeout, $state, $window){
    console.log('AppCtrl');
    var localuser =  JSON.parse(localStorage.getItem("user"));
    $rootScope.user = localuser;

    $scope.logout = function() {
        localStorage.clear()
        socket.emit('logout', localuser.username);
        $state.go('home');
    }

    // $window.onbeforeunload = function() {
    //     localStorage.clear()
    //     socket.emit('logout', localuser.username);
    // };

});
