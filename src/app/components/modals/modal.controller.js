(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .directive('modal', modalDirective)
        .controller('ModalAttrInstanceCtrl', ModalAttrInstanceCtrl);



    /** @ngInject */


    function modalDirective() {
        var directive = {
            restrict: 'A',
            link: linkFunc,
            controller: ModalController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }
    function linkFunc(scope, el, attr, vm) {
     el.on("click", function  () {
         scope.finish();
        vm.open(attr.template)
     })
    }


    /** @ngInject */
    function ModalController($modal, $scope) {
        var vm = this;
        vm.user_id = $scope.user_id;

       

        vm.open = function(template) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: template,
                controller: 'ModalAttrInstanceCtrl',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                user_id: function () {
                  return $scope.user_id;
                }
              }

            });

            modalInstance.result.then(function(selectedItem) {
                 
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });

        }


    }

    function ModalAttrInstanceCtrl($scope, $modalInstance, Restangular, user_id, $state) {
    var vm = this;
    vm.referrers = [{
        user_id: user_id,
        nombre: "",
        empresa: "",
        mail: "",
        tel: ""
    }];
    vm.add_referrer = function() {
        vm.referrers.push({
            user_id: user_id,
            nombre: "",
            empresa: "",
            mail: "",
            tel: ""
        });
    }

    $scope.ok = function() {
        console.log("referrer", vm.referrers)
        Restangular.all('referrers').post({
            referrers: vm.referrers
        });
        $state.go("pages.imiResult");
        $modalInstance.close();
        
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
        $state.go("pages.imiResult");
    };
}




})();
