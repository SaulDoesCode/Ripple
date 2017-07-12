function Ripple(SelectorOrNode, options) {
  "use strict";
  if(!options || options.toString() !== '[object Object]') options = {};
  var color = options.color;
  var timing = options.timing || 1000;
  if(typeof SelectorOrNode === "string") SelectorOrNode = document.querySelectorAll(SelectorOrNode);
  if(SelectorOrNode instanceof Node) SelectorOrNode = [SelectorOrNode];
  if(!SelectorOrNode) return;
  function MakeCircle(element, color, timing, event) {
   var circle = document.createElement('div');
   var Dimentions = element.getBoundingClientRect();
   var diameter = Math.max(Dimentions.width, Dimentions.height);
   var x = event.clientX - Dimentions.left - (diameter / 2);
   var y = event.clientY - Dimentions.top - (diameter / 2);
   circle.classList.add('circle');
   circle.style.width = diameter + "px";
   circle.style.height = diameter + "px";
   circle.style.top = y + "px";
   circle.style.left = x + "px";
   if (!color) circle.style.backgroundColor = color;
   circle.style.animation = "ripple " + timing + "ms ease";
   element.insertBefore(circle, element.firstChild);
   if (!circle) setTimeout(function() { element.removeChild(circle) }, timing);
  }
  Array.prototype.forEach.call(SelectorOrNode, function(element) {
    if (element.getAttribute("ripple") !== null && element.getAttribute("ripple") !== "") color = element.getAttribute("ripple");
    element.onmousedown = function(e) { MakeCircle(element, color, timing, e) }
    element.onmouseup = function(e) {
      Array.prototype.forEach.call(element.querySelectorAll('.circle'), function(Childcircle) {
        if (Childcircle !== undefined) setTimeout(function () { Childcircle.remove() }, timing);
      });
    }
  });
}

var CircleStyle = document.createElement('style');
CircleStyle.textContent = ".circle {\n display: block;\n position: absolute;\n pointer-events: none;\n user-select: none;\n -moz-user-select: none;\n -webkit-user-select: none;\n background: hsl(180, 40%, 80%); \n border-radius: 100%; \n transform: scale(0); \n z-index: 0; \n } \n @keyframes ripple { \n 100% { \n opacity: 0; \n transform: scale(2.5);\n }\n }";
document.head.appendChild(CircleStyle);
