//   the automat card

window.addEventListener("DOMContentLoaded", async function () {
  let allcategory = [];
  let select = document.getElementById("selectCategory");
  let category = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  );
  let responscat = await category.json();
  responscat.meals.forEach((meal) => {
    allcategory.push(meal.strCategory);
  });
  for (let i = 0; i < allcategory.length; i++) {
    let option = document.createElement("option");
    if (allcategory[i] == "Lamb") {
      option.value = allcategory[i];
      option.innerHTML = allcategory[i];
      option.selected = true;
    } else {
      option.value = allcategory[i];
      option.innerHTML = allcategory[i];
    }
    select.appendChild(option);
  }
  let allAreas = [];
  let selectA = document.getElementById("selectArea");
  let areas = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let respons = await areas.json();
  respons.meals.forEach((meal) => {
    allAreas.push(meal.strArea);
  });
  for (let i = 0; i < allAreas.length; i++) {
    let option = document.createElement("option");
    if (allAreas[i] == "Moroccan") {
      option.value = allAreas[i];
      option.innerHTML = allAreas[i];
      option.selected = true;
    } else {
      option.value = allAreas[i];
      option.innerHTML = allAreas[i];
    }
    selectA.appendChild(option);
  }
  fitchdom();
});

async function fitchdom() {
  let catid, areaid;
  catid = [];
  let cat = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb`
  );
  let catresp = await cat.json();
  catresp.meals.forEach((meal) => {
    catid.push(meal.idMeal);
  });

  areaid = [];
  let area = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=Moroccan`
  );

  let arearesp = await area.json();
  arearesp.meals.forEach((meal) => {
    areaid.push(meal.idMeal);
  });
  let sameid = catid.filter(function (e) {
    return areaid.indexOf(e) > -1;
  });

  let result = [];
  for (let i = 0; i < sameid.length; i++) {
    const idfitch = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${sameid[i]}`
    );
    const response = await idfitch.json();
    result.push(response.meals[0]);
  }
  allpages(result);
  btnpagination(result);
  displayPage(0, result);
}

const cards = document.getElementById("allcards");

function creatcards(data) {
  cards.innerHTML += `<div class="card " style="width: 20rem;">
      <img src="${data.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">"${data.strMeal}"</h5>
        <a href="#" class=" btn btn-outline-danger  " onclick="modaldata(${data.idMeal})"    data-bs-toggle="modal"  data-bs-target="#exampleModal">MORE DETAILS</a>
      </div>
    </div>`;
}
cards.addEventListener("click", modaldata);

function modaldata(e) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e} `)
    .then((response) => response.json())
    .then((data) => fillmodel(data.meals[0]));
}

function fillmodel(data) {
  output = "";
  output += `
  <div class="modal-body">
<img src="${data.strMealThumb}" class="modal-img img-fluid">
<h5 class="modal-title" id="exampleModalLabel">${data.strMeal}</h5>
<p class="modal-category"> Category : ${data.strCategory}</p>
<p class="modal-region">  Area : ${data.strArea} </p>
<pre class="ingrédient"></pre>
<p  class="preparation">${data.strInstructions}</p>
<a id="video"  href="${data.strYoutube}" target="_blank">video</a>
</div>
`;
  document.getElementById("modal").innerHTML = output;
}








const maxecards = 6;

function pagenumber(arayvalues) {
  const pagenumber = Math.ceil(arayvalues.length / maxecards);
  return pagenumber;
}

function allpages(arayvalues) {
  const allpages = [];
  for (let i = 0; i < pagenumber(arayvalues); i++) {
    allpages.push(arayvalues.slice(i * maxecards, (i + 1) * maxecards));
  }
  return allpages;
}

function btnpagination(arayvalues) {
  let footer = document.getElementById("pagin-num");
  footer.innerHTML = "";
  for (let i = 0; i < pagenumber(arayvalues); i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "page-item");
    const a = document.createElement("a");
    a.setAttribute("class", "page-link");
    a.innerHTML = i + 1;
    li.appendChild(a);
    a.addEventListener("click", () => {
      let activremov = document.querySelectorAll("li");
      activremov.forEach((e) => {
        e.classList.remove("active");
      });
      li.setAttribute("class", "active");
      // Display the appropriate page when the button is clicked
      displayPage(i, arayvalues);
    });
    footer.appendChild(li);
  }
}

function displayPage(pagenumber, arayvalues) {
  // Clear the current page

  cards.innerHTML = "";

  const page = allpages(arayvalues)[pagenumber];
  for (const data of page) {
    creatcards(data);
  }
}

// www.themealdb.com/api/json/v1/1/list.php?c=list

