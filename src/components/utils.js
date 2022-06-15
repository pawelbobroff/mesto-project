export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_novalid',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-errors_active'
};
export const popups = document.querySelectorAll('.popup');
export const buttonOpenPopupEdit = document.querySelector('.button_theme_edit');
export const buttonOpenPopupAdd = document.querySelector('.button_theme_add');
export const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-edit');
// export const userAvatarElement = document.querySelector('.profile__avatarImg');
// export const userNameElement = document.querySelector('.profile__name');
// export const userProfElement = document.querySelector('.profile__proffession');


export const popupAdd = document.querySelector('.popup_type_card-add');
export const formAdd = document.querySelector('.popup__form-add-card');
export const popupElementName = popupAdd.querySelector('#elementName');
export const popupElementLink = popupAdd.querySelector('#elementLink');
export const popupAddButton = popupAdd.querySelector('.popup__button');
export const buttonClosePopupAdd = popupAdd.querySelector('.button_theme_close');
//export const popupAddCard = popupAdd.querySelector('.popup__form-add-card');

export const popupEdit = document.querySelector('.popup_type_profile');
export const formEdit = document.querySelector('.popup__form-change-name');
export const buttonClosePopupEdit = popupEdit.querySelector('.button_theme_close'); 
export const popupUsername = popupEdit.querySelector('#username');
export const popupProfession = popupEdit.querySelector('#profession');
export const popupEditButton = popupEdit.querySelector('.popup__button');

export const popupView = document.querySelector('.popup_type_picture');
export const buttonClosePopupView = popupView.querySelector('.button_theme_close');
export const popupViewImage =  popupView.querySelector('.popup__image');
export const popupViewImageName = popupView.querySelector('.popup__name-image');

// export const popupAvatar = document.querySelector('.popup_type_avatar-edit');
export const formAvatar = document.querySelector('.popup__form-avatar-edit');
// export const buttonClosePopupAvatar = popupAvatar.querySelector('.button_theme_close');
// export const popupAvatarLink =  popupAvatar.querySelector('#avatarLink');
// export const popupAvatarButton = popupAvatar.querySelector('.popup__button');
// export const popupAvatarForm = popupAvatar.querySelector('.popup__form-avatar-edit');

//Работа с карточками
export const elementTemlate = document.querySelector('#element').content;
export const elements = document.querySelector('.elements');

//Настройки запроса
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
      authorization: '51635047-90c2-46fc-abfe-190701a5705f',
      'Content-Type': 'application/json',
  }
}