function Stage(x,y,w,h) {

	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;

	this.draw = function(ctx){
		ctx.fillStyle   = '#EFEFEF'; // blue
		ctx.strokeStyle   = '#EFEFEF'; // blue
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.strokeRect(this.x,this.y,this.width,this.height);
	
	}
}