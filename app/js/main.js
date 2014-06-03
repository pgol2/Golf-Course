



    // init parials array
    ScormCourse.pages[0] = "partials/page0/page0.html";
    ScormCourse.pages[1] = "partials/page1/page1.html";
    ScormCourse.pages[2] = "partials/page2/page2.html";
    ScormCourse.pages[3] = "partials/page3/page3.html";
    ScormCourse.pages[4] = "partials/page4/page4.html";



    //  correct answers array
    ScormCourse.correctAnswers.push('a');
    ScormCourse.correctAnswers.push('b');


    // when dom is loaded
    $(document).ready(function() {
        "use strict";
        //Api wrapper call
        pipwerks.SCORM.init();



        $('#nextButton').on("click", function(e) {
            e.preventDefault();
            ScormCourse.getNextPage();
        });

        $('#prevButton').on("click", function(e) {
            e.preventDefault();
            ScormCourse.getPreviousPage();
        });


        // check if  onhashchange is supported
        if("onhashchange" in window) {
            //  each slide url is lesson1.html#3
            //  we bind change of window.location.hash and
            //  get corresonding partial when page id is changed
            window.onhashchange = ScormCourse.locationHashChanged;
        }

        // chandle quiz submition
        $('.card').on('click', '#quizButton', function(event) {
            event.preventDefault();
            var formOut = $('#quiz').serializeArray();
            var score = ScormCourse.checkQuiz( formOut, ScormCourse.correctAnswers);
            $('.modal-content').html("twój wynik to: " + score);
            console.log(score);
        });

        //chandle save to SCORM
        $('.card').on("click", '#exitLesson', function(event) {
            event.preventDefault();
            pipwerks.SCORM.quit();
            console.log("SCORM quit");
        });

    });
