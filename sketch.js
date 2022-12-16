// 2022-2 정보문화기술 입문 앗!종강이야 코드
// 작성일: 2022-11-22
// 작성자: 주혜현
// playerVertical.js: 장애물을 피해 달려가는 플레이어 class
// playerHorizonal.js: 몰래 교수님을 향해 다가가는 플레이어 class
// **** TODO(교수님 돌아보는 타이밍 정교화 & 돌아보기 전 상태 만들어주기) ****

// **** 그외 TODO ****
// 화면 사이 부드럽게 전환하는 법이 있는지?(찾으면 금방 나올듯) <해결!>
// 플레이어와 장애물 class, display할 때 이미지 올려서 display하기 <해결!>
// 화면 사이즈 반응형으로 할지? <해결!>
// 앞랑 뒤에 컷신 이미지랑 텍스트올리기 <해결!> -> fidelity 올리기
// 스테이지 넘어갈 때 소리 넣어주기
// 정강이 찰 때 몇번 히트 성공했는지 보여주기 - hit and fail asset, 정강이 asset, 배경 asset 필요 <준해결>
// 강의실에서 다가가는 모습 fidelity 높이기 - 강의실 안에서 교수님한테 몰래 걸어가는 asset, 앉는 asset 필요 <해결!>
// 달리는 과정에 이미지 바뀌도록 해주기 <해결!>
// 오른쪽 상단에 무슨 버튼으로 플레이할 수 있는지 띄워주기 - asset 필요 <준해결>


const WINDOW_WIDTH = 1920/2; // 1920
const WINDOW_HEIGHT = 1080/2; //1080
let stage = 0;
let posX = 0; // bgMoving position
let posXtmp = 0; // bg img width
// case0 opening
let startdoh;
let startrapper;
// case2 running to the classroom
let jumper; // jumping player
let professors = []; // obstacle arr
let rappers = []; // obstacle arr
let books = []; // obstacle arr
let sootooks = []; // obstacle arr
let pCheck = 0;
let rCheck = 0;
let bCheck = 0;
let sCheck = 0;
let totalCheck = 0;
let Case2Entered = false;
let stopwatchCase2;
let Case2StartTime;
let Case2Playtime = 30;
let trasmissionChange1 = 0;
// case3 running to the professor
let runner; // running player
let professor; // professor turning around
let Case3Entered = false;
let stopwatchCase3;
let Case3Playtime = 15;
let Case3StartTime;
let trasmissionChange2 = 0;
let turnTimer = 0;
// case4 kicking the professor
let hitResult; // kicking professor success array
let sum = 0; // total success times
let pointerX = WINDOW_WIDTH/2; // moving pointer X
let pointerY = WINDOW_HEIGHT/2; // moving pointer Y
let pointerSpeed = 20/2; // pointer speed
let boxRand; // hit box range
let trasmissionChange3 = 0;
let kickStage = 0; // result flag
// ending scene transmission
let endSceneTrans = 255;
let finalScene = 0;

// assets
let imgtitle;
let sounddirtrun;
let soundjump;
let soundcementrun;
let soundsit;
let soundhit;
let soundsuccess;
let soundfail;
let soundready;
let img6geonghwan;
let imgparrot;
let imgclassroom;
let imgprof;
let imgback;
let imgrappersing;
let imgkick;
let imgroadtoroom;
let imgroadtoroomtmp;
let imgstudent;
let imgsquat;
let imgbible;
let imgcut1;
let imgcut2;
let imgcut3;
let imgcut4;
let imgcut5;
let imgcut6;
let imgobs1;
let imgobs2;
let imggamecut1;
let imggamecut2;
let imggamecut3;
let imggamecut4;
let imggamecut5;
//let imggamecut6;
let imggamecut7;
let imggamecut8;
let imggamecut9;
let imggamecut10;
let imggamecut11;
let instruction1;
let instruction2;
let instruction3;
let imgstageinst1;
let imgstageinst2;
let imgstageinst3;
let finalgame;
let imgruns = [];
let imgwalks = [];
let imgdoh = [];
let imgrappers = [];
let imgdomids = [];
let imgparrots = [];
let imgjonggang;
let imgC;
let imgF;
let imggaegang;
let imgaim;
let gameFont;
let musicInescapable;
let musicstage1;
let musicstage2;
let musicstage3;
let musicending;
let musicfailending;

