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
        for (let i = 0; i < data.meals.length; i ++) {
            console.log(data.meals[i]);
        }
    })
	.catch(err => console.error(err));
}


function addRecipe() {
    
}