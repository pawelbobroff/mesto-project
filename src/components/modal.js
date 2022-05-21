import {validationSettings, popups, buttonOpenPopupEdit, buttonOpenPopupAdd,
    userAvatarElement, userNameElement, userProfElement, popupAdd,
    popupElementName, popupElementLink, popupAddButton, buttonClosePopupAdd,
    popupAddCard, popupEdit, buttonClosePopupEdit, popupUsername, 
    popupProfession, popupView, buttonClosePopupView, popupViewImage,
    popupViewImageName, elementTemlate, elements, initialCards} from './utils.js';

//функции открытия и закрытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeClosePopup);
};

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClosePopup);
};

export function escapeClosePopup(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

export function closePopupWithMouse() {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup_unvisible')) {
        closePopup(popup)
      }
    })
  })
}

export function closePopupWithCross() {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
       if (evt.target.classList.contains('button_theme_close')) {
          closePopup(popup)
        }
    })
  })
}