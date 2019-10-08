var list = [];
async function draw() {
  event.preventDefault();
    var response = await fetch(
    "https://magazin-pesti.firebaseio.com/.json"
  );
  window.list = await response.json();
  deseneaza();
}

function deseneaza(){
    var str="";
    for (i in list){
       str= str+ `  <div class="col-lg-3 col-md-4 col-xs-6 fish-holder collection-item card">
       <div class="card-image waves-effect waves-block waves-light">
         <img class="activator fish-img responsive-img" src="${list[i].imagine}">
       </div>
       <div class="card-content">
         <div class="card-title activator grey-text text-darken-4"><p class="fish-title flow-text">${list[i].nume}</p><i class="material-icons right">more_vert</i></div>
         <div class="info-holder">
         <p class="fish-price flow-text">${list[i].pret} LEI</p>
         <a class="waves-effect waves-light btn button" href="details.html?id=${i}">Detalii</a></div>
       </div>
       <div class="card-reveal">
         <span class="card-title grey-text text-darken-4">${list[i].nume}<i class="material-icons right">close</i></span>
         <p>${list[i].descriereScurta}</p>
       </div>
     </div> `; 
    }
    document.querySelector("#body").innerHTML = str;
}

