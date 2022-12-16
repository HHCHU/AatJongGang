class Obstacle{
    //**obstacle의 x좌표, y좌표, w넓이, h높이 */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
      
    move() {
        this.x -= 9/2;
    }

    rapping() {
        this.x -= random(-4/2,20/2);
    }

    throw() {
        this.x -= 13/2;
    }

    parabola() {
        this.x = this.x - (WINDOW_WIDTH/50);
        this.y = this.y + (WINDOW_HEIGHT/90);
    }


    displayProfessor() {
        if((int(millis()/200)%2)==0){
            image(imgdoh[0],this.x, this.y, this.w, this.h);
        }
        else if((int(millis()/200)%2)==1){
            image(imgdoh[1],this.x, this.y, this.w, this.h);
        }
    }

    displayRapper() {
        if((int(millis()/200)%2)==0){
            image(imgrappers[0],this.x, this.y, this.w, this.h);
        }
        else if((int(millis()/200)%2)==1){
            image(imgrappers[1],this.x, this.y, this.w, this.h);
        }
    }

    displayDomid() {
        if((int(millis()/200)%3)==0){
            image(imgdomids[0],this.x-(WINDOW_WIDTH/5), this.y, this.w, this.h);
        }
        else if((int(millis()/200)%3)==1){
            image(imgdomids[1],this.x-(WINDOW_WIDTH/5), this.y, this.w, this.h);
        }
        else if((int(millis()/200)%3)==2){
            image(imgdomids[2],this.x-(WINDOW_WIDTH/5), this.y, this.w, this.h);
        }
    }

    displayBook() {
        image(imgbible,this.x,this.y,this.w,this.h);
    }

    displayParrot() {
        if((int(millis()/200)%3)==0){
            image(imgparrots[0],this.x-(WINDOW_WIDTH/6), this.y-(WINDOW_HEIGHT*0.45), this.w, this.h);
        }
        else if((int(millis()/200)%3)==1){
            image(imgparrots[1],this.x-(WINDOW_WIDTH/6), this.y-(WINDOW_HEIGHT*0.45), this.w, this.h);
        }
        else if((int(millis()/200)%3)==2){
            image(imgparrots[2],this.x-(WINDOW_WIDTH/6), this.y-(WINDOW_HEIGHT*0.45), this.w, this.h);
        }
    }

    displaySootook() {
        image(imgbook,this.x,this.y,this.w,this.h);
    }
}