import{Pizza} from './pizza.js';
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
    console.log(pizzaDeliveryLocation);
    let pizza = new Pizza(pizzaSize, pizzaCrust, pizzaToppings);
    let order = new Order(pizzaDelivery, pizzaDeliveryLocation);
    order.add(pizza);
    console.log(pizza.getPizzaDetails());
    console.log(order.getSummary());
    generateOrderSummaryAndAlert(order);
  });
});

function hideDivs(divArray){
  divArray.forEach(function(divElement){
    $(divElement).hide();
  });
}

function createSuccessAlert(message){
  let alert = document.createElement('div');
  alert.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
  alert.setAttribute('role', 'alert');
  alert.textContent = message;
  createDismissButton(alert);

  let alertSection = document.getElementById('alerts');
  alertSection.appendChild(alert);
}

function createDismissButton(divElement){
  let button = document.createElement('button');
  button.classList.add('btn-close');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-dismiss', 'alert');
  button.setAttribute('aria-label', 'Close')
  divElement.appendChild(button);
}

function createTableRow(){
  let tableBody = document.getElementById('table-data');
  let row = document.createElement('tr');
  tableBody.appendChild(row);
  return row;
}

function createRowData(tableRow){
  let tableData = document.createElement('td');
  tableRow.appendChild(tableData);
  return tableData;
}

function generateOrderSummaryAndAlert(order){
  let orderSummary = order.getSummary();
  let no = 1;
  // Hide other divs
  hideDivs([$("div#pizza-size-selection"), $("div#pizza-crust-selection"), $("div#pizza-topping-selection"), $("div#pizza-delivery"), $("div#pizza-delivery-location")]);
  // Show div for order summary
  $("div#order-summary").show();
  // Alerts
  if(orderSummary.isDelivery){
    createSuccessAlert(`Thank you for choosing us. Your order will be delivered to your location: ${orderSummary.location}`);
  } else {
    createSuccessAlert(`Thank you for choosing us`);
  }

  orderSummary.pizzas.forEach(function(pizza){
    let row = createTableRow();
    createRowData(row).textContent = no++;
    createRowData(row).textContent = `${capitalize(pizza.size)} - ${pizza.price[pizza.size]}`;
    createRowData(row).textContent = `${capitalize(pizza.crust)} - ${pizza.price[pizza.crust]}`;
    createRowData(row).textContent = `${pizza.toppings.map((topping) => capitalize(topping)).join(",")} - ${pizza.price.toppings}`;
    createRowData(row).textContent = `${pizza.price.total}`;
  });
}

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1,);
}


 

