let resetBtn = document.getElementById("reset");
let scoreJoueur = document.getElementById("score-joueur");
let scoreOrdinateur = document.getElementById("score-ordinateur");
let btnJoueur = [...document.getElementsByClassName("btn-joueur")];
let opierreBtn = document.getElementById("opierre");
let ofeuilleBtn = document.getElementById("ofeuille");
let ociseauxBtn = document.getElementById("ociseaux");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");


const jouerManche = (e) => {
  let choix = e.target.closest(".btn-joueur");

  btnJoueur.forEach((btn) => {
    btn.classList.add("desactivated");
    btn.removeEventListener("click", jouerManche);

  })

  choix.classList.remove("desactivated")
  choix.classList.add("active");


  let choixJoueur = choix.id;

  let choixOrdi = faireChoixOrdinateur();

  verifierGagnant(choixJoueur, choixOrdi);


  nextBtn.style.visibility = "visible";
};

const Pierre = "pierre";
const Feuille = "feuille";
const Ciseaux = "ciseaux";


const faireChoixOrdinateur = () => {
  // 0 = pierre
  // 1 = feuille
  // 2 = ciseaux

  let nbAleatoire = Math.floor(Math.random() * 3);

  switch(nbAleatoire){
    case 0 :
        opierreBtn.classList.add("active");
        return Pierre;
    case 1 :
        ofeuilleBtn.classList.add("active");
      return Feuille;
      default:
        ociseauxBtn.classList.add("active");
        return Ciseaux;
  };

};

const verifierGagnant = (choixJoueur, choixOrdi) => {
  if(choixJoueur === choixOrdi){
    message.textContent = "Egalité"
    return;
  }

  if(choixJoueur === Pierre){
     if (choixOrdi === Feuille){
       return victoireOrdinateur();

     } else if(choixOrdi == Ciseaux) {
      return victoireJoueur();

     }
  };

  if(choixJoueur === Feuille){
    if (choixOrdi === Ciseaux){
      return victoireOrdinateur();

    } else if(choixOrdi == Pierre) {
     return victoireJoueur();

    }
 };

 if(choixJoueur === Ciseaux){
  if (choixOrdi === Pierre){
    return victoireOrdinateur();

  } else if(choixOrdi == Feuille) {
   return victoireJoueur();

  }
 };
};




const victoireOrdinateur = () => {
   message.textContent = "l'ordinateur gagne....";
   scoreOrdinateur.textContent++;
};

const victoireJoueur = () => {
  message.textContent = "Vous avez gagné ! ;)";
  scoreJoueur.textContent++;
};

const preparerNouvelleManche = () => {
  btnJoueur.forEach((btn) => {
    btn.classList.remove("desactivated");
    btn.classList.remove("active");

    btn.addEventListener("click", jouerManche);

  });

  nextBtn.visibility = "hidden";

  opierreBtn.classList.remove("active");
  ofeuilleBtn.classList.remove("active");
  ociseauxBtn.classList.remove("active");

  message.textContent = "A vous de jouez !";


};


nextBtn.addEventListener("click", preparerNouvelleManche);

btnJoueur.forEach(btn=> btn.addEventListener("click", jouerManche));

resetBtn.addEventListener("click", () => {
  scoreJoueur.textContent = 0;
  scoreOrdinateur.textContent = 0;

  preparerNouvelleManche();

});
