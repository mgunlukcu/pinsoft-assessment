import ShowcaseProductCard from "./components/ShowcaseProductCard.js";

//Some global variables that defined in 'globals.js' are used in this file.

const searchbox = document.getElementsByClassName('search-box')[0];
const sidebar = document.getElementsByTagName('side-bar')[0];
const showcase = document.getElementsByClassName('products-showcase')[0];
window.basket = document.getElementsByClassName('shopping-basket')[0];

//A function that reads data from json file and feeds page with parsed data.
async function Initialize(){
    await fetchData();
    searchbox.addEventListener('input', () => {
        displayedProducts = productList.filter(searchFilter);
        listProducts();
    });
    categories = productList.map(product =>
        product.category)
        .filter(distinctFilter);
    listCategories();
    listProducts();
}

//This function gets data from json file, parses json string and fills related arrays with read data.
async function fetchData(){
    await fetch('data/products-list.json').then(
        response => {
            if(!response.ok)
                throw new Error('HTTP error ' + response.status);
            return response.json();
        }).then(
            json => {
                productList = json;
                displayedProducts = json;
            }
        ).catch(
            (e) => {
                console.error(e, e.stack);
        });
}

//This function creates DOM elements (buttons) for each item of categories array and appends them in sidebar.
function listCategories(){
    categories.forEach(category => {
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = 'filter-' + categories.indexOf(category);
        checkBox.name = 'category-filter';
        checkBox.value = category;
        let label = document.createElement('label');
        label.setAttribute('for', 'filter-' + categories.indexOf(category));
        label.innerHTML = category;
        checkBox.addEventListener(
            'change', (event) => {
                filterByCategory(event.target.value);
        });
        sidebar.appendChild(checkBox);
        sidebar.appendChild(label);
    });
}

//This function calls custom element classes for each displayedProducts array items. 
//And appends them in showcase.
function listProducts(){
    showcase.innerHTML = '';
    displayedProducts.forEach(product => {
        showcase.appendChild(new ShowcaseProductCard(product));
    });
}

//This function filters repeating items of an array.
function distinctFilter(item, index, collection){
    return collection.indexOf(item) === index;
}

//This function filters displayed products by search input.
function searchFilter(product, index, collection){
    var isSearchResult;
    //Check if any search input is present.
    if(searchbox.value === '')
        isSearchResult = true;
    else{
        isSearchResult = product.title.toLowerCase().includes(searchbox.value.toLowerCase());
    }
    //Check if any category filter is active.
    if(filteredCategories.length > 0){
        return filteredCategories.includes(product.category) && isSearchResult;
    }
    else{
        return isSearchResult;
    }
}

//This function filters displayed products by selected categories.
function filterByCategory(categoryName){
    if(!filteredCategories.includes(categoryName))
        filteredCategories.push(categoryName);
    else
        filteredCategories.splice(
            filteredCategories.indexOf(categoryName), 1
        );
    if(filteredCategories.length > 0 || searchbox.value !== ''){
        displayedProducts = productList.filter(searchFilter);
    }
    else{
        displayedProducts = productList;
    }
    listProducts();
}

Initialize();