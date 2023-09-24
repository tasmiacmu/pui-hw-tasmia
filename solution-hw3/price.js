
document.addEventListener("DOMContentLoaded", function() {
    
    let glaze_options = {
       "Keep original": 0,
       "Sugar milk": 0,
       "Vanilla milk": 0.5,
       "Double chocolate": 1.5
    };

    let pack_size = {
        "1": 1,
        "3": 3,
        "6": 5,
        "12": 10
     };

 
    let glaze_select = document.getElementById('glaze');
 
    for (let key in glaze_options) { // https://softauthor.com/javascript-dynamic-html-select-drop-down/
       let option = document.createElement("option");
       option.setAttribute('value', glaze_options[key]);
 
       let optionText = document.createTextNode(key);
       option.appendChild(optionText);
 
       glaze_select.appendChild(option);
    }

    let pack_select = document.getElementById('psize');

    for (let key in pack_size) { 
        let option = document.createElement("option");
        option.setAttribute('value', pack_size[key]);
  
        let optionText = document.createTextNode(key);
        option.appendChild(optionText);
  
        pack_select.appendChild(option);
     }


 });
 












/*

class Glaze {
    constructor(given_name, given_adaptation) {
   this.name = given_name; // attribute
   this.adaptation = given_adaptation; // attribute

    }
   } 

   let glaze_options = {
new Glaze("Keep original", 0),
new Glaze("Sugar milk", 0),
new Glaze("Vanilla milk", .5),
new Glaze("Double chocolate", 1.5)
   }

class Pack {
    constructor(given_option, given_adaptation) {
   this.option = given_option; // attribute
   this.adaptation = given_adaptation; // attribute

    }
   } 

let pack_options = {
   new Pack("1", 1),
   new Pack("3", 3),
   new Pack("6", 5),
   new Pack("12", 10)
}

*/

/*

let glaze_options = {
    "Keep original": 0,
    "Sugar milk": 0,
    "Vanilla milk": 0.5,
    "Double chocolate": 1.5
  };
  
  let glaze_select = document.getElementById('glaze');
  
  for (let key in glaze_options) {
    let option = document.createElement("option");
    option.setAttribute('value', glaze_options[key]); // Use glaze_options here
    
    let optionText = document.createTextNode(key);
    option.appendChild(optionText);
    
    glaze_select.appendChild(option);
  }
  */

  

/*
let glazeSelect = document.getElementById('glaze');

function populateDropdown(arr) {
  arr.forEach(glaze => {
    let option = document.createElement("option");
    option.value = glaze.adaptation; // Set the value to the price adaptation
    option.text = glaze.name; // Set the text to the glaze name
    glazeSelect.appendChild(option);
  });
}

populateDropdown(glaze_options);
*/


/*

  function populate_dropdown(select_id, options) {
    let select_glaze = document.querySelector("#" + select_id);
  
    select_glaze.innerHTML = "";
  
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let option_element = document.createElement("option");
      option_element.value = option.adaptation; 
      option_element.text = option.name; 
      select_glaze.appendChild(option_element);
    }
  }
  

populate_dropdown("glaze", glazes);
  
*/

