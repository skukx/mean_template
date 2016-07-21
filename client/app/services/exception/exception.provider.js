(function() {
  angular
    .module('app.services.exception')
    .provider('exceptionHandler', exceptionHandler)
    .config(config);

  //////////////////////////

  function exceptionHandler() {
    this.config = {
      appErrorPrefix: undefined
    };

    this.configure = function(appErrorPrefix) {
      this.config.appErrorPrefix = appErrorPrefix;
    }

    this.$get = function() {
      return { config: this.config }
    }
  }

  config.$inject = ['$provide'];
  function config($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }

  extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger'];
  function extendExceptionHandler($delegate, exceptionHandler, logger) {
    return function(exception, cause) {
      var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
      var errorData = { exception: exception, cause: cause };

      exception.message = appErrorPrefix + exception.message;
      $delegate(exception, cause);

      logger.error(exception.message, errorData);
    }
  }
})();
