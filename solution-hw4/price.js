document.addEventListener("DOMContentLoaded", function () { //https://www.javascripttutorial.net/javascript-dom/javascript-domcontentloaded/

// establish glaze and pack options

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

    let glaze_select = document.getElementById('glaze');
    let pack_select = document.getElementById('psize');
    let final_price = document.getElementById('totalprice');

    // populate glaze and pack size

    for (let key in glaze_options) { // https://softauthor.com/javascript-dynamic-html-select-drop-down/
        let option = document.createElement("option");
        option.setAttribute('value', glaze_options[key]);

        let optionText = document.createTextNode(key);
        option.appendChild(optionText);

        glaze_select.appendChild(option);
    }

    for (let key in pack_size) {
        let option = document.createElement("option");
        option.setAttribute('value', pack_size[key]);

        let optionText = document.createTextNode(key);
        option.appendChild(optionText);

        pack_select.appendChild(option);
    }


    // url parameters

    let cart = [];

let query_string = window.location.search;
let params = new URLSearchParams(query_string);
let roll_type = params.get('roll');
let current_roll = rolls[roll_type];

// update header

const header_element = document.querySelector('#productheader');
header_element.innerText = roll_type + " Cinnamon Roll";

// update image

let roll_image = document.querySelector('.productimg img'); 
    roll_image.src = '../assets/products/' + current_roll.imageFile;

    // calculate price

    function calculate_price() {
        let glaze_change = parseFloat(glaze_select.value);
        let pack_change = parseFloat(pack_select.value);
        let base_price = current_roll.basePrice;

        let glaze_price = glaze_change + base_price;
        let total_price = glaze_price * pack_change;

        final_price.textContent = "$" + total_price.toFixed(2); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    }

    // update price on change

    calculate_price();

    glaze_select.onchange = calculate_price;
    pack_select.onchange = calculate_price;


    // add roll to cart

    class Roll {
        constructor(roll_type, roll_glazing, size_pack, base_price) {
            this.type = roll_type;
            this.glazing =  roll_glazing;
            this.size = size_pack;
            this.basePrice = base_price;
        }
    }

    let new_roll = new Roll; 


    

});
