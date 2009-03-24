// Author: Marc Grabanski
// http://marcgrabanski.com
// Please give credit where credit is due.
// Enjoy!!

/* Shared javascript objects and functions */
// Calls 'func' on 'eventName' in 'obj'
function addEvent(obj, eventName, func)
{
	if(obj.addEventListener)
		return obj.addEventListener(eventName, func, true);
	else if(obj.attachEvent)
	{
		obj.attachEvent("on" + eventName, func);
		return true;
	}
	return false;
}

// Standard Ajax Request Object
var request = null;
try {
    request = new XMLHttpRequest();
} catch (trymicrosoft) {
    try {
        request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (othermicrosoft) {
        try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (failed) {
            request = null;
        }
    }
}
if (request == null)
    alert("Error creating request object!");

/* set text in an element */
function replaceText(el, text) {
    if(el != null) {
        clearText(el);
        var newNode = document.createTextNode(text);
        el.appendChild(newNode);
    }
}

function clearText(el) {
    if (el != null) {
        if (el.childNodes) {
            for (var i = 0; i < el.childNodes.length; i++) {
                var childNode = el.childNodes[i];
                el.removeChild(childNode);
            }
        }
    }
}

function removeTags(str){
	str = str.replace(/&(lt|gt);/g, function (strMatch, p1){
		return (p1 == "lt")? "<" : ">";
	});
	str = str.replace(/<\/?[^>]+(>|$)/g, "");
	return str;
}