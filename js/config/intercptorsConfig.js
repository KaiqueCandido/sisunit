angular.module("starter").config(function ($httpProvider) {
  $httpProvider.interceptors.push("timestampInterceptor");
  $httpProvider.interceptors.push("responseInterceptors");
  $httpProvider.interceptors.push("loadingInterceptor");  
});
