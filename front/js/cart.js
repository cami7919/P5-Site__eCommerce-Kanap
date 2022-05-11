//PAGE CART.JS QUI PERMET DE :
// - AFFICHER LES PRODUITS DU PANIER, avec possibilité de les supprimer ou moduifier leur quantité
// - CONTROLER LA SAISIE CORRECTE DU FORMULAIRE PAR L UTILISATEUR
// - ENVOYER LE PANIER+FORMULAIRE PUIS ARRIVER EN PAGE CONFIRMATION


//DECLARATIONS DES FONCTIONS DE MODIFICATION DU PANIER :

//SUPPRIMER UN PRODUIT DU PANIER
function removeProduct() {
  //selectionner le bouton"supprimer"
  let btnRemoveList = document.querySelectorAll(".deleteItem");

  //au clic sur ce bouton, lancer une fonction de filtre, pour supprimer l'elt spécifié:
  for (let btnRemove of btnRemoveList) {
    btnRemove.addEventListener("click", (e) => {
      e.preventDefault();
      //definir la variable de l'article , ancetre du bouton
      let productToRemove = btnRemove.closest('.cart__item');
      let productToRemoveId = productToRemove.dataset.id;
      let productToRemoveColor = productToRemove.dataset.color;

      //filtrer le panier, pour supprimer l'élément spécifié
      inCart = inCart.filter(elt => elt._id !== productToRemoveId || elt.colors !== productToRemoveColor);

      //enregistrer la variable modifiée dans localStorage, puis rafraichir la page
      localStorage.setItem('cart', JSON.stringify(inCart));
      location.reload();
      alert("Votre article a bien été supprimé");
    })
  }
}

//CHANGER LA QUANTITE D UN PRODUIT
function modifyQuantity(product, quantity) {
  //sélectionner les inputs de quantité
  let itemQuantityList = document.querySelectorAll('.itemQuantity');

  for (let itemQuantity of itemQuantityList) {
    itemQuantity.addEventListener("change", (e) => {
      e.preventDefault();

      let newQuantity = e.target.value;

      //récupérer l'id du produit correspondant à cette modification de quantité
      let productOfItemQuantity = itemQuantity.closest('.cart__item');
      let productOfItemQuantityId = productOfItemQuantity.dataset.id;
      let productOfItemQuantityColor = productOfItemQuantity.dataset.color;

      let productToModifyQuantity = inCart.find(elt => elt._id == productOfItemQuantityId && elt.colors == productOfItemQuantityColor);
      //lui appliquer la nouvelle quantité
      productToModifyQuantity.quantity = newQuantity;
      //et enregistrer le tout dans localStorage
      localStorage.setItem('cart', JSON.stringify(inCart));

      location.reload();

      //modifier aussi les prix par article
      let totalPricePerProduct = productDescription.price * newQuantity;
      productPrice.innerHTML = totalPricePerProduct + ',00 €';
    })
  }
}

// CALCULER ET AFFICHER QUANTITE TOTALE
function getTotalQuantity() {
  totalOfProducts = 0;
  for (let product of inCart) {
    totalOfProducts += parseInt(product.quantity)
  };//afficher la quantité totale:
  document.getElementById('totalQuantity').innerHTML = totalOfProducts;
}

//CALCULER ET AFFICHER PRIX TOTAL
async function getTotalPrice() {
  //faire le total des prix
  let totalPrice = 0;
  for (let product of inCart) {
    let idProduct = product._id;
    let productQuantity = product.quantity;
    let productDescription = await getProductDescriptionFromAPI(idProduct);
    let productPrice = productDescription.price;
    totalPrice += productPrice * parseFloat(productQuantity);
    //afficher le prix total :
    document.getElementById('totalPrice').innerHTML = totalPrice;
  }
}


//AFFICHER LES PRODUITS DU PANIER, ET UTILISER LES FONCTIONS DE MODIFICATION DU PANIER:

//Récupérer les données de localStorage : stockées sous forme ('product', {id, couleur, quantité})
//déclarer la variable qui contient les 3 valeurs
let inCart = JSON.parse(localStorage.getItem('cart'));
console.log(inCart);

//récupérer la description des produits du panier:
async function getProductDescriptionFromAPI(idProduct) {
  let response = await fetch('http://localhost:3000/api/products/' + idProduct);
  let data = await response.json();
  return data;
}


