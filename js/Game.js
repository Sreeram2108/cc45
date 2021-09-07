class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playerMoving = false;
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

 fuels=new Group()  
  Sreeramhandsome=new Group()
  obs=new Group()
  this.addSprites(fuels,4,fuelimg,0.02)
  this.addSprites(Sreeramhandsome,15,powerimg,0.09)
  this.addSprites(obs,10,obimg,0.04)
  }

  addSprites(group,number,img,scale){
    for(var i=0;i<number;i++){
     var x = random(width / 2 + 150, width / 2 - 150);
     var y = random(-height * 4.5, height - 400);
      var sprite = createSprite(x, y);
      sprite.addImage(img);

      sprite.scale = scale;
      group.add(sprite);
    }
  }
  
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();
    player.getCarsAtEnd()
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      this.showLeaderboard();
this.showLife()
this.showFuelBar()
      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          this.handlefuel(index)
          this.handlecoins(index)
          // Changing camera position in y direction
          camera.position.y = cars[index - 1].position.y;
        }
      }
      var finishLine=height*6-100
      if(player.positionY>finishLine){
        gameState=2
        player.rank+=1
        Player.updateCarsAtEnd(player.rank)
        player.update();
        this.showRank();
      }
      // handling keyboard events
      this.handlePlayerControls()
      drawSprites();
    }
  }
  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
      text: "Congragulations you advanced to the next level",
      confirmButtonText: "Ok"
    });
  }

  gameOver(){
    swal({
      title: `Game Over`,
      text: "Better luck next time",
      confirmButtonText: "Ok"
    });
  }
  showLife() {
    push();
    image(lifeImage, width / 2 - 130, height - player.positionY - 150, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 150, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - player.positionY - 150, player.life, 20);
    noStroke();
    pop();
  }

  showFuelBar() {
    push();
    image(fuelimg, width / 2 - 130, height - player.positionY - 100, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 100, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 100, player.fuel, 20);
    noStroke();
    pop();
  }
handlefuel(index){
cars[index-1].overlap(fuels,function(a,b){
  player.fuel=185
  b.remove()
})
if (player.fuel > 0 && this.playerMoving) {
  player.fuel -= 0.5;
}

if (player.fuel <= 0) {
  gameState = 2;
  this.gameOver();
}
}
  
handlecoins(index){
  cars[index-1].overlap(Sreeramhandsome,function(a,b){
    player.score+=20
    player.update()
    b.remove()
  })
  }
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
        CarsAtEnd:0
      });
      window.location.reload();
    });
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      
      leader1 =
        players[0].rank +
        "      " +
        players[0].name +
        "      " +
        players[0].score;

      leader2 =
        players[1].rank +
        "      " +
        players[1].name +
        "      " +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "      " +
        players[1].name +
        "      " +
        players[1].score;

      leader2 =
        players[0].rank +
        "      " +
        players[0].name +
        "      " +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      this.playerMoving = true;
      player.positionY += 10;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      player.positionX += 5;
      player.update();
    }
  }
}