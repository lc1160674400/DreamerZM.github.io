module.exports = function(grunt) {
    //http://28.163.1.25:8380/crm-prodf
    var serveStatic = require('serve-static'),
    cookie = "LMSPToken=26EBB565364F44579F4973D2B53233CA; JSESSIONID=i3h9eayCgt6QbGYkclpOhNtC.undefined; name=value; Hm_lvt_eabf06d35ef8e4098253f7a220d7d32c=1557731882,1557796243; C_SESSION_ID=abb32930-c129-496d-be99-c41959847931-1557796246253; Hm_lpvt_eabf06d35ef8e4098253f7a220d7d32c=1557796248; lastEvent=340001-1557796256140",
    ip = '28.163.1.25',
    port  = '8380';
    var proxyRewrite = {
        '^/crm-prodf/connect/': '/crm-prodf/connect/'
    };
    // const mozjpeg = require('imagemin-mozjpeg');
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: [{
                    expand: true,
                    cwd: './less',
                    src: ['**/*.less'],
                    dest: './css',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
               browsers: ['last 3 versions', 'ie >= 8','chrome >= 34','safari >= 6',"Firefox >= 20"],
               map:true,
            },
            css: {
                //目标文件
                src: './release/css/app.css',  //将哪个 CSS 文件中的 CSS 属性添加私有前缀
                dest:'./release/css/app.css'
            }
        },
        // concat: {
        //     options: {
        //         stripBanners: true,
        //         banner: '/*!<%= pkg.name %> - <%= pkg.version %>-' + '<%=grunt.template.today("yyyy-mm-dd") %> */'
        //     },

        //     jsConcat: {
        //         src: ['js/highcharts.js', 'js/highcharts-more.js', 'js/exporting.js', 'js/solid-gauge.js'],
        //         dest: 'js/highcharts-mix.js'
        //     }
        // },
        //压缩css
        concat: {
            appcss: {
                src: [
                    './css/**/*.css',
                    "!./css/common/*.css"
                ],
                dest: './release/css/app.css'
            },
            libcss: {
                src: [
                    './vendor/jquery/bootstrap/bootstrap.min.css',
                    './font/iconfont.css',
                    './font/lkIconFont/iconfont.css',
                    './vendor/jquery/dialog/ui-dialog.css',
                    './vendor/jquery/swiper/swiper.min.css',
                    './vendor/jquery/dateTime/jquery.datetimepicker.css',
                    './vendor/jquery/bootstrap/bootstrap-select.css',
                    './vendor/jquery/zTree/css/linkageTree.css',
                    './js/angular/ngToast/ngToast.css',
                    './resource/css/animate.css',
                    './resource/css/reset.css',
                    './css/common/*.css',
                ],
                dest: './release/css/lib.css'
            },
           
            appjs:{
                src:[

                ],
                dest:'./release/js/app.js'
            },
            libjs:{
                src:[
                    './vendor/jquery/jquery-1.10.2.js',
                    './js/angular/angular.min.js',
                    './js/angular/angular-ui-router.min.js',
                    './js/angular/angular-animate.min.js',
                    './js/angular/angular-sanitize.js',
                    './js/angular/angular-sortable-view.js',
                    './js/angular/ocLazyLoad.min.js',
                    './vendor/jquery/zTree/jquery.ztree.all.min.js',
                    './vendor/jquery/swiper/swiper.min.js',
                    './vendor/Base64.js',
                    './js/common.js',
                    './js/app.js',
                    './js/config.router.js',
                    './js/config.js',
                    './js/run.js',
                    './vendor/jquery/bootstrap/bootstrap.js',
                    './vendor/jquery/bootstrap/bootstrap-select.js',
                    './vendor/jquery/echarts/echarts.min.js',
                    './js/angular/angular-file-upload.min.js',
                    './vendor/jquery/dialog/dialog-plus-min.js',
                    './vendor/jquery/clipboard.min.js',
                    './js/angular/angular-sanitize.js',
                    './js/angular/ngToast/ngToast.js',
                    './vendor/jquery/dateTime/jquery.datetimepicker.js',
                    './vendor/jquery/qrcode/qrcode.js',
                    './vendor/jquery/slimscroll/jquery.slimscroll.js',
                    './js/directive/**.js',
                    './js/factory/**.js',
                    './js/filter/**.js',
                    './js/controller/indexController.js'
                ],
                // dest:'src/js/concat/<%=pkg.name %> - <%= pkg.version %>.js'
                dest:'./release/js/lib.js'
            },

            // 首页的多模块的数据处理
            indexjs:{
                src:[
                    './js/controller/crmIndex/ftljs/**.js',    
                ],
                // dest:'src/js/concat/<%=pkg.name %> - <%= pkg.version %>.js'
                dest:'./js/controller/crmIndex/crmIndexModules.js'
            }
        },
        cssmin: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //美化代码
                beautify: {
                    //中文ascii化，非常有用！防止中文乱码的神配置
                    ascii_only: true
                }
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: './release/css/',
                    // 排除.min的文件
                    // src: ['commonLib.js', 'diagnosed.js', 'highcharts-mix.js'],
                    src: ['app.css','lib.css'],
                     // '!*.min.css'
                    // 输出和输入在同一目录
                    dest: 'dist/resources/css',
                    ext: '.min.css'
                }]
            },
        },
        //压缩js
        uglify: {
            options: {
                banner: '/*!<%= pkg.name %> - <%= pkg.version %>-' + '<%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            libjs: {
               
                files: [{
                    expand:true,
                    cwd:'./release/js',//js目录下
                    src:'*.js',//所有js文件
                    dest: './dist/resources/js',//输出到此目录下
                    ext: '.min.js'
                }]
            },
           
            cusjs:{
                files: [{
                    expand:true,
                    cwd:'./js/controller/',//js目录下
                    src:['**/*.js','!crmIndex/ftljs/*.js'],//所有js文件
                    dest: './dist/resources/js/controller',//输出到此目录下
                    ext: '.min.js'
                }]
            }
        },
        copy: {
            image: {
                expand: true,
                cwd: './release/imgs',
                src: "**",
                dest: "dist/resources/img"
            },

            fonts:{
                src:"./vendor/jquery/bootstrap/fonts/glyphicons-halflings-regular.woff2",
                dest:"./dist/resources/fonts/glyphicons-halflings-regular.woff2"
            },
            lkfonts:{
                src:["./font/lkIconFont/**"],
                dest:"./dist/resources/"
            },
            view:{
                src:["./view/*","./view/**/*"],
                dest:"dist/resources/"
            }
            // ,
            // swf:{
            //     src:["./vendor/jquery/ZeroClipboard/ZeroClipboard.swf"],
            //     dest:"dist/resources/js/ZeroClipboard.swf"
            // }
        },
        replace: {
                
            // 路由里面的js 路径替换
            routerDist: {
                src: ['./dist/resources/js/lib.min.js'],
                overwrite: true,                 // overwrite matched source files 
                replacements: [{
                  from: './view/',
                  to: "./resources/view/"
                },{
                  from: ['./img/common/nodata.png'],
                  to: function(matchedWord, index, fullText, regexMatches){
                    return "./resources/img/common/nodata.png"
                  }
                },{
                  from: '.js"',
                  to: '.min.js?<%= grunt.template.today("yyyymmddss") %>"'
                },{
                  from: './js/',
                  to: "./resources/js/"
                }
                ]
            },
            release:{
                src: ['./release/css/*.css'],
                    overwrite: true,                 // overwrite matched source files 
                    replacements: [
                    {   
                        from: '../../../../img/',
                        to: '../imgs/'
                    },
                    {   
                        from: '../../../img/',
                        to: '../imgs/'
                    },
                    {
                        from: '../../img/',
                        to: '../imgs/'
                    },
                    {
                        from: '../img/',
                        to: '../imgs/'
                    },
                    {
                        from: './img/',
                        to: '../imgs/'
                    }

                ]
            },

            viewDist: {
                src: ['./dist/resources/view/**/*'],
                overwrite: true,                 // overwrite matched source files 
                replacements: [{
                  from: './view/',
                  to: "./resources/view/"
                }
                ]
            },
            indexDist: {
                src: ['./dist/index.html'],
                overwrite: true,                 // overwrite matched source files 
                replacements: [{
                  from: './view/',
                  to: "./resources/view/"
                }
                ]
            },
            imgDist: {
                src: ['./dist/resources/css/app.min.css','./dist/resources/css/lib.min.css'],
                overwrite: true,                 // overwrite matched source files 
                replacements: [{
                  from: '../imgs/',
                  to: function(){
                    return "../img/";
                  }
                }
                ]
            },

        },
        clean: {
          base: ["dist"],
            options: {
                force: true
            }
        },
        // targethtml: {  
        //     dist: {  
        //         src: 'index.html',  
        //         dest: 'dist/index.html'  
        //     }  
        // },
        targethtml: {
            dist: {
                options: {
                    curlyTags: {
                        rlsdate: '<%= grunt.template.today("yyyymmddss") %>'
                    }
                },
                files: {
                    'dist/index.html': 'index.html'
                }
            }
        },
        htmlmin: {                                     // Task
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
           },
           html: {
             files: [
               {expand: true, cwd: './view/', src: ['**/*.html'], dest: 'dist/resources/view'}
             ]
           }
           
        },
        imagemin: {
            // static: {
            //     options: {
            //         optimizationLevel: 3,
            //         svgoPlugins: [{removeViewBox: false}],
            //         use: [mozjpeg()] // Example plugin usage
            //     },
            //     files: {
            //         'dist/img.png': 'src/img.png',
            //         'dist/img.jpg': 'src/img.jpg',
            //         'dist/img.gif': 'src/img.gif'
            //     }
            // },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'release/imgs'
                }]
            }
        },
        connect: {

            options: {
                port: '9001',
                hostname: 'localhost',
                protocol: 'http',
                open: true,
                base: {
                    path: './',
                    options: {
                        index: './index.html'
                    }
                },
                livereload: false
            },
            proxies: [
                {
                    context: '/crm-prodf/connect',host: ip,port: port,https: false,changeOrigin: true,rewrite: proxyRewrite,
                    headers: {'cookie': cookie,'host': ip+':'+port},
                },
            ],
            default: {},
            proxy: {
                options: {
                    middleware: function (connect, options) {

                        console.log(options)
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function (base) {
                            middlewares.push(serveStatic(base.path, base.options));
                        });

                        // Make directory browse-able.
                        /*var directory = options.directory || options.base[options.base.length - 1];
                         middlewares.push(connect.directory(directory));
                         */
                        return middlewares;
                    }
                }
            }
        },
        watch: {
            build: {
                files: ['less/**/*.less','./js/controller/crmIndex/**/*.js'],
                tasks: ['newer:less','newer:imagemin','newer:concat','newer:autoprefixer:css','newer:replace:release'],
                // tasks: ['less','concat','autoprefixer','replace:release'],
                options: {
                    spawn: false
                }
            }
        }

    });


    /* grunt 加载task配置 */
    var ref = [
        "grunt-connect-proxy",
        "grunt-contrib-connect",
        "grunt-newer",
        "grunt-contrib-clean",
        "grunt-contrib-less",
        "grunt-autoprefixer",
        "grunt-contrib-cssmin",
        "grunt-contrib-copy",
        "grunt-targethtml",
        "grunt-contrib-uglify",
        "grunt-contrib-concat",
        "grunt-text-replace",
        "grunt-contrib-imagemin",
        "grunt-contrib-watch",
        "grunt-contrib-htmlmin"
    ];

    for (i = 0, len = ref.length; i < len; i++) {
        task = ref[i];
        grunt.loadNpmTasks(task);
    }

    // 默认被执行的任务列表。
    //  'uglify', 'cssmin', 'watch'
    grunt.registerTask('default', [
        'less',
        'concat',
        'autoprefixer',
        'replace:release',
        'imagemin',
        'watch',
    ]);

    grunt.registerTask("dist", [
        "clean",
        'less',
        'imagemin',
        'concat',
        'autoprefixer:css',
        'replace:release',
        'cssmin',
        'uglify:libjs',
        // 'uglify:appjs',
        'uglify:cusjs',
        'copy:image',
        'copy:fonts',
        'copy:lkfonts',
        'copy:view',
        'htmlmin',
        'targethtml:dist',
        "replace:routerDist",
        "replace:viewDist",
        "replace:indexDist",
        "replace:imgDist",
        // "replace:dist",
        
    ]);

    grunt.registerTask('staticServer', '启动静态服务......', function () {
        grunt.task.run([
            'less',
            'concat',
            'autoprefixer',
            'replace:release',
            'imagemin',
            'connect:default',
            'watch'
        ]);
    });

    grunt.registerTask('server', '启动代理服务......', function () {
        grunt.task.run([
            'less',
            'concat',
            'autoprefixer',
            'replace:release',
            'imagemin',
            'configureProxies:proxy',
            'connect:proxy',
            'watch'
        ]);
    });

};