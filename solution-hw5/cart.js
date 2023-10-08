document.addEventListener("DOMContentLoaded", function() {

    let cart = [];

    // create roll class 

    class Roll {
        constructor(roll_type, roll_glazing, size_pack) {
            this.type = roll_type;
            this.glazing = roll_glazing;
            this.size = size_pack;
            this.calculate_price(); 
        }

        // method to calculate price
        calculate_price() {
            let glaze_price = glaze_options[this.glazing];
            let base_price = rolls[this.type].basePrice;
            let total_price = (base_price + glaze_price) * pack_size[this.size];
            this.calculated_price = total_price.toFixed(2);
        }
    }

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

    function add_to_cart(roll) {
       
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
    
      
        let cartimg = document.createElement('div');
        cartimg.classList.add('cartimg');
    
        let itemImage = document.createElement('img');
        itemImage.src = `../assets/products/${rolls[roll.type].imageFile}`;
        itemImage.alt = `${roll.type} cinnamon roll`;
    
        cartimg.appendChild(itemImage);
    
      
        let removeButton = document.createElement('span');
        removeButton.textContent = 'Remove';
    
        let removelink = document.createElement('div');
        removelink.classList.add('removelink');
        removelink.appendChild(removeButton);
    
      
        cartimg.appendChild(removelink);
    
       
        let cartinfo = document.createElement('div');
        cartinfo.classList.add('cartinfo');
    
        let itemName = document.createElement('span');
        itemName.textContent = roll.type;
    
       
        cartinfo.appendChild(itemName);
        cartinfo.appendChild(document.createElement('br')); 
    
        let itemGlazing = document.createElement('span');
        itemGlazing.textContent = `Glazing: ${roll.glazing}`;
    
        // Add a line break after item glazing
        cartinfo.appendChild(itemGlazing);
        cartinfo.appendChild(document.createElement('br')); 
    
        let itemPackSize = document.createElement('span');
        itemPackSize.textContent = `Pack Size: ${roll.size}`;
    
        cartinfo.appendChild(itemPackSize);
    
      
        let cartprice = document.createElement('div');
        cartprice.classList.add('cartprice');
    
        let itemPrice = document.createElement('span');
        itemPrice.textContent = `$${roll.calculated_price}`;
    
        cartprice.appendChild(itemPrice);
    
     
        cartItem.appendChild(cartimg);
        cartItem.appendChild(cartinfo);
        cartItem.appendChild(cartprice); 
    
        
        let shoppingCart = document.querySelector('#shopcart');
        shoppingCart.appendChild(cartItem);
    }
    
    

 
    // create roll objects and add them to the cart
    let roll_original = new Roll('Original', 'Sugar milk', '1');
    let roll_walnut = new Roll('Walnut', 'Vanilla milk', '12');
    let roll_raisin = new Roll('Raisin', 'Sugar milk', '3');
    let roll_apple = new Roll('Apple', 'Keep original', '3');

    cart.push(roll_original);
    cart.push(roll_walnut);
    cart.push(roll_raisin);
    cart.push(roll_apple);


   
    add_to_cart(roll_original);
    add_to_cart(roll_walnut);
    add_to_cart(roll_raisin);
    add_to_cart(roll_apple);


    let totalPrice = 0;
for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    totalPrice += parseFloat(item.calculated_price);
}

let totalElement = document.getElementById('totalprice');
totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;


function remove_cart(index) {
   
    cart.splice(index, 1);

    
    let shoppingCart = document.querySelector('#shopcart');
    let cartItems = shoppingCart.getElementsByClassName('cart-item');
    
    
    if (index >= 0 && index < cartItems.length) {
        let cartItemToRemove = cartItems[index];
        shoppingCart.removeChild(cartItemToRemove);
    }

  
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        totalPrice += parseFloat(item.calculated_price);
    }

    let totalElement = document.getElementById('totalprice');
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}


document.addEventListener('click', function (event) {
    if (event.target && event.target.textContent === 'Remove') {
        let cartItems = document.getElementsByClassName('cart-item');
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].contains(event.target)) {
                remove_cart(i);
                break; 
            }
        }
    }
});





    
   

});
