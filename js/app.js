import{prices, Pizza} from './pizza.js';
import{Order} from './order.js';

// Fetch input
$("input[name='delivery']").on("change", function(event){
  if(Boolean(event.target.value)){
    $("div#pizza-delivery-location").show();
  } else {
    $("div#pizza-delivery-location").hide();
  }

  $("form#order-placement-form").on("submit", function(event2){
    event2.preventDefault();

    //Capture input
    let pizzaSize = $("input[name='size']:checked").val();
    let pizzaCrust = $("input[name='crust']:checked").val();
    let pizzaToppings = $.map($("input[name='toppings']:checked"), (topping) => $(topping).val());
    let pizzaDelivery = Boolean($("input[name='delivery']:checked").val());
    let pizzaDeliveryLocation = $("input[name='location']").val();
    let numberOfPizzas=$("input[name='number']").val();
    
    let order = generateOrder(pizzaSize, pizzaCrust, pizzaToppings, pizzaDelivery, pizzaDeliveryLocation, numberOfPizzas);
    generateOrderSummaryAndAlert(order);
    redirectToForm();
  });
});



// Generate order information
function generateOrder(pizzaSize, pizzaCrust, pizzaToppings, pizzaDelivery, pizzaDeliveryLocation, numberOfPizzas){
  let order = new Order(pizzaDelivery, pizzaDeliveryLocation);

  for(let i=1; i<=numberOfPizzas; i++){
    let pizza = new Pizza(pizzaSize, pizzaCrust, pizzaToppings);
    order.add(pizza);
  }

  return order;
}

// Create alert for successful event
function createSuccessAlert(message){
  let alert = document.createElement('div');
  alert.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
  alert.setAttribute('role', 'alert');
  alert.textContent = message;
  createDismissButton(alert);

  let alertSection = document.getElementById('alerts');
  alertSection.appendChild(alert);
}

// Create button to dismiss alert
function createDismissButton(divElement){
  let button = document.createElement('button');
  button.classList.add('btn-close');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-dismiss', 'alert');
  button.setAttribute('aria-label', 'Close')
  divElement.appendChild(button);
}

// Create table row
function createTableRow(){
  let tableBody = document.getElementById('table-data');
  let row = document.createElement('tr');
  tableBody.appendChild(row);
  return row;
}

// Create table data
function createRowData(tableRow){
  let tableData = document.createElement('td');
  tableRow.appendChild(tableData);
  return tableData;
}

// Create text information
function createText(message){
  let textElement = document.createElement('h3');
  textElement.classList.add('text-center');
  textElement.textContent = message;

  let divElement = document.getElementById('order-summary');
  divElement.appendChild(textElement);
}

// Redirect to form
function redirectToForm(){
  // Display back button
  $("div#redirect-to-form").show();

  $("button#btn-back").on("click", function(){
    $("div#order-summary").hide();
    $("div#pizza-size-selection, div#pizza-crust-selection, div#pizza-topping-selection, div#pizza-delivery, div#checkout, div#number-of-pizzas").show();
    // Hide back button
    $("button#btn-back").hide();
    location.reload();
  });
  
}

// Generate order summary and alert
function generateOrderSummaryAndAlert(order){
  let orderSummary = order.getSummary();
  let no = 1;

  // Hide other divs
  $("div#pizza-size-selection, div#pizza-crust-selection, div#pizza-topping-selection, div#pizza-delivery, div#pizza-delivery-location, div#checkout, div#number-of-pizzas").hide();

  // Show div for order summary
  $("div#order-summary").show();
  // Alerts
  if(orderSummary.isDelivery){
    createSuccessAlert(`Thank you for choosing us. Your order will be delivered to your location: ${orderSummary.location}`);
  } else {
    createSuccessAlert(`Thank you for choosing us`);
  }

  // Table containing order summary info
  orderSummary.pizzas.forEach(function(pizza){
    let row = createTableRow();
    createRowData(row).textContent = no++;
    createRowData(row).textContent = `${capitalize(pizza.size)} - ${pizza.price[pizza.size]}`;
    createRowData(row).textContent = `${capitalize(pizza.crust)} - ${pizza.price[pizza.crust]}`;
    createRowData(row).textContent = `${pizza.toppings.map((topping) => capitalize(topping)).join(",")} - ${pizza.price.toppings}`;
    createRowData(row).textContent = `${pizza.price.total}`;
  });

  let pizzaPrice = orderSummary.pizzas.map((pizza) => pizza.price.total).reduce((previous, current) => previous + current, 0);
  
  if(orderSummary.isDelivery){
    createText(`Pizza(s) price: ${pizzaPrice}`);
    createText(`Delivery fees: ${prices.delivery}`);
  }

  createText(`Total: ${orderSummary.totalPrice}`);
}

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1,);
}


 

