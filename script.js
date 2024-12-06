let inpBox = document.getElementById('inp');
let moviesdet = document.getElementById('recipes');
let allRecipes = [];
let modal = document.getElementById("recipeModal");
let modalTitle = document.getElementById("modalTitle");
let modalImage = document.getElementById("modalImage");
let modalIngredients = document.getElementById("modalIngredients");
let closeModal = document.getElementsByClassName("close")[0];

function displayRecipes(recipes) {
    moviesdet.innerHTML = ''; 
    recipes.forEach(recipe => {
        let recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        let title = document.createElement('h3');
        title.textContent = recipe.name;
        let img = document.createElement('img');
        img.src = recipe.image;
        let button = document.createElement('button');
        button.textContent = "Show Ingredients";
        button.classList.add('ing-btn');
        button.onclick = () => showRecipeDetails(recipe);

        recipeDiv.appendChild(title);
        recipeDiv.appendChild(img);
        recipeDiv.appendChild(button);
        moviesdet.appendChild(recipeDiv);
    });
}

function showRecipeDetails(recipe) {
    modalTitle.textContent = recipe.name;
    modalImage.src = recipe.image;
    modalIngredients.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
        let listItem = document.createElement('li');
        listItem.textContent = ingredient; 
        modalIngredients.appendChild(listItem); 
    });
    modal.style.display = "block"; 
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

fetch("https://dummyjson.com/recipes")
    .then((res) => res.json())
    .then((data) => {
        allRecipes = data.recipes; 
        displayRecipes(allRecipes);
    });

inpBox.addEventListener('input', () => {
    let inpValue = inpBox.value.toLowerCase(); 
    if (inpValue.trim() !== '') {
        let filteredRecipes = allRecipes.filter(recipe => 
            recipe.name.toLowerCase().includes(inpValue)
        );
        displayRecipes(filteredRecipes); 
    } else {
        displayRecipes(allRecipes);
    }
});