export default class FormVaidator {
    constructor(settings, form){
        this._settings = settings;
        this._form = form;
        // Находим все поля внутри формы,
        // сделаем из них массив методом Array.from
        this._inputsList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
        
    }

    // Функция, которая добавляет класс с ошибкой
    _showInputError (inputElement, errorMessage) {
        inputElement.classList.add(this._settings.inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._settings.errorClass);// Показываем сообщение об ошибке
    }

    // Функция, которая удаляет класс с ошибкой
    _hideInputError (inputElement) {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        this._errorElement.classList.remove(this._settings.errorClass);// Скрываем сообщение об ошибке
        this._errorElement.textContent = '';
    };
    
    // Функция, которая проверяет валидность поля
    _isValid (inputElement) {
        if (!inputElement.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            // Если проходит, скроем
            this._hideInputError(inputElement);
        }
    };
    
    // Функция принимает массив полей
    _hasInvalidInput () {
        return this._inputsList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    
    // Функция принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять
    _toggleButtonState() {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(this.inputsList)) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        }
    };
    
    //добавляем слушателей всем полям формы
    
    _setEventListeners () {
        this._toggleButtonState();
    
        // Обойдём все элементы полученной коллекции
        this._inputsList.forEach((inputElement) => {
            // каждому полю добавим обработчик события input
            inputElement.addEventListener('input', () => {
                // Внутри колбэка вызовем isValid,
                // передав ей форму и проверяемый элемент
                this._isValid(inputElement);
                this._toggleButtonState(this._buttonElement);// Вызовем toggleButtonState и передадим ей массив полей и кнопку
            });
        });
    };
    
    //скрываем ошибки всех полей      ??????????????
    hideErorrs(popup) {
        this._inputsList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };

    enableValidation(){
        this._setEventListeners();
    }
}