

var sliderUl = $('.slider').css('overflow', 'hidden').children('ul'),
    cards = sliderUl.find('.slide'),
    cardWidth = 745, //400
    cardsLen = cards.length,
    current = 0,
    totalCardsWidth = ( cardWidth * cardsLen);


$('#nextButtonSlide').on('click', function(e) {
    e.preventDefault();
    var maxVal = ($('.content').find('li')).length - 1 ;
    if(current < maxVal ) {
        var val = getMarginVal(++current, cardWidth);
        console.log('val: ' + val);
        $('.content').find('ul').animate({'margin-left' : '-' + val + 'px'});
    }
});


$('#prevButtonSlide').on('click', function(e) {
   e.preventDefault();
    if(current > 0 ) {
        var val = getMarginVal(--current, cardWidth);
        console.log('val: ' + val);
        $('.content').find('ul').animate({'margin-left' : val + 'px'});
    }
});


function getMarginVal(current, itemWidth){
    return current * itemWidth;
}

function transition(container, loc, dir) {
    var unit; // += or -=

    if (dir && loc !== 0) {
        unit = (dir === 'next') ? '-=' : '+=';
    }

    container.animate({
        'margin-left': unit ? (unit + loc) : loc
    });
}
