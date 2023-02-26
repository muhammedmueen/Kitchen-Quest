// const searchBtn = document.getElementById('search-btn');
// const mealList = document.getElementById('meal');
// const mealDetailsContent = document.querySelector('.meal-details-content');
// const recipeCloseBtn = document.getElementById('recipe-close-btn');

// // event listeners
// searchBtn.addEventListener('click', getMealList);
// mealList.addEventListener('click', getMealRecipe);
// recipeCloseBtn.addEventListener('click', () => {
//     mealDetailsContent.parentElement.classList.remove('showRecipe');
// });


// // get meal list that matches with the ingredients
// function getMealList(){
//     let searchInputTxt = document.getElementById('search-input').value.trim();
//     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
//     .then(response => response.json())
//     .then(data => {
//         let html = "";
//         if(data.meals){
//             data.meals.forEach(meal => {
//                 html += `
//                     <div class = "meal-item" data-id = "${meal.idMeal}">
//                         <div class = "meal-img">
//                             <img src = "${meal.strMealThumb}" alt = "food">
//                         </div>
//                         <div class = "meal-name">
//                             <h3>${meal.strMeal}</h3>
//                             <a href = "#" class = "recipe-btn">Get Recipe</a>
//                         </div>
//                     </div>
//                 `;
//             });
//             mealList.classList.remove('notFound');
//         } else{
//             html = "Sorry, we didn't find any meal!";
//             mealList.classList.add('notFound');
//         }

//         mealList.innerHTML = html;
//     });
// }


// // get recipe of the meal
// function getMealRecipe(e){
//     e.preventDefault();
//     if(e.target.classList.contains('recipe-btn')){
//         let mealItem = e.target.parentElement.parentElement;
//         fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
//         .then(response => response.json())
//         .then(data => mealRecipeModal(data.meals));
//     }
// }

// // create a modal
// function mealRecipeModal(meal){
//     console.log(meal);
//     meal = meal[0];
//     let html = `
//         <h2 class = "recipe-title">${meal.strMeal}</h2>
//         <p class = "recipe-category">${meal.strCategory}</p>
//         <div class = "recipe-instruct">
//             <h3>Instructions:</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//         <div class = "recipe-meal-img">
//             <img src = "${meal.strMealThumb}" alt = "">
//         </div>
//         <div class = "recipe-link">
//             <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
//         </div>
//     `;
//     mealDetailsContent.innerHTML = html;
//     mealDetailsContent.parentElement.classList.add('showRecipe');
// }


const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// API keys and URLs
const appId = "fcbef932";
const apiKey = "c5410eacac786a0da3a3bf7fc2a2dbb9";
const searchURL = `https://api.edamam.com/search?app_id=${appId}&app_key=${apiKey}&q=`;

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`${searchURL}${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.hits){
            data.hits.forEach(hit => {
                let meal = hit.recipe;
                // console.log(meal);
                console.log(meal);
                var Calories = Math.round(meal.calories);
                var Protien = Math.round(meal.totalNutrients.PROCNT.quantity / 4) ;
                var Fat = Math.round(meal.totalNutrients.FAT.quantity / 4);
                var Carbs = Math.round(meal.totalNutrients.CHOCDF.quantity / 4) ;
                var cholestrol =  Math.round(meal.totalNutrients.CHOLE.quantity / 4) ;
                var Sodium =  Math.round(meal.totalNutrients.NA.quantity / 4) ;
                var Magnasium =  Math.round(meal.totalNutrients.MG.quantity / 4);
                var Calsium =  Math.round(meal.totalNutrients.CA.quantity / 4);
                var Potassium =  Math.round(meal.totalNutrients.K.quantity / 4);
                var Iron =  Math.round(meal.totalNutrients.FE.quantity / 4);
                // console.log(Calories , Protien, Fat, Carbs);
                html += `
                    <div class = "meal-item" data-url = "${meal.url}">
                        <div class = "meal-img">
                            <img src = "${meal.image}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.label}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                            <div class="main-values">
                                <ul>
                                    <li> <span class="list-color one">●</span>Protien :    ${Protien} <b>g</b></li>
                                    <li> <span class="list-color two">●</span>Fat :           ${Fat} <b>g</b></li>
                                    <li> <span class="list-color three">●</span>Carbs :      ${Carbs} <b>g</b></li>
                                </ul>
                                <ul>
                                    <li>Cholestrol :       ${cholestrol} <b>mg</b> </li>
                                    <li>Sodium :             ${Sodium} <b>mg</b> </li>
                                    <li>Calcium :            ${Calsium} <b>mg</b></li>
                                    <li>Magnassium :     ${Magnasium} <b>mg</b></li>
                                    <li>Potassium :        ${Potassium} <b>mg</b></li>
                                    <li>Iron :                   ${Iron} <b>mg</b></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            console.log()
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    });
}
// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`${searchURL}${mealItem.dataset.url}`)
        .then(response => response.json())
        .then(data => {
            let nutrients = data.totalNutrients;
            console.log("Nutrition Information:");
            for (let nutrient in nutrients) {
                console.log(`${nutrient}: ${nutrients[nutrient].quantity} ${nutrients[nutrient].unit}`);
            }
        });
    }
}

// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        window.open(mealItem.dataset.url, '_blank');
    }
}

// var recipeButton = document.getElementById('recipe-btn');
// recipeButton.addEventListener('click',()=>{
//     var mealDetailsModal = document.getElementById('meal-details');
//     mealDetailsModal.style.display = 'block';
// })