(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController( auth) {
      var vm = this;
      vm.navbarCollapsed = true;
       vm.tabData   = [
      {
        heading: 'diagnova',
        route:   'pages.diagnova',
        title: 'Diagnova'
      },
      {
        heading: 'diagnovate',
        route:   'pages.diagnovate',
        title: 'diagnovate'
      }
    ];

        vm.isLogged = function(){

          return auth.isLogged();

        };
        vm.logout = function(){
 
          auth.logout();

          
        };
      // "vm.creation" is avaible by directive option "bindToController: true"
      
    }
  }

})();
