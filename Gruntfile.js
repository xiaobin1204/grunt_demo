module.exports = function (grunt){
//    grunt.registerTask('default', function(){
//      //console.log('Hello Grunt!');        
//        grunt.log.writeln('Hello Grunt!'); 
//
//    });
    
//    传递参数
//    grunt.registerTask('greet', function(name){      
//        grunt.log.writeln('Hello '+ name ); 
//    });
//    
    //    用warn和fatal方法输出警告
//    grunt.registerTask('greet', function(name){
//       if(name.length < 2){
//           grunt.warn('名字太短了!')
//       }
//       if(name.length = 2){
//           grunt.fatal('不能用两个字的名字!')
//       }
//    });
    
//    定义一个任务去执行其他的任务
//    grunt.registerTask('greet-1', function(){
//        grunt.log.writeln('Hello');
//    })
//    grunt.registerTask('greet-2', function(){
//        grunt.log.writeln('Hola');
//    })
//    grunt.registerTask('greet-3', function(){
//        grunt.log.writeln('你好');
//    })
//    
//    grunt.registerTask('greetAll', ['greet-1', 'greet-2', 'greet-3']);
    
//    使用config配置
    
//    grunt.initConfig({
//       greet: {
//           english: 'Hello'
//       } 
//    });
//    grunt.registerTask('greet', function(){
//       grunt.log.writeln(grunt.config.get('greet.english')); 
//    });
    
//    多次执行的任务, 多任务
    
//    grunt.initConfig({
//       greet: {
//           english: 'Hello',
//           spanish: 'Hola',
//           chinese: '你好'
//       } 
//    });
//    grunt.registerMultiTask('greet', function(){
//       grunt.log.writeln(this.target + ': ' + this.data); 
//    });
    
////    创建目录
//    grunt.registerTask('createFolders', function(){
//       grunt.file.mkdir('dist/stylesheets'); 
//    });
////    删除目录
//    grunt.registerTask('clean', function(){
//       grunt.file.delete('dist'); 
//    });
    
//    读取json
//    grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json')
//    });
//    grunt.registerTask('copyright', function(){
//       var content = grunt.template.process('<%= pkg.name %> 这个项目是由 <%= pkg.author %> 创建的,现在的版本是:<%= pkg.version %>.');
////        写入文件
//        grunt.file.write('copyright.txt', content);
//    });
    
//    加载别的插件
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.initConfig({
        imagemin: {
          dist: {
              expand: true,
              src: 'images/**/*.{png,jpg}',
              dest: 'dist/'
          }  
        },
        cssmin: {
          dist: {
//              目标文件位置
              src: 'dist/stylesheets/style.css',
//              压缩后存放的位置
              dest: 'dist/stylesheets/style.min.css'
          }  
        },
        uglify: {
          dist: {
//              意思是下面concat对象里的js里的dest的值
             src: '<%= concat.js.dest %>',
             dest: 'dist/javascript/app.min.js'
          }  
        },
//        合并文件
        concat: {
          js: {
              options: {
//                  在合并文件的页头和页脚添加一些注释
                banner: '/* hello this is a test about grunt */\n',
                footer: '\n/* The end! */\n',
              },
//              要合并的文件
              src: ['javascript/app.js', 'javascript/modules/module.js'],
              dest: 'dist/javascript/app.js'
          }  
        },
        connect: {
//            可以配置多个server
            server: {
                options: {
                    port: 8000,
//                    根目录
                    base: 'dist',
//                    开启实时预览
                    livereload: true
                }
            }    
        },
        watch: {
          html: {
              files: ['index.html'],
              tasks: ['copy:html'],
//              开启浏览器实时预览
              options: {
                  livereload: true
              }
          }  
        },
        copy: {
//            copy的目标
            html:{
                src: 'index.html',
                dest: 'dist/'
            },
            style: {
                src: 'stylesheets/*.css',
                dest: 'dist/'
            },
            js: {
//                **代表javascript目录下的所有包括子目录
                src: 'javascript/**/*.js',
                dest: 'dist/'
            }
        }
    });
    
//    添加一个任务 来执行connect和watch
    grunt.registerTask('serve', ['connect', 'watch']);
    
//    定义一个新的任务 先执行合并再执行压缩
    grunt.registerTask('build', ['concat', 'uglify']);
}