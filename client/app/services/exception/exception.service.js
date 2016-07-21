(function() {
  angular
    .module('app.services.exception')
    .factory('Exception', Exception);

  ///////////////////////////

  Exception.$inject = ['logger'];
  function Exception(logger) {
    var service = {
      catcher: catcher
    }

    return service;

    ////////////////////

    function catcher(message) {
      return function(reason) {
        logger.error(message, reason);
      }
    }
  }
})();
