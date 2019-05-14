'use strict';
angular.module('linkageCrmApp')

    .config(["$stateProvider",'$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider
            .otherwise('404');
        $stateProvider
            .state("404", {
                url: '/404',
                templateUrl:'',
                views:{
                    'content':{templateUrl:"./view/404.html"}
                }
            })
        
            // demo
            .state("demo", {
                url: '/demo',
                views:{
                    'content':{templateUrl:'./view/demo.html'}
                },
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load(['./js/controller/demoController.js']);
                        }]
                }
            })

            //短信审核
            .state("messageAudit", {
                url: '/messageAudit',
                views:{
                    'content':{templateUrl:'./view/mot/messageAudit.html'}
                },
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load([
                                './js/controller/mot/messageAuditController.js',
                                './js/controller/mot/messageAuditDenyController.js',
                            ]);
                        }]
                }
            })

            // 效果分析
            .state("resultAnalysis", {
                url: '/resultAnalysis',
                views:{
                    'content':{templateUrl:'./view/mot/resultAnalysis.html'}
                },
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load(['./js/controller/mot/resultAnalysisController.js']);
                        }]
                }
            })

            // motBoard看板
            .state("motBoard", {
                url: '/motBoard?custNo',
                views:{
                    'content':{templateUrl:'./view/mot/motBoard.html'}
                },
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load(['./js/controller/mot/motBoardController.js']);
                        }]
                }
            })

            // mot处理页面
            .state("motDealModal", {
                url: '/motDealModal?eventFlowId&hasPower',
                views:{
                    'content':{templateUrl:'./view/mot/motDealModal.html'}
                },
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load(['./js/controller/mot/motDealModalController.js']);
                        }]
                }
            })

            // mot历史
            .state("motHistory", {
                url: '/motHistory',
                views:{
                    'content':{templateUrl:'./view/mot/motHistory.html'}
                },
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load(['./js/controller/mot/motHistoryController.js']);
                        }]
                }
            })

            // mot批量短信页面
            .state("batchMessageModal", {
                url: '/batchMessageModal?eventId&custNoList',
                views:{
                    'content':{templateUrl:'./view/mot/batchMessageModal.html'}
                },
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load(['./js/controller/mot/batchMessageModalController.js']);
                        }]
                }
            })


    }]);
