class Professor{
    constructor() {
        this.looking = false;
        this.prelook = false;
        this.x = WINDOW_WIDTH-(WINDOW_HEIGHT/3);
        this.y = (3*WINDOW_HEIGHT)/4 - WINDOW_HEIGHT/3;

        this.prelookTime = int(random(200,400)); //prelook 전까지
        this.lookingTime = int(random(25,75)); //prelook에서 looking될때까지
        this.resetTime = int(random(150,200)); //reset될떄까지
        this.onemore = int(random(150,350));
    }
    
    lookback(inputTime) {
        if(inputTime >= this.prelookTime){
            this.prelook = true;
            if (inputTime >= this.lookingTime + this.prelookTime){
                this.looking = true;
              if (inputTime >= this.lookingTime+this.resetTime+this.prelookTime){
                  this.looking = false;
                  this.prelook = false;
                  if(inputTime >= this.lookingTime+this.resetTime+this.prelookTime+this.onemore) {
                    this.prelook = true;
                    if(inputTime >= (2*this.lookingTime)+this.resetTime+this.prelookTime+this.onemore) {
                        this.looking = true;
                        if(inputTime >= (2*this.lookingTime)+(2*this.resetTime)+this.prelookTime+this.onemore) {
                            this.looking = false;
                            this.prelook = false;
                        }
                    }
                  }
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