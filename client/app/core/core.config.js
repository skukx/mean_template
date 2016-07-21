(function() {
  var core = angular.module('app.core');
  var config = {
    appErrorPrefix: '[NG-Elasticsearch Error] ',
    appTitle: 'Deseretbook Elasticsearch Client',
    version: '1.0.0'
  }

  core.value('config', config);
  // core.config(configure);
  // core.run(onRun);

  //////////////////////////////////

  // Google Analytics
  // configure.$inject = ['AnalyticsProvider']
  // function configure(ga) {
  //   ga.setAccount('UA-1028489-20');
  // }

  // Uncomment when ngconfig is setup
  // onRun.$inject = ['$rootScope', 'EnvironmentConfig'];
  // function onRun ($rootScope, envConfig) {
  //   $rootScope.base = envConfig.base;
  //   $rootScope.title = config.appTitle;
  // }
})();
