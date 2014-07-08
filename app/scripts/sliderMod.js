
function Slider() {
    this.sliderUl = $('.slider').css('overflow', 'hidden').children('ul'),
    this.cards = this.sliderUl.find('.slide'),
    this.cardWidth = 745, //400
    this.cardsLen = this.cards.length,
    this.current = 0,
    this.totalCardsWidth = ( this.cardWidth * this.cardsLen);
}


Slider.prototype.bindEvents = function() {
    
    function getMarginVal(current, itemWidth){
    return current * itemWidth;
    }


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
};

var slider = new Slider();