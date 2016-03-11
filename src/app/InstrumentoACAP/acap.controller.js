(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('AcapController', AcapController);

    /** @ngInject */
    function AcapController(auth, instrument, $scope, $cookies, $timeout, $stateParams, $log) {
        var vm = this;
        $scope.user = auth.getUser();
        $scope.finished = false;
        vm.panelTitle = "";
        vm.today = new Date();
        vm.status = {
            opened: false
        };
        $scope.answers = {};
        $scope.properties = {
            nRespuestas: 0,
            progress: 0,
            nPreguntas: 20,
            total: 0,
            index: 0,
        };
        $scope.msgs = [""];

  



        $scope.get_user_mail = function() {
            return $cookies.get("email");
        };


        vm.tabActive = function() {
            var result = null;
            angular.forEach($scope.sessions, function(session, key){
                if(session.active){
                    result = session;
                }
            });
            return result;
        };
        //modelo
        $scope.sessions = [
             {
                id:"s1",
                title: "Sección 1",
                url_name: "acap_s1",
                active: true,
                state: 0,
                questions: 19,
            },
            {
                id:"s2",
                title: "Sección 2",
                url_name: "acap_s2",
                active: false,
                state: 0,
                questions: 6,
            },{
                id:"s3",
                title: "Sección 3",
                url_name: "acap_s3",
                active: false,
                state: 0,
                questions: 4,
            },{
                id:"s4",
                title: "Sección 4",
                url_name: "acap_s4",
                active: false,
                state: 0,
                questions: 4,
            },{
                id:"s5",
                title: "Sección 5",
                url_name: "acap_s5",
                active: false,
                state: 0,
                questions: 4,
            },{
                id:"s6",
                title: "Sección 6",
                url_name: "acap_s6",
                active: false,
                state: 0,
                questions: 4,
            }
        ];


        vm.open = function($event) {
            vm.status.opened = true;
        };
        vm.panelTitle = $scope.sessions[0].title;
        vm.setTitle = function(title) {
        vm.panelTitle = title;

            $timeout(function(){$scope.refreshSlider();}, 100); 
             

        };





        function activate() {/*
            var props_watch = $scope.$watch(function() {
                return $scope.answers;
            }, function(newValues, oldValues, scope) {
                $scope.properties.nRespuestas = 0;
                $scope.properties.progress = 0;
                angular.forEach(newValues, function(snv, snk) {
                    $scope.sessions[snk].answered = 0;
                    angular.forEach(snv, function(pnv, pnk) {
                        if (pnv !== "" && typeof pnv !== "undefined") {
                            $scope.properties.nRespuestas += 1;
                            $scope.sessions[snk].answered += 1;
                        }
                    });
                    if ($scope.sessions[snk].questions === $scope.sessions[snk].answered) {
                        $scope.sessions[snk].state = 1;
                    } else {
                        $scope.sessions[snk].state = 0;
                    }
                    $scope.sessions[snk].unAnswered = $scope.sessions[snk].questions - $scope.sessions[snk].answered;
                });
                $scope.properties.progress = Math.floor(($scope.properties.nRespuestas / $scope.properties.nPreguntas * 100) - 40);
                if ((40 + $scope.properties.progress) >= 100) {
                    user.setAnswers($scope.user_id, $scope.answers);
                    props_watch();
                }
            }, true);
*/
       

        }

        $scope.isLastPage = function(){
            var active = vm.tabActive();
           // $log.debug("activo: ", active);
            var index = $.inArray(active, $scope.sessions);
           // $log.debug("index: ", index);
            return index == (Object.keys($scope.sessions).length-1)
        }
        vm.changePage = function(page) {
            var next_page =0;
            //obtener tab activ y el indice
            var active = vm.tabActive();
            var index = $.inArray(active, $scope.sessions);
            instrument.setAnswers("acap",$scope.user_id, $scope.answers);


            if (index === 0 && page === -1) {
                next_page = $scope.sessions.length - 1;
                $scope.sessions[next_page].active = true;
                vm.panelTitle = $scope.sessions[next_page].title;
                return true;
            }

            if (index === ($scope.sessions.length - 1) && page === 1) {
                next_page = 0;
                $scope.sessions[next_page].active = true;
                vm.panelTitle = $scope.sessions[next_page].title;
                return true;
            }

            next_page = index + page;
            $scope.sessions[next_page].active = true;
            vm.panelTitle = $scope.sessions[next_page].title;

            //actualizar en db

              
              //$timeout(function(){$scope.refreshSlider();}, 100); 
     
        };

        $scope.swal = function( title, msg){

            swal(title, msg);
        }
        $scope.refreshSlider = function () {
            $scope.$broadcast('refreshSlider');
        }

        $scope.finish = function () {
            $scope.finished = true;

             instrument.setAnswers("acap",$scope.user_id, $scope.answers);
        }



        //get response
        $scope.user_id = $cookies.get("user_id");
        $scope.user_consult=$stateParams.id;
        if($scope.user_consult !== "" && typeof($scope.user_consult)!=="undefined" ){
            $scope.user_id = $scope.user_consult;
        }


        instrument.getAnswers("acap", $scope.user_id).then(function(data) {

            //$scope.answers = data;
            if (!$.isEmptyObject(data) && data !== null && typeof(data.s1) != "undefined") {
                $scope.answers = data;

            }else{
                //props_watch();
            }

            console.log("recibido en chrarac controller: " ,$scope.answers);
            activate();


        });



    }
})();
