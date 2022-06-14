import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }
    open (srcImage, nameImage) {
        const popupViewImage =  super._popup.querySelector('.popup__image');
        const popupViewImageName = super._popup.querySelector('.popup__name-image');
        popupViewImage.src = srcImage;
        popupViewImage.alt = nameImage;
        popupViewImageName.textContent = nameImage;       
        super._popup.classList.add('popup_opened')
    }
}