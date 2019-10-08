function cartContent(){
    var str="";
    var cartContent =  JSON.parse(localStorage.getItem('cart'));
    console.log(cartContent);
    for (i in cartContent){
        var priceTotal=cartContent[i].product_price*cartContent[i].product_qty;
    str=str+ `
    <div class="collection collection-item valign-wrapper no-border border-bottom-show-on-small-and-down no-border-bottom-on-med-and-up">
    <div class="collection-item avatar no-border-bottom"><img src="${cartContent[i].product_image}" class="small-img"></div> 
    <table class="collection-item no-border-bottom">
        <tr class="collection no-border no-border-bottom">
          <td class="collection-item no-border-bottom-on-med-and-up no-padding grid-on-small-and-down">${cartContent[i].product_name} <a class="waves-effect waves-light hide-on-med-and-up" onclick="delProduct('${i}');"><i class="material-icons right">delete</i></a></td>
          <td class="collection-item no-border-bottom no-padding valign-wrapper qty" ><span class="hide-on-med-and-up">Qty</span><form clas="valign-wrapper">
              <div class="value-button" id="decrease" onclick="decreaseValue('${i}')" value="Decrease Value">-</div>
              <input type="number" id="number" value="${cartContent[i].product_qty}" />
              <div class="value-button" id="increase" onclick="increaseValue('${i}')" value="Increase Value">+</div>
            </form></td>
          <td class="collection-item no-border-bottom no-padding">${priceTotal} Lei <a class="waves-effect waves-light hide-on-small-and-down" onclick="delProduct('${i}');"><i class="material-icons right">delete</i></a></td>

        </tr>
      </table>
    </div>
    `;
}
 document.querySelector('#cart-content').innerHTML=str;
 showSummary();
}

function increaseValue(i) {
    var cartContent =  JSON.parse(localStorage.getItem('cart'));
    var value = cartContent[i].product_qty;
    value = isNaN(value) ? 0 : value;
    value++;
    cartContent[i].product_qty = parseInt(value);
    localStorage.setItem(`cart`, JSON.stringify(cartContent));
    draw ();
    
  }
  
  function decreaseValue(i) {
    var cartContent =  JSON.parse(localStorage.getItem('cart'));
    var value = cartContent[i].product_qty;
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    cartContent[i].product_qty = parseInt(value);
    localStorage.setItem(`cart`, JSON.stringify(cartContent));
    draw ();
  }

  function draw(){
    var cartContent =  JSON.parse(localStorage.getItem('cart'));
    var str="";
    for (i in cartContent){
        var priceTotal=cartContent[i].product_price*cartContent[i].product_qty;
        str=str+ `
        <div class="collection collection-item valign-wrapper no-border border-bottom-show-on-small-and-down no-border-bottom-on-med-and-up">
        <div class="collection-item avatar no-border-bottom"><img src="${cartContent[i].product_image}" class="small-img"></div> 
        <table class="collection-item no-border-bottom">
            <tr class="collection no-border no-border-bottom">
              <td class="collection-item no-border-bottom-on-med-and-up no-padding grid-on-small-and-down">${cartContent[i].product_name} <a class="waves-effect waves-light hide-on-med-and-up" onclick="delProduct('${i}');"><i class="material-icons right">delete</i></a></td>
              <td class="collection-item no-border-bottom no-padding valign-wrapper qty" ><span class="hide-on-med-and-up">Qty</span><form clas="valign-wrapper">
                  <div class="value-button" id="decrease" onclick="decreaseValue('${i}')" value="Decrease Value">-</div>
                  <input type="number" id="number" value="${cartContent[i].product_qty}" />
                  <div class="value-button" id="increase" onclick="increaseValue('${i}')" value="Increase Value">+</div>
                </form></td>
              <td class="collection-item no-border-bottom no-padding">${priceTotal} Lei <a class="waves-effect waves-light hide-on-small-and-down" onclick="delProduct('${i}');"><i class="material-icons right">delete</i></a></td>
    
            </tr>
          </table>
        </div>
        `;
    }
     document.querySelector('#cart-content').innerHTML=str;
     showSummary();

  }
  function delProduct(i){
    var cartContent =  JSON.parse(localStorage.getItem('cart'));
    cartContent.splice(i,1);
    localStorage.setItem(`cart`, JSON.stringify( cartContent));
    draw();
  }
  function showSummary(){
    var cartContent =  JSON.parse(localStorage.getItem('cart'));
    var products = 0;
    var total =0;
    for (var i in cartContent){
        products = products + parseInt(cartContent[i].product_qty);
        total =total+  parseInt(cartContent[i].product_qty)*parseInt(cartContent[i].product_price);
    }
    document.querySelector('#products-number').innerHTML=products;
    document.querySelector('#total h6').innerHTML=total;
  }
