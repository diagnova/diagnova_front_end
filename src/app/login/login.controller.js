(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('LoginController', LoginController);

    /** @ngInject */

    function LoginController(auth, $scope, $cookies, $cookieStore, $location, $state, toaster,$rootScope) {
        $rootScope.hide_menu = true;

        var vm = this;
        vm.isBusy = false;
        vm.reset_pass_dir = "https://surveyapi.herokuapp.com/password/reset";
        vm.buttonClick = function () {
            vm.isBusy = !vm.isBusy;
              
        }
        function clear() {
            $scope.answers = {};
            $scope.properties = {
                nRespuestas: 0,
                progress: 0,
                nPreguntas: 90,
                total: 0,
                index: 0
            };
            $scope.sessions = {};



        };
        
        $scope.user = {
            user: {
                email: "",
                password: "",
                password_confirmation: ""
            }
        };
        $scope.session = {
            session: {
                email: "",
                password: ""
            }
        };
        activate();

        function activate() {
            $scope.cookies = $cookies;
        }

        $scope.ingresar = function(form) {
             vm.isBusy = true;
            clear();
            $scope.user.user.password_confirmation = $scope.user.user.password;
            $scope.session.session.email = $scope.user.user.email;
            $scope.session.session.password = $scope.user.user.password;
            auth.login($scope.session).then(function(data) {
                if (data != null) {
                    $scope.user_id = data;
                    $state.go('pages.diagnova');
                } else {
                   
                    toaster.pop('info', "Información:", "Usuario no registrado, o contraseña invalida");
                      vm.isBusy = false;
                    vm.classAnimation = '';

                    //$state.go('login');
                }
            }); 
          




        }


        $scope.registrar = function() {
            vm.isBusy = true;
            clear();
            $scope.user.user.password_confirmation = $scope.user.user.password;
            $scope.session.session.email = $scope.user.user.email;
            $scope.session.session.password = $scope.user.user.password;
            auth.singup($scope.user.user).then(function(data) {
                if (data != null) {
                   $state.go('pages.diagnova');
                } else {
                    vm.isBusy = false;
                    toaster.pop('info', "Información:", "Usuario ya existe");
                   
                     vm.classAnimation = '';

                    //$state.go('login');
                }
            });
             



        }
        $scope.passReset = function() {
            swal({
                title: 'Recuperar Contraseña',
                html: '<p>Ingrese el correo electronico con el cual se registro anteriormente</p><br><label>E-mail <input id="input-field"></label>',
                showCancelButton: true,
                closeOnConfirm: false
            }, function() {
                 swal.disableButtons();
                 auth.resetPassRequest($('#input-field').val()).then(function(response){
                    if(response.status == 200){
                        swal({
                            html: 'Se ha enviado un correo con las instrucciones a: <strong>' + $('#input-field').val() + '</strong>'
                        }); 
                    }else{
                        swal({
                            html: 'No existe un usuario registrado con el E-mail: <strong>' + $('#input-field').val() + '</strong>'
                        });
                    };
                 }, 
                 function(){
                    swal({
                            html: 'No existe un usuario registrado con el E-mail: <strong>' + $('#input-field').val() + '</strong>'
                    });
                 }
                 );

               
            });
        }





    }


})();
// if (data != null) {
//                        if (data.user.id != null) {
//                            //ok
//                            $cookies.email = data.user.email,
//                                $cookies.token = data.user.auth_token;
//                            $cookies.user_id = data.user.id,
//                                $state.go('caracterizacion');

//                        } else {
//                            //try login
//                            auth.login($scope.session)
//                                .then(function(data) {
//                                    if (data.user.id) {
//                                        if (data.user.id != null) {
//                                            //ok
//                                            $cookies.email = data.user.email,
//                                                $cookies.token = data.user.auth_token;
//                                            $cookies.user_id = data.user.id,

//                                        } else {
//                                            //try login
//                                            alert("El usuario no existe y no puede ser creado, intente nuevamente")
//                                            $state.go('login');
//                                        }

//                                    } else {

//                                    }
//                                });
//                        }

//                    } else {
//                        auth.login($scope.session).then(function(data) {
//                            if (typeof(data) != "undefined") {
//                                if (data.user.id != null) {
//                                    //ok
//                                    $cookies.email = data.user.email,
//                                        $cookies.token = data.user.auth_token;
//                                    $cookies.user_id = data.user.id,
//                                        $state.go('caracterizacion');

//                                } else {
//                                    //try login
//                                    alert("Credenciales invalidas")
//                                    $state.go('login');
//                                }

//                            } else {
//                                alert("Credenciales invalidas");
//                                $state.go('login');
//                            }
//                        });

//                    }
//                })
//        };
