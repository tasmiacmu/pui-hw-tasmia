console.log(JSON.parse(localStorage.getItem('cart')) || []);
document.addEventListener("DOMContentLoaded", function() {

	let cart = JSON.parse(localStorage.getItem('cart')) || []; // a friend recommended adding the 'or' modifier



	// create roll class 

	class Roll {
		constructor(roll_type, roll_glazing, size_pack, base_price, calculated_price) {
			this.type = roll_type;
			this.glazing = roll_glazing;
			this.size = size_pack;
			this.base_price = base_price;
			this.calculated_price = calculated_price;
		}

		// method to calculate price
		calculate_price() {
			let glaze_price = glaze_options[this.glazing];
			let base_price = rolls[this.type].basePrice;
			let total_price = (base_price + glaze_price) * pack_size[this.size];
			this.calculated_price = total_price.toFixed(2);
		}
	}

	// rolls object

	let rolls = {
		"Original": {
			"basePrice": 2.49,
			"imageFile": "original-cinnamon-roll.jpg"
		},
		"Apple": {
			"basePrice": 3.49,
			"imageFile": "apple-cinnamon-roll.jpg"
		},
		"Raisin": {
			"basePrice": 2.99,
			"imageFile": "raisin-cinnamon-roll.jpg"
		},
		"Walnut": {
			"basePrice": 3.49,
			"imageFile": "walnut-cinnamon-roll.jpg"
		},
		"Double-Chocolate": {
			"basePrice": 3.99,
			"imageFile": "double-chocolate-cinnamon-roll.jpg"
		},
		"Strawberry": {
			"basePrice": 3.99,
			"imageFile": "strawberry-cinnamon-roll.jpg"
		}
	};

	// glazing and pack

	let glaze_options = {
		"Keep original": 0,
		"Sugar milk": 0,
		"Vanilla milk": 0.5,
		"Double chocolate": 1.5,
	};

	let pack_size = {
		"1": 1,
		"3": 3,
		"6": 5,
		"12": 10,
	};

	// adds into DOM

	function add_to_cart(roll) {



		let cart_item = document.createElement('div');
		cart_item.classList.add('cart-item');


		let cartimg = document.createElement('div');
		cartimg.classList.add('cartimg');

		let item_image = document.createElement('img');
		item_image.src = `../assets/products/${rolls[roll.type].imageFile}`;
		item_image.alt = `${roll.type} cinnamon roll`;

		cartimg.appendChild(item_image);


		let remove_button = document.createElement('span');
		remove_button.textContent = 'Remove';

		let removelink = document.createElement('div');
		removelink.classList.add('removelink');
		removelink.appendChild(remove_button);


		cartimg.appendChild(removelink);


		let cartinfo = document.createElement('div');
		cartinfo.classList.add('cartinfo');

		let item_name = document.createElement('span');
		item_name.textContent = roll.type;


		cartinfo.appendChild(item_name);
		cartinfo.appendChild(document.createElement('br'));

		let item_glazing = document.createElement('span');
		item_glazing.textContent = `Glazing: ${roll.glazing}`;


		cartinfo.appendChild(item_glazing);
		cartinfo.appendChild(document.createElement('br'));

		let item_pack_size = document.createElement('span');
		item_pack_size.textContent = `Pack Size: ${roll.size}`;

		cartinfo.appendChild(item_pack_size);


		let cartprice = document.createElement('div');
		cartprice.classList.add('cartprice');

		let item_price = document.createElement('span');
		item_price.textContent = `$${roll.calculated_price}`;



		cartprice.appendChild(item_price);


		cart_item.appendChild(cartimg);
		cart_item.appendChild(cartinfo);
		cart_item.appendChild(cartprice);


		let shopping_cart = document.querySelector('#shopcart');
		shopping_cart.appendChild(cart_item);

		updateTotalPrice();
	}






	// total price

	function updateTotalPrice() {
		let total_price = 0;
		for (let i = 0; i < cart.length; i++) {
			let item = cart[i];
			total_price += parseFloat(item.calculated_price);
		}

		let total_element = document.getElementById('totalprice');
		total_element.textContent = `Total: $${total_price.toFixed(2)}`;
	}



	// remove cart

	function remove_cart(index) {
		let shopping_cart = document.querySelector('#shopcart');
		let cart_item = shopping_cart.getElementsByClassName('cart-item');

		if (index >= 0 && index < cart_item.length) {
			while (cart_item.length > 0) {
				shopping_cart.removeChild(cart_item[0]);
			}

			cart.splice(index, 1);
			cart_item = shopping_cart.getElementsByClassName('cart-item');

			for (let i = 0; i < cart.length; i++) {
				add_to_cart(cart[i]);
			}

			updateTotalPrice();
			console.log(cart);
		}

		// update localStorage 
		localStorage.setItem('cart', JSON.stringify(cart));
	}



	function removeFromCartArray(index) {
		cart.splice(index, 1);

		// save updated cart
		localStorage.setItem('cart', JSON.stringify(cart));
	}


	document.addEventListener('click', function(event) {
		if (event.target && event.target.textContent === 'Remove') {
			let cart_item = document.getElementsByClassName('cart-item');
			for (let i = 0; i < cart_item.length; i++) {
				if (cart_item[i].contains(event.target)) {
					remove_cart(i);
					removeFromCartArray(i);
					break;
				}
			}
		}
	});

	
	for (let i = 0; i < cart.length; i++) {
		add_to_cart(cart[i]);
	}







});