function preload() {
  sounddirtrun = loadSound('audios/stage1_dirtrun.mp3');
  soundjump = loadSound('audios/stage1_jumpF.wav');
  soundcementrun = loadSound('audios/stage2_cementrun.mp3');
  soundsit = loadSound('audios/stage2_sit.wav');
  soundhit = loadSound('audios/stage3_hit.wav');
  soundsuccess = loadSound('audios/stage3_success.mp3');
  soundfail = loadSound('audios/stage3_fail.mp3');
  soundready = loadSound('audios/stage3_ready.wav');

  musicInescapable = loadSound('musics/Inescapable.wav');
  musicstage1 = loadSound('musics/stage1.wav');
  musicstage2 = loadSound('musics/stage2.wav');
  musicstage3 = loadSound('musics/stage3.wav');
  musicending = loadSound('musics/ending.wav');
  musicfailending = loadSound('musics/failending.wav');
  imgtitle = loadImage('assets/title.png');
  img6geonghwan = loadImage('assets/6geonghwan.png');
  imgclassroom = loadImage('assets/classroom.png');
  imgback = loadImage('assets/back.png');
  imgrappersing = loadImage('assets/rappersing.png');
  imgkick = loadImage('assets/kick.png');
  imgroadtoroom = loadImage('assets/roadtoroom.png');
  imgroadtoroomtmp = loadImage('assets/roadtoroomtmp.png');
  imgstudent = loadImage('assets/student.png');
  imgsquat = loadImage('assets/squat.png');
  imgbible = loadImage('assets/bible.png');
  imgbook = loadImage('assets/book.png');
  imgcut1 = loadImage('assets/cut1.png');
  imgcut2 = loadImage('assets/cut2.png');
  imgcut3 = loadImage('assets/cut3.png');
  imgcut4 = loadImage('assets/cut4.png');
  imgcut5 = loadImage('assets/cut5.png');
  imgcut6 = loadImage('assets/cut6.png');
  imgobs1 = loadImage('assets/obs1.png');
  imgobs2 = loadImage('assets/obs2.png');
  imgstageinst1 = loadImage('assets/stage1.png');
  imgstageinst2 = loadImage('assets/stage2.png');
  imgstageinst3 = loadImage('assets/stage3.png');
  imggamecut1 = loadImage('assets/gamecut1.png');
  imggamecut2 = loadImage('assets/gamecut2.png');
  imggamecut3 = loadImage('assets/gamecut3.png');
  imggamecut4 = loadImage('assets/gamecut4.png');
  imggamecut5 = loadImage('assets/gamecut5.png');
  //imggamecut6 = loadImage('assets/gamecut6.png')
  imggamecut7 = loadImage('assets/gamecut7.png');
  imggamecut8 = loadImage('assets/gamecut8.png');
  imggamecut9 = loadImage('assets/gamecut9.png');
  imggamecut10 = loadImage('assets/gamecut10.png');
  imggamecut11 = loadImage('assets/gamecut11.png');
  imginstruction1 = loadImage('assets/instructions1.png');
  imginstruction2 = loadImage('assets/instructions2.png');
  imginstruction3 = loadImage('assets/instructions3.png');
  imgfinalgame = loadImage('assets/finalgame.png');
  imgjonggang = loadImage('assets/jonggang.png');
  imgC = loadImage('assets/C.png');
  imgF = loadImage('assets/F.png');
  imggaegang = loadImage('assets/gaegang.png');
  imgaim = loadImage('assets/aim_red.png');

  for(let i=0;i<4;i++){
    imgruns[i] = loadImage('assets/run' + i + '.png');
  }
  for(let i=0;i<4;i++){
    imgwalks[i] = loadImage('assets/walk' + i + '.png');
  }
  for(let i=0; i < 2; i++) {
    imgdoh[i] = loadImage('assets/prof' + i + '.png');
  }
  for(let i=0;i<2;i++){
    imgrappers[i] = loadImage('assets/rapper' + i + '.png');
  }
  for(let i=0;i<3;i++){
    imgdomids[i] = loadImage('assets/domid' + i + '.png');
  }
  for(let i=0;i<3;i++){
    imgparrots[i] = loadImage('assets/parrot' + i + '.png');
  }
  gameFont = loadFont('assets/DungGeunMo.ttf');

  //opening용 asset
  
  startdoh = new Obstacle(WINDOW_WIDTH,(2*(WINDOW_HEIGHT/3)), WINDOW_HEIGHT/5, WINDOW_HEIGHT/5);
  startrapper = new Obstacle(WINDOW_WIDTH,(2*(WINDOW_HEIGHT/3)),WINDOW_HEIGHT/5, WINDOW_HEIGHT/5);
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  document.body.style.zoom = "200%";
  jumper = new PlayerVertical();
  runner = new PlayerHorizonal();
  professor = new Professor();
  hitResult = [-1,-1,-1];
  boxRand = int(random(5,10));
  hitbox = new Hitbox();
  domid = new Obstacle(WINDOW_WIDTH,(2*(WINDOW_HEIGHT/3)),WINDOW_HEIGHT/5,WINDOW_HEIGHT/5);
  parrot = new Obstacle(WINDOW_WIDTH,(2*(WINDOW_HEIGHT/3)),WINDOW_HEIGHT/5,WINDOW_HEIGHT/5);
}

