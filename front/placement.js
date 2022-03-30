
let set = document.getElementById("game").firstElementChild //"game" correspond à l'id du table
let rotate = 0; //rotate value
let boat = 0; //boat value

function Turn() {
    if (rotate == 1) {
        rotate = 0;
    }
    else {
        rotate = 1
    };
}

let rot = document.getElementById("rotateButton")

rot.addEventListener("click", () => Turn())

function porteavionplace(target) {
    if (rotate == 0) {

        var lineav = parseInt(target.id);

        for (let i = 0; i < 5; i++) {
            var tmp = document.getElementById(lineav);
            tmp.style.backgroundColor = "red"
            lineav++;

        }
    }
    else {
        var lineav = parseInt((target.id[0]) + target.id[1]);
        for (let i = 0; i < 5; i++) {
            var tmp = document.getElementById(lineav);
            tmp.style.backgroundColor = "red";
            lineav += 10;
        }

    }
}
function croiseurplace(target) {
    if (rotate == 0) {

        var lineav = parseInt(target.id);

        for (let i = 0; i < 4; i++) {
            var tmp = document.getElementById(lineav);
            tmp.style.backgroundColor = "pink"
            lineav++;

        }
    }
    else {
        var lineav = parseInt((target.id[0]) + target.id[1]);
        for (let i = 0; i < 4; i++) {
            var tmp = document.getElementById(lineav);
            tmp.style.backgroundColor = "pink";
            lineav += 10;
        }

    }
}
function contretorpilleurplace(target) {
    if (rotate == 0) {

        var lineav = parseInt(target.id);

        for (let i = 0; i < 3; i++) {
            var tmp = document.getElementById(lineav);
            tmp.style.backgroundColor = "yellow"
            lineav++;

        }
    }
    else {
        var lineav = parseInt((target.id[0]) + target.id[1]);
        for (let i = 0; i < 3; i++) {
            var tmp = document.getElementById(lineav);
            tmp.style.backgroundColor = "yellow";
            lineav += 10;
        }

    }
}

function torpilleurplace(target) {
    if (rotate == 0) {

        var lineav = parseInt(target.id);

        for (let i = 0; i < 2; i++) {
            var tmp = document.getElementById(lineav);
            tmp.style.backgroundColor = "green"
            lineav++;

        }
    }
    else {
        var lineav = parseInt((target.id[0]) + target.id[1]);
        for (let i = 0; i < 2; i++) {
            var tmp = document.getElementById(lineav);
            tmp.style.backgroundColor = "green";
            lineav += 10;
        }

    }
}
function sousmarinplace(target) {
    if (rotate == 0) {

        var lineav = parseInt(target.id);

        for (let i = 0; i < 1; i++) {
            var tmp = document.getElementById(lineav);
            tmp.style.backgroundColor = "purple"
            lineav++;

        }
    }
    else {
        var lineav = parseInt((target.id[0]) + target.id[1]);
        for (let i = 0; i < 1; i++) {
            var tmp = document.getElementById(lineav);
            tmp.style.backgroundColor = "purple";
            lineav += 10;
        }

    }
}
function place(target) {
    if (boat == 0) {
        porteavionplace(target); //5 carre
    }
    if (boat == 1) {
        croiseurplace(target);// 4 carre
    }
    if (boat == 2) {
        contretorpilleurplace(target);// 3 carre
    }
    if (boat == 3) {
        torpilleurplace(target);// 2 carre
    }
    if (boat == 4) {
        sousmarinplace(target);// 1 carre
    }
}

if(set){
for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
        set.children[i].children[j].addEventListener("click", function () { place(set.children[i].children[j]) }, { once: true });
       
    }
}
}






function changeBoat (parameter){
    boat=parameter;
}

 let bpa= document.getElementById("BporteAvion")
 let bcp= document.getElementById("Bcroiseurplace")
 let bcpp= document.getElementById("Bcontretorpilleurplace")
 let btp= document.getElementById("Btorpilleurplace")
 let bsmp= document.getElementById("Bsousmarinplace")


 
 bpa.addEventListener("click", () => changeBoat(0))
 bcp.addEventListener("click", () => changeBoat(1))
 bcpp.addEventListener("click", () => changeBoat(2))
 btp.addEventListener("click", () => changeBoat(3))
 bsmp.addEventListener("click", () => changeBoat(4))

  
 
 
 