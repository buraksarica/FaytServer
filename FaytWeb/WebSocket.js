String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
}



function connectSocketServer(url) {
    var messageBoard = $('#messageBoard');

    var support = "MozWebSocket" in window ? 'MozWebSocket' : ("WebSocket" in window ? 'WebSocket' : null);

    if (support == null) {
        alert(noSupportMessage);
        messageBoard.append("* " + noSupportMessage + "<br/>");
        return;
    }

    messageBoard.append("* Connecting to server ..<br/>");
    // create a new websocket and connect
    ws = new window[support](url);

    // when data is comming from the server, this metod is called
    ws.onmessage = function (evt) {
        //messageBoard.append("# " + evt.data + "<br />");
        if (evt.data.indexOf("System", 0) > -1) {
            if (evt.data.indexOf("System-disconnected", 0) > -1) {
                var spl = evt.data.split(':');
                delete otherBoxes[spl[1]];
            }
            return;

        }

        var splitted = evt.data.split(':');
        splitted[0] = splitted[0].trim();
        var tmpDirs = $.parseJSON(splitted[1]);
        if (otherBoxes[splitted[0]]) {
            otherBoxes[splitted[0]].box.activeDirection = tmpDirs.slice(0, 4);
            otherBoxes[splitted[0]].box.face = tmpDirs[6];
            otherBoxes[splitted[0]].box.Nick = tmpDirs[7];
            otherBoxes[splitted[0]].box.color = tmpDirs[8];
            otherBoxes[splitted[0]].box.rotation = tmpDirs[9];

            if (otherBoxes[splitted[0]].box.activeDirection[0] + otherBoxes[splitted[0]].box.activeDirection[1] + otherBoxes[splitted[0]].box.activeDirection[2] + otherBoxes[splitted[0]].box.activeDirection[3] == 0) {
                otherBoxes[splitted[0]].box.x = tmpDirs[4];
                otherBoxes[splitted[0]].box.y = tmpDirs[5];
            }
        }
        else {
            otherBoxes[splitted[0]] = new Object();
            otherBoxes[splitted[0]].sessionId = splitted[0];
            otherBoxes[splitted[0]].box = new Box(tmpDirs[4], tmpDirs[5], 50, 50, '#FFF');
            otherBoxes[splitted[0]].box.activeDirection = tmpDirs.slice(0, 4);
            otherBoxes[splitted[0]].box.face = tmpDirs[6];
            otherBoxes[splitted[0]].box.Nick = tmpDirs[7];
            otherBoxes[splitted[0]].box.color = tmpDirs[8];
            otherBoxes[splitted[0]].box.rotation = tmpDirs[9];
        }
        //scrollToBottom(messageBoard);
    };

    // when the connection is established, this method is called
    ws.onopen = function () {
        messageBoard.append('* Connection open<br/>');
    };

    // when the connection is closed, this method is called
    ws.onclose = function () {
        messageBoard.append('* Connection closed<br/>');
    }
}