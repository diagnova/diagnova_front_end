(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('ImiController', ImiController);

    /** @ngInject */
    function ImiController(auth, instrument, $scope, $cookies, $timeout, $stateParams, $log) {
        var vm = this;
        vm.questions = [
            { "modelName": "p1", "tipo": "CULTURA", "texto": "La empresa reacciona agilmente ante la aparición de nuevos productos o competencia en el mercado" },
            { "modelName": "p2", "tipo": "CULTURA", "texto": "Co-creamos con nuestros clientes para explorar y desarrollar nuevos conceptos e ideas" },
            { "modelName": "p3", "tipo": "CULTURA", "texto": "Comparamos de forma sistemática nuestros productos con otros en el mercado" },
            { "modelName": "p4", "tipo": "CULTURA", "texto": "Apropiamos bien los conceptos aprendidos por experiencias previas y las transferimos a nuestros compañeros o equipos de trabajo" },
            { "modelName": "p5", "tipo": "CULTURA", "texto": "Identificamos nuevas tecnologias para estar a la vanguardia de las necesidades y exigencias del sector." },
            { "modelName": "p6", "tipo": "CULTURA", "texto": "La empresa invierte en la formación del personal para fortalecer el desarrollo de los procesos (know how)" },
            { "modelName": "p7", "tipo": "ESTRATEGIA", "texto": "Fomentamos la innovación y las nuevas ideas mediante reconocimientos o incentivos." },
            { "modelName": "p8", "tipo": "ESTRATEGIA", "texto": "Existe un claro vínculo entre los proyectos de innovación que desarrollamos y la estrategia global de la empresa." },
            { "modelName": "p9", "tipo": "ESTRATEGIA", "texto": "Existe una estrategia de innovación definida en la compañía" },
            { "modelName": "p10", "tipo": "ESTRATEGIA", "texto": "La estrategia de innovación es conocida e integrada por toda la organización" },
            { "modelName": "p11", "tipo": "ESTRATEGIA", "texto": "Se identifican las necesidades actuales y futuras de los clientes y las actividades de la competencia para crear nuevos productos" },
            { "modelName": "p12", "tipo": "ESTRATEGIA", "texto": "Existe una planeación a corto, mediano y largo plazo en terminos de innovación para el desarrollo de nuevos productos" },
            { "modelName": "p13", "tipo": "ESTRUCTURA", "texto": "Nuestra estructura permite la toma de decisiones de manera rápida y efectiva" },
            { "modelName": "p14", "tipo": "ESTRUCTURA", "texto": "La comunicación es efectiva en todos los niveles de la empresa" },
            { "modelName": "p15", "tipo": "ESTRUCTURA", "texto": "Los directivos dedican mas del 20% de su tiempo diario a nuevas ideas de productos y formas de mejorar la experiencia del cliente" },
            { "modelName": "p16", "tipo": "ESTRUCTURA", "texto": "Existe un departamento encargado de los procesos de Investigación, Desarrollo y/o Innovación en la compañía" },
            { "modelName": "p17", "tipo": "ESTRUCTURA", "texto": "Los directores, jefes o lideres de procesos son responsables de generar nuevas ideas desde el liderazgo de sus equipos." },
            { "modelName": "p18", "tipo": "ESTRUCTURA", "texto": "La integración de los miembros del equipo de trabajo con procesos de ideación, cocreación y desarrollo de nuevos productos favorece la materialización de innovaciones" },
            { "modelName": "p19", "tipo": "PROCESOS", "texto": "Existe cooperación entre los departamentos de la institución para desarrollar nuevos productos y procesos" },
            { "modelName": "p20", "tipo": "PROCESOS", "texto": "Contamos con procedimientos o herramientas para seleccionar, priorizar y gestionar proyectos de innovación" },
            { "modelName": "p21", "tipo": "PROCESOS", "texto": "Se hace seguimiento periódico sobre los productos desarrollados durante sus primeros años en el mercado" },
            { "modelName": "p22", "tipo": "PROCESOS", "texto": "Su empresa es agíl haciendo realidad las ideas en nuevos productos" },
            { "modelName": "p23", "tipo": "PROCESOS", "texto": "Medimos periodica y sistematicamente la evolución de nuestros procesos de innovación y su impacto dentro de la empresa y cada una de sus áreas" },
            { "modelName": "p24", "tipo": "PROCESOS", "texto": "La empresa desarrolla acciones concretas y constantes para generar mayor valor agregado a sus clientes." },
            { "modelName": "p25", "tipo": "RELACIONAMIENTO", "texto": "Tenemos una relación ganar-ganar con nuestros proveedores" },
            { "modelName": "p26", "tipo": "RELACIONAMIENTO", "texto": "Trabajamos bien con instituciones de educación superior o centros de investigación" },
            { "modelName": "p27", "tipo": "RELACIONAMIENTO", "texto": "Colaboramos con otras empresas para desarrollar nuevos productos o procesos" },
            { "modelName": "p28", "tipo": "RELACIONAMIENTO", "texto": "La empresa involucra a sus clientes y proveedores para testear y refinar procesos" },
            { "modelName": "p29", "tipo": "RELACIONAMIENTO", "texto": "La empresa cuenta con aliados para el desarrollo o gestión de proyectos de innovación" },
            { "modelName": "p30", "tipo": "RELACIONAMIENTO", "texto": "La empresa hace parte de redes de conocimiento, espacios de asociatividad y/o clusters que fortalezcan los procesos de innovación." }
        ];

        //get response
        $scope.user_id = $cookies.get("user_id");
        $scope.user = auth.getUser();
        $scope.chart_options = {
            responsive: true,
            scaleBeginAtZero: true,
            scaleIntegersOnly: true,
            scaleShowLabels: true,
            scaleOverride: true,
            scaleSteps: 3,
            scaleStepWidth: 1,
            scaleStartValue: 0,
            pointLabelFontSize: 16

        };
        $scope.chart_colours = [{
            fillColor: 'rgba(249, 178, 51, 0.4)',
            strokeColor: 'rgba(249, 178, 51, 1)',
            highlightFill: 'rgba(249, 178, 51, 0.8)',
            highlightStroke: 'rgba(249, 178, 51, 0.8)'
        }];
        $scope.pie_options = {
            tooltipEvents: [],
            scaleLabel: "<%=value%>",
            showTooltips: true,
            tooltipCaretSize: 0,
            onAnimationComplete: function() {
                this.showTooltip(this.segments, true);
            },
        };
        $scope.labels = ["Curltura", "Estrategia", "Estructura", "Procesos", "Relacionamiento"];

        $scope.dimensiones_calculadas = [
            [0, 0, 0, 0, 0]
        ];

        $scope.pie_labels = ["Producto", "Proceso", "Mercado", "Organización"];
        $scope.pie_data = [1, 1, 1, 1];



        //Dimensiones conceptos:
        $scope.dimensiones = {
            "CULTURA": [
                { estado: false, desc: "BAJO", texto: "Tus capacidades en cultura de innovación requieren de urgente atención, tu organización requiere empezar a fomentar espacios de aprendizaje de forma continua. " },
                { estado: false, desc: "MEDIO", texto: "Tu organización tiene destellos de cultura de innovación, pero si realmente quieres que se traduzcan ideas novedosas en impacto económico, necesitas mayor atención en el direccionamiento de los equipos de trabajo." },
                { estado: false, desc: "ALTO", texto: "La cultura en tu organización es ejemplar, has avanzado significativamente en el camino de la innovación, si deseas mantener tu posición o ser la punta de lanza en tu sector y en tu target de mercado, es tiempo de implementar estrategias de innovación abierta desde el nivel directivo." }
            ],
            "ESTRATEGIA": [
                { estado: false, desc: "BAJO", texto: "La organización no está siendo estratégica, es vital empezar a hacer planeación desde las cabezas y a gestionar el apoyo desde los equipos de trabajo." },
                { estado: false, desc: "MEDIO", texto: "La estrategia no aporta tanto como debería, es tiempo de reflexionar en cómo lograr materializar las metas y objetivos. Requieres de un acompañamiento externo para aterrizar los planes y estrategias." },
                { estado: false, desc: "ALTO", texto: "La organización ha entendido el objeto del negocio ejemplarmente; el juego de ajedrez fluye, pero la competencia está tomando acciones en este momento, es hora de que tus directivos evolucionen en innovación." },
            ],

            "ESTRUCTURA": [
                { estado: false, desc: "BAJO", texto: "La estructura organizacional es débil, no está aportando a tus resultados en el mercado, tus competidores siguen creciendo y con ellos la brecha entre ustedes, es tiempo de alinear expectativas, metas e intereses." },
                { estado: false, desc: "MEDIO", texto: "La estructura de la organización evidencia una articulación poco competitiva, las necesidades del mercado requieren de una evolución en este aspecto, si realmente se busca estar a la vanguardia." },
                { estado: false, desc: "ALTO", texto: "Los recursos de la institución para generar innovación, están dando aportes significativos al modelo de negocio, el norte está claro, pero no se pueden confiar, el reto está en llegar a la cima y mantenerse." },
            ],

            "PROCESOS": [
                { estado: false, desc: "BAJO", texto: "Los procesos responden básicamente a la gestión operativa tradicional, la competencia constantemente evoluciona, es tiempo de trabajar un sistema de calidad enfocado a innovar y no a fabricar papel." },
                { estado: false, desc: "MEDIO", texto: "La organización cuenta con proceso interesantes, se articulan bien con sus necesidades, pero reflejan una clara necesidad por fortalecer las sinergias entre áreas y equipos de trabajo, un acompañamiento en estructuración de procesos de innovación les caería muy bien." },
                { estado: false, desc: "ALTO", texto: "Los procesos de la organización son sólidos, muestran un importante avance respecto de la competencia, sin embargo con el potencial existente se puede apostar por un techo aún más alto." },
            ],

            "RELACIONAMIENTO": [
                { estado: false, desc: "BAJO", texto: "La innovación no se puede construir estando solo, es importante que rediseñen la forma como están manejando las relaciones con sus clientes o proveedores, el modelo de negocio puede trastabillar en cualquier momento." },
                { estado: false, desc: "MEDIO", texto: "Tu relacionamiento con el entorno es bueno, pero si realmente buscan llegar niveles de innovación que favorezcan e impactan económicamente, debes invertir más en tus clientes y proveedores." },
                { estado: false, desc: "ALTO", texto: "La manera como te relacionas con el entorno empieza a marcar la diferencia con tus competidores, está abriendo puertas en el mercado y seguramente la rentabilidad estará mejorando, es el momento de pensar estratégicamente en los proyectos de innovación que representan la punta de lanza de la organización para los próximos años" }

            ],
            "resultados": {
                cultura: "",
                estrategia: "",
                estructura: "",
                procesos: "",
                relacionamiento: ""

            },
            "mayores": {
                cultura: 1,
                estrategia: 1,
                estructura: 1,
                procesos: 1,
                relacionamiento: 1
            }

        }
        $scope.tipo_innovacion = {
            PRODUCTO: 0,
            PROCESO: 0,
            MERCADO: 0,
            ORGANIZACION: 0
        }

        $scope.mayor_innovacion = 0;

        $scope.user = auth.getUser();
        $scope.finished = false;
        vm.panelTitle = "";
        vm.page = 0;
        vm.pages = [];
        vm.today = new Date();
        vm.status = {
            opened: false
        };
        $scope.answers = {
            "s1": {}
        };
        $scope.properties = {
            nRespuestas: 0,
            progress: 0,
            nPreguntas: 30,
            total: 0,
            index: 0,
        };
        $scope.msgs = [""];



        vm.tabActive = function() {
            return vm.pages.filter(function(pane) {
                return pane.active;
            })[0];
        };


        $scope.get_user_mail = function() {
            return $cookies.get("email");
        };


        vm.pages = [{
            key: "s1",
            active: true
        }];
        $scope.sessions = {
            s1: {
                title: "Instrumento de Medicion de la Innovación",
                url_name: "imi_s1",
                active: true,
                state: 0,
                questions: 4,
            }
        };


        vm.open = function($event) {
            vm.status.opened = true;
        };
        vm.panelTitle = $scope.sessions.s1.title;
        vm.setTitle = function(title) {

            vm.panelTitle = title;

            $timeout(function() { $scope.refreshSlider(); }, 100);


        };





        function activate() {
            /*
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

        $scope.isLastPage = function() {
            var active = vm.tabActive();
            var index = $.inArray(active, vm.pages);
            return index == (Object.keys(vm.pages).length - 1)
        }

        $scope.swal = function(title, msg) {

            swal(title, msg);
        }
        $scope.refreshSlider = function() {
            $scope.$broadcast('refreshSlider');
        }

        $scope.finish = function() {
            $scope.finished = true;
            instrument.setAnswers("imi", $scope.user_id, $scope.answers);

            //redirect to answers

        }

        var compareFunction = function(a, b) {
            return b - a };



        $scope.user_consult = $stateParams.id;
        if ($scope.user_consult !== "" && typeof($scope.user_consult) !== "undefined") {
            $scope.user_id = $scope.user_consult;
        }

        instrument.getAnswers("imi", $scope.user_id).then(function(data) {

            //$scope.answers = data;
            if (!$.isEmptyObject(data) && data !== null && typeof(data.s1) != "undefined") {
                $scope.answers = data;
                // $log.debug("answers",);
                $scope.dimensiones_calculadas = [
                    [
                        3 * ((1 * $scope.answers.s1.p1 + 1 * $scope.answers.s1.p2 + 1 * $scope.answers.s1.p3 + 1 * $scope.answers.s1.p4 + 1 * $scope.answers.s1.p5 + 1 * $scope.answers.s1.p6) / 6) / 3,
                        3 * ((1 * $scope.answers.s1.p7 + 1 * $scope.answers.s1.p8 + 1 * $scope.answers.s1.p9 + 1 * $scope.answers.s1.p10 + 1 * $scope.answers.s1.p11 + 1 * $scope.answers.s1.p12) / 6) / 3,
                        3 * ((1 * $scope.answers.s1.p13 + 1 * $scope.answers.s1.p14 + 1 * $scope.answers.s1.p15 + 1 * $scope.answers.s1.p16 + 1 * $scope.answers.s1.p17 + 1 * $scope.answers.s1.p18) / 6) / 3,
                        3 * ((1 * $scope.answers.s1.p19 + 1 * $scope.answers.s1.p20 + 1 * $scope.answers.s1.p21 + 1 * $scope.answers.s1.p22 + 1 * $scope.answers.s1.p23 + 1 * $scope.answers.s1.p24) / 6) / 3,
                        3 * ((1 * $scope.answers.s1.p25 + 1 * $scope.answers.s1.p26 + 1 * $scope.answers.s1.p27 + 1 * $scope.answers.s1.p28 + 1 * $scope.answers.s1.p29 + 1 * $scope.answers.s1.p30) / 6) / 3
                    ]
                ];
                //  $scope.dimensiones.mayores.cultura =         [1*$scope.answers.s1.p1  , 1*$scope.answers.s1.p2  , 1*$scope.answers.s1.p3  , 1*$scope.answers.s1.p4  , 1*$scope.answers.s1.p5  , 1*$scope.answers.s1.p6].sort()[0];
                //  $scope.dimensiones.mayores.estrategia =      [1*$scope.answers.s1.p7  , 1*$scope.answers.s1.p8  , 1*$scope.answers.s1.p9  , 1*$scope.answers.s1.p10  , 1*$scope.answers.s1.p11  , 1*$scope.answers.s1.p12].sort()[0];
                //   $scope.dimensiones.mayores.estructura =      [1*$scope.answers.s1.p13  , 1*$scope.answers.s1.p14  , 1*$scope.answers.s1.p15  , 1*$scope.answers.s1.p16  , 1*$scope.answers.s1.p17  , 1*$scope.answers.s1.p18].sort()[0];
                //   $scope.dimensiones.mayores.procesos =        [1*$scope.answers.s1.p19  , 1*$scope.answers.s1.p20  , 1*$scope.answers.s1.p21  , 1*$scope.answers.s1.p22  , 1*$scope.answers.s1.p23  , 1*$scope.answers.s1.p24].sort()[0];
                //  $scope.dimensiones.mayores.relacionamiento = [1*$scope.answers.s1.p25  , 1*$scope.answers.s1.p26  , 1*$scope.answers.s1.p27  , 1*$scope.answers.s1.p28  , 1*$scope.answers.s1.p29  , 1*$scope.answers.s1.p30].sort()[0];

                var props_watch = $scope.$watch(function() {
                    return $scope.answers;
                }, function(newValues, oldValues, scope) {
                    angular.forEach(newValues, function(snv, snk) {
                        $scope.dimensiones_calculadas = [
                            [
                                ((1*$scope.answers.s1.p1  + 1*$scope.answers.s1.p2  + 1*$scope.answers.s1.p3  + 1*$scope.answers.s1.p4  + 1*$scope.answers.s1.p5 +  1*$scope.answers.s1.p6) / 6) ,
                                ((1*$scope.answers.s1.p7  + 1*$scope.answers.s1.p8  + 1*$scope.answers.s1.p9  + 1*$scope.answers.s1.p10 + 1*$scope.answers.s1.p11 + 1*$scope.answers.s1.p12) / 6) ,
                                ((1*$scope.answers.s1.p13 + 1*$scope.answers.s1.p14 + 1*$scope.answers.s1.p15 + 1*$scope.answers.s1.p16 + 1*$scope.answers.s1.p17 + 1*$scope.answers.s1.p18) / 6),
                                ((1*$scope.answers.s1.p19 + 1*$scope.answers.s1.p20 + 1*$scope.answers.s1.p21 + 1*$scope.answers.s1.p22 + 1*$scope.answers.s1.p23 + 1*$scope.answers.s1.p24) / 6) ,
                                ((1*$scope.answers.s1.p25 + 1*$scope.answers.s1.p26 + 1*$scope.answers.s1.p27 + 1*$scope.answers.s1.p28 + 1*$scope.answers.s1.p29 + 1*$scope.answers.s1.p30) / 6) 
                            ]
                       ];

                      //actualizar conceptos:
                        $scope.dimensiones.resultados.cultura         = $scope.dimensiones.CULTURA[parseInt($scope.dimensiones_calculadas[0][0]-1)].texto;
                        $scope.dimensiones.resultados.estrategia      = $scope.dimensiones.ESTRATEGIA[parseInt($scope.dimensiones_calculadas[0][1]-1)].texto;
                        $scope.dimensiones.resultados.estructura      = $scope.dimensiones.ESTRUCTURA[parseInt($scope.dimensiones_calculadas[0][2]-1)].texto;
                        $scope.dimensiones.resultados.procesos        = $scope.dimensiones.PROCESOS[parseInt($scope.dimensiones_calculadas[0][3]-1)].texto;
                        $scope.dimensiones.resultados.relacionamiento = $scope.dimensiones.RELACIONAMIENTO[parseInt($scope.dimensiones_calculadas[0][4]-1)].texto;

                        //tipo de innovacion
                        $scope.dimensiones.mayores.cultura =         [1 * $scope.answers.s1.p1,  1 * $scope.answers.s1.p2,  1 * $scope.answers.s1.p3,  1 * $scope.answers.s1.p4,  1 * $scope.answers.s1.p5,  1 *  $scope.answers.s1.p6].sort(compareFunction)[0]*10;
                        $scope.dimensiones.mayores.estrategia =      [1 * $scope.answers.s1.p7,  1 * $scope.answers.s1.p8,  1 * $scope.answers.s1.p9,  1 * $scope.answers.s1.p10, 1 * $scope.answers.s1.p11, 1 * $scope.answers.s1.p12].sort(compareFunction)[0]*80;
                        $scope.dimensiones.mayores.estructura =      [1 * $scope.answers.s1.p13, 1 * $scope.answers.s1.p14, 1 * $scope.answers.s1.p15, 1 * $scope.answers.s1.p16, 1 * $scope.answers.s1.p17, 1 * $scope.answers.s1.p18].sort(compareFunction)[0]*50;
                        $scope.dimensiones.mayores.procesos =        [1 * $scope.answers.s1.p19, 1 * $scope.answers.s1.p20, 1 * $scope.answers.s1.p21, 1 * $scope.answers.s1.p22, 1 * $scope.answers.s1.p23, 1 * $scope.answers.s1.p24].sort(compareFunction)[0]*40;
                        $scope.dimensiones.mayores.relacionamiento = [1 * $scope.answers.s1.p25, 1 * $scope.answers.s1.p26, 1 * $scope.answers.s1.p27, 1 * $scope.answers.s1.p28, 1 * $scope.answers.s1.p29, 1 * $scope.answers.s1.p30].sort(compareFunction)[0]*90;


                        $scope.tipo_innovacion.PRODUCTO = (($scope.dimensiones.mayores.cultura + $scope.dimensiones.mayores.estrategia + $scope.dimensiones.mayores.procesos) / 4) ;
                        $scope.tipo_innovacion.PROCESO = (($scope.dimensiones.mayores.cultura + $scope.dimensiones.mayores.estructura + $scope.dimensiones.mayores.procesos) / 4);
                        $scope.tipo_innovacion.MERCADO = (($scope.dimensiones.mayores.cultura + $scope.dimensiones.mayores.estrategia + $scope.dimensiones.mayores.relacionamiento) / 4);
                        $scope.tipo_innovacion.ORGANIZACION = (($scope.dimensiones.mayores.cultura + $scope.dimensiones.mayores.estrategia + $scope.dimensiones.mayores.estructura) / 4);
                        
                        var total = ($scope.tipo_innovacion.PRODUCTO + $scope.tipo_innovacion.PROCESO + $scope.tipo_innovacion.MERCADO + $scope.tipo_innovacion.ORGANIZACION);
                        $scope.tipo_innovacion.PRODUCTO =     Math.round(100*$scope.tipo_innovacion.PRODUCTO/total) ;
                        $scope.tipo_innovacion.PROCESO =      Math.round(100*$scope.tipo_innovacion.PROCESO/total);
                        $scope.tipo_innovacion.MERCADO =      Math.round(100*$scope.tipo_innovacion.MERCADO/total);
                        $scope.tipo_innovacion.ORGANIZACION = Math.round(100*$scope.tipo_innovacion.ORGANIZACION/total);
                        

                        $scope.pie_data = [$scope.tipo_innovacion.PRODUCTO, $scope.tipo_innovacion.PROCESO, $scope.tipo_innovacion.MERCADO, $scope.tipo_innovacion.ORGANIZACION];
                        $scope.mayor_innovacion = [$scope.tipo_innovacion.PRODUCTO, $scope.tipo_innovacion.PROCESO, $scope.tipo_innovacion.MERCADO, $scope.tipo_innovacion.ORGANIZACION].sort(compareFunction)[0];
                        
                        var sortable = [];
                        for (var tipo in $scope.tipo_innovacion)
                            sortable.push([tipo, $scope.tipo_innovacion[tipo]])
                        sortable.sort(function(a, b) {
                            return b[1] - a[1] })
                        $scope.mayor_innovacion = sortable[0];
                    })
                }, true);





            } else {
                //props_watch();
            }

            console.log("recibido en chrarac controller: " + $scope.answers);
            activate();
            $scope.$broadcast('refreshSlider');


        });



    }
})();
