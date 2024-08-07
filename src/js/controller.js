import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView';
import 'core-js/stable';
import 'regenerator-runtime/runtime'

// if(module.hot){
//   module.hot.accept()
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //0) update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage())

    // loading recipe
    await model.loadRecipe(id);
    const {recipe} = model.state;

  //   rendering recipe
    recipeView.render(model.state.recipe);


  }catch (err){
    recipeView.renderError()
  }
}

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner()
    // 1) get search query
    const query = searchView.getQuery()
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query)

    //3) render results
    resultsView.render(model.getSearchResultsPage())

    //4) render initial pagination buttons
    paginationView.render(model.state.search)

  }catch(err){
    console.log(err)
  }
}

const controlPagination = function(goToPage){
  //1) render new results
  resultsView.render(model.getSearchResultsPage(goToPage))

  //2) render new pagination buttons
  paginationView.render(model.state.search)}

const controlServings = function(newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings)

  //update the recipe view
  recipeView.update(model.state.recipe)
}



const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init();
