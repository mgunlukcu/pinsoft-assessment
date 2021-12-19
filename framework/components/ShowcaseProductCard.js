import FullSizeImage from "./FullSizeImage.js";
export default class ShowcaseProductCard extends HTMLElement{
    constructor(product){
        super();
        this.className = 'showcase-product';
        
        let image = new Image();
        image.src = product.image;
        image.addEventListener('click', (e) => {
            document.getElementsByTagName('body')[0]
            .appendChild(new FullSizeImage(e.target.src));
        });
        
        let title = document.createElement('span');
        title.textContent = product.title;
        
        let price = document.createElement('span');
        price.textContent = '$' + product.price;
        price.className = 'price';
        
        let addToBasketButton = document.createElement('button');
        addToBasketButton.textContent = 'Add to basket';
        addToBasketButton.addEventListener('click', (e) => {
            basketProducts.push(product);
            basket.setAttribute('quantity', basketProducts.length);
        });
        
        this.appendChild(image);
        this.appendChild(title);
        this.appendChild(document.createElement('hr'));
        this.appendChild(price);
        this.appendChild(addToBasketButton);
    }
}

window.customElements.define('showcase-product', ShowcaseProductCard);