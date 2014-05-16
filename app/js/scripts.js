"use strict";

var pages = [],
currentPage = 0,
correctAnswers = [];


pages[0] = "partials/page0/page0.html";
pages[1] = "partials/page1/page1.html";
pages[2] = "partials/page2/page2.html";
pages[3] = "partials/page3/page3.html";
pages[4] = "partials/page4/page4.html";


//poprawe odpowiedzi
correctAnswers.push('a');
correctAnswers.push('b');

function checkQuiz(quizAnswers, correct) {

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
  score += " %";
  return score;
}

function updateProgressBar() {
  var val = (currentPage) * 100 / (pages.length);
  $(".progress-bar").css("width", val + '%');
}


function getNextPage() {
 if(currentPage < pages.length) {
    $.ajax({
      url: pages[currentPage]
    }).done(function(html) {
     $('.content').html(html);
     });
      currentPage++;
      updateProgressBar();
      changeHash(currentPage);
  }
}


function getPreviousPage() {
 if(currentPage > 0) {
    currentPage--;
    $.ajax({
      url: pages[currentPage]
    }).done(function(html) {
     $('.content').html(html);
   });
    updateProgressBar();
    changeHash(currentPage);
  }
}

function getPage(index) {
  if( (index > 0 ) && (index < pages.length) ) {
    console.log(index);
  }
}
function changeHash (pageId) {
  window.location.hash = pageId;
}

$(document).ready(function() {

  $('#nextButton').on("click", function(e) {
    e.preventDefault();
    getNextPage();
  });
  $('#prevButton').on("click", function(e) {
    e.preventDefault();
    getPreviousPage();
  });

    //chandle form subimition 
    $('.container').on('click', '#quizButton', function (e) {
      e.preventDefault();
      var formOut = $('#quiz').serializeArray(); 
      var score = checkQuiz( formOut, correctAnswers);  
      $('.modal-body').html("twój wynik to: " + score);
      console.log(score);
    });


    // API.LMSInitialize("");
    // API.LMSSetValue('cmi.core.lesson_status','completed');
    // API.LMSCommit("");

    // pipwerks.SCORM.connection.initialize();
    // pipwerks.SCORM.data.set('cmi.core.lesson_status','completed');
    // pipwerks.SCORM.data.save();

  });


/*
to do:
1)var vid = document.querySelector('video');
    vid.addEventListener("ended", function() {
      console.log("koniec filmiku!");
    });
2) drag and drop

bajery it p
listenery na video
*/