export default class SideBar extends HTMLElement{
    constructor(){
        super();
        this.className = 'side-bar';
        
        let title = document.createElement('h3');
        title.innerHTML = 'Filter by Categories';
        
        this.appendChild(title);
        this.appendChild(document.createElement('hr'))
    }
}

window.customElements.define('side-bar', SideBar);