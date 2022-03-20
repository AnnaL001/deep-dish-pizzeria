import {pricesInKsh as prices} from './prices.js';

class Pizza{
	constructor(size, crust, toppings){
  	this.size = size;
    this.crust = crust;
    this.toppings = toppings;
  }
 
  // Compute price of pizza based on size, toppings and crust
  computePrice(){
  	let sizePrice = prices.size[this.size];
    let crustPrice = prices.crust[this.crust];
    let toppingsPrice = this.toppings.map(topping => prices.toppings[this.size][topping]).reduce((previous, current) => previous + current, 0);
    return {
      [this.size]: sizePrice, 
      [this.crust]: crustPrice, 
      toppings: toppingsPrice, 
      total: sizePrice + crustPrice + toppingsPrice
    };
  }

  // Get pizza information
  getPizzaDetails(){
  	return {
      size: this.size, 
      crust: this.crust, 
      toppings: this.toppings, 
      price: this.computePrice()
    };
  }
}

export {prices,Pizza};