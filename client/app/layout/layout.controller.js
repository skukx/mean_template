(function() {
  angular
    .module('app.layout')
    .controller('Layout', Layout);

  //////////////////////////

  Layout.$inject = ['config'];
  function Layout(config) {
    vm = this;
    vm.appTitle = config.appTitle

    activate();

    ///////////////////////////

    function activate() {}
  }
})();
