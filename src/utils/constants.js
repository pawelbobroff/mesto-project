export const validationSettings = {
    formSelector: '.form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_novalid',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-errors_active'
  };
  
  export const buttonOpenPopupEdit = document.querySelector('.button_theme_edit');
  export const buttonOpenPopupAdd = document.querySelector('.button_theme_add');
  export const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-edit');
  
  export const formAdd = document.querySelector('.popup__form-add-card');
  
  export const popupEdit = document.querySelector('.popup_type_profile');
  export const formEdit = document.querySelector('.popup__form-change-name');
  
  export const popupUsername = popupEdit.querySelector('#username');
  export const popupProfession = popupEdit.querySelector('.popup-profession');
  
  export const popupView = document.querySelector('.popup_type_picture');
  export const popupViewImage =  popupView.querySelector('.popup__image');
  export const popupViewImageName = popupView.querySelector('.popup__name-image');
  
  export const formAvatar = document.querySelector('.popup__form-avatar-edit');