// Test: Adding a single product to cart
QUnit.test( "addToCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Keyboard";
	console.log("-------Test 1 ------------");
	console.log(ifProductInCart(product));
	console.log(JSON.stringify(cart));
	addToCart(product);
	console.log(ifProductInCart(product));
	console.log(JSON.stringify(cart));
  	assert.ok(ifProductInCart(product), "Added "+ product +" Successfully");
});

// Test: Adding product that is out of stock
QUnit.test( "addToCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Tent";
	var stockLimit = 5;

	console.log("-------Test 2------------");
	console.log(JSON.stringify(cart));
	// Try adding product after it is sold out (when it goes over 5)
	for(var i=0; i < stockLimit + 1; i++){
		addToCart(product);
	}
	console.log(JSON.stringify(cart));
	assert.equal(quantityOfProductInCart(product), 5, "Only added " + product + " 5 times, since it was sold out after that.");
	console.log(JSON.stringify(cart));
});

// Test: Adding multiple products to cart
QUnit.test( "addToCart", function( assert ) {
	resetCart();
	resetProducts();
	var productArr = ["Pc1", "Box1", "KeyboardCombo"];
	var stockLimit = 5;

	console.log("-------Test 3------------");
	console.log(JSON.stringify(cart));
	// Add various products to cart
	for(var i=0; i < stockLimit; i++){
		addToCart(productArr[0]);
	}
	for(i=0; i < stockLimit - 3; i++){
		addToCart(productArr[1]);
		addToCart(productArr[2]);
	}
	addToCart(productArr[1]);

	console.log(JSON.stringify(cart));
	assert.equal(quantityOfProductInCart(productArr[0]), 5, "Added " + productArr[0] + " Successfully.");
	assert.equal(quantityOfProductInCart(productArr[1]), 3, "Added " + productArr[1] + " Successfully.");
	assert.equal(quantityOfProductInCart(productArr[2]), 2, "Added " + productArr[2] + " Successfully.");
});

// Test: Removing a product from cart
QUnit.test( "removeFromCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Jeans";

	console.log("-------Test 4 ------------");
	console.log(JSON.stringify(cart));
	
	addToCart(product);
	console.log(JSON.stringify(cart));
	assert.ok(ifProductInCart(product), "Added " + product + " Successfully");
	removeFromCart(product);
	
	console.log(JSON.stringify(cart));
	console.log(ifProductInCart(product));
  	assert.equal(ifProductInCart(product), false, "Removed " + product + " Successfully");
});

// Test: Removing a product that is not even in the cart
QUnit.test( "removeFromCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Mice";

	console.log("-------Test 5 ------------");
	console.log(JSON.stringify(cart));
	
	removeFromCart(product);
	
	console.log(JSON.stringify(cart));
	console.log(ifProductInCart(product));
  	assert.equal(ifProductInCart(product), false, "Can't Remove " + product + " because it isn't in the cart");
});


function ifProductInCart(productName){
	var bool = cart.hasOwnProperty(productName);
	return bool;
}

function quantityOfProductInCart(productName){
	if(cart.hasOwnProperty(productName))
		return cart[productName];
	else
		return 0;
}

function quantityOfProduct(productName){
	if(products.hasOwnProperty(productName))
		return products[productName];
	else
		return 0;
}

function resetCart(){
	for (var item in cart) delete cart[item];
}

function resetProducts(){
	for (var item in products) products[item] = 5;
}