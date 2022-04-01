
// localStorage.setItem ("_id", idProduct);
// localStorage.setItem ("colors", color);
// localStorage.setItem ("quantity", document.querySelector("#quantity").value);


//Récupérer et afficher les données sur la page web
let idProduct=localStorage.getItem("_id");
let colorProduct=localStorage.getItem("colors")
let quantityProduct=localStorage.getItem("quantity")

let arrayCart =[idProduct,colorProduct,quantityProduct];
//console.log(arrayCart)

//const productIntoCart = arrayCart.find(element=>element._id===_id)

//récupérer tous les produits, afin de...


const getProducts= async()=>{    
    await fetch('http://localhost:3000/api/products/')    

    .then((response)=>  response.json())
    .then ((promise) => 
      products = promise);
      console.log(products); 
    }


 // ...pour n'afficher que les produits dont l'ID est mis en panier    
 async function identifyProduct()  {  
        await getProducts() ;
    

 let productIntoCart=products.find(element=>element._id===idProduct);
 console.log(productIntoCart);

//puis afficher ci dessous les élements du produit du panier:
let productArticle=document.createElement("article")
document.getElementById('cart__items').appendChild(productArticle)
productArticle.classList.add("cart__item")

let productDiv1=document.createElement("div")
productArticle.appendChild(productDiv1)
productDiv1.classList.add("cart__item__img")

let imgProduct=document.createElement("img")
productDiv1.appendChild(imgProduct)
imgProduct.setAttribute("src", productIntoCart.imageUrl);   
imgProduct.setAttribute("alt", productIntoCart.altTxt);

let productDiv2=document.createElement("div")
productArticle.appendChild(productDiv2)
productDiv2.classList.add("cart__item__content")

let productDiv3=document.createElement("div")
productDiv2.appendChild(productDiv3)
productDiv3.classList.add("cart__item__content__description")

let productName=document.createElement("h2")
productDiv3.appendChild(productName)
productName.innerHTML=productIntoCart.name

//ici on récupère des données de local storage (variables nommées plus haut)
let productColor=document.createElement("p")
productDiv3.appendChild(productColor)
productColor.innerHTML= colorProduct

let productPrice=document.createElement("p")
productDiv3.appendChild(productPrice)
productPrice.innerHTML= productIntoCart.price +',00 €'


let productDiv4=document.createElement("div")
productDiv2.appendChild(productDiv4)
productDiv4.classList.add("cart__item__content__settings")

let productDiv5=document.createElement("div")
productDiv4.appendChild(productDiv5)
productDiv5.classList.add("cart__item__content__settings__quantity")



//ici on récupère des données de local storage (variables nommées plus haut)
let productQuantity=document.createElement("p")
productDiv5.appendChild(productQuantity)
productQuantity.innerHTML= 'Qté : ' + quantityProduct

}

//question : si letProductIntoCart est defini à l'intérieur de la fonction, je ne pourrais donc pas le reutiliser en dehors ??



getProducts()
identifyProduct()


//afficher les donnée avec productintoCart(faire d'abord createElement puis appendChild)
//document.querySelector(".cart_items_content_description>p").innerHTML=localStorage.getItem("colors");
//document.querySelector(".cart_items_content_settings_quantity>p").innerHTML="Qté +" + localStorage.getItem("quantity");