fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`)
	.then(response => response.json())
	.then(data => {
        console.log(data)
    })
	.catch(err => console.error(err));