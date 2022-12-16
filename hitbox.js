class Hitbox{
    constructor(){
      this.x = WINDOW_WIDTH/2;
      this.y = random(100, WINDOW_HEIGHT-200);
      this.c = 255;
      this.height = 140/2;
      this.halfHeight = this.height/2;
    }

    display(){
        rectMode(CENTER);
        fill(255,this.c,0, 150);
        rect(this.x, this.y, 400, this.height, 10);
    }
}