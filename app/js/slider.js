$(function () {
    var sliderUl = $('.slider').css('overflow', 'hidden').children('ul'),
        cards = sliderUl.find('.slide'),
        cardWidth = cards.first().width(), //400
        cardsLen = cards.length,
        current = 0,
        totalCardsWidth = ( cardWidth * cardsLen);
    console.log('cardWidth ' + cardWidth);

    $('#nextButtonSlide').on('click', function() {
       $('.content').find('ul').animate({'margin-left' : '-940px'});
    });

    $('#prevButtonSlide').on('click', function() {
        $('.content').find('ul').animate({'margin-left' : '0'});
    });


    function transition(container, loc, dir) {
        var unit; // += or -=

        if (dir && loc !== 0) {
            unit = (dir === 'next') ? '-=' : '+=';
        }

        container.animate({
            'margin-left': unit ? (unit + loc) : loc
        });
    }
});