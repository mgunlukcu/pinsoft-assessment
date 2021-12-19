export default class Notification extends HTMLElement{
    constructor(message){
        super();
        this.className = 'notification-wrapper';
        this.innerText = message;
        this.addEventListener('click', e => {
            this.remove();
        });
    }
    connectedCallback(){
        window.setTimeout(()=>{
            this.remove();
        }, 5000);
    }
}

window.customElements.define('notification-wrapper', Notification);