//Select button 
let button = document.querySelector('#find');
const recipeContainer = document.querySelector('#recipes');
button.addEventListener('click', getRecipes);

//Set ingredient list 
let ingredientList = '';

//activate add ingredient button on enter key 
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        concatonateIngredients();
    }
})

const addIngredient = document.querySelector('#add');
addIngredient.addEventListener('click', concatonateIngredients);

function concatonateIngredients() {
    let ingredient = document.querySelector('#ingredient');
    createIngredientCard(ingredient.value);
    ingredientList += `${ingredient.value} `;
    ingredient.value = '';
}

//API
const APP_ID = '23647cb2';
const APP_KEYS = '1ace64e82efde8a6cdfceeaee1b79d84';
const URL = `https://api.edamam.com/api/recipes/v2?type=public&q=`;

function getRecipes() {
    fetch(`${URL}${ingredientList}&app_id=${APP_ID}&app_key=${APP_KEYS}`)
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
    const cardHeartImage = document.createElement('img')

    card.classList.add('card', 'remove');
    cardImage.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardText.classList.add('card-text');
    cardLink.classList.add('btn-primary', 'btn', 'btn-outline-secondary');
    cardHeartImage.classList.add('not-favourite');

    cardHeartImage.addEventListener('click', favouriteRecipe)

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
}

function removeCards() {
    let cards = document.querySelectorAll('.remove');
    cards.forEach(card => card.remove());
}

function createIngredientCard(ing) {
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
    removeButton.addEventListener('click', removeIngredient);

    card.append(removeButton);
    card.append(text);

    ingredientContainer.append(card);
}

function removeIngredient() {
    console.log(this);
    let textToDelete = this.nextElementSibling.textContent;
    this.parentElement.remove();
    ingredientList = ingredientList.replace(`${textToDelete} `, '')
}

function favouriteRecipe() {
    let title = (this.parentElement).querySelector('h5').textContent;
    let image = (this.parentElement).querySelector('img').src;
    let url = (this.parentElement).querySelector('a').href;
    this.classList.toggle('favourite');
    console.log(this.parentElement, title, image, url);

    let recipeObject = {
        title: title,
        image: image,
        url: url
    }

    let recipeObjectAsString = JSON.stringify(recipeObject);
    localStorage.setItem('recipeObject', recipeObjectAsString);

    createFavouriteRecipe(recipeObject.title, recipeObject.image, recipeObject.url)
}

function createFavouriteRecipe(title, image, url) {
    const container = document.querySelector('.modal-body');
    console.log(container);

    const card = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardTitle = document.createElement('h5');
    const cardLink = document.createElement('a');

    card.classList.add('card');
    cardImage.classList.add('card-img-top');
    cardTitle.classList.add('card-title');
    cardLink.classList.add('btn-primary', 'btn', 'btn-outline-secondary');

    card.append(cardImage);
    card.append(cardTitle);
    card.append(cardLink);
    container.append(card);

    cardTitle.textContent = title;
    cardImage.src = image;
    cardLink.href =  url;
    cardLink.textContent = 'Get Recipe'
}

//load recipeObjects in local storage into favourite recipes 
let recipeFavourite = localStorage.getItem('recipeObject');
let revertRecipeStringToNormal = JSON.parse(localStorage.getItem('recipeObject'));
createFavouriteRecipe(revertRecipeStringToNormal.title, revertRecipeStringToNormal.image, revertRecipeStringToNormal.url)
