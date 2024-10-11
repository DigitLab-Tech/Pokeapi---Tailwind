export default class Details{
    constructor(){
        this.html = document.querySelector('.details');
        this.content = this.html.querySelector('.details-content');
        const btnRemove = this.html.querySelector('.details-close');

        btnRemove.onclick = () => {
            this.hide();
        }
    }

    show(){
        this.html.removeAttribute('aria-hidden');
    }

    hide(){
        this.html.setAttribute('aria-hidden', true);
    }

    setContent(htmlString){
        this.content.innerHTML = htmlString;
    }
}