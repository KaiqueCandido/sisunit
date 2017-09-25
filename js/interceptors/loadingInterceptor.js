angular.module("starter").factory("loadingInterceptor", function ($q, $rootScope, $timeout) {
  return{
    request: function (config) {      
      return config;
    },
    requestError: function (rejection) {
      $rootScope.loading = false;
      return $q.reject(rejection);
    },
    response: function (response) {
      $rootScope.loading = false;
      return response;
    },
    responseError: function (rejection) {
      $rootScope.loading = false;
      return $q.reject(rejection);
    }
  };
});
