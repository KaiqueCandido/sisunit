angular.module("starter").factory("responseInterceptors", function () {
  return{
    response: function (response) {      
      return response;
    }
  };
});
