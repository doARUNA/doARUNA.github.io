 list = [];
 var indexEdit;
async function draw() {
    var response = await fetch(
    "https://magazin-pesti.firebaseio.com/.json"
  );
  window.list = await response.json();
     deseneaza();
}

 async function deseneaza(){
    var str="";
    for (i in await list){
       str= str+ `  
       <div class="collection-item avatar"><img src="${list[i].imagine}" class="small-img"></div>
       <div class="collection-item">${list[i].nume}</div>
       <div class="collection-item">${list[i].descriereScurta}</div>
       <div class="collection-item rightAlign">${list[i].pret} LEI</div>
       <div class="collection-item rightAlign">${list[i].cantitate}</div>
       <div class=" collection-item rightAlign valign-wrapper"><a class="waves-effect waves-light btn-small del-button" onclick="delProduct('${i}');">Remove</a><a class="waves-effect waves-light btn-small del-button" onclick="editProduct('${i}');">Edit</a></div>`; 
    }
    document.querySelector("#response").innerHTML = str;
}
async function delProduct(ind){
    if(confirm(`Sigur vreți să ștergeți produsul ${list[ind].nume}?`)){
        var response = await fetch(`https://magazin-pesti.firebaseio.com/${ind}.json`,
        {
            method: "delete"
        });

    }
  draw();
}
async function addProduct(){
    event.preventDefault();
    var obj ={
        nume:document.querySelector("[name='nume']").value,
        pret:document.querySelector("[name='pret']").value,
        descriere:document.querySelector("[name='descriere']").value,
        imagine:document.querySelector("[name='imagine']").value,
        imagine1:document.querySelector("[name='imagine1']").value,
        imagine2:document.querySelector("[name='imagine2']").value,
        cantitate:document.querySelector("[name='cantitate']").value,
        imagine3:document.querySelector("[name='imagine3']").value,
        descriereScurta:document.querySelector("[name='descriereScurta']").value
    }
    if(indexEdit!==undefined){
        var response = await fetch(`https://magazin-pesti.firebaseio.com/${indexEdit}.json`,{
            method:"put",
            body:JSON.stringify(obj)
        });
    }else{
    var response = await fetch(`https://magazin-pesti.firebaseio.com/.json`,{
						method:"post",
						body:JSON.stringify(obj)
                    });
                }
     await draw();
     showCatalog();               
}
function showCatalog(){
    document.querySelector("#addProduct").reset();
    document.querySelector("#addProduct").classList.add("hidden");
    indexEdit = undefined;
    document.querySelector("#catalog").classList.remove("hidden");
}
function showForm(){
    document.querySelector("#catalog").classList.add("hidden"); 
    document.querySelector("#addProduct").classList.remove("hidden");
}
async function editProduct(ind){
    window.indexEdit = ind;
   document.querySelector("label[for='nume']").classList.add('active');
   document.querySelector("label[for='pret']").classList.add('active');
   document.querySelector("label[for='descriere']").classList.add('active');
   document.querySelector("label[for='descriereScurta']").classList.add('active');
   document.querySelector("label[for='imagine']").classList.add('active');
   document.querySelector("label[for='imagine1']").classList.add('active');
   document.querySelector("label[for='imagine2']").classList.add('active');
   document.querySelector("label[for='imagine3']").classList.add('active');
   document.querySelector("label[for='cantitate']").classList.add('active');
    showForm();
    document.querySelector("[name='nume']").value = list[ind].nume;
    document.querySelector("[name='pret']").value = list[ind].pret;
    document.querySelector("[name='descriere']").value = list[ind].descriere;
    document.querySelector("[name='imagine']").value = list[ind].imagine;
    document.querySelector("[name='imagine1']").value = list[ind].imagine1;
    document.querySelector("[name='imagine2']").value = list[ind].imagine2;
    document.querySelector("[name='imagine3']").value = list[ind].imagine3;
    document.querySelector("[name='cantitate']").value = list[ind].cantitate;
    document.querySelector("[name='descriereScurta']").value = list[ind].descriereScurta;
}
