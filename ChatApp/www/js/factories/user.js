angular.module('myApp').factory('User',function ($http,$state,$q) {
    var def=$q.defer();
  return{
    login:function(userdata) {
      $http({
        url:"http://localhost:3000/api/login",
        method:'POST',
        data:userdata
      }).then(function(res) {
      if(res.data.length){
          def.resolve({
                    "status": 1,
                    "msg": "loggedin successfully.",
                    "user": {
                        "fullname": "Bassant",
                        "username": "Bassnt"
                    }
                })
        }else {
          def.reject({"status":0})
        }
      },function(err){
      return  def.reject(err)

      })
      return def.promise;
    },
    signup:function(user) {
      $http({
        url:"http://localhost:3000/api/signup",
        method:'POST',
        data:userdata
      }).then(function(res) {
      //  $location.url('/login');
      if(res.data.length){
          def.resolve({
                  "status": 1,
                  "msg": "ay 7aga",
                  "user": {
                      "fullname": "bassant",
                      "username": "bassant"
                  }
              })
        }else {
          def.reject({"status":0})
        }
      },function(err){
      return  def.reject(err)

      })
      return def.promise;
    },
    checkunique:function(username) {
      $http({
        url:"http://localhost:3000/api/check-username",
        method:'POST',
        data:username
      }).then(function(res) {
      //  $location.url('/login');
      if(res.data.length){
          def.resolve({
                  "status": 1
              })
        }else {
          def.reject({"status":0})
        }
      },function(err){
      return  def.reject(err)

      })
      return def.promise;
    }

  }
    })
