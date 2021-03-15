var canvas
var space,spaceImg,spaceCraft,spaceCraftImg
var edges
var bullet,bulletImg,bulletGroup
var bulletCount = 0
var alien,alienGroup,alienImg1,alienImg2,alienImg3
var meteorite, meteoriteImg1, meteoriteImg2, meteoriteGroup
var treasure,treasureImg1,treasureGroup,treasureImg2
var score = 0
var key,keyImg
var treasureCount =0
var gameState = "play"

function preload(){
spaceImg = loadImage("images/background.png")
spaceCraftImg = loadImage("images/spacecraft2.png")
bulletImg = loadImage("images/bullet.png")
alienImg1 = loadImage("images/alien1.png")
alienImg2 = loadImage("images/alien2.png")
alienImg3 = loadImage("images/alien3.png")
meteoriteImg1 = loadImage("images/meteoroid1.png")
meteoriteImg2 = loadImage("images/meteoroid2.png")
treasureImg1 = loadImage("images/closedBox.png")
treasureImg2 = loadImage("images/openBox.png")
keyImg = loadImage("images/key.png")
}


function setup(){
canvas= createCanvas(1360,655)

space = createSprite(680,325)
space.addImage(spaceImg)
space.scale = 0.5
space.velocityX = -3

spaceCraft = createSprite(200,400)
spaceCraft.addImage(spaceCraftImg)
spaceCraft.scale = 0.6
spaceCraft.debug = false
spaceCraft.setCollider("rectangle",-20,45,450,250)

bulletGroup = new Group()
alienGroup = new Group();
meteoriteGroup = new Group();
treasureGroup = new Group();



edges = createEdgeSprites()
}


function draw(){
background("black")

if(gameState==="play"){

if(space.x<400){
    space.x = 680
}

if(keyDown(UP_ARROW)){
    spaceCraft.y = spaceCraft.y-10
}

if(keyDown(DOWN_ARROW)){
    spaceCraft.y = spaceCraft.y+10
}

if(keyDown("space")){

        if(frameCount%3===0){

            spawnBullets();
        }
}

if(bulletGroup.isTouching(meteoriteGroup)){
    meteoriteGroup.destroyEach();
    bulletGroup.destroyEach();
    score = score+1
}

if(bulletGroup.isTouching(alienGroup)){
    alienGroup.destroyEach();
    bulletGroup.destroyEach();
    score = score+1
}

if(spaceCraft.isTouching(treasureGroup)){
    treasure.addImage(treasureImg2)
    treasureGroup.setLifetimeEach(5);
    treasureCount = treasureCount+1
    treasureGroup.destroyEach();
}


spaceCraft.collide(edges)
spawnAliens();
spawnMeteorites()
spawnTreasure();

if(treasureCount===5){
    gameState="end"
}
}

if(gameState==="end"){
    treasureGroup.destroyEach();
    alienGroup.destroyEach()
    meteoriteGroup.destroyEach()
    space.velocityX = 0
    text("congratulations! mission completed",600,600)
}



console.log(score,treasureCount)

drawSprites()
textSize(20)
fill("white")
text("SCORE:"+score,650,300)
text("Treasure Count:"+treasureCount,300,300)
}

function spawnBullets(){
    bullet = createSprite(50,400)
    bullet.addImage(bulletImg)
    bullet.scale = 0.2
    bullet.velocityX = 6
    bullet.x = spaceCraft.x+60
    bullet.y = spaceCraft.y+60
    bullet.depth = spaceCraft.depth
    spaceCraft.depth = spaceCraft.depth+1
    bulletGroup.add(bullet);
    bullet.lifetime = 400

}

function spawnAliens(){
   
    if(frameCount%350===0||frameCount===30){
        alien = createSprite(1400,100)
        alien.velocityX = -3
        alien.x = Math.round(random(1200,1400))
        alien.y = Math.round(random(100,500))
        var rand = Math.round(random(1,3))
        switch(rand){
            case 1: alien.addImage(alienImg1)
                    alien.scale = 0.5
            break;
            case 2: alien.addImage(alienImg2)
                    alien.scale = 0.3
            break;
            case 3: alien.addImage(alienImg3)
                    alien.scale = 0.3
            break;
        }
        alienGroup.add(alien)
        alien.lifetime = 400

    }
    
}


function spawnMeteorites(){
   
    if(frameCount%200===0){
        meteorite = createSprite(1000,100)
        meteorite.velocityX = -4
        meteorite.x = Math.round(random(1200,1400))
        meteorite.y = Math.round(random(200,400))
        var rand = Math.round(random(1,2))
        switch(rand){
            case 1: meteorite.addImage(meteoriteImg1)
                    meteorite.scale = 0.5
                    break;
            case 2: meteorite.addImage(meteoriteImg2)
                    meteorite.scale = 0.5
                    break;
        }
        meteorite.lifetime = 400
        meteoriteGroup.add(meteorite);
    }


}


function spawnTreasure(){
    if(frameCount%400===0){
        treasure = createSprite(1400,100)
        treasure.velocityX = -5
        treasure.x = Math.round(random(800,1500))
        treasure.y = Math.round(random(100,550))
        treasure.addImage(treasureImg1);
        treasure.scale = 0.3
        treasure.lifetime = 400
        treasureGroup.add(treasure)
    }
}