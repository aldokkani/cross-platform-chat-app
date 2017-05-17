angular.module('ChatApp').factory('User', function($http, $state, $q) {
  return {
    login: function(userdata) {
        var def = $q.defer();
      $http({
        "url": "http://172.16.2.235:3000/api/login",
        "method": 'POST',
        "data": userdata
      }).then(function(res) {
        console.log(res);

        def.resolve(res.data)
      }, function(err) {
        return def.reject(err)

      })
      return def.promise;
    },
    signup: function(user) {
        var def = $q.defer();

      $http({
        url: "http://172.16.2.235:3000/api/signup",
        method: 'POST',
        data: user
      }).then(function(res) {
        //  $location.url('/login');
        console.log(res);
        def.resolve(res.data)

      }, function(err) {
        console.log(err);
        return def.reject(err)

      })
      return def.promise;
    },
    checkunique: function(username) {
        var def = $q.defer();

      $http({
        url: "http://172.16.2.235:3000/api/checkusername",
        method: 'POST',
        data: {
          "username": username
        }
      }).then(function(res) {
        //  $location.url('/login');
        console.log(res);
        def.resolve(res.data)
      }, function(err) {
        console.log(err);
        return def.reject(err)

      })
      return def.promise;
    }

  }
})
