class Button {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.title = "untitled";
    }

    show() {
        if(this.over()) {
            fill(255,0,0);
        } else{ 
            fill(255,200,200);
        }
        rect(this.x, this.y, this.w, this.h);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(20);
        text(this.title, this.x + this.w/2, this.y + this.h/2);
    }

    over() {
        let x2 = this.x + this.w;
        let y2 = this.y + this.h;
        if (this.x < mouseX && mouseX < x2 && this.y < mouseY && mouseY < y2) {
            return true;
        } else {
            return false;
        }
    }

    setTitle (t) {
        this.title = t;
    }
}