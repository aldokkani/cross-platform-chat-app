angular.module('ChatApp').controller('chat', function($scope, $timeout, $state){
    console.log("Chat Ctl");
    $scope.message = {};
    var localuser =  JSON.parse(localStorage.getItem("user"));
    socket.emit('getAllmessages');
    socket.on('message', function(msgs){
        $timeout(function(){
            $scope.messagesArr = msgs;
        })
    });

    $scope.sendMessage = function() {
        if ($scope.message.body) {
            socket.emit('message', {"message": $scope.message.body, "username": localuser.username});
        }
    }

});
