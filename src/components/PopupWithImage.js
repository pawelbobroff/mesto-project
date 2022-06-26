import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image')
        this._text = this._popup.querySelector('.popup__name-image');       
    }

    open(cardData) {
        super.open();
        this._image.src = cardData.link;
        this._text.textContent = cardData.name;
        this._image.alt = cardData.name;    
      };
};