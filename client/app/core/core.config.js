(function() {
  var core = angular.module('app.core');
  var config = {
    appErrorPrefix: '[NG-App Error] ',
    appTitle: 'Deseretbook Elasticsearch Client',
    version: '1.0.0'
  }

  core.value('config', config);
  //core.config(configureToastr);
  core.config(configureExceptions);
  core.run(onRun);

  //////////////////////////////////

  // configureToastr.$inject ['toastrConfig'];
  // function configureToastr(toastrConfig) {
  //   angular
  //     .extend(toastrConfig, {
  //       autoDismiss: true,
  //       positionClass: 'toast-bottom-right'
  //     });
  // }

  configureExceptions.$inject = ['$logProvider'];
  function configureExceptions($logProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    // exceptionHandlerProvider.configure(config.appErrorPrefix);
  }

  onRun.$inject = ['$rootScope', 'logger'];
  function onRun ($rootScope, logger) {
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
