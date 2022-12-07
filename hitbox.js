class Hitbox{
    constructor(){
      this.x = WINDOW_WIDTH/2;
      this.y = random(100, WINDOW_HEIGHT-200);
      this.c = 255;
    }

    display(){
        rectMode(CENTER);
        fill(255,this.c,0, 150);
        rect(this.x, this.y, 500, 140, 10);
    }
}