import * as model from './model.js'
import recipeView from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id);

  //   rendering recipe
    recipeView.render(model.state.recipe);


  }catch (err){
    console.log(err)
  }
}


const init = function(){
  recipeView.addHandlerRender(controlRecipes())
}
init();
