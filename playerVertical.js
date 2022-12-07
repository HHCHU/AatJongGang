class PlayerVertical{
 
    constructor(){
        this.x = WINDOW_WIDTH/20;
        this.y = (2*(WINDOW_HEIGHT/3));
        this.speed = 0;
        this.grav = -2;
        this.jumping = false;
        this.doubleJump = false;
        this.maxJumpDist = WINDOW_HEIGHT/5;
        this.w = WINDOW_HEIGHT/5;
        this.h = WINDOW_HEIGHT/5;
        this.midX = ((2*this.x) + this.w)/2;
        this.midY = ((2*this.y) + this.h)/2;
    }
 
    update(){
        this.midY = ((2*this.y) + this.h)/2;

        if(this.jumping) {
            this.y -= this.speed;
            this.speed += this.grav;
            if(this.y >= (2*(WINDOW_HEIGHT/3))){
                this.y = (2*(WINDOW_HEIGHT/3));
                this.speed = 0;
                this.jumping = false;
                this.doubleJump = false;
            }
        }
    }

    walktoclass() {
        this.y = (3*(WINDOW_HEIGHT/4)) - 100;
        this.x += 7;
    }

    display() {
        if(this.jumping){
            image(imgruns[2],this.x, this.y, this.w, this.h);
        }
        else{
            if((int(millis()/100)%4)==0){
                image(imgruns[0],this.x, this.y, this.w, this.h);
            }
            else if((int(millis()/100)%4)==1){
                image(imgruns[1],this.x, this.y,this.w, this.h);
            }
            else if((int(millis()/100)%4)==2){
                image(imgruns[2],this.x, this.y, this.w, this.h);
            }
            else if((int(millis()/100)%4)==3){
                image(imgruns[3],this.x, this.y, this.w, this.h);
            }
    }
}

    

    /** obstacle의 x,y,w,h를 받아서 충돌여부 bool로 return*/
    collisionDetection(obstacleX, obstacleY, obstacleW, obstacleH) {  // 충돌감지 함수에서는 장애물 객체를 인수로 받음.
        // 경계선에서 가장 가까운 점을 나타내는 testX와 testY에 기본값을 저장
        
        let oCenterX = ((2*obstacleX) + obstacleW)/2;
        let oCenterY = ((2*obstacleY) + obstacleH)/2;
        
        // 공룡과 선인장(사각형 모양)의 어느쪽 경계가 가까운지 확인함.
        // if (this.x < obstacle.x) {         
        //   testX = obstacle.x;            // 장애물 왼쪽 경계선에서 가장 가까운 점 위치 결정 
        // }
        // else if (this.x >= obstacle.x+obstacle.w) { 
        //   testX = obstacle.x + obstacle.w/2;   // 장애물 오른쪽 경계선에서 가장 가까운 점 위치 결정 
        // }
        
        // if (this.y < obstacle.y) {  
        //   testY = obstacle.y + obstacle.h/2;            // 장애물 위쪽 경계선에서 가장 가까운 점 위치 결정 
        // }
        // else if (this.y >= obstacle.y) {
        //   testY = obstacle.y;   // 장애물 아래쪽 경계선에서 가장 가까운 점 위치 결정 
        // }
        // // 사각형 장애물의 가장 가까운 면에서 공룡까지의 거리 구하기
        // //********************* TODO 장애물 충돌 기준 다시 계산해보기 *********************//
        // // 특히 수특 충돌 기준 버그 해결하기

        let distX = this.midX - oCenterX;
        let distY = this.midY - oCenterY;
        let distance = sqrt( (distX*distX) + (distY*distY) );
        let standard = sqrt( (this.w*this.w)/4 + (this.h*this.h)/4 ); 
        
        if (distance < (2*standard)/3) {
            //console.log(obstacleX + "/" + obstacleY+ "/" +obstacleW +"/" +obstacleH +"/" +distance+"/"+standard);
            return true;
        } 
        else {
            //ellipse(oCenterX,oCenterY, standard,standard);
            return false;
        }
    }
}