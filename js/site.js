// Author: Marc Grabanski
// http://marcgrabanski.com
// Please give credit where credit is due.
// Enjoy!!

var basePath = path ? path : null;
var ajaxRequest = {
    deleteMessage: function(obj) {
        ajaxRequest.func = 'deleteMessage';
        var id = obj.parentNode.id;
        ajaxRequest.linkid = id;
        postVars = 'id='+id;
        ajaxRequest.sendRequest(postVars, basePath + 'delete.php');
    },
    addMessage: function() {
        ajaxRequest.func = 'addMessage';
        var subject = removeTags(document.getElementById("subject").value);
        var desc = removeTags(document.getElementById("description").value);
        var error = '';
        if (subject.length < 1) { 
            error += 'please enter a subject\n'; 
        } else if (subject.length > 45) {
            error += 'your subject is too long\n';
        }
        if (desc.length < 1) { 
            error += 'please enter a description\n'; 
        } else if (desc.length > 300) {
            error += 'your description is too long\n';
        }
        if (error == '') {
            postVars = "subject=" + subject + "&description=" + desc;
            ajaxRequest.sendRequest(postVars, basePath + 'insert.php');
        } else {
            alert(error);
        }
    },
    updateMessage: function (obj) {
        ajaxRequest.func = 'updateMessage';
        var cl = obj.getAttribute('class'); //moz get class
        if (!cl) { cl = obj.getAttribute('className')}; //ie get class
        var pNode = obj.parentNode;
        var postVars = 'id='+pNode.id;
        if (cl.indexOf('DBsub') > -1) {
            if (obj.value.length > 50) { return false };
            postVars += '&subject='+removeTags(obj.value);
        }
        if (cl.indexOf('DBdesc') > -1 ) {
            if (obj.value.length > 300) { return false };
            postVars += '&description='+removeTags(obj.value);
        }
        ajaxRequest.sendRequest(postVars, basePath + 'update.php');
    },
    sendRequest: function (postVars, url) {
        request.open("POST", url, true);
        request.onreadystatechange = ajaxRequest.response;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(postVars);
    },
    response: function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                switch (ajaxRequest.func) {
                    // ------Delete Message Function-----------
                    case 'deleteMessage' :
                        var d = document.getElementById('messages');
                        d.removeChild(document.getElementById(ajaxRequest.linkid));
                        break;
                        // -------Add Message Function-------------
                    case 'addMessage' :
                        var xmlDoc = request.responseXML;
                        var msgid = xmlDoc.getElementsByTagName('messageid')[0].firstChild.nodeValue;
                        var subj = xmlDoc.getElementsByTagName('subject')[0].firstChild.nodeValue;
                        var desc = xmlDoc.getElementsByTagName('description')[0].firstChild.nodeValue;
                        
                        var html = '<label>Subject:</label>';
                        html += '<p class="DBsub">'+subj+'</p>';
                        html += '<label>Description:</label>';
                        html += '<p class="DBdesc">'+desc+'</p>';
                        html += '<a class="delete" onclick="ajaxRequest.deleteMessage(this)"></a>';
                        
                        var messageDiv = document.createElement('div');
                        messageDiv.className = 'message';
                        messageDiv.id = msgid;
                        messageDiv.innerHTML = html;
                        
                        document.getElementById('messages').insertBefore(messageDiv, document.getElementById('messages').firstChild);
                        
                        document.forms[0].reset();
                        textEdit.init();          
                        break;
                        //---------- Update Message Function-------------
                    case 'updateMessage' : 
                        break;
                    default : alert('Error with Response');
                }
            } else {
                var message = request.getResponseHeader("Status");
                if ((message == null) || (message.length <= 0)) {
                    alert("Error! Request status is " + request.status);
                } else {
                    alert(message);
                }
            }
        }
    } // end ajaxRequest.response
}

var textEdit = {
    init: function() {
        var x = document.getElementById('messages');
        var p = x.getElementsByTagName('p');
        for (var i=0; i < p.length; i++) {
            p[i].onclick = function () {
                textEdit.exchange(this, 'textarea', this.innerHTML);
            }
            p[i].onmouseover = function () {
                this.style.backgroundColor = '#ddd';
            }
            p[i].onmouseout = function () {
                this.style.backgroundColor = 'transparent';
            }
        }
        // setup rollovers
        var a = x.getElementsByTagName('a');
        for (var i=0; i < a.length; i++) {  
            a[i].onmouseover = function () {
                this.style.backgroundImage = 'url(' + basePath + 'img/corner_over.gif)'
            }
            a[i].onmouseout = function () {
                this.style.backgroundImage = 'url(' + basePath + 'img/corner_over.gif)'
            }
        }
    },
    setupTextarea: function(size) {
        var q = document.getElementById('editor');
        if (q != null) {
            q.onblur = function () {
                ajaxRequest.updateMessage(this);
                textEdit.exchange(this, 'p', this.value);
            }
        }
    },
    exchange: function (obj, tag, txt) {
        var cl = obj.getAttribute('class'); // moz get class
        if (!cl) { cl = obj.getAttribute('className')}; // ie get class
        var pNode = obj.parentNode;
        var newObj = document.createElement(tag);
        if(tag=='textarea') {
            with(newObj) {
                var x = Math.round(txt.length / 20);
                if (x == 1) { x++; };
                innerHTML = removeTags(txt);
                className = cl;
                style.width = 190+'px';
                id = 'editor';
            }
        } else {
            with(newObj) {
                innerHTML = removeTags(txt);
                className = cl;
                id = '';
            }
        }
		if(newObj.innerHTML.length > 300) {
			alert('Message too long, sorry');
		} else {
        	pNode.replaceChild(newObj, obj);
		}
		newObj.focus();
        // stupid fix for ie
        var q = document.getElementById('editor');
        if (q != null) {
            q.focus();
        } // end stupid fix for ie
        textEdit.init();
        textEdit.setupTextarea();
    }
}

addEvent(window,"load",textEdit.init);