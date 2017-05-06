angular.module('myApp').controller('signup',function($scope,$state,User,$ionicPopup) {
  $scope.user={};
  $scope.signup=function(valid){
    valid=valid?valid&&($scope.user.password==$scope.user.confirmpassword):false;
// User.checkunique.then(function($scope.user.y){
//
//
// })
    if(valid){
        // if($scope.user['password'].length < 6){
        //   $scope.errorLength=true;
        //
        //
        // }
        User.signup().then(function(data){
      console.log(data.status);
      console.log(data.msg);
      console.log(data.user.fullname);
      if(data.status==1){
        $state.go('home');
      }else{
        $ionicPopup.show({
template: "can't register try again later",
title: 'Error',
subTitle: 'please try again',
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
        // console.log($scope.user);
        // $state.go('home');
    // if(valid){
    // console.log($scope.user);
    //         // localStorage.setItem('user',$scope.user)
    //         //  $state.go('login')
    //       }
         }
       }
})
