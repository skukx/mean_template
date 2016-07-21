(function() {
  angular
    .module('app.services.router')
    .provider('stateHelper', StateHelperProvider);

  ///////////////////

  StateHelperProvider.$inject = [
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider'
  ];

  function StateHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    this.$get = StateHelper;

    ///////////////////////////////////

    StateHelper.$inject = [
      '$state'
    ];

    function StateHelper($state) {
      var hasOtherwise = false;

      var service = {
        configureStates: configureStates,
        getStates: getStates
      };

      return service;

      ///////////////////////////

      function configureStates(states, otherwisePath) {
        states.forEach(function(state) {
          $stateProvider.state(state.state, state.config);
        });

        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          //$urlRouterProvider.otherwise(otherwisePath);
        }
      }

      function getStates() {
        return $state.get();
      }
    }
  }
})();
