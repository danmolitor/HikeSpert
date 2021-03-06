

angular.module('hikexpert.services', ['ionic'])

.factory('Home', function($http){

   var baseUrl = 'http://localhost:8100';

  var getCoords = function(userInfo){
    return $http({
      method: 'POST',
      url: '/api/coords',
      data: userInfo
    }).then(function(resp){
      return resp.data;
    });
  };

  var getUser = function(){
    return $http({
      method: 'GET',
      url: '/getUser'
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  // Puts trails in hasDone or wantToDo arrays, based on the url endpoint used
  var trailPost = function (trailName, url) {
    var trailObj = {
      trailName : trailName
    };
    return $http({
      method: 'POST',
      url : url,
      data : trailObj
    });
  };

  return {
    trailPost : trailPost,
    getUser : getUser,
    getCoords : getCoords
  };
})

.factory('Auth', function($http, $location, $window) {

  var baseUrl = 'http://localhost:8100';
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function(resp) {
      console.log(resp.data.token + " is response token");
      return resp.data.token;
    });
  };

  var signup = function(user) {
    console.log(user);
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function(resp) {
      return resp.data.token;
    });
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem('com.hikexpert');
  };

  var signout = function() {
    $window.localStorage.removeItem('com.hikexpert');
    $location.path('/signin');
  };

  return {
    signin : signin,
    signup : signup,
    isAuth : isAuth,
    signout : signout
  };
});