(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('IcaiController', IcaiController);
   

    /** @ngInject */
    function IcaiController(auth, instrument, $scope, $cookies, $timeout, $stateParams, $log) {
        var vm = this;

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
                title: "Identificación de la Empresa",
                active: true,
                state: 0,
                questions: 4,
            },
            s2: {
                title: "Datos del Informante",
                state: 0,
                questions: 5,
            },
            s3: {
                title: "Características Básicas de la Empresa",
                active: false,
                state: 0,
                questions: 6,

            },
            s4: {
                title: "Innovación de Producto",
                state: 0,
                questions: 4,

            },
            s5: {
                title: "Innovación en Procesos",
                state: 0,
                questions: 3,

            },
            s6: {
                title: "Innovación Organizacional",
                state: 0,
                questions: 3,

            },
            s7: {
                title: "Innovación en Marketing",
                state: 0,
                questions: 4,

            },
            s8: {
                title: "Actividades de Innovación",
                state: 0,
                questions: 10,

            },
            s9: {
                title: "Objetivos y Efectos",
                state: 0,
                questions: 14,

            },
            s10: {
                title: "Obstáculos a la Innovación",
                state: 0,
                questions: 12,

            },
            s11: {
                title: "Actividad Relacional",
                state: 0,
                questions: 24

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
            }, {
                key: "s3",
                active: false
            }, {
                key: "s4",
                active: false
            }, {
                key: "s5",
                active: false
            }, {
                key: "s6",
                active: false
            }, {
                key: "s7",
                active: false
            }, {
                key: "s8",
                active: false
            }, {
                key: "s9",
                active: false
            }, {
                key: "s10",
                active: false
            }, {
                key: "s11",
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

        vm.changePage = function(page) {
            //obtener tab activ y el indice
            var active = vm.tabActive();
            var index = $.inArray(active, vm.pages);
            instrument.setAnswers("icai",$scope.user_id, $scope.answers);


            if (index === 0 && page === -1) {
                vm.page = vm.pages.length - 1;
                vm.pages[vm.page].active = true;
                vm.panelTitle = $scope.sessions[vm.pages[vm.page].key].title;
                return true;
            }

            if (index === (vm.pages.length - 1) && page === 1) {
                vm.page = 0;
                vm.pages[vm.page].active = true;
                vm.panelTitle = $scope.sessions[vm.pages[vm.page].key].title;
                return true;
            }

            vm.page = index + page;
            vm.pages[vm.page].active = true;
            vm.panelTitle = $scope.sessions[vm.pages[vm.page].key].title;

            //actualizar en db

              
              $timeout(function(){$scope.refreshSlider();}, 100); 
     
        };




        function activate() {
            if ($scope.answers.s3.p5 === "") {
                $scope.properties.index = 0;
                $scope.order.check = [{
                    enable: false,
                    text: "Local",
                    elem: false,
                }, {
                    enable: false,
                    text: "Nacional",
                    elem: false,
                }, {
                    enable: false,
                    text: "Intenacional",
                    elem: false,
                }];
            } else {
                $scope.properties.index = 3;
                $scope.order.check = [{
                    enable: true,
                    text: "Local",
                    elem: true,
                }, {
                    enable: true,
                    text: "Nacional",
                    elem: true,
                }, {
                    enable: true,
                    text: "Intenacional",
                    elem: true,
                }];
            }

            $scope.msgs = [
                "Elija el primer más importante",
                "Elija el segundo más importante",
                "Elija el tercer más importante",
                $scope.answers.s3.p5
            ];

            $scope.order.message = $scope.msgs[$scope.properties.index];

            var props_watch = $scope.$watch(function() {
                return $scope.answers;
            }, function(newValues, oldValues, scope) {
                $scope.properties.nRespuestas = 0;
                $scope.properties.progress = 0;
                angular.forEach(newValues, function(snv, snk) {
                    $scope.sessions[snk].answered = 0;
                    angular.forEach(snv, function(pnv, pnk) {
                        if (pnv != "" && typeof pnv != "undefined") {
                            $scope.properties.nRespuestas += 1;
                            $scope.sessions[snk].answered += 1;
                        }
                    });
                    if ($scope.sessions[snk].questions == $scope.sessions[snk].answered) {
                        $scope.sessions[snk].state = 1;
                    } else {
                        $scope.sessions[snk].state = 0;
                    }
                    $scope.sessions[snk].unAnswered = $scope.sessions[snk].questions - $scope.sessions[snk].answered;
                });
                $scope.properties.progress = Math.floor(($scope.properties.nRespuestas / $scope.properties.nPreguntas * 100) - 40);
                if ((40 + $scope.properties.progress) >= 100) {
                   // instrument.setAnswers($scope.user_id, $scope.answers);
                    props_watch();
                }
            }, true);

       
$log.debug("salio de a icai active", $cookies);
        }

        $scope.isLastPage = function(){
            var active = vm.tabActive();
            var index = $.inArray(active, vm.pages);
            return index === (Object.keys(vm.pages).length-1);
        };

        $scope.swal = function( title, msg, type){

            swal(title, msg, type);
        };
        $scope.input_field = "s";

        $scope.refreshSlider = function () {
            $scope.$broadcast('refreshSlider');
        };

        $scope.finish = function () {
            $scope.finished = true;

             instrument.setAnswers("icai",$scope.user_id, $scope.answers);
        };



        //get response
        $scope.user_id = $cookies.user_id;
        $scope.user_consult=$stateParams.id;
        if($scope.user_consult !== "" && typeof($scope.user_consult)!=="undefined" ){
            $scope.user_id = $scope.user_consult;
        }
        instrument.getAnswers("icai", $scope.user_id).then(function(data) {

            //$scope.answers = data;
            if (!$.isEmptyObject(data) && data != null && typeof(data.s1) != "undefined") {
                $scope.answers = data;
                 $log.debug("despues de obtener answers  ", $cookies);

            }else{
                //props_watch();
            }

            console.log("recibido en chrarac controller: " + $scope.answers);
            $log.debug("antes de active  ", $cookies);

            activate();


        });

$log.debug("fin de icai ", $cookies);

    }
})();
