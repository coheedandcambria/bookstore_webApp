// Test: Adding a single product to cart
QUnit.test( "addToCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Keyboard";

	if(productExist(product)) {
		addToCart(product);
	}

	assert.ok(ifProductInCart(product), "Added "+ product +" Successfully");
	assert.equal(quantityOfProductInCart(product), 1, product + " quanity is correct");
	assert.equal(remainingProductQuantity(product), 4, product + "'s stock has decreased accurately.");
  	assert.equal(inactiveTime, 30, "Inactive time has reset");
});

// Test: Adding product that is out of stock
QUnit.test( "addToCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Tent";
	var stockLimit = 5;

	// Try adding product after it is sold out (when it goes over 5)
	for(var i=0; i < stockLimit + 1; i++){
		if(productExist(product)) {
			addToCart(product);
		}
	}

	assert.equal(quantityOfProductInCart(product), 5, "Only added " + product + " 5 times, since it was sold out after that.");
	assert.equal(remainingProductQuantity(product), 0, product + "'s stock has decreased accurately.");
});

// Test: Adding multiple products to cart
QUnit.test( "addToCart", function( assert ) {
	resetCart();
	resetProducts();
	var productArr = ["Pc1", "Box1", "KeyboardCombo"];
	var stockLimit = 5;

	// Add various products to cart
	for(var i=0; i < stockLimit; i++){
		if(productExist(productArr[0])) {
			addToCart(productArr[0]);
		}
	}
	for(i=0; i < stockLimit - 3; i++){
		if(productExist(productArr[1])) {
			addToCart(productArr[1]);
		}
		if(productExist(productArr[2])) {
			addToCart(productArr[2]);
		}
	}
	addToCart(productArr[1]);

	assert.equal(quantityOfProductInCart(productArr[0]), 5, "Added " + productArr[0] + " Successfully.");
	assert.equal(quantityOfProductInCart(productArr[1]), 3, "Added " + productArr[1] + " Successfully.");
	assert.equal(quantityOfProductInCart(productArr[2]), 2, "Added " + productArr[2] + " Successfully.");

	assert.equal(remainingProductQuantity(productArr[0]), 0, productArr[0] + "'s stock has decreased accurately.");
	assert.equal(remainingProductQuantity(productArr[1]), 2, productArr[1] + "'s stock has decreased accurately.");
	assert.equal(remainingProductQuantity(productArr[2]), 3, productArr[2] + "'s stock has decreased accurately.");
});

// Test: Adding a non-existing product
QUnit.test( "addToCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "CPEN422";

	if(productExist(product)) {
		addToCart(product);	
	}
	
	assert.ok(!ifProductInCart(product), product +" does not exist, not added");
	assert.equal(remainingProductQuantity(product), 0, product + " does not exist");
});

// Test: Removing a product from cart
QUnit.test( "removeFromCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Jeans";
	
	if(productExist(product)) {
		addToCart(product);
	}
	assert.ok(ifProductInCart(product), "Added " + product + " Successfully");
	removeFromCart(product);
	
	assert.equal(ifProductInCart(product), false, "Removed " + product + " Successfully");
	assert.equal(remainingProductQuantity(product), 5, product + "'s full stock still available");
	assert.equal(quantityOfProductInCart(product), 0, product + " No Longer In Cart");
  assert.equal(inactiveTime, 30, "Inactive time has reset");
});

// Test: Removing a product that is not even in the cart
QUnit.test( "removeFromCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Mice";
	
	removeFromCart(product);
	
	assert.equal(ifProductInCart(product), false, "Can't Remove " + product + " because it isn't in the cart");
	assert.equal(remainingProductQuantity(product), 5, product + "'s full stock still available");
});

// Test: Empty Cart
QUnit.test( "removeFromCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Clothes1";

	assert.equal(ObjSize(cart), 0, "Cart empty originally.");

	if(productExist(product)) {
		addToCart(product);
	}
	assert.ok(ifProductInCart(product), "Added " + product + " Successfully");
	removeFromCart(product);

	assert.equal(ObjSize(cart), 0, "Cart empty after some transactions.");
});

