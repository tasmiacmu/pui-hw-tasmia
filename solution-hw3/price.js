document.addEventListener("DOMContentLoaded", function () {
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

    function calculate_price() {
        let glaze_change = parseFloat(glaze_select.value);
        let pack_change = parseFloat(pack_select.value);

        let glaze_price = glaze_change + 2.49;
        let total_price = glaze_price * pack_change;

        final_price.textContent = "$" + total_price.toFixed(2); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    }

    calculate_price();

    glaze_select.onchange = calculate_price;
    pack_select.onchange = calculate_price;

});
