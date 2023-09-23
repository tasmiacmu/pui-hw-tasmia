class Glaze {
    constructor(given_option, given_adaptation) {
   this.option = given_option; // attribute
   this.adaptation = given_adaptation; // attribute

    }
   } 

let original = new Glaze("Keep original", 0);
let sugar = new Glaze("Sugar milk", 0);
let vanilla = new Glaze("Vanilla milk", .5);
let double_choc = new Glaze("Double chocolate", 1.5);

class Pack {
    constructor(given_option, given_adaptation) {
   this.option = given_option; // attribute
   this.adaptation = given_adaptation; // attribute

    }
   } 

   let pack_one = new Pack("1", 1);
   let pack_three = new Pack("3", 3);
   let pack_six = new Pack("6", 5);
   let pack_twelve = new Pack("12", 10);


   document.querySelector("#glaze_keeporiginal").addEventListener('click', onUpdateClick);

