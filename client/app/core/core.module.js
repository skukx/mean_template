(function() {
  angular
    .module('app.core', [
      'ui.router',
      'ui.bootstrap',
      'toastr',

      'app.services.exception'
    ]);
})();
