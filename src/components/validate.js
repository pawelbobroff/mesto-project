//Валидация форм

import { validationSettings } from './utils.js';

  // Функция, которая добавляет класс с ошибкой
  export const showInputError = (form, formInput, errorMessage, settings) => {
    const errorElement = form.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);// Показываем сообщение об ошибке
    
  };
  
  // Функция, которая удаляет класс с ошибкой
  export  const hideInputError = (form, formInput, settings) => {
    const errorElement = form.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);// Скрываем сообщение об ошибке
    errorElement.textContent = '';
  };
  
  // Функция, которая проверяет валидность поля
  export const isValid = (form, formInput, settings) => {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(form, formInput, formInput.validationMessage, settings);
    } else {
      // Если проходит, скроем
      hideInputError(form, formInput, settings);
    }
  };
  
  // Функция принимает массив полей
  export const hasInvalidInput = (inputsList) => {
    return inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  export function toggleButtonState(inputsList, buttonElement, settings) {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputsList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
  };
  
  //добавляем слушателей всем полям формы
  
  export const setEventListeners = (form, settings) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputsList = Array.from(form.querySelectorAll(settings.inputSelector));
    const buttonElement = form.querySelector(settings.submitButtonSelector);
  
    toggleButtonState(inputsList, buttonElement, settings);
  
    // Обойдём все элементы полученной коллекции
    inputsList.forEach((formInput) => {
      // каждому полю добавим обработчик события input
      formInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(form, formInput, settings);
        toggleButtonState(inputsList, buttonElement, settings);// Вызовем toggleButtonState и передадим ей массив полей и кнопку
      });
    });
  };
  
  //находим все формы на странице
  export const enableValidation = (settings) => {
    const formsList = Array.from(document.querySelectorAll(settings.formSelector));
    formsList.forEach((form) => {
      setEventListeners(form, settings);
    });
  };
  
  export function hideErorrs(popup) {
    const form = popup.querySelector(validationSettings.formSelector);
    const inputsList = form.querySelectorAll(validationSettings.inputSelector);
    inputsList.forEach((inputElement) => {
      hideInputError(form, inputElement, validationSettings);
    });
  };