function draw() {
  switch(stage) {
    case 0: // first page
      // musicstage1.setVolume(0.1);
      // musicstage1.play();
      bgMoving(imgroadtoroom, imgroadtoroomtmp);
      jumper.display();

      startdoh.move();
      startdoh.displayProfessor();
      if(startdoh.x < -500) {
        startdoh.x = WINDOW_WIDTH;
      }
      startrapper.rapping();
      startrapper.displayRapper();
      if(startrapper.x < -500) {
        startrapper.x = WINDOW_WIDTH;
      }
      domid.displayDomid();
      parrot.displayParrot();

      push();
      imageMode(CENTER);
      image(imgtitle, WINDOW_WIDTH/2, WINDOW_HEIGHT/2, 800/2, 190/2); 
      pop();

      textFont(gameFont);
    break;

    case 1: // intro
      image(imgcut1, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    break;

    case 2: // running to the classroom
      
      bgMoving(imgroadtoroom, imgroadtoroomtmp);
      image(imginstruction1,WINDOW_WIDTH*0.8,WINDOW_HEIGHT*0.05,WINDOW_HEIGHT/4, WINDOW_HEIGHT/4);

      // time pass
      if(!Case2Entered) { // end of stage 1
        Case2StartTime = int(millis()/1000);
        Case2Entered = true;
      }
      stopwatchCase2 = Case2Playtime + Case2StartTime - int(millis()/1000);

      if(stopwatchCase2 < 0) { // end of case2, transmission
        jumper.jumping = false;
        jumper.walktoclass();
        jumper.display();

        for (let i = professors.length - 1; i >= 0; i--) { // 교수님 이동
          professors[i].move();
          professors[i].displayProfessor();
        }

        for (let i = rappers.length - 1; i >= 0; i--) { // 래퍼 이동
          rappers[i].rapping();
          rappers[i].displayRapper();
        }

        for (let i = books.length - 1; i >= 0; i--) { // 사이비책 이동
          books[i].throw();
          books[i].displayBook();
        }
        for (let i = sootooks.length - 1; i >= 0; i--) { // 수특 이동
          sootooks[i].parabola();
          sootooks[i].displaySootook();
        }

        domid.displayDomid();
        parrot.displayParrot();

        if(jumper.x > WINDOW_WIDTH) {
          stage = 23;
          musicstage1.stop();
          musicstage2.setVolume(0.1);
          musicstage2.play();
        }

        fill(0,0,0, trasmissionChange1);
        rect(0,0,windowWidth, windowHeight);
        trasmissionChange1 = trasmissionChange1 + 1;

      } else { // playing game

        // show timer
        fill(250, 50, 0);
        noStroke();
        textSize(WINDOW_WIDTH/40);
        textAlign(CENTER);
        text(stopwatchCase2, WINDOW_WIDTH/25, WINDOW_HEIGHT/15);

        // obstacle create condition
        if(pCheck > 0) {pCheck--; totalCheck--;}
        if(rCheck > 0) {rCheck--; totalCheck--;}
        if(bCheck > 0) {bCheck--; totalCheck--;}
        if(sCheck > 0) {sCheck--; totalCheck--;}

        if ((stopwatchCase2 < Case2Playtime) && (random(1)<0.05) && (pCheck == 0)) { 
          if((stopwatchCase2 < Case2Playtime - 5)) {
            if(random(1) < 0.1) {
              professors.push(new Obstacle(WINDOW_WIDTH,(2*(WINDOW_HEIGHT/3)), WINDOW_HEIGHT/5, WINDOW_HEIGHT/5));
              pCheck = 100;
              totalCheck = 60;
            }
          } else{
            professors.push(new Obstacle(WINDOW_WIDTH,(2*(WINDOW_HEIGHT/3)),WINDOW_HEIGHT/5, WINDOW_HEIGHT/5));
            pCheck = 80;
            totalCheck = 60;
          }
        } else if ((stopwatchCase2 < (Case2Playtime-5)) && (random(1)<0.05) && (rCheck == 0)) {
          if((stopwatchCase2 < Case2Playtime - 10)) {
            if(random(1) < 0.1) {
              rappers.push(new Obstacle(WINDOW_WIDTH,(2*(WINDOW_HEIGHT/3)),WINDOW_HEIGHT/5, WINDOW_HEIGHT/5));
              rCheck = 140;
              totalCheck = 60;
            }
          } else {
            rappers.push(new Obstacle(WINDOW_WIDTH,(2*(WINDOW_HEIGHT/3)),WINDOW_HEIGHT/5, WINDOW_HEIGHT/5));
            rCheck = 80;
            totalCheck = 60;
          }
        } else if ((stopwatchCase2 < (Case2Playtime-10)) && (random(1)<0.05) && (bCheck == 0)) {
          if((stopwatchCase2 < Case2Playtime - 15)) {
            if(random(1) < 0.1) {
              books.push(new Obstacle(WINDOW_WIDTH,(2*(WINDOW_HEIGHT/3)),WINDOW_HEIGHT/12, WINDOW_HEIGHT/12));
              bCheck = 150;
              totalCheck = 60;
            }
          } else {
            books.push(new Obstacle(WINDOW_WIDTH,(2*(WINDOW_HEIGHT/3)),WINDOW_HEIGHT/12, WINDOW_HEIGHT/12));
            bCheck = 120;
            totalCheck = 60;
          }
        } else if ((stopwatchCase2 < (Case2Playtime-15) ) && (random(1)<0.05) && (sCheck == 0)) {
          if((stopwatchCase2 < Case2Playtime - 20)) {
            if(random(1) < 0.1) {
              sootooks.push(new Obstacle((4*WINDOW_WIDTH/5),(2*(WINDOW_HEIGHT/3))*0.4,WINDOW_HEIGHT/12, WINDOW_HEIGHT/12));
              sCheck = 170;
              totalCheck = 60;
            }
          } else {
            sootooks.push(new Obstacle((4*WINDOW_WIDTH/5),(2*(WINDOW_HEIGHT/3))*0.4,WINDOW_HEIGHT/12, WINDOW_HEIGHT/12));
            sCheck = 110;
            totalCheck = 60;
          }
        }
        
        // 도믿/수특무새 화면 오른쪽에서 등장
        if (stopwatchCase2 < (Case2Playtime-10)){
          domid.displayDomid();
        }

        if (stopwatchCase2 < (Case2Playtime-15)){
          parrot.displayParrot();
        }
        
        for (let i = professors.length - 1; i >= 0; i--) { // 교수님 충돌 체크
          professors[i].move();
          professors[i].displayProfessor();
          if(jumper.collisionDetection(professors[i].x, professors[i].y, professors[i].w, professors[i].h)) {
            stage = 5;
            musicstage1.stop();
            musicfailending.setVolume(0.1);
            musicfailending.play();
          }
        }

        for (let i = rappers.length - 1; i >= 0; i--) { // 래퍼 충돌 체크
          rappers[i].rapping();
          rappers[i].displayRapper();
          if(jumper.collisionDetection(rappers[i].x, rappers[i].y, rappers[i].w, rappers[i].h)) {
            stage = 6;
            musicstage1.stop();
            musicfailending.setVolume(0.1);
            musicfailending.play();
          }
        }

        for (let i = books.length - 1; i >= 0; i--) { // 사이비책 충돌 체크
          books[i].throw();
          books[i].displayBook();
          if(jumper.collisionDetection(books[i].x, books[i].y, books[i].w, books[i].h)) {
            //console.log(books[i].x + "&" + jumper.x + "&" + books[i].y +"&"+ jumper.y+ "&"+ books[i].w +"&" + books[i].h +"jumper.x" +jumper.w );
            stage = 7;
            musicstage1.stop();
            musicfailending.setVolume(0.1);
            musicfailending.play();
          }
        }
        for (let i = sootooks.length - 1; i >= 0; i--) { // 수특 충돌 체크
          sootooks[i].parabola();
          sootooks[i].displaySootook();
          if(jumper.collisionDetection(sootooks[i].x, sootooks[i].y, sootooks[i].w, sootooks[i].h)) {
            stage = 8;
            musicstage1.stop();
            musicfailending.setVolume(0.1);
            musicfailending.play();
          }
        }

        jumper.update();
        jumper.display();
      }
    break;

    case 3: // running to the professor
      //TODO 교수님 뒤돌아보는 거에 돌아보기 전 상태 넣어주기
      musicstage1.stop();
      image(imgclassroom,0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
      image(imginstruction2,WINDOW_WIDTH*0.8,WINDOW_HEIGHT*0.05, WINDOW_HEIGHT/4, WINDOW_HEIGHT/4);
      
      if(!Case3Entered) {
        Case3StartTime = int(millis()/1000);
        Case3Entered = true;
      }
      
      // timer
      fill(250, 50, 0);
      noStroke();
      textAlign(CENTER);
      textSize(WINDOW_WIDTH/40);
      stopwatchCase3 = Case3Playtime + Case3StartTime - int(millis()/1000);
      text(stopwatchCase3, WINDOW_WIDTH/25, WINDOW_HEIGHT/15);

      if ((stopwatchCase3 == 0 && !runner.update())) { //timeout and not arrived
        stage = 10;
        musicstage2.stop();
        musicfailending.setVolume(0.1);
        musicfailending.play();
      }

      turnTimer = int(millis()/10) - Case3StartTime*100; // 1sec = 100turnTimer

      professor.lookback(turnTimer);
      professor.display();

      //console.log("몇번 도는지:" + professor.turnCount + "  언제 도는지:" + professor.turnPoint + "  몇초동안 돌지:" + professor.turnCount + "  Time:" + professor.time + "\n" + stopwatchCase3 + "/"+professor.prelook + "/"+ professor.looking + "/" + turnTimer);

      if (runner.update()) { // 교수님 접촉하면
        fill(0,0,0, trasmissionChange2); // 화면 전환
        rect(0,0,windowWidth, windowHeight);
        trasmissionChange2 = trasmissionChange2 + 5;

        if(trasmissionChange2 == 255) {
          stage = 24;
          musicstage2.stop();
          musicstage3.setVolume(0.1);
          musicstage3.play();
        } 
        
      } else {
        runner.display();
      }

      if (professor.looking && !runner.sit) {
        stage = 9;
        musicstage2.stop();
        musicfailending.setVolume(0.1);
        musicfailending.play();
      }
    break;

    case 4: // kicking the professor
      image(imgfinalgame,0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
      // soundready.play();
      image(imginstruction3,WINDOW_WIDTH*0.8,WINDOW_HEIGHT*0.05, WINDOW_HEIGHT/4, WINDOW_HEIGHT/4);

      noStroke();

      hitbox.display();
      fill(0);
      imageMode(CENTER);
      image(imgaim, pointerX,pointerY, 50,50);
      imageMode(CORNER);
      //ellipse(pointerX, pointerY, 30,30);
      pointerY += pointerSpeed;
      if(pointerY > WINDOW_HEIGHT) {pointerSpeed = -pointerSpeed;}
      else if(pointerY < 0) {pointerSpeed = -pointerSpeed;}

      for(let i = 1; i < 4; i++) {
        if(hitResult[i-1] == -1) {
          ellipseMode(CENTER);
          strokeWeight(5);
          stroke(0);
          fill(255);
          ellipse(WINDOW_WIDTH/12, i*WINDOW_HEIGHT/10, WINDOW_HEIGHT/20, WINDOW_HEIGHT/20);
        } else if(hitResult[i-1] == 0) {
          textAlign(CENTER);
          fill(255,0,0);
          text("FAIL", WINDOW_WIDTH/12, i*WINDOW_HEIGHT/10);
        } else {
          textAlign(CENTER);
          fill(0,100,255);
          text("HIT!", WINDOW_WIDTH/12, i*WINDOW_HEIGHT/10);
        }
      }
      
      if(kickStage == 4) {
        sum = 0;
        for(let i = 0; i < 3; i++) {
          sum += hitResult[i];
        }
        
          if(sum == 3) {stage = 11; musicstage3.stop(); musicending.setVolume(0.1); musicending.play();}
          else if(sum == 2) {stage = 12; musicstage3.stop(); musicending.setVolume(0.1); musicending.play();}
          else if(sum == 1) {stage = 13; musicstage3.stop(); musicfailending.setVolume(0.1); musicfailending.play();}
          else if(sum == 0) {stage = 14; musicstage3.stop(); musicfailending.setVolume(0.1); musicfailending.play();}
          //console.log(hitResult);
        
      }
    break;

    case 5: // collide with Doh(from case 2)
      image(imggamecut1,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
      textAlign(RIGHT);
      fill(255,50,0);
      text("Enter: Try Stage1 Again\nBackspace: Restart the Game", 19*WINDOW_WIDTH/20, 2*WINDOW_HEIGHT/20); 
    break;

    case 6: // collide with rapper(from case 2)
      image(imggamecut2,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
      textAlign(RIGHT);
      fill(255,50,0);
      text("Enter: Try Stage1 Again\nBackspace: Restart the Game", 19*WINDOW_WIDTH/20, 2*WINDOW_HEIGHT/20); 
    break;

    case 7: // collide with book(from case 2)
      image(imggamecut3,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
      textAlign(RIGHT);
      fill(255,50,0);
      text("Enter: Try Stage1 Again\nBackspace: Restart the Game", 19*WINDOW_WIDTH/20, 2*WINDOW_HEIGHT/20); 
    break;

    

    case 8: // collide with suneung(from case 2)
      image(imggamecut4,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
      textAlign(RIGHT);
      fill(255,50,0);
      text("Enter: Try Stage1 Again\nBackspace: Restart the Game", 19*WINDOW_WIDTH/20, 2*WINDOW_HEIGHT/20); 
    break;

    

    case 9: // caughted by professor(from case 3)
      musicstage2.stop();
      image(imggamecut5,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
      textAlign(RIGHT);
      fill(255,50,0);
      text("Enter: Try Stage2 Again\nBackspace: Restart the Game", 19*WINDOW_WIDTH/20, 18*WINDOW_HEIGHT/20); 
      
    break;

    

    case 10: // time out(from case 3)
      musicstage2.stop();
      image(imggamecut11,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
      textAlign(RIGHT);
      fill(255,50,0);
      text("Enter: Try Stage2 Again\nBackspace: Restart the Game", 19*WINDOW_WIDTH/20, 2*WINDOW_HEIGHT/20); 
    
    break;

    case 11: // hit 3 JongGang(from case 4)
    endSceneTrans -= 5;

    if(endSceneTrans > 0) {
      image(imgjonggang,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
      fill(0,0,0, endSceneTrans); // 화면 전환
      rect(0,0,windowWidth, windowHeight);
      finalScene++;
    } else {
      finalScene++;
      if(finalScene >= 120) {
        image(imggamecut7,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
        textAlign(RIGHT);
        fill(255,0,0);
        text("Press Backspace\nto Start Game Again", 19*WINDOW_WIDTH/20, 2*WINDOW_HEIGHT/20); 
      }
    }
    break;

    case 12: // hit 2 C(from case 4)
      endSceneTrans -= 5;

    if(endSceneTrans > 0) {
      image(imgC,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
      fill(0,0,0, endSceneTrans); // 화면 전환
      rect(0,0,windowWidth, windowHeight);
      finalScene++;
    } else {
      finalScene++;
      if(finalScene >= 120) {
        image(imggamecut8,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
        textAlign(RIGHT);
        fill(255,0,0);
        text("Press Backspace\nto Start Game Again", 19*WINDOW_WIDTH/20, 2*WINDOW_HEIGHT/20); 
      }
    }
    break;

    case 13: // hit 1 F(from case 4)
    endSceneTrans -= 5;

    if(endSceneTrans > 0) {
    image(imgF,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
    fill(0,0,0, endSceneTrans); // 화면 전환
    rect(0,0,windowWidth, windowHeight);
    finalScene++;
    } else {
      finalScene++;
        if(finalScene >= 120) {
        image(imggamecut9,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
        textAlign(RIGHT);
        fill(255,0,0);
        text("Press Backspace\nto Start Game Again", 19*WINDOW_WIDTH/20, 2*WINDOW_HEIGHT/20); 
    }
    }
    break;

    case 14: // hit 0 GaeGang(from case 4)
      endSceneTrans -= 5;

      if(endSceneTrans > 0) {
      image(imggaegang,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
      fill(0,0,0, endSceneTrans); // 화면 전환
      rect(0,0,windowWidth, windowHeight);
      finalScene++;
      } else {
        finalScene++;
        if(finalScene >= 120) {
          image(imggamecut10,0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
          textAlign(RIGHT);
          fill(255,0,0);
          text("Press Backspace\nto Start Game Again", 19*WINDOW_WIDTH/20, 2*WINDOW_HEIGHT/20); 
      }
    }
    break;

    case 15: // story cut scene
      image(imgcut2, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    break;


    case 16:
      image(imgcut3, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    break;


    case 17:
      image(imgcut4, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    break;


    case 18:
      image(imgcut5, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    break;


    case 19:
      image(imgcut6, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    break;


    case 20:
      image(imgobs1, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    break;


    case 21:
      image(imgobs2, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    break;
    
    case 22: // stage1 instruct
      image(imgstageinst1, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    break;

    case 23: // stage2 instruct
      image(imgstageinst2, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    break;

    break;

    case 24: // stage3 instruct
      image(imgstageinst3, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    break;
    
    
  default:

  break;
  }
}

/**parameter로 넣은 이미지 이동 */
function bgMoving(movingImg, movingImgtmp) {
  background(220);
  image(movingImg, -posX, 0, WINDOW_WIDTH*2, WINDOW_HEIGHT);
  image(movingImgtmp, WINDOW_WIDTH*2-posXtmp, 0, WINDOW_WIDTH*2, WINDOW_HEIGHT);

  posX += 4;
  posXtmp += 4;

  console.log(posX + "/" + posXtmp);

  if(posX == WINDOW_WIDTH*2) {
    posX = 0;
  }
  if(posXtmp == WINDOW_WIDTH*2) {
    posXtmp = 0;
  }
}

function keyPressed() {
  if(keyCode == 32) { // press space
    if(stage == 0) {
      stage = 1;
      musicInescapable.setVolume(0.3);
      musicInescapable.play();
    } else if(stage==1) {
      stage = 15;
    } else if(stage==15) {
      stage = 16;
    } else if(stage==16) {
      stage = 17;
    } else if(stage==17) {
      stage = 18;
    } else if(stage==18) {
      stage = 19;
    } else if(stage==19) {
      stage = 22;
      musicInescapable.stop();
      musicstage1.setVolume(0.1);
      musicstage1.play();
    } else if(stage==20) {
      stage = 21;
    } else if(stage==21) {
      posX = 0;
      posXtmp = 0;
      stage = 2;
    } else if(stage==22) {
      stage = 20;
    } else if(stage==23){
      stage = 3;
    } else if(stage == 24) {
      stage = 4;
    }


    if(stage == 4) { // 정강이 잘 찼는지 판단
      switch(kickStage) {
        case 0:
          kickStage = 1;
          break;

        case 1: 
          soundhit.play();
          // soundready.stop();
          if(pointerY < (hitbox.y + hitbox.halfHeight) && pointerY > (hitbox.y - hitbox.halfHeight)) {
            hitResult[0] = 1;
            soundsuccess.play();
          }
          else {
            hitResult[0] = 0;
            soundfail.play();
          }
          resetHitbox();
          kickStage = 2;
        break;

        case 2:
          soundhit.play();
          // soundready.stop();
          if(pointerY < (hitbox.y + hitbox.halfHeight) && pointerY > (hitbox.y - hitbox.halfHeight)) {
            hitResult[1] = 1;
            soundsuccess.play();
          }
          else {
            hitResult[1] = 0;
            soundfail.play();
          }
          resetHitbox();
          kickStage = 3;
        break;

        case 3:
          soundhit.play();
          // soundready.stop();
          if(pointerY < (hitbox.y + hitbox.halfHeight) && pointerY > (hitbox.y - hitbox.halfHeight)) {
            hitResult[2] = 1;
            soundsuccess.play();
          }
          else {
            hitResult[2] = 0;
            soundfail.play();
          }
          kickStage = 4;
          boxRand = int(random(5,10));
        break;
      }
    }

  }
  
  if(keyCode == 8){ // reset press backspace
    posX = 0;
    posXtmp = 0;
    stage = 0;
    //case2
    jumper = new PlayerVertical();
    professors = [];
    rappers = [];
    books = [];
    sootooks = [];
    Case2Entered = false;
    stopwatchCase2 = Case2Playtime;
    trasmissionChange1 = 1;
    //case3
    runner = new PlayerHorizonal();
    professor = new Professor();
    Case3Entered = false;
    stopwatchCase3 = 30;
    trasmissionChange2 = 0;
    //case4
    hitResult = [-1,-1,-1];
    sum = 0;
    kickStage = 0;
    trasmissionChange3 = 0;
    //final stage
    finalScene = 0;
    endSceneTrans = 255;
    //music
    musicInescapable.stop();
    musicstage1.stop();
    musicstage2.stop();
    musicstage3.stop();
    musicending.stop();
    musicfailending.stop();
  }

  if(keyCode == 13) { //Enter
    if(stage == 5 || stage == 6 || stage == 7|| stage == 8) {
      musicending.stop();
      musicfailending.stop();
      musicstage1.setVolume(0.1);
      musicstage1.play();
      posX = 0;
      posXtmp = 0;
      jumper = new PlayerVertical();
      professors = [];
      rappers = [];
      sootooks = [];
      books = [];
      Case2Entered = false;
      stopwatchCase2 = Case2Playtime;
      stage = 2;
    }
    if(stage == 9 || stage == 10) {
      musicending.stop();
      musicfailending.stop();
      musicstage2.setVolume(0.1);
      musicstage2.play();
      runner = new PlayerHorizonal();
      professor = new Professor();
      Case3Entered = false;
      stopwatchCase3 = Case3Playtime;
      stage = 3;
    }
  }

  if(stage == 2) {
    if(keyCode === 38) {
      if(jumper.jumping && !jumper.doubleJump) {
          jumper.speed = 30/2;
          jumper.doubleJump = true;
          soundjump.setVolume(0.6);
          soundjump.play();
      }
      if(!jumper.jumping) {
          jumper.speed = 36/2;
          jumper.jumping = true;
          soundjump.setVolume(0.6);
          soundjump.play();
      }
    }
  }

  /**hitbox object 새로 생성 */
  function resetHitbox(){
    hitbox = new Hitbox();
  }
}