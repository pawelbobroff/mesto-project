import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor({popupSelector, colbackSubmit}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._inputsList = this._form.querySelectorAll('.popup__item');
        
        
        this._submitButton = this._popup.querySelector('.popup__button');

        this._colbackSubmit = colbackSubmit;

    }

    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach((input) => {this._formValues[input.name] = input.value});
        return this._formValues;
    }

    close () {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        //console.log(this._form);
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._colbackSubmit(this._getInputValues());
        });
    }
}