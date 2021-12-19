import BasketProduct from "./BasketProduct.js";
import Notification from "./Notification.js";

export default class ShoppingBasket extends HTMLElement {
    constructor(){
        super();
        this.className = 'shopping-basket';
        
        this.badge = document.createElement('div');
        this.badge.className = 'badge';
        
        let basketIcon = new Image();
        basketIcon.src = '/style/icons/basket.svg';
        
        this.basketProductsWrapper = document.createElement('div');
        this.basketProductsWrapper.className = 'basket-products-wrapper';
        this.basketProductsWrapper.addEventListener('click', e => {
            e.stopPropagation();
        });
        
        this.appendChild(this.basketProductsWrapper);
        this.appendChild(this.badge);
        this.appendChild(basketIcon);
        
        this.addEventListener('click', e => {
            this.switchVisibility();
        });
    }

    static get observedAttributes(){
        return ['quantity'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        let badge = document.getElementsByClassName('badge')[0];
        if(badge !== undefined && this.basketProductsWrapper !== undefined){
            let quantity = this.getAttribute('quantity');
            badge.innerHTML = `${quantity}`;
            if(quantity > 0){
                this.basketProductsWrapper.innerHTML = ``;
                basketProducts.forEach(product => {
                    this.basketProductsWrapper.appendChild(
                        new BasketProduct(product, this)
                    );
                });
            }else {
                this.switchVisibility();
            }
        }
    }
    
    connectedCallback(){
        this.setAttribute('quantity', '0');
        let badge = document.getElementsByClassName('badge')[0];
        badge.innerHTML = `${this.getAttribute('quantity')}`;
    }

    switchVisibility(){
            if(this.basketProductsWrapper.hasAttribute('visible'))
                this.basketProductsWrapper.removeAttribute('visible');
            else if(this.getAttribute('quantity') > 0)
                this.basketProductsWrapper.setAttribute('visible', '');
            else if(this.getAttribute('quantity') == 0){
                let notification = document.getElementsByClassName('notification-wrapper');
                if(notification.length == 0)
                    document.body.appendChild(new Notification('Your basket is empty!'));
            }
    }
}

window.customElements.define('shopping-basket', ShoppingBasket);