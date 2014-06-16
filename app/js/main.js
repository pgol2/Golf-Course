//=== konfiguracja ==============================================

// init parials array
// TO DO - fix this 
ScormCourse.pages[0] = "partials/page0/page0.html";
ScormCourse.pages[1] = "partials/page1/page1.html";
ScormCourse.pages[2] = "partials/page2/page2.html";
ScormCourse.pages[3] = "partials/page3/page3.html";
ScormCourse.pages[4] = "partials/page4/page4.html";


//  correct answers array
ScormCourse.correctAnswers.push('a');
ScormCourse.correctAnswers.push('b');


//=== event listenery ==============================================
// TODO - wrzucic to do modulu kursu


$(document).ready(function () {
    "use strict";
    //Api wrapper call
    var slides = [];
    slides.push("partials/page0/page0.html");
    slides.push("partials/page0/page1.html");
    slides.push("partials/page0/page2.html");
    slides.push("partials/page0/page3.html");
    slides.push("partials/page0/page4.html");

    var config = {
        pages: slides,
        nextButton: '#nextButton',
        previousButton: '#prevButton',
        controlls: '#controls',
        card: '.card',
        content: '.content',
        quiz: {
            mainTag: '#quiz',
            submitBtn: '#quizButton',
            exitBtn: '#exitLesson'
        },
        progressBar: '.progress-'

    };

    ScormCourse.init(config);
     

    

});
