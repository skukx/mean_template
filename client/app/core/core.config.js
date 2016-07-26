(function() {
  var core = angular.module('app.core');

  core.config(configureExceptions);
  core.run(onRun);

  //////////////////////////////////

  configureExceptions.$inject = ['$logProvider', 'exceptionHandlerProvider', 'appConfig'];
  function configureExceptions($logProvider, exceptionHandlerProvider, appConfig) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    exceptionHandlerProvider.configure(appConfig.appErrorPrefix);
  }

  onRun.$inject = ['$rootScope', 'logger', 'appConfig'];
  function onRun ($rootScope, logger, appConfig) {
    // $rootScope.base = envConfig.base;
    // $rootScope.title = config.appTitle;
    handleRoutingEvents()

    /////////////////////////

    // Configure Routing events
    function handleRoutingEvents() {
      $rootScope.$on('$stateChangeStart', stateChangeStart);
      $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
      $rootScope.$on('$stateChangeNotFound', stateChangeNotFound);
      $rootScope.$on('$stateChangeError', stateChangeError);

      ////////////////////////

      function stateChangeStart(event, toState, toParams, fromState, fromParams, options) {
        logger.info('State change start')
      }

      function stateChangeSuccess(event, toState, fromState, fromParams) {
        logger.info('State change success')

        // Set title tag
        toState.data = toState.data || {}
        if (toState.data.title) {
          $rootScope.title = appConfig.appTitle + ' - ' + toState.data.title;
        } else {
          $rootScope.title = appConfig.appTitle
        }
      }

      function stateChangeNotFound(event, unfoundState, fromState, fromParams) {
        logger.warning('State change not found')
      }

      function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
        logger.error('State change error', error)
      }
    }
  }
})();
