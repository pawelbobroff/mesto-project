export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector)
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
        document.addEventListener('keydown', this._handleEscClose());
        this._popup.addEventListener('mousedown', this.close());
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('button_theme_close')) {
                this.close()
            }
        })
    }
}