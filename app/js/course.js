var ScormCourse = {
    pages: [],
    currentPage: 0,
    correctAnswers: []
};


ScormCourse.getNextPage = function() {

    if(ScormCourse.currentPage < ScormCourse.pages.length) {
        $.ajax({
          url: ScormCourse.pages[ScormCourse.currentPage]
      }).done(function(html) {
       $('.content').html(html);
   });
      ScormCourse.currentPage++;
      ScormCourse.updateProgressBar();
      ScormCourse.changeHash(ScormCourse.currentPage);
  }
};

ScormCourse.getPages = function() {

  function appendHelper(html) {
      var div = $('<div class="content clearfix hide"></div>');
      div.append(html);
      $('.card').append(div);    
  }

  for(var i = 0; i < ScormCourse.pages.length; i++) {
    console.log('get pages');
    $.ajax({
      url: ScormCourse.pages[i]
    }).done(appendHelper);
  }
};


ScormCourse.getNext = function(index) {

  // addClass hide to current 
  // .content div
  // remov class hide from the next div

  //we need to set current page
  ScormCourse.currentPage = index;  

};
ScormCourse.getPreviousPage = function() {

 if(ScormCourse.currentPage > 0) {
    ScormCourse.currentPage--;
    $.ajax({
      url: ScormCourse.pages[ScormCourse.currentPage]
    }).done(function(html) {
     $('.content').html(html);
   });
    ScormCourse.updateProgressBar();
    ScormCourse.changeHash(ScormCourse.currentPage);
  }
};

ScormCourse.getPage = function(index) {

  ScormCourse.currentPage = index;
  if( (index >= 0 ) && (index < ScormCourse.pages.length) ) {
    $.ajax({
      url: ScormCourse.pages[index]
    }).done(function(html) {
      $('.content').html(html);
    });
    ScormCourse.updateProgressBar();
    ScormCourse.changeHash(index);
  }
};

ScormCourse.changeHash = function(pageId) {

  window.location.hash = pageId;
};

ScormCourse.locationHashChanged = function() {

  var partialID = location.hash.substr(location.hash.indexOf('#')+1, location.hash.length);
  ScormCourse.getPage(partialID);
  ScormCourse.updateContentList(partialID);
  
};

ScormCourse.updateContentList = function(pageId) {

  var li = $('.content-list').find('li')[pageId];
  $(li).addClass('visited');
};

ScormCourse.updateProgressBar = function () {

  var val = (ScormCourse.currentPage) * 100 / (ScormCourse.pages.length - 1);
  $(".progress-bar").css("width", val + '%');
};

ScormCourse.checkQuiz = function(quizAnswers, correct) {

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
};





