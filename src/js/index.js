import '../scss/style.scss';
import interact from 'interactjs';
import users from './user.js';
import ui from './main.js';

interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    // restrict: {
    //   restriction: "parent",
    //   endOnly: true,
    //   elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    // },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
    	var boxPc = {width: (50 / window.innerWidth) * 100, height: (50 / window.innerHeight) * 100}
    	console.log(boxPc);
    	// console.log(window.innerWidth, window.innerHeight);
    	var rect = event.target.getBoundingClientRect();

    	var top = (rect.top / window.innerHeight) * 100;
    	var right = (rect.right / window.innerWidth) * 100;
    	var bottom = (rect.bottom / window.innerHeight) * 100;
    	var left = (rect.left / window.innerWidth) * 100;
console.log(top, right, bottom, left);
    	if(top < 0 - boxPc.height){console.log('outside top');}
    	if(right > 100 + boxPc.height){console.log('outside right');}
    	if(bottom > 100 + boxPc.height){console.log('outside bottom');}
    	if(left < 0 - boxPc.width){console.log('outside left');}
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;