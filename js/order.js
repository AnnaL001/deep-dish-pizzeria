class Order{
	constructor(isDelivery=false,location=""){
  	this.pizzas = [];
    this.isDelivery = isDelivery;
    this.location = location;
  }
  
  // Populate items: pizzas in an order
  add(pizza){
  	this.pizzas.push(pizza);
    this.totalItems = this.pizzas.length;
  }
  
  // Get summary information of all orders
  getSummary() {
  	return { 
      pizzas: this.pizzas.map(pizza => pizza.getPizzaDetails()), 
      isDelivery: this.isDelivery, 
      location: this.location, 
      totalItems: this.totalItems, 
      totalPrice: this.getTotalCost()
    };
  }
  
  // Set if order will be delivered 
  setDelivery(value){
  	this.isDelivery = value;
  }
  
  // Get total cost of an order
  getTotalCost(){
  	let totalCost;
  	if(this.isDelivery){
    	totalCost = this.pizzas.map(pizza => pizza.computePrice().total).reduce((previous, current) => previous + current,0) + prices.delivery;
    } else {
    	totalCost = this.pizzas.map(pizza => pizza.computePrice().total).reduce((previous, current) => previous + current,0);
    }
    return totalCost;
  }
}

export {Order};