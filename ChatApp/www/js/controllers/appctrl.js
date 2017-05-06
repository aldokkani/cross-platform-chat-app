angular.module('myApp').controller('AppCtrl', function($scope, $rootScope, $state , $ionicLoading){
    $scope.user = {}
    
    console.log('heres')
    $scope.logout = function() {
        localStorage.clear()
        $state.go('app.activeusers')
    }
});
