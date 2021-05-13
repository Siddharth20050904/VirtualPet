//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var displayTxt1;
var x
function preload()
{
	//load images here
  happyDog1 = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,250, 50, 50);
  dog.addImage("dogImage", happyDog);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog1);
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill("white")
   text("Note : Press Up Arrow Key to Give Food to Dog", 50, 20);
   text("Food Remaining : "+ foodS ,150,100)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
   
    if(x <= 0){
      x = 0;
    }else{
      x = x-1;
    }
    database.ref('/').set({
       Food : x
  });
}


