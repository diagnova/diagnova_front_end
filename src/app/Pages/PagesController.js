(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('PagesController', PagesController);

     /** @ngInject */
    function PagesController(auth, instrument, $scope, $cookies, $timeout, $stateParams, $log,$rootScope) {
        var vm = this;
       $rootScope.hide_tabs = false;

        $scope.tabData   = [
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

        $scope.isCollapsed = false;

        $scope.user = auth.getUser();
        $scope.finished = false;
        vm.panelTitle = "";
        vm.page = 0;
        vm.pages = [];
        vm.today = new Date();
        vm.status = {
            opened: false
        };
        $scope.answers = {};
        $scope.properties = {
            nRespuestas: 0,
            progress: 0,
            nPreguntas: 89,
            total: 0,
            index: 0,
            s11:{check:0}
        };
        $scope.msgs = [""];
        $scope.sessions = {
            s1: {
                title: "diagnova",
                active: true,
                state: 0,
                questions: 4,
            },
            s2: {
                title: "diagnovate",
                state: 0,
                questions: 5,
            }
        };

   
        //Mensajes para pregunta answers.s3.p5
        $scope.order = {};
        $scope.order.checkResponse = [];
        $scope.order.setOrdersRes = function(ind) {
            var check = $scope.order.check[ind];
            if (check.elem) {
                $scope.properties.index -= 1;
                var index = $.inArray(check.text, $scope.order.checkResponse);
                $scope.order.checkResponse.splice(index, 1);

            } else {
                $scope.properties.index += 1;
                $scope.order.checkResponse.push(check.text);
            }
            $scope.order.message = $scope.msgs[$scope.properties.index];
            if ($scope.properties.index > 0) {
                if ($scope.properties.index === 3) {
                    $scope.answers.s3.p5 = $scope.order.checkResponse[0] + ", " + $scope.order.checkResponse[1] + ", " + $scope.order.checkResponse[2] + ", ";
                    $scope.order.message = "Su respuesta es: " + $scope.answers.s3.p5;
                }

            }
        };
        vm.tabActive = function() {
            return vm.pages.filter(function(pane) {
                return pane.active;
            })[0];
        };


        $scope.get_user_mail = function() {
            return $cookies.get("email");
        };

        function compare(a, b) {
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            return 0;
        }


        vm.pages = [{
                key: "s1",
                active: true
            }, {
                key: "s2",
                active: false
            }


        ];

        vm.open = function($event) {
            vm.status.opened = true;
        };
        vm.panelTitle = $scope.sessions.s1.title;
        vm.setTitle = function(title) {

            vm.panelTitle = title;

            $timeout(function(){$scope.refreshSlider();}, 100); 
             

        };

       $log.debug('cookies en Pages', $cookies);


    }
})();
