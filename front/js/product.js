//PAGE PRODUCT QUI:
// -  AFFICHE LE PRODUIT SELECTIONNE,
// -  PERMET DE CHOISIR SA QUANTITE ET SA COULEUR
// - POUR ENSUITE LE METTRE DANS LE PANIER


//récupérer l'id dans l'url de la page
const idProduct = new URL(window.location.href).searchParams.get("id");

//aller chercher l'article correspondant à l'id de la page :
console.log("idProduct:" + idProduct);

let product = {};

const getProduct = async () => {
  await fetch('http://localhost:3000/api/products/' + idProduct)
    .then((response) => response.json())
    .then((promise) => product = promise);
  console.log(product);
}

//afficher le produit et ses caractéristiques :
async function displayProduct() {
  await getProduct();

  document.getElementById("title").innerHTML = product.name;
  document.getElementById("description").innerHTML = product.description;
  document.getElementById("price").innerHTML = product.price;

  let imgProduct = document.querySelector(".item__img>img")
  imgProduct.setAttribute("src", product.imageUrl);
  imgProduct.setAttribute("alt", product.altTxt);

  for (let i = 0; i < product.colors.length; i++) {
    let color = document.createElement("option");
    color.setAttribute("value", product.colors[i]);
    color.innerHTML = product.colors[i];
    document.getElementById("colors").appendChild(color);
  }

  addIntoCart(product);
}

displayProduct();





//définir la fonction Ajouter au panier:
let addIntoCart = () => {

  //déclarer le bouton ajouter
  let boutonAjouter = document.querySelector("#addToCart");

  // créer un événement au clic
  boutonAjouter.addEventListener("click", (event) => {
    event.preventDefault();
    //=toute action par défaut, normalement exécutée par le navigateur, n'aura pas lieu.


    //récupérer les données du produit choisi (pour plus tard les stocker dans localStorage)
    let colorProduct = document.getElementById("colors").value;
    console.log('colorProduct :' + colorProduct)
    let quantityProduct = document.getElementById("quantity").value;
    console.log('quantityProduct :' + quantityProduct)

    //créer l'objet qui contient les infos qu'on mettra dans localStorage
    let selectedProduct = {
      _id: idProduct,
      colors: colorProduct,
      quantity: quantityProduct
    };



    //définir la variable qui recupere dans localStorage la valeur (selectedProduct) liée à la à la clé "cart" 
    let inCart = JSON.parse(localStorage.getItem('cart'));
    console.log("inCart:" + inCart);

    //si le panier ne contient pas d' article (il faut alors creer tableau inCart, et clé 'cart')
    if (inCart == null) {
      inCart = [];
      inCart.push(selectedProduct);
      localStorage.setItem('cart', JSON.stringify(inCart));
    }
    //si le panier n'est pas vide :
    else {
      for (let object of inCart) {

        console.log('selectedProduct._id : ' + selectedProduct._id)
        console.log('object.quantity : ' + object.quantity)
        console.log('selectedProduct.quantity : ' + selectedProduct.quantity)

        //si l'on ajoute un autre produit de même id et de même couleur, la quantité doit être la somme des 2 quantités
        if (object._id == selectedProduct._id && object.colors == selectedProduct.colors) {
          object.quantity = parseInt(selectedProduct.quantity) + parseInt(object.quantity);
          localStorage.setItem('cart', JSON.stringify(inCart));
          return;
        }
      }

      // le panier n'est pas vide, et ne contient pas dejà le produit qu'on ajoute
      inCart.push(selectedProduct);
      console.log(selectedProduct);
      localStorage.setItem('cart', JSON.stringify(inCart));
    }
  })
};



