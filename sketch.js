

var pc, pcWalk, pcFight, pcDead;
var ground1, ground2, invisibleGround;
var ground1Image, ground2Image;
var obstacle, obstacleGroup, obstacleImage;
var npc, npcDie;
var npc2, npc2Die;

function preload() {
    pcWalk = loadAnimation("images/spriteWalk1.png", "images/spriteWalk2.png");
    pcFight = loadAnimation("images/spriteFight1.png", "images/spriteFight2.png", "images/spriteFight3.png");
    pcDead = loadAnimation("images/spriteDie1.png", "images/spriteDie2.png", "images/spriteDie3.png","images/spriteDie4.png");

    npc = loadAnimation("images/npcAttack1.png","images/npcAttack2.png","images/npcAttack3.png")
    npcDie = loadAnimation("images/npcDie1.png","images/npcDie2.png","images/npcDie3.png","images/npcDie4.png","images/npcDie5.png","images/npcDie6.png","images/npcDie7.png");
    npc2 = loadAnimation("images/npc2Attack_1.png","images/npc2Attack_2.png","images/npc2Attack_3.png","images/npc2Attack_4.png","images/npc2Attack_5.png","images/npc2Attack_6.png","images/npc2Attack_7.png","images/npc2Attack_8.png")
    npc2Die = loadImage("images/npc2Die.png")
    ground1Image = loadImage("images/ground1.png");
    ground2Image = loadImage("images/ground2.png");
}



function setup() {

    createCanvas(700, 500);


    pc = createSprite(50, 265, 50, 50);
    pc.addAnimation("pcWalk", pcWalk);
    pc.addAnimation("pcFight", pcFight);
    pc.addAnimation("pcDead", pcDead);
    pc.scale = 1.5;
    pc.debug = true;
    pc.setCollider("circle", 0, 0, 75);

    npc = createSprite(50, 265, 50, 50);
    npc.addAnimation("npc", npc);
    npc.addAnimation("npcDie", npcDie);

    obstaclesGroup = createGroup();

    ground1 = createSprite(200, 380, 400, 20);
    ground1.addImage("ground1Image", ground1Image);
    ground1.x = ground1.width / 2;
    ground1.velocityX = -6;
    ground1.scale = 2.5;

    ground1.debug = true;
    
    ground2 = createSprite(600, 380, 400, 20);
    ground2.addImage("ground2Image", ground2Image);
    ground2.velocityX = -6;
    ground2.scale = 2.5;

    ground2.debug = true;
    
    invisibleGround = createSprite(200, 265, 400, 5);
    invisibleGround.visible = false;


}

function draw() {
    background("PaleTurquoise");

    pc.collide(invisibleGround);

    if (ground1.x < 0) {
        ground1.x = ground1.width / 2;
    }

    // console.log(ground.velocityX);

    if (ground1.x < -200) { ground1.x = 600 }
    if (ground2.x < -200) { ground2.x = 600 }

    if (keyDown("space") && pc.y === 210) {
        pc.velocityY = -12;
    }

    if (obstaclesGroup.isTouching(pc)) {
        obstaclesGroup.setVelocityXEach(0);
        ground1.velocityX = 0;
        ground2.velocityX = 0;
        pc.velocityY = 0;
        pc.setAnimation("animation_2");
    }

    //gravity
    pc.velocityY = pc.velocityY + 0.8;

    spawnObstacles();

    drawSprites();
}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
      obstacle = createSprite(width, height - 160, 20, 50);
      obstacle.velocityX = (-6/100);
      
      //generate random obstacles
      var rand = randomNumber(1,6);
      obstacle.setAnimation("obstacle" + rand);
      obstacle.debug = false;
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = -1 * (width / obstacle.velocityX);

      var caseNumber = Math.round(random(1, 6));
    console.log(caseNumber);

    switch (caseNumber) {
        case 1:

      //add each obstacle to the group
      ObstaclesGroup.add(obstacle);

    }
    }
  }




