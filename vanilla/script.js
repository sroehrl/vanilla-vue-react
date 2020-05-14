const form = document.getElementById('input-form');
const contents = document.getElementById('contents');
const submitButton = document.getElementById('submit-button');

const resultsContainer = document.getElementById('results-container');

const corsHelper = 'https://cors-anywhere.herokuapp.com/';
const recipeApi = 'http://www.recipepuppy.com/api/';

form.addEventListener('submit', ev =>{
    ev.preventDefault();
    submitButton.disabled = true;
    findRecipe(contents.value).then(results => {
        submitButton.disabled = false;
        generateRecipes(results);
    })
})

async function findRecipe(string) {
    try{
        let suggestions = await fetch(corsHelper+recipeApi+'?i='+string)
            .then(res => res.json());
        return suggestions.results;
    } catch (e) {
        console.error('Could not retrieve recipe(s)');
    }
}

function generateRecipes(recipes) {
    resultsContainer.innerHTML = '<h1>Ideas</h1>';
    recipes.forEach(recipe => {
        let ele = document.createElement('div');
        ele.className = 'w-full mt-4 flex';
        ele.innerHTML = cardTemplate(recipe);
        resultsContainer.appendChild(ele);
    })
}
function cardTemplate(recipe){
    return `
<div class="h-48 h-auto w-48 flex-none bg-cover rounded-t-none rounded-l text-center overflow-hidden" style="background-image: url('${recipe.thumbnail}')" title="recipe">
  </div>
<div class=" w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div class="mb-8">
        <div class="text-gray-900 font-bold text-xl mb-2">${recipe.title}</div>
        <p>${recipe.ingredients}</p>
        <p class="text-gray-900 leading-none"><a target="_blank" href="${recipe.href}">Let's do it!</a></p>
    </div>
</div>
`;
}