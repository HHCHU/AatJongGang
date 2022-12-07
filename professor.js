class Professor{
    constructor() {
        this.looking = false;
        this.prelook = false;
        this.x = WINDOW_WIDTH-(WINDOW_HEIGHT/3);
        this.y = (3*WINDOW_HEIGHT)/4 - WINDOW_HEIGHT/3;

        this.prelookTime = floor(random(500,1000));
        this.lookingTime = floor(random(50,100));
        this.resetTime = floor(random(150,200));
    }
    
    lookback(inputTime) {
        if(inputTime >= this.prelookTime){
            this.prelook = true;
            if (inputTime >= this.lookingTime + this.prelookTime){
                this.looking = true;
              if (inputTime >= this.lookingTime+this.resetTime+this.prelookTime){
                  this.looking = false;
                  this.prelook = false;
              }
            }
        }
    }
    
    display() {
        if(this.looking) {
            image(imgback,this.x,this.y,WINDOW_WIDTH/4, WINDOW_WIDTH/4);
        } else if (this.prelook) {
            image(img6geonghwan,this.x + random(-30,30),this.y + random(-30,30),WINDOW_WIDTH/4, WINDOW_WIDTH/4);
        } else{
            image(img6geonghwan,this.x,this.y,WINDOW_WIDTH/4, WINDOW_WIDTH/4);
        }
    }
}