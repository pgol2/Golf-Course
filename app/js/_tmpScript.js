/*jslint browser: true*/
/*global $, jQuery, alert*/
/*jshint strict:false */

var pages =  [];
pages.push("partials/page0/page0.html");
pages.push("partials/page1/page1.html");
pages.push("partials/page2/page2.html");
pages.push("partials/page3/page3.html");
pages.push("partials/page4/page4.html");

var config  = {
  container: $('.container'),
  card: $('.content'),
  btnNext: $('#nextButton'),
  btnPrev: $('#prevButton'),
  pbar: $('.bar'),
  pagesArray: pages
};


var Quiz = (function () {

  var pages = config.pagesArray,
      currentPage = 0,

      //metody
      setLocationHash =  function(value) {
        location.hash = value;
      },

      loadPartials = function() {

        function appendHelper(html) {
          console.log(config.container.html());
          config.container.append(html);
        }

        for(var i = 0; i < pages.length; i++) {
          $.ajax({
            url: pages[i]
          }).done(appendHelper);
        }
      },

      getNextPartial = function(partialNode) {

        if(currentPage < pages.length) {
          //get next partial
          partialNode.eq(currentPage).hide();
          currentPage++;
          partialNode.eq(currentPage).show();

          //update adress
          setLocationHash(currentPage);

          //update progress bar
          updateProgressBar();
        }
      },

      getPreviousPartial = function(partialNode) {

        if(currentPage > 0) {
          //get next
          partialNode.eq(currentPage).hide();
          currentPage--;
          partialNode.eq(currentPage).show();

          //update adress
          setLocationHash(currentPage);

          updateProgressBar();
        }
      },

      updateProgressBar = function() {
        var val = (currentPage) * 100 / (pages.length);
        config.pbar.css('width', val + '%');
      };

      loadPartials();
  return {
    next: getNextPartial,
    prev: getPreviousPartial
  };
})(config);


$(document).ready(function() {
  $('#nextButton').on("click", function() {
    Quiz.next(config.card);
  });
  $('#prevButton').on("click", function() {
    Quiz.prev(config.card);
  });
});