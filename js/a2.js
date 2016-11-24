var inactiveTime = 3000000000000;
var BUY_REMINDER_MESSAGE = "Hey there! Are you still planning to buy something?";

// Cart associative array
var cart = {};

// Stock associative array
var products = {
    Box1: 5,
    Box2: 5,
    Clothes1: 5,
    Clothes2: 5,
    Jeans: 5,
    Keyboard: 5,
    KeyboardCombo: 5,
    Mice: 5,
    Pc1: 5,
    Pc2: 5,
    Pc3: 5,
    Tent: 5
};


function insertProductPurchaseButtons() {
    var productPanels = document.getElementsByClassName("product-container");
    for (var i = 0; i < productPanels.length; i++) {
        var currPanel = productPanels[i];
        var currPanelId = currPanel.getAttribute('id');
        var addButton = configureButton("Add","addBtn");
        var removeButton = configureButton("Remove","removeBtn");
        
        addButton.onclick = (function() { 
            var productName = currPanelId;
            return function() {
                addToCart(productName);
            }
        })();
        removeButton.onclick = (function() {
            var productName = currPanelId;
            return function() {
                removeFromCart(productName); 
            }
        })();
         
        currPanel.appendChild(addButton);
        currPanel.appendChild(removeButton);
    }
}

/* 
    Helper function to reduce duplicate code in insertProductPurchaseButtons.
*/

function configureButton(buttonText, buttonClass) {
    var newButton = document.createElement("BUTTON");
    var buttonText = document.createTextNode(buttonText);
    newButton.appendChild(buttonText);
    newButton.setAttribute('type', 'button');
    newButton.className += "btn" ;
    newButton.className += " " + buttonClass;
    return newButton;
} 

/*
    Ensures the buttons are not added until the rest of the DOM has been rendered.
*/
window.onload = function() {
    insertProductPurchaseButtons();
};

// Start the inactiveTime timer
var cartTimer = setInterval(function(){ countDown(); }, 1000);

function countDown() {
    if (inactiveTime > 0) {
        inactiveTime--;
    } else {
        alert(BUY_REMINDER_MESSAGE);
        inactiveTime = 3000000000000;
    }
}

/* 
    addToCart(productName) is called when an Add button is clicked. If the selected       
    product is not in your cart, the function adds the product to the cart and initializes 
    its quantity to one. Otherwise, the function increments the product quantity in the cart 
    by one. In bothe cases, the product quantity in stock decrements by one.The function also 
    resets, inactiveTime.
*/

function addToCart(productName) {
    clearInterval(cartTimer);
    inactiveTime = 3000000000000;
    cartTimer = setInterval(function(){ countDown(); }, 1000);

    
    if (cart.hasOwnProperty(productName)) {
        if (products[productName] > 0) {
            cart[productName] += 1;
            products[productName] -= 1;
        } else {
            alert("Sorry, " + productName + " is all sold out!");
        }
    } else {
        cart[productName] = 1;
        products[productName] -= 1;
    }
}


/*
    removeFromCart(productName) is called when a Remove button is clicked.
    If the selected product is not in your cart, the function displays an alert box
    notifying the user of so. If there is only one in stock for the product, then the function
    removes the product from the cart. Otherwise, the function decrements the product quantity 
    by one in the cart and increments the product quantity by 1 in products.In any case, this 
    function also resets the inactivity timer once the remove button is clicked.
*/

function removeFromCart(productName) {
    clearInterval(cartTimer);
    inactiveTime = 3000000000000;
    cartTimer = setInterval(function(){ countDown(); }, 1000);
    
    if ((cart.hasOwnProperty(productName)) && (cart[productName] > 0)) {
        cart[productName] -= 1;
        products[productName] += 1;
        
        if(cart[productName] == 0) {
            delete cart[productName];
        }
    } else {
        alert("You don't have any " + productName + " in your cart!");
    }    
}

/*
    This function is tied to the showCartButton. This shows all the items in the cart and
    their respective quantities in a series of alert boxes, with one alert box for every 
    product in the cart. If there are several items in the cart, the alert boxes appear in 
    5 second intervals.
*/

function showCart(){
    if(Object.keys(cart).length == 0 && cart.constructor == Object){
        alert("There is currently nothing in your cart.");
    }
    else{
        var cartTimerVal = 0;
        var length = Object.keys(cart).length;
        var counter = 0;
        for(product in cart){
           alert("Your cart has " + cart[product] + " " + productRealName(product));
           if (counter < (length-1)) {
               sleep(5000);
           }
           counter++;
        }
    }
}

/*
    A function that waits 5 seconds. 
    Utilized in the showCart() function.
*/

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
       //do nothing
   }
}

/*
    Translates the product IDs into the actual product names when displaying the cart.
*/
function productRealName(productName) {
    var resultName;
    switch(productName){
        case "Box1":
            resultName = "Clear Plastic Container";
            break;
        case "Box2":
            resultName = "Set of plastic containers";
            break;
        case "Clothes1":
            resultName = "Burgundy Dress";
            break;
        case "Clothes2":
            resultName = "Shirt";
            break;
        case "Jeans":
            resultName = "Jeans";
            break;
        case "Keyboard":
            resultName = "LED Keyboard";
            break;
        case "KeyboardCombo":
            resultName = "Gaming Keyboard";
            break;
        case "Mice":
            resultName = "Mouse";
            break;
        case "Pc1":
            resultName = "Dell PC Tower";
            break;
        case "Pc2":
            resultName = "Personal Computer Set";
            break;
        case "Pc3":
            resultName = "Computer Tower";
            break;
        case "Tent":
            resultName = "Tent";
            break;
            
    }
    return resultName;
}
