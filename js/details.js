

var list = [];

var i = window.location.search.substring(4);
async function draw() {
  event.preventDefault();
  var response = await fetch(
    `https://magazin-pesti.firebaseio.com/${i}.json`
  );
  window.list = await response.json();
  var str = "";

  var bg1 = document.querySelector(".bg1");
  document.querySelector(".bg1").style.backgroundImage = "url('" + list.imagine + "')";
  console.log(list.imagine1);
  document.querySelector(".bg2").style.backgroundImage = "url('" + list.imagine1 + "')";
  document.querySelector(".bg3").style.backgroundImage = "url('" + list.imagine2 + "')";
  document.querySelector(".bg4").style.backgroundImage = "url('" + list.imagine3 + "')";
  document.querySelector("#s-bg1").style.backgroundImage = "url('" + list.imagine + "')";
  document.querySelector("#s-bg2").style.backgroundImage = "url('" + list.imagine1 + "')";
  document.querySelector("#s-bg3").style.backgroundImage = "url('" + list.imagine2 + "')";
  document.querySelector("#s-bg4").style.backgroundImage = "url('" + list.imagine3 + "')";
  var str3 = `      <div class="card">
  <div class="card-content">
    <span class="card-title" id="product-title"><h4>${list.nume}</h4></span>
    <p>${list.descriereScurta}</p>
  </div>
  <div class="card-action">
      <p class="info">${list.pret} LEI</p>
      <p class="info">In stoc: ${list.cantitate} bucăți</p>
     <p> Cantitate: <input type="number" name="quantity" min="1" max="${list.cantitate}" class="qty" value="1" onclick="validateQty('${i}')"></p>
  </div>
</div>         
<div class="cart-btn">
<a class="waves-effect waves-light btn button" onclick="addToCart();" class="info"><i class="material-icons left">shopping_cart</i>Adaugă în coș</a></div>`;
  document.querySelector("#info1-resp").innerHTML = str3;
  var str4 = ` <h3>
Descriere
</h3>
<p>${list.descriere}</p>`;
  document.querySelector("#info2-resp").innerHTML = str4;

};
async function addToCart() {
  var newProduct = {
    product_name: null,
    product_image: null,
    product_qty: 0,
    product_price: 0.00,
  };
  newProduct.product_name = list.nume;
  newProduct.product_image = list.imagine;
  newProduct.product_qty = parseInt(document.querySelector("[name='quantity']").value);
  newProduct.product_price = list.pret;
  if(validateQty(i)){
  M.toast({
    html: 'Produsul a fost aduăugat în coș!',
    outDuration: 250,
    inDuration: 350,
  });
  var cartContent = JSON.parse(localStorage.getItem('cart'));
  if (cartContent === null) {
    cartContent = [];
  }

  var found = false;
  for (i in cartContent) {
    if (cartContent[i].product_name === list.nume) {
      found = true;
      cartContent[i].product_qty = parseInt(cartContent[i].product_qty) + newProduct.product_qty;
    }
  }
  if (!found) {
    cartContent.push(newProduct);
  }

  localStorage.setItem(`cart`, JSON.stringify(cartContent));
} else{
  return false
}
}
function validateQty(i){
  var i =window.i;
  qty=parseInt(document.querySelector("[name='quantity']").value);
    if (qty>=1 && qty<=list.cantitate) {
        return true
    }else{
      
      M.toast({
        html: 'Te rugăm să selectezi o cantitate care este în stoc!',
        outDuration: 250,
        inDuration: 350,
      });
        return false;
    }

}


