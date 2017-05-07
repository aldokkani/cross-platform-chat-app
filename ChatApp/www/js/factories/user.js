angular.module('ChatApp').factory('User',function ($http,$state,$q) {
    var def=$q.defer();
  return{
    login:function() {
      $http({
        url:"http://test.w34.co/json/",
        method:'GET'
      }).then(function(res) {
      //  $location.url('/login');
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
    signup:function() {
      $http({
        url:"http://test.w34.co/json/",
        method:'GET'
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
    checkunique:function() {
      $http({
        url:"http://test.w34.co/json/",
        method:'GET'
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