async function showalldata() {
  let strallcategory = [];

  const responsstrcategory = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  );

  let data = await responsstrcategory.json();
  data.meals.forEach((meal) => {
    strallcategory.push(meal.strCategory);
  });
  // www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

  // console.log(strallcategory);
  let allcategoryid = [];
  for (let i = 0; i < strallcategory.length; i++) {
    const responsid = await fetch(
      `https://themealdb.com/api/json/v1/1/filter.php?c=${strallcategory[i]}`
    );
    let data = await responsid.json();
    data.meals.forEach((meal) => {
      allcategoryid.push(meal.idMeal);
    });
  }

  // console.log(allcategoryid);

  // www.themealdb.com/api/json/v1/1/lookup.php?i=52772

  let output=[]
  for (let i = 0; i < allcategoryid.length; i++) {
    const resultid = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${allcategoryid[i]}`)
     let data =await resultid.json()
     data.meals.forEach((meal)=> {
      output.push(meal)
     })
  }
  allpages(output);
  btnpagination(output);
  displayPage(0, output);

}

async function allcategory () {
    
     let everycategory =[]
     const list= await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
      let data = await list.json()
      data.meals.forEach((meal)=>{
        everycategory.push(meal.strCategory)

      })
      let allcategoryid = [];
      for (let i = 0; i < everycategory.length; i++) {
        const responsid = await fetch(
          `https://themealdb.com/api/json/v1/1/filter.php?c=${everycategory[i]}`
        );
        let data = await responsid.json();
        data.meals.forEach((meal) => {
          allcategoryid.push(meal.idMeal);
        });
      }
      let areaID = []
      let fetcharea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectA.value}`)
      let arearespos = await fetcharea.json()
      arearespos.meals.forEach((meal)=> {
        areaID.push(meal.idMeal)
      })
      let match = areaID.filter(function (e) {
        return allcategoryid.indexOf(e) > -1;
      })
      let result = []
      for (let i = 0; i < match.length; i++) {
        let fetchid = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match[i]}`)
        idrespons = await fetchid.json()  
        idrespons.meals.forEach((meal)=> {
          result.push(meal)
        }) 
      }
      allpages(result);
      btnpagination(result);
      displayPage(0, result);
}





async function allAreas () {
  let everyarea =[]

  const list= await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
   let data = await list.json()
   data.meals.forEach((meal)=>{
     everyarea.push(meal.strArea)
   })
   let allareaid = [];
   for (let i = 0; i < everyarea.length; i++) {
     const responsid = await fetch(
       `https://www.themealdb.com/api/json/v1/1/filter.php?a=${everyarea[i]}`
     );
     let data = await responsid.json();
     data.meals.forEach((meal) => {
       allareaid.push(meal.idMeal);
     });
   }
   let categoryID = []
   let fetcharea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${select.value}`)
   let arearespos = await fetcharea.json()
   arearespos.meals.forEach((meal)=> {
    categoryID.push(meal.idMeal)
   })
   let match = categoryID.filter(function (e) {
     return allareaid.indexOf(e) > -1;
   })
   let result = []
   for (let i = 0; i < match.length; i++) {
     let fetchid = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match[i]}`)
     idrespons = await fetchid.json()  
     idrespons.meals.forEach((meal)=> {
       result.push(meal)
     }) 
   }
   allpages(result);
   btnpagination(result);
   displayPage(0, result);

}




















async function selected (){

  let catid = [];
  let areaid = [];
  const response1 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${select.value}`
  );
  const category = await response1.json();
  category.meals.forEach((element) => {
    catid.push(element.idMeal);
  });
  const response2 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectA.value}`
  );
  const area = await response2.json();
  area.meals.forEach((element) => {
    areaid.push(element.idMeal);
  });
  let sameid = areaid.filter(function (e) {
    return catid.indexOf(e) > -1;
  });
  let result = [];
  for (let i = 0; i < sameid.length; i++) {
    const idfitch = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${sameid[i]}`
    );
    const response = await idfitch.json();
    result.push(response.meals[0]);
  } if (result.lengt= 0 ) {
    cards.innerHTML = "";
    cards.innerHTML = `<p class="text-danger display-5 text-center" >
	   SORRY ,THIS RECIPE IS NOT FOUND CAN YOU SEARSH FOR SOMETHINGS ELSE 
	 </p>`;
  } else {
    allpages(result);
    btnpagination(result);
    displayPage(0, result);
  }

}










let selectA = document.getElementById("selectArea");
let select = document.getElementById("selectCategory");

const filtratiobtn = document.getElementById("filterbtn");
filtratiobtn.addEventListener("click", function () {
  if (selectA.value == "allarea" && select.value == "allcategory") {
    showalldata();
  }

else if (selectA.value != "allarea" && select.value == "allcategory") {
  allcategory()
}else if (selectA.value == "allarea" && select.value != "allcategory"){
  allAreas()
}else{
  selected ()
}

});
