/**
 * Singleton class containing prices of pizza depending on size, crust and toppings and, delivery cost
 * in Kenya Shillings
 */
let pricesInKsh = new class {
	constructor(){
  	this.size = {
    	small: 500,
      medium: 750,
      large: 1000
    }
    
    this.crust = {
    	crispy: 300,
    	stuffed: 500,
      gluttenFree: 200
    }
    
    this.toppings = {
    	small: {
      	mozarella: 50,
        pepperoni: 100,
        bacon: 150,
        barbecue: 125,
        pineapple: 100,
        blackOlives: 125,
        chicken: 125,
        tomato: 50
      },
      medium: {
      	mozarella: 75,
        pepperoni: 125,
        bacon: 175,
        barbecue: 150,
        pineapple: 125,
        blackOlives: 150,
        chicken: 150,
        tomato: 75
      },
      large: {
      	mozarella: 100,
        pepperoni: 150,
        bacon: 200,
        barbecue: 175,
        pineapple: 150,
        blackOlives: 175,
        chicken: 175,
        tomato: 100
      }
    }
    this.delivery = 200;
  }
}();

export {pricesInKsh};