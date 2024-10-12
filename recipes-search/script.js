const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// Theme toggle button and related variables
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// API keys and URLs
const appId = "fcbef932";
const apiKey = "c5410eacac786a0da3a3bf7fc2a2dbb9";
const searchURL = `https://api.edamam.com/search?app_id=${appId}&app_key=${apiKey}&q=`;

// Theme management
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Apply previously selected theme or default to dark theme
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
} else {
  document.body.classList.add(darkTheme); // Default to dark theme
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// Functions to get current theme and icon
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(`${searchURL}${searchInputTxt}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.hits) {
        data.hits.forEach((hit) => {
          let meal = hit.recipe;
          var Calories = Math.round(meal.calories);
          var Protien = Math.round(meal.totalNutrients.PROCNT.quantity / 4);
          var Fat = Math.round(meal.totalNutrients.FAT.quantity / 4);
          var Carbs = Math.round(meal.totalNutrients.CHOCDF.quantity / 4);
          var cholestrol = Math.round(meal.totalNutrients.CHOLE.quantity / 4);
          var Sodium = Math.round(meal.totalNutrients.NA.quantity / 4);
          var Magnasium = Math.round(meal.totalNutrients.MG.quantity / 4);
          var Calsium = Math.round(meal.totalNutrients.CA.quantity / 4);
          var Potassium = Math.round(meal.totalNutrients.K.quantity / 4);
          var Iron = Math.round(meal.totalNutrients.FE.quantity / 4);

          html += `
                    <div class="meal-item" data-url="${meal.url}">
                        <div class="meal-img">
                            <img src="${meal.image}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.label}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                            <div class="main-values">
                                <ul>
                                    <li><span class="list-color one">●</span>Protien: ${Protien} <b>g</b></li>
                                    <li><span class="list-color two">●</span>Fat: ${Fat} <b>g</b></li>
                                    <li><span class="list-color three">●</span>Carbs: ${Carbs} <b>g</b></li>
                                </ul>
                                <ul>
                                    <li>Cholestrol: ${cholestrol} <b>mg</b></li>
                                    <li>Sodium: ${Sodium} <b>mg</b></li>
                                    <li>Calcium: ${Calsium} <b>mg</b></li>
                                    <li>Magnassium: ${Magnasium} <b>mg</b></li>
                                    <li>Potassium: ${Potassium} <b>mg</b></li>
                                    <li>Iron: ${Iron} <b>mg</b></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    window.open(mealItem.dataset.url, "_blank");
  }
}
