angular.module("starter").factory("timestampInterceptor", function () {
  return{
    request: function (config) {
      var url = config.url;
      if (url.indexOf('templates') > -1) return config;      
      return config;
    }
  };
});
