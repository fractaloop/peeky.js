PEEKY = (function() {
  var peek = {};

  var id = 1;

  var divs = [];

  peek.add_hands = function(parent) {
    var hands = document.createElement('div');
    hands.setAttribute('id',id + "_hands");
    hands.setAttribute('class','_peeky_')
    hands.style.backgroundImage = "url('https://raw.github.com/fractaloop/peeky.js/master/mando-hands.png')";

    hands.style.position = 'absolute';
    hands.style.width = '450px';
    hands.style.height = '96px';
    hands.style.top = 16;
    hands.style.left = 0;
    hands.style.display = 'block';
    hands.style.zIndex = 999999;
    hands.style.opacity = 1;
    hands.style.fontSize = '3em';
    hands.style.color = 'rgb(0, 0, 0, 255)';
    // hands.style.border = '1px solid green';

    // hands.style.top = parent.offset().top;
    // hands.style.left = parent.offset().left;
    // hands.style.zIndex = parent.css("z-index") - 1
    parent.append(hands);

    return $(hands);
  }

  peek.add_head = function(parent) {
    var head = document.createElement('div');
    head.setAttribute('id',id + "_head");
    head.setAttribute('class','_peeky_')
    head.style.backgroundImage = "url('https://raw.github.com/fractaloop/peeky.js/master/mando-head.png')";

    head.style.position = 'absolute';
    head.style.width = '450px';
    head.style.height = '96px';
    head.style.top = 80;
    head.style.left = 0;
    head.style.display = 'block';
    head.style.zIndex = 999999;
    head.style.opacity = 1;
    head.style.fontSize = '3em';
    head.style.color = 'rgb(0, 0, 0, 255)';
    // head.style.border = '1px solid red';

    // head.style.top = parent.offset().top;
    // head.style.left = parent.offset().left;
    // head.style.zIndex = parent.css("z-index") - 1
    parent.append(head);


    return $(head);
  }

  peek.start_hands = function(parent, hands, head) {
    $(hands).animate(
      {top: '-16px'},
      'fast',
      peek.finish_hands(parent, hands, head))
  };

  peek.finish_hands = function(parent, hands, head) {
    return function() {
      $(hands).css("z-index", parent.css("z-index") + 100)
      // parent.css("overflow", "visible")
      $(hands).animate({top: 0}, 'fast', peek.start_head(parent, hands, head))
    }
  }

  peek.start_head = function(parent, hands, head) {
    return function() {
      $(head).css("z-index", parent.css("z-index") + 100)
      // parent.css("overflow", "visible")
      $(head).animate({top: 0}, 'slow', peek.finish_head(parent, hands, head))
    }
  }

  peek.finish_head = function(parent, hands, head) {
    return function() {
      $(hands).css("z-index", parent.css("z-index") + 100)
      // parent.css("overflow", "visible")
      $(head).delay(1000).animate({top: 80}, 'slow', peek.hide_hands(parent, hands, head))
    }
  }

  peek.hide_hands = function(parent, hands, head) {
    return function() {
      $(hands).css("z-index", parent.css("z-index") + 100)
      // parent.css("overflow", "visible")
      $(hands).animate({top: '-16px'}, 'fast', peek.hide_hands_finish(parent, hands, head))
    }
  }

  peek.hide_hands_finish = function(parent, hands, head) {
    return function() {
      $(hands).css("z-index", parent.css("z-index") + 100)
      // parent.css("overflow", "visible")
      $(hands).animate({top: '0'}, 'fast', function() { parent.remove(); })
    }
  }

  $.fn.isOnScreen = function(){
      var viewport = {};
      viewport.top = $(window).scrollTop();
      viewport.bottom = viewport.top + $(window).height();
      var bounds = {};
      bounds.top = this.offset().top;
      bounds.bottom = bounds.top + this.outerHeight();
      return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
  };

  peek.find_root = function() {
    divs = $('div')
      // .not('._peeky_')
      // .not('html')
      .filter(function(i, e) {
      return $(e).isOnScreen() && $(e).offset().top > 0 && $(e).offset().left > 0 ;
    }).filter(':visible')
    div = $(divs[Math.floor(Math.random()*divs.length)])
    console.log("root", div)
    // div.css("border", "4px solid red")
    return div
  }

  peek.peek = function() {
    var div_id = 'peek_' + id;
    divs.push(div_id);

    id++;

    div = peek.find_root();

    var container = document.createElement('div');
    container.setAttribute('id',div_id);
    container.setAttribute('class','_peeky_')
    container.style.position = 'absolute';
    container.style.width = '450px';
    container.style.height = '80px';
    container.style.top = div.offset().top - 80;
    container.style.left = div.offset().left + (Math.random() * div.width() - 450);
    container.style.display = 'block';
    container.style.zIndex = div.css("z-index") - 1
    container.style.opacity = 1;
    container.style.color = 'rgb(0, 0, 0, 255)';
    // container.style.border = '1px dashed black';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    hands = peek.add_hands($(container));
    head = peek.add_head($(container));

    peek.start_hands($(container), $(hands), $(head));
  };

  peek.flip = function(thispeek, rotation) {
    var properties = ['transform', 'WebkitTransform', 'msTransform',
      'MozTransform', 'OTransform'];

    var sides = {0 : 'bottom', 270 : 'right', 180 : 'top', 90 : 'left'};
    thispeek.setAttribute('rel', sides[rotation]);

    for(i in properties) {
      thispeek.style[properties[i]] = 'rotate(' + rotation + 'deg)';
    }
  };

  return peek;
}());

$(function() {
  setTimeout(function() {
    PEEKY.peek();
  }, 1500);
})
