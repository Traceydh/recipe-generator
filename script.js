//Select button 
let button = document.querySelector('#find');
const recipeContainer = document.querySelector('#recipes');
button.addEventListener('click', getRecipes);

//Set ingredient list 
let ingredientList = '';

let addIngredient = document.querySelector('#add');
addIngredient.addEventListener('click', concatonateIngredients);

function concatonateIngredients() {
    let ingredient = document.querySelector('#ingredient').value;
    createIngredientCard(ingredient);
    ingredientList += `${ingredient} `;
}

//API
const APP_ID = '23647cb2';
const APP_KEYS = '1ace64e82efde8a6cdfceeaee1b79d84';
const URL = `https://api.edamam.com/api/recipes/v2?type=public&q=`;

function getRecipes() {
    let ingredient = document.querySelector('#ingredient').value;

    fetch(`${URL}${ingredient}&app_id=${APP_ID}&app_key=${APP_KEYS}`)
	.then(response => response.json())
	.then(data => {
        console.log(data)
        removeCards();
        for (let i = 0; i < data.hits.length; i++) {
            createRecipeCard(data.hits[i].recipe.label, data.hits[i].recipe.image, data.hits[i].recipe.url)
        }
    })
	.catch(err => console.error(err));
}

function createRecipeCard(title, image, url){
    const card = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardText = document.createElement('p');
    const cardLink = document.createElement('a');

    card.classList.add('card');
    cardImage.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardText.classList.add('card-text');
    cardLink.classList.add('btn-primary', 'btn');

    card.append(cardImage);
    card.append(cardBody);
    card.append(cardTitle);
    card.append(cardText);
    card.append(cardLink);
    recipeContainer.append(card);

    cardTitle.textContent = title;
    cardImage.src = image;
    cardLink.href =  url;
    cardLink.textContent = 'Get Recipe'
}

function removeCards() {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.remove());
}

function createIngredientCard(ing) {
    const card = document.createElement('div');
    const ingredientContainer = document.querySelector('.ingredients');
    card.classList.add('ingredient-card');

    ingredientContainer.append(card);
    card.textContent = ing; 

}