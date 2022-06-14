import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector, colbackSubmit) {
        super(popupSelector);
        this._colbackSubmit = colbackSubmit;
        this._inputsList = super._popup.querySelectorAll('.popup__item');
        this._form = super._popup.querySelectorAll('.form');
        this._submitButton = super._popup.querySelectorAll('.popup__button');

    }

    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    close () {
        super._popup.classList.remove('popup_opened');
        this._form.reset()
    }

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._colbackSubmit(this._getInputValues());
        })
    }
}