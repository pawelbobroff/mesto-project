export default class Section {
    constructor( {items, renderer}, containerSelector){
        this.items = items;
        
        this.renderer = renderer;
        
        this.container = document.querySelector(containerSelector);
        
    }

    addItem(element){
        this.container.append(this.renderer(element));
    }

    addItems () {
        this.items.forEach((item) => {
            this.addItem(item)            
        }); 
    }
}