//Select button 
let button = document.querySelector('#find');
const recipeContainer = document.querySelector('#recipes');
button.addEventListener('click', getRecipes);


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
    })
	.catch(err => console.error(err));
}

