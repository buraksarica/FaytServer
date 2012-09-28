function Box(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
    this.face = 0;
    this.Nick = "Oyuncu" + Math.floor(Math.random() * 16777215).toString(16);
    this.rotation = 0;

    this.showPunch = false;
    this.punchRange = 15;
    this.punchPower = 1;

    this.isHugged = true;
    this.isHugging = false;

    this.health = 100;


    this.activeDirection = new Array(4);
    this.activeDirection[0] = 0;
    this.activeDirection[1] = 0;
    this.activeDirection[2] = 0;
    this.activeDirection[3] = 0;

    this.update = function (boxSpeed) {


        if (this.activeDirection[0] > 0) {

            this.move(this.x - boxSpeed, this.y);
        }
        if (this.activeDirection[1] > 0) {

            this.move(this.x, this.y - boxSpeed);


        }
        if (this.activeDirection[2] > 0) {

            this.move(this.x + boxSpeed, this.y);

        }
        if (this.activeDirection[3] > 0) {

            this.move(this.x, this.y + boxSpeed);

        }



    }
    this.updateFace = function () {

        if (this.activeDirection[0] == 1 && this.activeDirection[1] == 1) {
            this.face = 4;
            this.rotation = (Math.PI) / 4;
        } else if (this.activeDirection[1] == 1 && this.activeDirection[2] == 1) {
            this.face = 5;
            this.rotation = ((Math.PI) / 4) * 3;
        } else if (this.activeDirection[2] == 1 && this.activeDirection[3] == 1) {
            this.face = 6;
            this.rotation = ((Math.PI) / 4) * 5;
        } else if (this.activeDirection[3] == 1 && this.activeDirection[0] == 1) {
            this.face = 7;
            this.rotation = ((Math.PI) / 4) * 7;
        } else
            if (this.activeDirection[0] == 1) {

                this.face = 0;
                this.rotation = 0;


            } else if (this.activeDirection[1] == 1) {

                this.face = 1;
                this.rotation = (Math.PI / 2);

            } else if (this.activeDirection[2] == 1) {


                this.face = 2;
                this.rotation = Math.PI;

            } else if (this.activeDirection[3] == 1) {

                this.face = 3;
                this.rotation = ((Math.PI / 2) * 3);

            }
    }


    this.keyDown = function (keyCode) {

        if (keyCode == 32) {
            this.showPunch = true;
            this.hitTest();
        }
        if (keyCode == 37) {
            this.activeDirection[0] = 1;

        }
        if (keyCode == 38) {
            this.activeDirection[1] = 1;

        }
        if (keyCode == 39) {
            this.activeDirection[2] = 1;

        }
        if (keyCode == 40) {
            this.activeDirection[3] = 1;


        }
        this.updateFace();

    }

    this.keyUp = function (keyCode) {

        if (keyCode == 32) {
            this.showPunch = false;
        }
        if (keyCode == 37) {
            this.activeDirection[0] = 0;

        }
        if (keyCode == 38) {
            this.activeDirection[1] = 0;

        }
        if (keyCode == 39) {
            this.activeDirection[2] = 0;

        }
        if (keyCode == 40) {
            this.activeDirection[3] = 0;

        }
        this.updateFace();

    }

    this.hitTest = function () {

        for (var i in otherBoxes) {
            if (otherBoxes[i].box.isHugged) {
                if ((Math.sqrt(Math.pow(otherBoxes[i].box.y - this.y + 12, 2) + Math.pow(otherBoxes[i].box.x - this.x - 15, 2)) <= this.punchRange)) {
                    otherBoxes[i].box.health -= this.punchPower;
                    //this.doDamage(otherBoxes[i].sessionId);
                    //alert('');
                }

            }
        }

    }

    this.move = function (x, y) {

        this.x = x;
        this.y = y;

        this.y = Math.min(Math.max(this.y, 0), 480);
        this.x = Math.min(Math.max(this.x, 0), 640);
    }

    this.draw = function (ctx) {

        ctx.save();


        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.translate(-this.x, -this.y);


        ctx.fillStyle = this.color;

        //shoulder
        ctx.beginPath();
        ctx.arc(this.x, this.y - 10, 7, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y + 10, 7, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x - 10, this.y, 5, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        //legs
        ctx.beginPath();
        ctx.arc(this.x - 7, this.y + 6, 5, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x - 7, this.y - 6, 5, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();



        //punch
        if (this.showPunch) {
            ctx.beginPath();
            ctx.arc(this.x - 9, this.y + 12, 6, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x - 15, this.y + 12, 4, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();

        }

        //body
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        //head
        ctx.fillStyle = '#999';

        ctx.beginPath();
        ctx.arc(this.x, this.y, 7, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();


        ctx.restore();

        ctx.fillStyle = this.color;
        ctx.font = 'normal bold 12px sans-serif';
        ctx.textBaseline = 'bottom';
        ctx.fillText(this.Nick + " " + this.health, this.x + 20, this.y - 15);
    }
} 


