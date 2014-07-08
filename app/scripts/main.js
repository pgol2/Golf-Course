/* global ScormCourse:true */
/* global Handlebars:true */

/*=== TODO ==============================================
- slider poprawic
- loader
- ladowanie lekcji i linkowanie lekcji na podstawie adresu
- napis Ustawienie przy ustawienach rozwiajajcy sie
- volume controlls zrobic
*/

//=== event listenery ==============================================
// TODO - wrzucic to do modulu kursu

$(document).ready(function () {
    'use strict';
    //Api wrapper call
    // var slides = [];
    // slides.push('partials/page0/page0.html');
    // slides.push('partials/page0/page1.html');
    // slides.push('partials/page0/page2.html');
    // slides.push('partials/page0/page3.html');
    // slides.push('partials/page0/page4.html');

//    var config = {
//        pages: slides,
//        nextButton: '#nextButton',
//        previousButton: '#prevButton',
//        controlls: '#controls',
//        card: '.card',
//        content: '.content',
//        quiz: {
//            mainTag: '#quiz',
//            submitBtn: '#quizButton',
//            exitBtn: '#exitLesson'
//        },
//        progressBar: '.progress-'
//
//    };
//    ScormCourse.init(config);
//    
    // new course main ==============================
    var lessons = [];
    lessons.push('data/lesson0.json');
    lessons.push('data/lesson1.json');
    lessons.push('data/lesson2.json');
    lessons.push('data/lesson3.json');
    lessons.push('data/lesson4.json');

    var templatesHTML = [];
    templatesHTML.push($('#contentList').html());
    templatesHTML.push($('#panelTitle').html());
    templatesHTML.push($('#mainContent').html());
    templatesHTML.push($('#controllsInfo').html());

    //tutaj kompiluje szalbony do uzycia
    var templatesCompiled =  [];
    for(var i=0; i<templatesHTML.length; i++) {
        templatesCompiled.push(Handlebars.compile(templatesHTML[i]));
    }

    var config = {

        lessons: lessons,
        leftPanelData: 'data/lessons.json',
        templates: templatesCompiled,

        //tag for appending templates
        content: '.main-content',
        panelContent: '.panel-content',
        panelTitle: '.panel-title',
        controllsInfo: '.controlls-info',


        //controlls
        nextLessonBtn: '#nextButton',
        previousLessonBtn: '#prevButton',
        progressBar : '.progress-bar'
    };
    
    ScormCourse.init(config);
    // new course main end  ==============================
     


    // //ladoing left data for left panel
    // var leftListData = $.ajax('data/lessons.json').success(function(data) {

    //     var html = ScormCourse.templates[0];
    //     $('.panel-content').html(html(data))
    // });

    // var panelTitleData = $.ajax('data/lesson0.json').success(function(data) {

    //     var htmlPanelLeft = ScormCourse.templates[1];
    //     $('.panel-title').html(htmlPanelLeft(data));

    //      var htmlSlides = ScormCourse.templates[2];
    //      $('.main-content').html(htmlSlides(data));

    //     var htmlControlls = ScormCourse.templates[3];
    //     $('.controlls-info').html(htmlControlls(data));

    // });

    $('.tooltipLink').tooltip();



});
