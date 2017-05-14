angular.module('ChatApp').controller('privateChat', function($rootScope, $scope, $timeout, $state){
    console.log("Chat Ctl");
    $scope.message = {};
    var localuser =  JSON.parse(localStorage.getItem("user"));
    $scope.specificUser =$rootScope.privateUser
    socket.emit('getAllPrivateMsgs' , {"user1": localuser.username, "user2": $scope.specificUser } );
    socket.on('privateMessage', function(msgs){
        $timeout(function(){
            $scope.messagesArr = msgs;
        })
    });

    $scope.sendMessage = function() {
        if ($scope.message.body) {
            socket.emit('privateMessage', {"message": $scope.message.body, "user1": localuser.username ,"user2": $scope.specificUser});
        }
    }

});
