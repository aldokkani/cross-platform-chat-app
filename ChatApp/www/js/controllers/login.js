angular.module('ChatApp').controller('login',function($scope,$state,User,$ionicPopup) {
  $scope.user={};

  $scope.login=function(valid){
    if(valid){
      console.log($scope.user.username);

  User.login($scope.user).then(function(data){
    if($scope.user.check){
      localStorage.setItem('user',JSON.stringify({"check":1,"username":data.user.fullname}));
    }else{
        localStorage.setItem('user',JSON.stringify({"check":0,"username":data.user.fullname}));
    }
  console.log(data.status);
  console.log(data.msg);
  console.log(data.user.fullname);
  if(data.status==1){
    $state.go('home');
  }else{
    $ionicPopup.show({
template: "Invalid username or password",
title: 'Error',
subTitle: 'Please Enter valid username or password ',
scope: $scope,
buttons: [
{
text: '<b>Ok</b>',
type: 'button-positive',
onTap: function() {
 $state.go('home')

 }

}
]
});
  }


  })

    }

         }
})
