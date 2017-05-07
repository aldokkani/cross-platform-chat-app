angular.module('ChatApp').factory('User', function($http, $state, $q) {
  var def = $q.defer();
  return {
    login: function(userdata) {
      $http({
        url: "http://localhost:3000/api/login",
        method: 'POST',
        data: userdata
      }).then(function(res) {
        def.resolve(res.data)
      }, function(err) {
        return def.reject(err)

      })
      return def.promise;
    },
    signup: function(user) {
      $http({
        url: "http://localhost:3000/api/signup",
        method: 'POST',
        data: userdata
      }).then(function(res) {
        //  $location.url('/login');

        def.resolve(res.data)

      }, function(err) {
        return def.reject(err)

      })
      return def.promise;
    },
    checkunique: function(username) {
      $http({
        url: "http://localhost:3000/api/check-username",
        method: 'POST',
        data: username
      }).then(function(res) {
        //  $location.url('/login');
          def.resolve(res.data)
      }, function(err) {
        return def.reject(err)

      })
      return def.promise;
    }

  }
})
