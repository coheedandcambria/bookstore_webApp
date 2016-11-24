// Test: Adding a single product to cart
QUnit.test( "addToCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Keyboard";

	addToCart(product);

	assert.ok(ifProductInCart(product), "Added "+ product +" Successfully");
	assert.equal(quantityOfProductInCart(product), 1, product + " quanity is correct");
	assert.equal(remainingProductQuantity(product), 4, product + "'s stock has decreased accurately.");
});

// Test: Adding product that is out of stock
QUnit.test( "addToCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Tent";
	var stockLimit = 5;

	// Try adding product after it is sold out (when it goes over 5)
	for(var i=0; i < stockLimit + 1; i++){
		addToCart(product);
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
		addToCart(productArr[0]);
	}
	for(i=0; i < stockLimit - 3; i++){
		addToCart(productArr[1]);
		addToCart(productArr[2]);
	}
	addToCart(productArr[1]);

	assert.equal(quantityOfProductInCart(productArr[0]), 5, "Added " + productArr[0] + " Successfully.");
	assert.equal(quantityOfProductInCart(productArr[1]), 3, "Added " + productArr[1] + " Successfully.");
	assert.equal(quantityOfProductInCart(productArr[2]), 2, "Added " + productArr[2] + " Successfully.");

	assert.equal(remainingProductQuantity(productArr[0]), 0, productArr[0] + "'s stock has decreased accurately.");
	assert.equal(remainingProductQuantity(productArr[1]), 2, productArr[1] + "'s stock has decreased accurately.");
	assert.equal(remainingProductQuantity(productArr[2]), 3, productArr[2] + "'s stock has decreased accurately.");
});

// Test: Removing a product from cart
QUnit.test( "removeFromCart", function( assert ) {
	resetCart();
	resetProducts();
	var product = "Jeans";
	
	addToCart(product);
	assert.ok(ifProductInCart(product), "Added " + product + " Successfully");
	removeFromCart(product);
	
	assert.equal(ifProductInCart(product), false, "Removed " + product + " Successfully");
	assert.equal(remainingProductQuantity(product), 5, product + "'s full stock still available");
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

	addToCart(product);
	assert.ok(ifProductInCart(product), "Added " + product + " Successfully");
	removeFromCart(product);

	assert.equal(ObjSize(cart), 0, "Cart empty after some transactions.");
});

// Returns if 'productName' is in the Cart or not.
function ifProductInCart(productName){
	return cart.hasOwnProperty(productName);
}

// Returns the quanitity of 'productName' if its in the cart, zero otherwise.
function quantityOfProductInCart(productName){
	if(cart.hasOwnProperty(productName))
		return cart[productName];
	else
		return 0;
}

// Returns the reamining stock quanity of 'productName' from the products
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