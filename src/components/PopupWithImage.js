import Popup from "./Popup.js";

// export default class PopupWithImage extends Popup {
//     constructor(popupSelector) {
//         super(popupSelector)
//     }
//     openImage (srcImage, nameImage) {
//         const popupViewImage =  super._popup.querySelector('.popup__image');
//         const popupViewImageName = super._popup.querySelector('.popup__name-image');
//         popupViewImage.src = srcImage;
//         popupViewImage.alt = nameImage;
//         popupViewImageName.textContent = nameImage;       
//         super._popup.classList.add('popup_opened')
//     }
// }

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image')
        this._text = this._popup.querySelector('.popup__name-image');       
    }

    openImage(name, link) {
        super.open();
        this._image.src = link;
        this._text.textContent = name;
        this._image.alt = name;    
      };


      setEventListeners() {
        super.setEventListeners();
    }
};