//afficher les produits du panier :
async function displayProducts() {
  for (let product of inCart) {
    let idProduct = product._id;
    let quantityProduct = product.quantity;
    let colorProduct = product.colors;

    let productDescription = await getProductDescriptionFromAPI(idProduct);

    let productArticle = document.createElement("article")
    document.getElementById('cart__items').appendChild(productArticle)
    productArticle.classList.add("cart__item")
    productArticle.setAttribute("data-id", idProduct)
    productArticle.setAttribute("data-color", colorProduct)

    let productDiv1 = document.createElement("div")
    productArticle.appendChild(productDiv1)
    productDiv1.classList.add("cart__item__img")

    let imgProduct = document.createElement("img")
    productDiv1.appendChild(imgProduct)
    imgProduct.setAttribute("src", productDescription.imageUrl);
    imgProduct.setAttribute("alt", productDescription.altTxt);

    let productDiv2 = document.createElement("div")
    productArticle.appendChild(productDiv2)
    productDiv2.classList.add("cart__item__content")

    let productDiv3 = document.createElement("div")
    productDiv2.appendChild(productDiv3)
    productDiv3.classList.add("cart__item__content__description")

    let productName = document.createElement("h2")
    productDiv3.appendChild(productName)
    productName.innerHTML = productDescription.name

    //ici on récupère des données de local storage (variables nommées plus haut)
    let productColor = document.createElement("p")
    productDiv3.appendChild(productColor)
    productColor.innerHTML = colorProduct

    let productPrice = document.createElement("p")
    productDiv3.appendChild(productPrice)
    productPrice.innerHTML = productDescription.price * quantityProduct + ',00 €'


    let productDiv4 = document.createElement("div")
    productDiv2.appendChild(productDiv4)
    productDiv4.classList.add("cart__item__content__settings")

    let productDiv5 = document.createElement("div")
    productDiv4.appendChild(productDiv5)
    productDiv5.classList.add("cart__item__content__settings__quantity")


    //ci-dessous, on récupère des données de local storage (variables nommées plus haut)
    let productQuantity = document.createElement("p");
    productDiv5.appendChild(productQuantity);
    productQuantity.innerHTML = 'Qté :';

    let productInput = document.createElement("input");
    productDiv5.appendChild(productInput);
    productInput.setAttribute("type", "number");
    productInput.setAttribute("name", "itemQuantity");
    productInput.setAttribute("min", "1");
    productInput.setAttribute("max", "100");
    productInput.setAttribute("value", quantityProduct);
    productInput.classList.add("itemQuantity");


    let productDiv6 = document.createElement("div");
    productDiv4.appendChild(productDiv6);
    productDiv6.classList.add("cart__item__content__settings__delete");

    let productDelete = document.createElement("p");
    productDiv6.appendChild(productDelete);
    productDelete.classList.add("deleteItem");
    productDelete.innerHTML = 'Supprimer';


    removeProduct()
    modifyQuantity();
    getTotalQuantity();
    getTotalPrice();
    //syntaxe de l'appel des produit (l.12 et l.19)

  }
}

//cette regex autorise lettres chiffres apostrophe tiret et espace, entre 2 et 15 caracteres
const regexName = (name) => {
  return /^[a-zA-Z\’\-\s]{2,15}$/.test(name);
}

const regexAddress = (code) => {
  return /^[a-zA-Z0-9\’\-\s]{4,}$/.test(code);
}


//La regex ci-dessous impose à l'email de: 
// - contenir une arobase et un point
// - avant l'arobase il peut y avoir : lettres (en minuscule ou majuscule),  chiffres et les caractères "-" ou "_"
// - après l'arobase, idem , et on interdit la présence de "_"
//   et il faut au moins 2 caractères entre l'arobase et le point
// - après le point, il faut une succession de 2 ou 3 caractères .
const regexEmail = (value) => {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/.test(value);
}

function controlFirstName() {
  let inputFirstName = document.querySelector('#firstName').value;
  if (regexName(inputFirstName)) {
    document.getElementById('firstNameErrorMsg').innerText = "";
    return true;
  } else {
    alert('Prénom invalide');
    document.getElementById('firstNameErrorMsg').innerText = "Saisie du prénom invalide";
    return false;
  }
}
function controlLastName() {
  let inputLastName = document.querySelector('#lastName').value;
  if (regexName(inputLastName)) {
    document.getElementById('lastNameErrorMsg').innerText = "";
    return true;
  } else {
    alert('Nom invalide');
    document.getElementById('lastNameErrorMsg').innerText = "Saisie du nom invalide";
    return false;
  }
}

function controlCity() {
  let inputLastCity = document.querySelector('#city').value;
  if (regexName(inputLastCity)) {
    document.getElementById('cityErrorMsg').innerText = "";
    return true;
  } else {
    alert('Ville invalide');
    document.getElementById('cityErrorMsg').innerText = "Saisie de ville invalide";
    return false;
  }
}

function controlAddress() {
  let inputAddress = document.querySelector('#address').value;
  if (regexAddress(inputAddress)) {
    document.getElementById('addressErrorMsg').innerText = "";
    return true;
  } else {
    alert('Adresse invalide');
    document.getElementById('addressErrorMsg').innerText = "Saisie d'adresse invalide";
    return false;
  }
}

function controlEmail() {
  let inputEmail = document.querySelector('#email').value;
  if (regexEmail(inputEmail)) {
    document.getElementById('emailErrorMsg').innerText = "";
    return true;
  } else {
    alert('Email invalide');
    document.getElementById('emailErrorMsg').innerText = "Saisie d'email invalide";
    return false;
  }
}

//ENVOI DU FORMULAIRE ET DU PANIER AU CLIC APRES CONTROLE :
function sendCartDetails() {

  let buttonOrder = document.getElementById('order');
buttonOrder.addEventListener('click', (e) => {
  e.preventDefault();

  if (controlFirstName() && controlLastName() && controlAddress() && controlEmail()) {
    //récupération des valeurs du formulaire, à mettre dans un objet, lui même à enregistrer dans localStorage  
    const contact = {
      firstName: document.querySelector('#firstName').value,
      lastName: document.querySelector('#lastName').value,
      address: document.querySelector('#address').value,
      city: document.querySelector('#city').value,
      email: document.querySelector('#email').value
    };

    //mettre les valeurs du formulaire et le panier dans un objet
    let cartProduct = [];
    cartProduct = inCart.map((p) => p._id);
    

    const dataToSend = {
      products: cartProduct,
      contact: contact
    };

    //lancer la fonction sendData
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })

      .then(
        response => response.json()
      )

      .then(data => {        
        localStorage.setItem('orderId', data.orderId);
        window.location.href = "confirmation.html?id=" + data.orderId;
      });
  } else {
    alert("Veuillez remplir correctement le formulaire");
  };
});
}


//----------------------------------------------------------------------------------------------------
//APPEL DES DEUX PRINCIPALES FONCTIONS DE LA PAGE

displayProducts();

sendCartDetails();

































