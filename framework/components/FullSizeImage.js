export default class FullSizeImage extends HTMLElement{
    constructor(source){
        super();
        this.className = 'full-size-image';
        
        let closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;'
        closeBtn.addEventListener('click', (e) => {
            this.remove();
        })
        
        let image = new Image();
        image.src = source;
        
        this.appendChild(closeBtn);
        this.appendChild(image);
    }
}

window.customElements.define('full-size-image', FullSizeImage);