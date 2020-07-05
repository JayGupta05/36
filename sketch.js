//Create variables here
var dog,sadDog,happyDog;
var database,foodObj;
var foodS,foodStock,getFoodStock;

function preload()
{
  //load images here
  happyDog = loadImage("dogImg1.png");
  sadDog = loadImage("dogImg.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  database = firebase.database();
  dog = createSprite(250,250,20,20);
  dog.addImage(sadDog);
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on('value',readStock);  

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}


function draw() { 
  background(46,139,87); 
  textSize(20);
  fill(255,255,254);
  if(lastFed>=12){
    text("Last Feed : " +lastFed%12 + " PM",350,30);
  } else if(lastFed === 0){
    text("Last Feed : 12 AM",350,30);
  } else{
    text("Last Feed : " + lastFed + "AM",350,30);
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val;
  })
  foodObj.display();

  drawSprites();
  //add styles here
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : Hour()
  })
}