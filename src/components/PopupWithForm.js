import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor({popupSelector, colbackSubmit}) {
        super(popupSelector);
        this._inputsList = this._popup.querySelectorAll('.popup__item');
        this._form = this._popup.querySelectorAll('.form');
        
        this._submitButton = this._popup.querySelectorAll('.popup__button');

        this._colbackSubmit = colbackSubmit;

    }

    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach((input) => {this._formValues[input.name] = input.value});
        return this._formValues;
    }

    close () {
        super.close;
        // this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        //console.log(this._form);
        this._popup.addEventListener('submit', function (event) {
            event.preventDefault();
            this._colbackSubmit(this._getInputValues());
        });
    }
}