//Select button 
let button = document.querySelector('#find');
button.addEventListener('click', getRecipes)


function getRecipes() {
    let ingredient = document.querySelector('#ingredient').value;
    console.log(ingredient);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
	.then(response => response.json())
	.then(data => {
        console.log(data)

        //if user typos or no recipes in database
        if (data.meals === null) {
            console.log('no recipes yet ')
            return
        }

        createRecipe(data.meals);
    })
	.catch(err => console.error(err));
}


function createRecipe(recipe) {
    for (let i = 0; i < recipe.length; i ++) {
        console.log(recipe[i]);
    }
}