// Test: Retrieving real name of product with product name
QUnit.test( "productRealName", function( assert ) {
	var product = "Keyboard";
	var realName = productRealName(product);
	assert.equal(realName, "LED Keyboard", "Real product name of " + product + " is " + realName);
	
//	product = "KeyboardCombo";
//	realName = productRealName(product);
	assert.equal(productRealName("KeyboardCombo"), "Gaming Keyboard", "KeyboardCombo case asserted");
    assert.equal(productRealName("Box1"), "Clear Plastic Container", "Box1 case asserted");
    assert.equal(productRealName("Box2"), "Set of plastic containers", "Box2 case asserted");
    assert.equal(productRealName("Clothes1"), "Burgundy Dress", "Clothes1 case asserted");
    assert.equal(productRealName("Clothes2"), "Shirt", "Clothes2 case asserted");
    assert.equal(productRealName("Jeans"), "Jeans", "Jeans case asserted");
    assert.equal(productRealName("Keyboard"), "LED Keyboard", "Keyboard case asserted");
    assert.equal(productRealName("Mice"), "Mouse", "Mice case asserted");
    assert.equal(productRealName("Pc1"), "Dell PC Tower", "Pc1 case asserted");
    assert.equal(productRealName("Pc2"), "Personal Computer Set", "Pc2 case asserted");
    assert.equal(productRealName("Pc3"), "Computer Tower", "Pc3 case asserted");
    assert.equal(productRealName("Tent"), "Tent", "Tent case asserted");
});

// Test: Retrieving the real name of invalid/non-existent products
QUnit.test( "productRealName", function( assert ) {
	var product = "Macbook";
	var realName = productRealName(product);
	assert.equal(realName, null, product + " Does Not Exist");

	product = "IPhone7";
	realName = productRealName(product);
	assert.equal(realName, null, product + " Does Not Exist");
});

/*
    Function in test: countDown()
    Case: Tests if the countDown function decrements the inactive timer
          from 30 to 29 after one second. (Inactive timer is set to 30 seconds)
*/
QUnit.test("countDown", function(assert){
    var done = assert.async();
    setTimeout(function(){
        resetTimer();
        countDown();
        assert.equal(inactiveTime, 29, "inactive time asserted");
        done();
    }, 1000);
});

/*
    Function in test: countDown()
    Case: Tests if the countDown function resets the inactive timer
          to 30 seconds after the user is inactive for 30 seconds.
*/
QUnit.test("countDown", function(assert){
    var done = assert.async();
    resetTimer();
    setTimeout(function(){
        resetTimer();
        for(var i=0; i<31; i++){
            countDown();
        }
        assert.equal(inactiveTime, 30, "inactive time asserted");
        done();
    }, 1000);
});

/*
    Function in test: configureButton
    Case: Creating an add to cart button.
*/
QUnit.test("configureButton", function(assert){
   var b = configureButton("Add", "addBtn");
    assert.ok(b, "The button has been created");
    assert.equal(b.className, "btn addBtn", "Button is created with the correct class");
    assert.equal(b.innerHTML, "Add", "Button is created with the correct inner text");
});

/*
    Function in test: configureButton
    Case: Creating a remove from cart button.
*/
QUnit.test("configureButton", function(assert){
   var b = configureButton("Remove", "removeBtn");
    assert.ok(b, "The button has been created");
    assert.equal(b.className, "btn removeBtn", "Button is created with the correct class");
    assert.equal(b.innerHTML, "Remove", "Button is created with the correct inner text");
});

// Returns if 'productName' is in the Cart or not.
function ifProductInCart(productName){
	return cart.hasOwnProperty(productName);
}

// Returns if 'productName' exists or not.
function productExist(productName) {
	return products.hasOwnProperty(productName);
}

// Returns the quanitity of 'productName' if its in the cart, zero otherwise.
function quantityOfProductInCart(productName){
	if(cart.hasOwnProperty(productName))
		return cart[productName];
	else
		return 0;
}

// Returns the remaining stock quanity of 'productName' from the products
function remainingProductQuantity(productName){
	if(products.hasOwnProperty(productName))
		return products[productName];
	else
		return 0;
}

// Resets the cart, makes it empty
function resetCart(){
	for (var item in cart) delete cart[item];
}

// Resets the products, to have full stock of 5
function resetProducts(){
	for (var item in products) products[item] = 5;
}

// Returns the size of the 'obj'
function ObjSize(obj){
	var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

//Resets the timer
function resetTimer(){
    inactiveTime = 30;
}