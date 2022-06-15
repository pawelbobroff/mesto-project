export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        //console.log(this._popup);
        this._handleEscClose = this._handleEscClose.bind(this);
        //console.log(this._handleEscClose);
    }

    open () {
        this._popup.classList.add('popup_opened')
    }

    close () {
        this._popup.classList.remove('popup_opened')
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
          }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('button_theme_close') || evt.target.classList.contains('popup')) {
                this.close()
            }
        })
    }
}