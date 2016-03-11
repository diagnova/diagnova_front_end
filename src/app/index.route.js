(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('pages.imi', {
                url: '/imi',
                templateUrl: 'app/InstrumentoIMI/imi.html',
                controller: 'ImiController',
                controllerAs: 'imiCtrl',
                authenticate: true
            }).state('pages.imiResult', {
                url: '/imi/resultados',
                templateUrl: 'app/InstrumentoIMI/ImiResult.html',
                controller: 'ImiController',
                controllerAs: 'imiCtrl',
                authenticate: true
            }).state('pages', {
                url: '/diagnova_pages',
                templateUrl: 'app/Pages/diagnova.html',
                controller: 'PagesController',
                controllerAs: 'pageCtrl',
                authenticate: true
            }).state('pages.diagnova', {
                url: '/diagnova',
                templateUrl: 'app/Pages/nodes/diagnova.html',
                controller: 'PagesController',
                controllerAs: 'pageCtrl',
                authenticate: true
            }).state('pages.diagnovate', {
                url: '/diagnovate',
                templateUrl: 'app/Pages/nodes/diagnovate.html',
                controller: 'PagesController',
                controllerAs: 'pageCtrl',
                authenticate: true
            }).state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'


            })/*.state('test1', {
                url: '/test1',
                templateUrl: 'app/InstrumentosAux/test1.html',
                controller: 'LoginController',
                controllerAs: 'login'


            }).state('resultados_dashboard', {
                url: '/resultados',
                templateUrl: 'app/results/resultsDashboard.html'


            }).state('resultados', {
                url: '/resultados/:type',
                templateUrl: 'app/results/results.html',
                controller: 'ResultsController',
                controllerAs: 'restultsCtrl'


            }).state('detalle', {
                url: '/detalle/:id',
                templateUrl: 'app/InstrumentoICAI/icai.detalle.html',
                controller: 'IcaiController',
                controllerAs: 'icaiCtrl',


            }).state('resultados2', {
                url: '/resultados',
                templateUrl: 'app/results/results.html',
                controller: 'ResultsController',
                controllerAs: 'restultsCtrl'


            }).state('detalle2', {
                url: '/detalle2/:id',
                templateUrl: 'app/InstrumentoIMI/imi.detalle.html',
                controller: 'ImiController',
                controllerAs: 'imiCtrl',

            }).state('detalle3', {
                url: '/detalle3/:id',
                templateUrl: 'app/InstrumentoACAP/acap.detalle.html',
                controller: 'AcapController',
                controllerAs: 'acapCtrl',

            }).state('instrumento_aux1', {
                url: '/instrumentoAux1',
                templateUrl: 'app/InstrumentosAux/InstrumentoAux1/instrumentoAux1.html',
                controller: 'InstAux1Controller',
                controllerAs: 'vm',

            })*/.state('password_reset', {
                url: '/password/reset?:token',
                templateUrl: 'app/Password/resetPassword.html',
                controller: 'ResetPasswordController',
                controllerAs: 'vm',
                authenticate: false,
                resolve:{
                    user:  function(auth, $stateParams, $log){
                            return auth.getUserByToken($stateParams.token).then(setAnswersComplete, setAnswersFailed);
                            function setAnswersComplete(response) {
                                if (response.status == 200) {
                                    if (response.data.user.id != null) {
                                       return response.data.user;
                                    } else {
                                        return null;
                                    }

                                } else {
                                    return null;
                                }
                            }

                            function setAnswersFailed(error) {
                                $log.error('XHR Failed for setAnswers.\n' + angular.toJson(error.data, true));
                                return null;
                            }
                    },
                    token: function($stateParams){
                        return $stateParams.token;
                    }
                }


            });

        $urlRouterProvider.otherwise('/login');
    }

})();
