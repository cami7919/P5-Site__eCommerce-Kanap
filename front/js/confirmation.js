//PAGE CONFIRMATION QUI PERMET D AFFICHER UN NUMERO DE CONFIRMATION DE COMMANDE ENVOYE PAR L'API


const idOrder = new URL(window.location.href).searchParams.get("id");

document.getElementById('orderId').innerHTML=idOrder

localStorage.clear();