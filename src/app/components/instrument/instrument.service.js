(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .factory('instrument', instrument);

    /** @ngInject */
    function instrument($log, $http, Restangular) {
        var apiHost = 'https://giepiloto.herokuapp.com/';
        //var apiHost = 'http://localhost:3002/';
         var local_answers = {};
        var answers_structs = {

            "icai": {
                s1: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "" //p4

                },
                s2: {
                    p1: "", //p5
                    p2: "", //p6
                    p3: "", //p7
                    p4: "", //p8
                    p5: "" //p9

                },
                s3: {
                    p1: "", //p10
                    p2: "", //p11
                    p3: "", //p12
                    p4: "", //p13
                    p5: "", //p14
                    p6: "" //p15
                },
                s4: {
                    p1: "", //p16
                    p2: "", //p17
                    p3: "", //p18
                    p41: "", //p19
                    p42: "" //p20
                },
                s5: {
                    p1: "", //p21
                    p2: "", //p22
                    p3: "" //p23
                },
                s6: {
                    p1: "", //p24
                    p2: "", //p25
                    p3: "" //p26
                },
                s7: {
                    p1: "", //p27
                    p2: "", //p28
                    p3: "", //p39
                    p4: "" //p30

                },
                s8: {

                    p11: "", //p31
                    p12: "", //p32
                    p13: "", //p33
                    p14: "", //p34
                    p21: "", //p35
                    p22: "", //p36
                    p23: "", //p37
                    p24: "", //p38
                    p31: "", //p39
                    p32: "", //p40
                    p33: "", //p41
                    p34: "", //p42
                    p41: "", //p43
                    p42: "", //p44
                    p43: "", //p45
                    p44: "", //p46
                    p51: "", //p47
                    p52: "", //p48
                    p53: "", //p49
                    p54: "", //p50
                    p61: "", //p51
                    p62: "", //p52
                    p63: "", //p53
                    p64: "", //p54
                    p71: "", //p55
                    p72: "", //p56
                    p73: "", //p57
                    p74: "", //p58
                    p81: "", //p59
                    p82: "", //p60
                    p83: "", //p61
                    p84: "", //p62
                    p91: "", //p63
                    p92: "", //p64
                    p93: "", //p65
                    p94: "", //p66
                    p10: "" //P67
                },
                s9: {
                    p1: "", // p68
                    p2: "", // p69
                    p3: "", // p70
                    p4: "", // p71
                    p5: "", // p72
                    p6: "", // p73
                    p7: "", // p74
                    p8: "", // p75
                    p9: "", // p76
                    p10: "", //p77
                    p11: "", //p78
                    p12: "", //p89
                    p13: "", //p80
                    p14: "" //p81
                },
                s10: {
                    p1: "", // p82
                    p2: "", // p83
                    p3: "", // p84
                    p4: "", // p85
                    p5: "", // p86
                    p6: "", // p87
                    p7: "", // p88
                    p8: "", // p89
                    p9: "", // p90
                    p10: "", //p91
                    p11: "", //p92
                    p12: "", //p93
                },
                s11: {
                    p1: "", // p94
                    p2: "", // p95
                    p3: "", // p96
                    p4: "", // p97
                    p5: "", // p98
                    p6: "", // p99
                    p7: "", // p100
                    p8: "", // p101
                    p9: "", // p102
                    p10: "", //p103
                    p11: "", //p104
                    p12: "", //p105
                    p13: "", //p106
                    p14: "", //p107
                    p15: "", //p108
                    p16: "", //p119
                    p17: "", //p110
                    p18: "", //p111
                    p19: "", //p112
                    p20: "", //p113
                    p21: "", //p114
                    p22: "", //p115
                    p23: "", //P116
                    p24: "", //p117
                    p25: "" //p118


                }
            },
            "imi": {
                s1: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                    p5: "", //p4
                    p6: "", //p4
                    p7: "", //p4
                    p8: "", //p4
                    p9: "", //p4
                    p10: "", //p4
                    p11: "", //p4
                    p12: "", //p4
                    p13: "", //p4
                    p14: "", //p4
                    p15: "", //p4
                    p16: "", //p4
                    p17: "", //p4
                    p18: "", //p4
                    p19: "", //p4
                    p20: "", //p4
                    p21: "", //p4
                    p22: "", //p4
                    p23: "", //p4
                    p24: "", //p4
                    p25: "", //p4
                    p26: "", //p4
                    p27: "", //p4
                    p28: "", //p4
                    p29: "", //p4
                    p30: "", //p4

                }
            },
            "acap":{
                s1: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                    p5: "", //p4
                    p6: "", //p4
                    p7: "", //p4
                    p8: "", //p4
                    p9: "", //p4
                    p10: "", //p4
                    p11: "", //p4
                    p12: "", //p4
                    p13: "", //p4
                    p14: "", //p4
                    p15: "", //p4
                    p16: "", //p4
                    p17: "", //p4
                    p18: "", //p4
                    p19: "", //p4
                },
                s2: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                    p5: "",
                    p6: ""
                },
                s3: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                },
                s4: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                },

                s5: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                },s6: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                    p5: "", //p4
                    p6: "", //p4
                    p7: "", //p4
                    p8: "" //p4
                },

            }
        };


        var service = {
            apiHost: apiHost,
            getAnswers: getAnswers,
            setAnswers: setAnswers,
            getAllAnswers: getAllAnswers
        };

        return service;

        function getEmptyAnswers(type) {

            var new_answers = (JSON.parse(JSON.stringify(answers_structs[type])));
            return new_answers;
        }

        function getAnswers(type, user_id) {
            var new_answers = (JSON.parse(JSON.stringify(answers_structs[type])));
            $log.info("obteniendo instrumento" + type + " de :" + user_id);
            return $http.get(apiHost + type + "?" + "user_id=" + user_id)
                .then(getAnswersComplete)
                .catch(getAnswersFailed);

            function getAnswersComplete(response) {
                $log.info("devolviendo :", response);
                if (response.status == 200) {
                    if (typeof(response.data.answers) != "undefined" && response.data.answers != null) {
                        return getInSessions(new_answers, response.data.answers);
                    } else {
                        return new_answers; //si no se ha realizado el insturmento
                    }
                }else{
                      return getInSessions(new_answers, local_answers); //for debug porpouses
                }

                return new_answers;

            }

            function getAnswersFailed(error) {
                $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
                return new_answers;
            }
        }

        function getAllAnswers(type) {
            var new_answers = (JSON.parse(JSON.stringify(answers_structs[type])));
            $log.info("obteniendo  todas las respuestas de  " + type);
            return $http.get(apiHost + type)
                .then(getAllAnswersComplete)
                .catch(getAllAnswersFailed);

            function getAllAnswersComplete(response) {
                $log.info("devolviendo :", response);
                if (response.status == 200) {
                    if (typeof(response.data.answers) != "undefined" && response.data.answers != null) {
                        return response.data.answers;
                    } else {
                        return new_answers;
                    }
                }

                return new_answers;

            }

            function getAllAnswersFailed(error) {
                $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
                return new_answers;
            }
        }


        function getInSessions(answer_structure, data) {
            //var data = {characterization:{user_id:5}}
            var index = 1;
            //  var anwers_ordered = (JSON.parse(JSON.stringify(answers_structs[type])));
            angular.forEach(answer_structure, function(session, skey) {
                angular.forEach(session, function(pnv, pnk) {
                    $log.debug("trayendo :" + data["p" + index] + " de p" + index + " a " + skey + pnk);
                    answer_structure[skey][pnk] = data["p" + index];
                    if (data["p" + index] === "t") {
                        answer_structure[skey][pnk] = true;
                    }
                    if (data["p" + index] === "f") {
                        answer_structure[skey][pnk] = false;
                    }
                    index++;

                });

            });

            return answer_structure;
        }


        function setAnswers(type, user_id, answers_new) {
                local_answers = answers_new;
                var data_to = {
                    answers: {
                        user_id: user_id.toString()
                    }
                }
            if (user_id != "" && answers_new != null) {
                var index = 1;
                angular.forEach(answers_new, function(session, skey) {
                    angular.forEach(session, function(pnv, pnk) {
                        data_to.answers["p" + index] = pnv || "";

                        $log.debug("insertando :" + pnv + " en  " + "p" + index);
                        index++;

                    });

                });
            } else {
                return local_answers;
            }
            $log.debug("insertando el user_id:" + user_id + " como: " + data_to + " en " + apiHost + type, data_to);
            //return $http.post(apiHost+type, data_to).
            //then(setAnswersComplete, setAnswersFailed);
            return Restangular.all(type).post(data_to).then(setAnswersComplete, setAnswersFailed);


            function setAnswersComplete(response) {
                if (typeof(response.data.answers) != "undefined" || response.data.answers != null) {
                    $log.debug("se guardo!", response);
                    return response.data.answers;
                } else {
                    $log.debug("no se guardo!", response);
                    return null;
                }
            }

            function setAnswersFailed(error) {
                $log.error('XHR Failed for setAnswers.\n' + angular.toJson(error.data, true));
                return false;
            }
        }

    }
})();
