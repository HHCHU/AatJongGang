class PlayerHorizonal{
 
    constructor(){
        this.x = -200;
        this.y = (3*WINDOW_HEIGHT)/4;
        this.speed = 6;
        this.sit = false;
        this.moving = false;
    }
 
    update(){
        this.controller();
        if(this.x > WINDOW_WIDTH-(WINDOW_HEIGHT/3) - 50){ // 1820이 교수님 위치 + padding
            return true;
        }else {
            return false;
        }
    }

    toKickStage() {
        ;
    }
 
    controller(){
        if(keyIsDown(RIGHT_ARROW)){
            if(this.sit) {}
            else {this.x += this.speed;}
            this.moving = true
        }
        else if(keyIsDown(UP_ARROW)) {
            this.sit = false;
        }
        else if(keyIsDown(DOWN_ARROW)) {
            this.sit = true;
            soundsit.play();
        }
        else{
            this.moving = false
        }
    }

    display() {
        if(this.sit) { // sitted
            image(imgsquat, this.x, this.y-WINDOW_HEIGHT/4, WINDOW_WIDTH/4, WINDOW_WIDTH/4);
        }
        else if(!this.moving){
            image(imgwalks[2],this.x, this.y-WINDOW_HEIGHT/3, WINDOW_WIDTH/4, WINDOW_WIDTH/4)
        }
        else{
            if((int(millis()/200)%4)==0){
                image(imgwalks[0],this.x, this.y-WINDOW_HEIGHT/3, WINDOW_WIDTH/4, WINDOW_WIDTH/4)
            }
            else if((int(millis()/200)%4)==1){
                image(imgwalks[1],this.x, this.y-WINDOW_HEIGHT/3, WINDOW_WIDTH/4, WINDOW_WIDTH/4)
            }
            else if((int(millis()/200)%4)==2){
                image(imgwalks[2],this.x, this.y-WINDOW_HEIGHT/3, WINDOW_WIDTH/4, WINDOW_WIDTH/4)
            }
            else if((int(millis()/200)%4)==3){
                image(imgwalks[3],this.x, this.y-WINDOW_HEIGHT/3, WINDOW_WIDTH/4, WINDOW_WIDTH/4)
            }
        }
    }
}