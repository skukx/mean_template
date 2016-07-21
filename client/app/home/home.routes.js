(function() {
  angular
    .module('app.home')
    .run(appRun);

  ///////////////////////////

  appRun.$inject = ['stateHelper'];

  function appRun(stateHelper) {
    stateHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home',
        config: {
          templateUrl: 'app/home/home.html',
          controller: 'Home',
          controllerAs: 'vm',
          url: ''
        }
      }
    ]
  }
})();
