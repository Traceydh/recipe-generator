addIngredientButton()
searchRecipesButton()

let ingredientList = '';

//User types in ingredient and presses add button to add it to box & search
function addIngredientButton() {
    const addButton = document.querySelector('#add');
    addButton.addEventListener('click', addIngredients);
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            addIngredients();
        }
    })
}

function addIngredients() {
    let ingredient = document.querySelector('#ingredient');
    createIngredientDisplay(ingredient.value);
    ingredientList += `${ingredient.value} `;
    ingredient.value = '';
}

function createIngredientDisplay(ing) {
    if (ing === '') {
        return
    }
    const ingredientContainer = document.querySelector('.ingredients');
    const card = document.createElement('div');
    card.classList.add('ingredient-card');

    const text = document.createElement('div');
    text.textContent = ing; 

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = "&times;";
    removeButton.addEventListener('click', removeIngredientDisplay);

    card.append(removeButton);
    card.append(text);

    ingredientContainer.append(card);
}

function removeIngredientDisplay() {
    let textToDelete = this.nextElementSibling.textContent;
    this.parentElement.remove();
    ingredientList = ingredientList.replace(`${textToDelete} `, '')
}

//Search for recipes and display 
function searchRecipesButton() {
    const searchButton = document.querySelector('#find');
    searchButton.addEventListener('click', fetchRecipes);
}

function fetchRecipes() {
    const APP_ID = '23647cb2';
    const APP_KEYS = '1ace64e82efde8a6cdfceeaee1b79d84';
    const URL = `https://api.edamam.com/api/recipes/v2?type=public&q=`;

    fetch(`${URL}${ingredientList}&app_id=${APP_ID}&app_key=${APP_KEYS}`)
	.then(response => response.json())
	.then(data => {
        //clear previous data each time
        removeRecipeCardsDisplay('.remove');
        for (let i = 0; i < data.hits.length; i++) {
            createRecipeCard(data.hits[i].recipe.label, data.hits[i].recipe.image, data.hits[i].recipe.url);
        }
    })
	.catch(err => console.error(err));
}

function createRecipeCard(title, image, url){
    const recipeContainer = document.querySelector('#recipes');
    const card = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardText = document.createElement('p');
    const cardLink = document.createElement('a');
    const cardHeartImage = document.createElement('img')

    card.classList.add('card', 'remove');
    cardImage.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardText.classList.add('card-text');
    cardLink.classList.add('btn-primary', 'btn', 'btn-outline-secondary');
    //cardHeartImage.classList.add('not-favourite');

    card.append(cardImage);
    card.append(cardBody);
    card.append(cardTitle);
    card.append(cardText);
    card.append(cardLink);
    card.append(cardHeartImage);
    recipeContainer.append(card);

    cardTitle.textContent = title;
    cardHeartImage.src='images/love.png';
    cardImage.src = image;
    cardLink.href =  url;
    cardLink.textContent = 'Get Recipe'

    cardHeartImage.addEventListener('click', favouriteThisRecipe)
}

function removeRecipeCardsDisplay(remove) {
    let cards = document.querySelectorAll(remove);
    cards.forEach(card => card.remove());
}

//store favourite recipes in local storage & display 
function favouriteThisRecipe() {
    
}
//when user clicks heart 
//change display of heart to red 
//add recipe card into modal 
//add recipe into local storage

//when uesr clicks heart again
//change display to black
//remove from local 
//remove from display 
