class Food{
    constructor(){
        var milk = loadImage("milk.png");
        var lastFed;
        var foodStock;
    }
    getFoodStock(){
        getFoodStock = database.ref("Food");
        getFoodStock.on('value',function(data){
            foodStock = data.val();
        })
    }
    updateFoodStock(){
        database.ref('/').update({
            getFoodStock = this.getFoodStock-1,
            Food:foodObj.getFoodStock(),
            FeedTime:hour
        })        
    }
    deductFoodStock(){
        
    }
}