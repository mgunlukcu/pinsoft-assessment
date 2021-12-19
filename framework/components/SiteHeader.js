import SearchBox from './SearchBox.js'
import ShoppingBasket from './ShoppingBasket.js';
class SiteHeader extends HTMLElement {
    constructor(){
        super();
        this.className = 'site-header';

        let categoriesButton = document.createElement('button');
        categoriesButton.innerText = 'Filters';
        categoriesButton.className = 'categories-button';

        let shoppingBasket = new ShoppingBasket(0);
        shoppingBasket.setAttribute('quantity', '0');

        categoriesButton.addEventListener('click', e => {
            let sidebar = document.getElementsByClassName('side-bar')[0];
            if(sidebar.hasAttribute('visible'))
                sidebar.removeAttribute('visible');
            else
                sidebar.setAttribute('visible', '');
        });

        this.appendChild(categoriesButton);
        this.appendChild(new SearchBox());
        this.appendChild(shoppingBasket);
    }
}

window.customElements.define('site-header', SiteHeader);