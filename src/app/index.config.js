(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, toastr,  $locationProvider,$validationProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('https://giepiloto.herokuapp.com/');
    //RestangularProvider.setBaseUrl('http://localhost:3002/');
    RestangularProvider.setFullResponse(true);
   delete $httpProvider.defaults.headers.common["X-Requested-With"];
    

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
  }

})();
