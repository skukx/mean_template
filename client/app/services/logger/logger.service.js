(function() {
  angular
    .module('app.services.logger')
    .factory('logger', logger);

  ////////////////////////////////

  logger.$inject = ['$log', 'toastr']
  function logger($log, toastr) {
    var service = {
      showToasts: true,
      info: info,
      success: success,
      warning: warning,
      error: error
    };

    return service;

    ///////////////////

    function info(message, data, title) {
      if (service.showToasts) {
        toastr.info(message, title);
      }

      $log.info('Info: ' + message, data);
    }

    function success(message, data, title) {
      if (service.showToasts) {
        toastr.success(message, title);
      }

      $log.info('Success: ' + message, data);
    }

    function warning(message, data, title) {
      if (service.showToasts) {
        toastr.warning(message, title);
      }

      $log.warn('Warning: ' + message, data);
    }

    function error(message, data, title) {
      if (service.showToasts) {
        toastr.error(message, title);
      }

      $log.error('Error: ' + message, data);
    }
  }
})();
