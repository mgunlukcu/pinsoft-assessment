export default class SearchBox extends HTMLElement{
    constructor(){
        super();
        this.className = 'searchBox-wrapper';
        
        let searchBox = document.createElement('input');
        searchBox.className = 'search-box';
        searchBox.type = 'search';
        searchBox.placeholder = 'Search';
        
        let searchIcon = new Image();
        searchIcon.src = 'style/icons/search.svg';
        
        this.appendChild(searchIcon);
        this.appendChild(searchBox);
    }
}

window.customElements.define('search-box', SearchBox);