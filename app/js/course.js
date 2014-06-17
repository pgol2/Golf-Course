var ScormCourse = (function() {
    'use strict';
    
    var Course = {
        pages: [],
        currentPage: 0,
        correctAnswers: [],
        init : function(config) {
            pipwerks.SCORM.init();
            Course.config = config;
            Course.bindEvents();
        },
        bindEvents : function() {

            $(Course.config.nextButton).on('click', function(e) {
                e.preventDefault();
                Course.getPage(++Course.currentPage);
            });

            $(Course.config.previousButton).on('click', function(e) {
                e.preventDefault();
                Course.getPage(--Course.currentPage);
            });

            if ("onhashchange" in window) {
                //  each slide url is lesson1.html#3
                //  we bind change of window.location.hash and
                //  get corresonding partial when page id is changed
                window.onhashchange = Course.locationHashChanged;
            }

            // chandle quiz submition
            $(Course.config.card).on('click', Course.config.quiz.submitBtn, function (event) {
                event.preventDefault();
                var formOut = $(Course.config.quiz.mainTag).serializeArray();
                var score = Course.checkQuiz(formOut, Course.correctAnswers);
                $('.modal-content').html("twój wynik to: " + score);
            });

            $(Course.config.card).on("click", Course.config.quiz.exitBtn, function (event) {
                event.preventDefault();
                pipwerks.SCORM.quit();
            });
        },

        getPage : function(index) {

            Course.currentPage = index;
            if( (index >= 0 ) && (index < Course.pages.length) ) {
                $.ajax({
                    url: Course.pages[index]
                }).done(function(html) {
                    $(Course.config.content).html(html);
                });
                Course.updateProgressBar();
                Course.changeHash(index);
            }
        },

       

        changeHash : function(pageId) {

            window.location.hash = pageId;
        },

        locationHashChanged : function() {

            var partialID = location.hash.substr(location.hash.indexOf('#')+1, location.hash.length);
            Course.getPage(partialID);
            Course.updateContentList(partialID);

        },

        updateContentList : function(pageId) {

            var li = $('.content-list').find('li')[pageId];
            $(li).addClass('visited');
        },

        updateProgressBar : function () {

            var val = (Course.currentPage) * 100 / (Course.pages.length - 1);
            $(".progress-bar").css("width", val + '%');
        },

        checkQuiz : function(quizAnswers, correct) {

            var good = 0,
                i = 0;
            for( i = 0; i < quizAnswers.length; i++) {
                if( (quizAnswers[i].value).toLowerCase() === correct[i] ){
                    good++;
                }
            }
            var score = (good / quizAnswers.length);
            score *= 100;
            if(isNaN(score)) {
                return 'nie zanaczono wszystkich odp';
            }
            var bookmark = pipwerks.SCORM.get("cmi.core.lesson_location");

            if( score === 100 ) {
                pipwerks.SCORM.status("set", "completed");
            }

            score += " %";
            return score;
        }
    };
    return Course;
})();