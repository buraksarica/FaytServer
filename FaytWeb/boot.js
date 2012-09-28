var canvas;
var context;
var boxSpeed = 5;
var box = new Array(4);
var myBox = new Box(0, 0, 50, 50, '#' + Math.floor(Math.random() * 16777215).toString(16));
var myStage = new Stage(0, 0, 640, 480);
var otherBoxes = new Object();
var noSupportMessage = "Your browser cannot support WebSocket!";
var ws;


function sendDirection() {
    if (ws) {
        var boxInfo = new Array(10);
        boxInfo[0] = myBox.activeDirection[0];
        boxInfo[1] = myBox.activeDirection[1];
        boxInfo[2] = myBox.activeDirection[2];
        boxInfo[3] = myBox.activeDirection[3];
        boxInfo[4] = myBox.x;
        boxInfo[5] = myBox.y;
        boxInfo[6] = myBox.face;
        boxInfo[7] = myBox.Nick;
        boxInfo[8] = myBox.color;
        boxInfo[9] = myBox.rotation;
        ws.send($.toJSON(boxInfo));
    }
}



$(document).ready(function () {

    myBox.Nick = window.prompt("mIRC nickiniz : ");


    connectSocketServer('ws://195.87.214.65:2011/sample');
    canvas = document.getElementById('myCanvas');

    if (canvas && canvas.getContext) {
        context = canvas.getContext('2d');
        if (context) {
            Draw();
        }
    }


    Update();



});



function Clear() {
    context.clearRect(myStage.x, myStage.y, myStage.width, myStage.height);
}
function Draw() {
    Clear();
    myStage.draw(context);
    for (var b in otherBoxes) {
        if (otherBoxes[b].box)
            otherBoxes[b].box.draw(context);
    }
    
    myBox.draw(context);


}

function Update() {

    window.setTimeout(function () {
        Update();
    }, 50);

    myBox.update(boxSpeed);

    for (var odi in otherBoxes) {
        var od = otherBoxes[odi];

        od.box.update(boxSpeed);
    }

    Draw();
    $('#messageBoard').text($.toJSON(otherBoxes));
    $('#messageBoard').append("<br/><br/>");
    $('#messageBoard').append($.toJSON(myBox));
    $('#messageBoard').append("<br/><br/>");
    $('#messageBoard').append(myBox.Nick);
    $('#messageBoard').append("<br/><br/>");
    $('#messageBoard').append(myBox.rotation);
    return false;

}

$(document).keyup(function (e) {

    myBox.keyUp(e.keyCode);
    sendDirection();
    return false;
});

$(document).keydown(function (e) {

    myBox.keyDown(e.keyCode);
    sendDirection();
    return false;
});























	
	