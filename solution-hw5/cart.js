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

    // new roll objects

    let roll_original = new Roll('Original', 'Sugar milk', '1');
    let roll_walnut = new Roll('Walnut', 'Vanilla milk', '12');
    let roll_raisin = new Roll('Raisin', 'Sugar milk', '3');
    let roll_apple = new Roll('Apple', 'Keep original', '3');

    customElements.define(
        "my-paragraph",
        class extends HTMLElement {
          constructor() {
            super();
            let template = document.getElementById("my-paragraph");
            let templateContent = template.content;
      
            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));
          }
        },
      );
   

});