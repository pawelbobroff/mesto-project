export default class Section {
    constructor( {renderer}, containerSelector){
        this._renderer = renderer;        
        this.container = document.querySelector(containerSelector);
        
    }

    addItem(element){
        this.container.append(element);
    }

    addItems (cards) {
        cards.forEach((item) => {
            this._renderer(item)            
        }); 
    }

    prependItem (element) {
        this.container.prepend(element);
    }

}