//Select button 
let button = document.querySelector('#find');
const recipeContainer = document.querySelector('#recipes');
button.addEventListener('click', getRecipes);

//Set ingredient list 
let ingredientList = '';

let addIngredient = document.querySelector('#add');
addIngredient.addEventListener('click', concatonateIngredients);

document.querySelector('#ingredient').value.textContent = 'wtf';

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

    card.classList.add('card', 'remove');
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
    const ingredientContainer = document.querySelector('.ingredients');
    let textToDelete = this.nextElementSibling.textContent;
    console.log(this.parentElement);
    ingredientList = ingredientList.replace(`${textToDelete} `, '')
    console.log(ingredientList)
}