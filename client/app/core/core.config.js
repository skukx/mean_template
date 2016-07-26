(function() {
  var core = angular.module('app.core');

  core.config(configureExceptions);

  //////////////////////////////////

  configureExceptions.$inject = ['$logProvider', 'exceptionHandlerProvider', 'appConfig'];
  function configureExceptions($logProvider, exceptionHandlerProvider, appConfig) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    exceptionHandlerProvider.configure(appConfig.appErrorPrefix);
  }
})();
