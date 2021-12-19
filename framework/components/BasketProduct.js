export default class BasketProduct extends HTMLElement{
    constructor(product, basket){
        super();
        this.className = 'basket-product';

        let imageWrapper = document.createElement('div');
        imageWrapper.className = 'image-wrapper';

        let image = new Image();
        image.src = product.image;
        imageWrapper.appendChild(image);

        let titleWrapper = document.createElement('div');
        titleWrapper.className = 'title-wrapper';
        titleWrapper.innerText = product.title;

        let actionWrapper = document.createElement('div');
        actionWrapper.className = 'action-wrapper';

        let button = document.createElement('button');
        actionWrapper.appendChild(button);

        let priceWrapper = document.createElement('div');
        priceWrapper.className = 'price-wrapper';
        priceWrapper.innerText = '$' + product.price;

        this.appendChild(actionWrapper);
        this.appendChild(imageWrapper);
        this.appendChild(titleWrapper);
        this.appendChild(priceWrapper);

        button.addEventListener('click', e => {
            basketProducts.splice(
                basketProducts.indexOf(product), 1
            );
            basket.setAttribute('quantity', basketProducts.length);
        });
    }
}

window.customElements.define('basket-product', BasketProduct);