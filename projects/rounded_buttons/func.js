/* http://simon.incutio.com/archive/2004/05/26/addLoadEvent */
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload !== 'function') {
		window.onload = func;
	}
	else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		};
	}
}

/* http://www.dustindiaz.com/getelementsbyclass/ */
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

/* by Jeremy Keith */
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}
	else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function buttonEndings() {
	if (!document.getElementsByTagName) {
		return false
	}
	
	var buttons = getElementsByClass("button");
	/* loop through all buttons and attach a child div */
	for (i=0; i < buttons.length; i++) {
		var div = document.createElement("div");
		div.className = "buttonEnding";
		insertAfter(div, buttons[i]);
	}
}

addLoadEvent(buttonEndings);