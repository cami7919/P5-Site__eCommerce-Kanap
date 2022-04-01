//retrouver l'url de la page active :
//let str =window.location.href;



//récupérer l'id dans l'url de la page active
//let MyUrl = new URL(str);
//let idProduct = MyUrl.searchParams.get("idProduct");

//c'est ok


    //Récupération de l'id via les paramètres de l'url
//const idProduct = new URL(window.location.href).searchParams.get("idProduct")


const idProduct= window.location.search.split('?id=').join("")
console.log (idProduct)



//Récupération des sélecteurs pour les futures modifications
 //let titleProduct = document.getElementById("title");
 //let priceProduct = document.getElementById("price");
//let descriptionProduct = document.getElementById("description");
 //let colorsProduct = document.getElementById("colors");
// let imgProduct = document.querySelector(".item__img");





//aller chercher l'article correspondant à l'id de la page :

        // definir variable product 

let product=[]

        //aller chercher dans l'API LE product

const getProduct= async()=>{    
      await fetch('http://localhost:3000/api/products/'+idProduct)    

    .then((response)=>  response.json())
    .then ((promise) => 
      product = promise);
      console.log(product);
       
}


getProduct() 



//afficher le produit

async function displayProduct()  {  
 await getProduct() ;

   document.getElementById("title").innerHTML=product.name;
    document.getElementById("description").innerHTML=product.description;
    document.getElementById("price").innerHTML=product.price;  
   
       
   
   let imgProduct=document.querySelector(".item__img>img")
    imgProduct.setAttribute("src", product.imageUrl);   
    imgProduct.setAttribute("alt", product.altTxt);

    

    for (let i=0; i < product.colors.length; i++) {
      let color = document.createElement("option");
      color.setAttribute("value", product.colors[i]);
      color.innerHTML = product.colors[i];
      document.getElementById("colors").appendChild(color);

    }
}

displayProduct()
 

//recuperer les données du produit choisi, et les stocker dans localStorage
let boutonAjouter = document.querySelector("#addToCart");

boutonAjouter.addEventListener("click", ()=>{

localStorage.setItem ("_id", idProduct);
localStorage.setItem ("colors", color);
localStorage.setItem ("quantity", document.querySelector("#quantity").value);

console.log(localStorage.quantity)

})

        

    
            
        
/*.catch (function(error){
    alert(error)   */
    
