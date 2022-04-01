
const kanap= document.querySelector("article h3");


console.log(kanap);// commentaire


const item = document.getElementById('items');
item.innerhtml="<a href="./product.html?id=42"><article><img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1"> <h3 class="productName">Kanap name1</h3>  <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>"


fetch("http://localhost:3000/api/products"
    then (function(res)){
        if (res.ok){
            return res.json();
        }
    }
    then (function(value){
        console.log(value);
    }
    


    <script>
    function asynch getProducts() {
      fetch("http://localhost:3000/api/products")
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function(value) {
          console.log(value);
          // return value;
        })
        .catch(function (err) {
          // Une erreur est survenue
        });
    }

    let products = await getProducts();
    // console.log(products);
    for (let product of products) {
      console.log(product);
    }
  </script>






------


    //retrouver la liste de produits "products":
    async function getProducts() {
      let products = await fetch('http://localhost:3000/api/products');
      console.log("Les produits ont été récupérés !")
      return products.json();
      //comment afficher sous forme de tableau les resultats json ?
      
      }
     //A partir de l'id qu'on a ci-dessus, recuperer img/nom/prix/description de chq article
     // de l'objet qui est résultat de getProduct 
     async function afficherProduct() {
      let products = await getProducts() 
      //et là : comment retrouver un élément de l'ensemble products à partir de son id ?
  
  
  
  
  
  
  // let NomProduit = products.id ;
  // document.querySelector("#title").innerHTML = NomProduit;

  