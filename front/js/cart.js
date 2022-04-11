


//Récupérer les données de localStorage : stockées sous forme ('product', {id, couleur, quantité})

//déclarer la variable qui contient les 3 valeurs
let inCart = JSON.parse(localStorage.getItem('cart'));
console.log(inCart);

//récuperer les 3 valeurs du canapé au panier
for (let product of inCart) {
  let idProduct = product._id;
  let quantityProduct = product.quantity;
  let colorProduct = product.colors;
  console.log(product);
  fetch('http://localhost:3000/api/products/' + idProduct)
    .then((response) => response.json())
    .then((promise) => {
      let productDescription = promise;

      let productArticle = document.createElement("article")
      document.getElementById('cart__items').appendChild(productArticle)
      productArticle.classList.add("cart__item")
  
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
  
  
  
      //ici on récupère des données de local storage (variables nommées plus haut)
      let productQuantity = document.createElement("p");
      productDiv5.appendChild(productQuantity);
      productQuantity.innerHTML = 'Qté :' ;

      let productInput = document.createElement("input");
      productDiv5.appendChild(productInput);
      productInput.setAttribute("type","number");
      productInput.setAttribute("name","itemQuantity");
      productInput.setAttribute("min","1");
      productInput.setAttribute("max","100");
      productInput.setAttribute("value", quantityProduct);
      productInput.classList.add("itemQuantity");
      

      let productDiv6 = document.createElement("div");
      productDiv4.appendChild(productDiv6);
      productDiv6.classList.add("cart__item__content__settings__delete");

      let productDelete = document.createElement("p");
      productDiv6.appendChild(productDelete);
      productDelete.classList.add("deleteItem");
      productDelete.innerHTML ='Supprimer';

//supprimer un produit du panier : selectionner le bouton"supprimer"
let btnRemoveList= document.querySelectorAll(".deleteItem");
      console.log(btnRemoveList)
//déclarer la fonction removeFromCart..
 function removeFromCart(product){
 for(let product of inCart){
 inCart = inCart.filter(element => element._id != product._id);  
 console.log(inCart)
 }}

 //et s'en servir ensuite:
 for (let btnRemove of btnRemoveList) {
  btnRemove.addEventListener ("click",(e) =>{
  e.preventDefault();  
  removeFromCart(btnRemove.closest('.cart__item'));  
   })}

//changer la qté du produit sur la page panier

//qté affichée à récuperer / puis à  enregistrer sur local Storagepuis à reafficher (getItem) sur la page

//déclarer variable de la quantité modifiée

 let itemQuantities = document.querySelectorAll('.itemQuantity');
 console.log(itemQuantities);
//déclarer la fonction modifyQuantity
function modifyQuantity(){
  for(let itemQuantity of itemQuantities){  
    itemQuantity.addEventListener("change", (e)=>{
    e.preventDefault();  
  localStorage.setItem ('modifiedQuantity', itemQuantity.value)
  localStorage.getItem ('modifiedQuantity', itemQuantity.value)
  })
  }
  }

  modifyQuantity()



    });
}




 


//changer la qté du produit sur la page panier

//qté affichée à récuperer / puis à  enregistrer sur local Storagepuis à reafficher (getItem) sur la page

//déclarer variable de la quantité modifiée

// let itemQuantities = document.querySelectorAll('itemQuantity');

// function modifyQuantity(){
//   for(let itemQuantity of itemQuantities){

//     itemQuantity.addEventListener(change, (e)=>{
//     e.preventDefault();

//  localStorage.setItem ('modifiedQuantity', itemQuantity.value)
//  localStorage.getItem ('modifiedQuantity', itemQuantity.value)
// })
// }
// }





