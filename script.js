addIngredientButton()
searchRecipesButton()
displayFavouriteRecipes()

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
    const recipeContainer = document.querySelector('#recipes');

    fetch(`${URL}${ingredientList}&app_id=${APP_ID}&app_key=${APP_KEYS}`)
	.then(response => response.json())
	.then(data => {
        //clear previous data each time
        removeRecipeCardsDisplay('.remove');
        for (let i = 0; i < data.hits.length; i++) {
            createRecipeCard(data.hits[i].recipe.label, data.hits[i].recipe.image, data.hits[i].recipe.url, recipeContainer, true);
        }
    })
	.catch(err => console.error(err));
}

function createRecipeCard(title, image, url, container, heart){
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
    cardLink.classList.add('btn-primary', 'btn', 'btn-outline-secondary');
    card.dataset.title = title;

    card.append(cardImage);
    card.append(cardBody);
    card.append(cardTitle);
    card.append(cardText);
    card.append(cardLink);
    container.append(card);

    cardTitle.textContent = title;

    cardImage.src = image;
    cardLink.href =  url;
    cardLink.textContent = 'Get Recipe'

    //for modal cards don't include heart 
    //this is for recipes in main container 
    if (heart == true) {
        const cardHeartImage = document.createElement('img')
        cardHeartImage.classList.add('not-favourite');
        card.classList.add('remove');

        card.append(cardHeartImage);
        cardHeartImage.src='images/love.png';
        cardHeartImage.addEventListener('click', favouriteThisRecipe)

        //if recipe title is equal to a title in local storage add favourite class 
        addFavourite(title, cardHeartImage);
    }

}

function removeRecipeCardsDisplay(remove) {
    let cards = document.querySelectorAll(remove);
    cards.forEach(card => card.remove());
}

//store favourite recipes in local storage & display 
function favouriteThisRecipe() {
    const modalContainer = document.querySelector('.modal-body');
    let title = (this.parentElement).querySelector('h5').textContent;
    let image = (this.parentElement).querySelector('img').src;
    let url = (this.parentElement).querySelector('a').href;

    this.classList.toggle('favourite');

    if (this.classList.contains('favourite')) {
        //add recipe to modal display
        createRecipeCard(title, image, url, modalContainer, false);

        //add recipe into local storage
        const favouriteRecipeObject = {
            title: title,
            image: image,
            url: url
        }
        //turn object into string
        let favouriteRecipeObjectString = JSON.stringify(favouriteRecipeObject);
        //store string in local storage 
        localStorage.setItem(title, favouriteRecipeObjectString)
    } else {
        //remove from local 
        localStorage.removeItem(title);
        //remove from display 
        console.log(title);
        modalContainer.querySelector(`[data-title="${title}"]`).remove()

    }
}

//load display on refresh for favourite recipes in modal 
function displayFavouriteRecipes() {
    //get from local storage and display in modal 
    const modalContainer = document.querySelector('.modal-body');
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = JSON.parse(localStorage.getItem(key));
        createRecipeCard(data.title, data.image, data.url, modalContainer, false);
    }
}

function addFavourite(title, image) {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = JSON.parse(localStorage.getItem(key));
        if (data.title == title) {
            image.classList.add('favourite');
        }
    }
}
