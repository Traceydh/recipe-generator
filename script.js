//empty array to store favourite recipes
let favouriteRecipesObject = [];
let favouriteRecipesString = [];

//get recipes SEARCH button 
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

//load recipeObjects in local storage into favourite recipes modal
for (let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    //add this to string array 
    favouriteRecipesString.push(localStorage.getItem(key));
    //get current local storage string & convert to object
    key = JSON.parse(localStorage.getItem(key));
    //add to object array 
    favouriteRecipesObject.push(localStorage.getItem(key));

    createFavouriteRecipe(key.title, key.image, key.url);
}


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
        removeCards('.remove');
        for (let i = 0; i < data.hits.length; i++) {
            createRecipeCard(data.hits[i].recipe.label, data.hits[i].recipe.image, data.hits[i].recipe.url)
            for (let j = 0; j < localStorage.length; j ++) {
                checkIfFavouriteRecipe(data.hits[i], j);
            }
        }
    })
	.catch(err => console.error(err));
}

function checkIfFavouriteRecipe(data, i) {
    let favRecipeObject = JSON.parse(localStorage.getItem(i));
    const recipeContainer = document.querySelector('#recipes');
    if (favRecipeObject.title === data.recipe.label) {
        let favouritedRecipe = recipeContainer.querySelectorAll('img');
        favouritedRecipe[favouritedRecipe.length-1].classList.add('favourite');
    }
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

    cardHeartImage.addEventListener('click', addFavouriteRecipeToStorageAndModal)

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

function removeCards(remove) {
    let cards = document.querySelectorAll(remove);
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
    let textToDelete = this.nextElementSibling.textContent;
    this.parentElement.remove();
    ingredientList = ingredientList.replace(`${textToDelete} `, '')
}

function addFavouriteRecipeToStorageAndModal() {

    if (this.classList.contains('favourite')) {
        const userWantsToUnfavouriteRecipe = this.parentElement.querySelector('.card-title').innerText
        //remove from localStorage 
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let recipeObject = JSON.parse(localStorage.getItem(key));
            if (userWantsToUnfavouriteRecipe === recipeObject.title) {
                localStorage.removeItem(key);
            }   
        }
        //remove from favourite recipes modal 
    } else {
        console.log('where')
        let title = (this.parentElement).querySelector('h5').textContent;
        let image = (this.parentElement).querySelector('img').src;
        let url = (this.parentElement).querySelector('a').href;
        createFavouriteRecipe(title, image, url);
    
        const recipeObject = {
            title: title,
            image: image,
            url: url
        }
    
        //add object to object array 
        favouriteRecipesObject.push(recipeObject);
    
        //convert object into string and add to string array 
        let recipeObjectString = JSON.stringify(recipeObject)
        favouriteRecipesString.push(recipeObjectString);
    
        //add to local storage 
        localStorage.setItem(`${favouriteRecipesString.length - 1}`, recipeObjectString);
    }
    this.classList.toggle('favourite');
}

function createFavouriteRecipe(title, image, url) {
    const container = document.querySelector('.modal-body');

    const card = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardTitle = document.createElement('h5');
    const cardLink = document.createElement('a');

    card.classList.add('card');
    card.classList.add('favouriteRemove');
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

