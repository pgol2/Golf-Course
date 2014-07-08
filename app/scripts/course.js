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

var ScormCourse = (function() {
    'use strict';
    
    var Course = {
        currentLesson: 0,
        lessonSlides: 0,
        init: function(config) {
            //TODO -  add scorm init 
            Course.config = config;
            Course.bindEvents();
            Course.getLeftMenu();            

            Course.getLesson(0);
        },
        bindEvents: function() {


            if ('onhashchange' in window) {
                //  each slide url is lesson1.html#3
                //  we bind change of window.location.hash and
                //  get corresonding partial when page id is changed
                window.onhashchange = Course.locationHashChanged;
            }

            $(Course.config.previousLessonBtn).on('click', function(e) {
                e.preventDefault();
                if(Course.currentLesson > 0) {
                    Course.getLesson(--Course.currentLesson)
                }
            });

            $(Course.config.nextLessonBtn).on('click', function(e) {
                e.preventDefault();
                if(Course.currentLesson < Course.config.lessons.length - 1 ) {
                 Course.getLesson(++Course.currentLesson)
                }
            });

            //TODO add chandling quiz

        },

        getLesson: function(index) {
           
            Course.currentLesson = index;
            if( (index >= 0) && (index < Course.config.lessons.length) ) {

                
                $.ajax({
                    url : Course.config.lessons[index]
                }).done(function(jsonData) {

                    var htmlPanelTitle = Course.config.templates[1](jsonData);
                    $(Course.config.panelTitle).html(htmlPanelTitle)

                    // glowny content lekcji 
                    var htmlSlides = Course.config.templates[2](jsonData);
                    $(Course.config.content).html(htmlSlides);

                    var controllsInfo = Course.config.templates[3](jsonData);
                    $(Course.config.controllsInfo).html(controllsInfo);

                }).fail(function() {
                    console.log('fail');
                });

                Course.lessonSlides = Course.getSlidesLength(index);

            }
            //TODO update progress bar
            Course.changeHash(index);
        },

        getLeftMenu: function() {

            $.ajax({
                url: Course.config.leftPanelData
            }).done(function(data) {
                var leftList = Course.config.templates[0](data);
                $(Course.config.panelContent).html(leftList);
            });
        },

        changeHash: function(lessonId) {

            window.location.hash = lessonId;
        },

        //wykrywanie zman id w pasku adresu 
        locationHashChanged: function() {
            var lessonId = location.hash.substr(location.hash.indexOf('#')+1, location.hash.length);
            Course.getLesson(lessonId);
            //TODO update list on the left
        },

        getSlidesLength: function(lessonIndex) {

            var len = 0;
            $.ajax({
                url: Course.config.lessons[lessonIndex]
            }).done(function(dataJson) {
                len = dataJson.slides.length;
            });

            return len;
        }    
    };
    return Course;
})();