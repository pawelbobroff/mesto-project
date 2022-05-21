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
export const userAvatarElement = document.querySelector('.profile__avatar');
export const userNameElement = document.querySelector('.profile__name');
export const userProfElement = document.querySelector('.profile__proffession');


export const popupAdd = document.querySelector('.popup_type_card-add');
export const popupElementName = popupAdd.querySelector('#elementName');
export const popupElementLink = popupAdd.querySelector('#elementLink');
export const popupAddButton = popupAdd.querySelector('.popup__button');
export const buttonClosePopupAdd = popupAdd.querySelector('.button_theme_close');
export const popupAddCard = popupAdd.querySelector('.popup__form-add-card');

export const popupEdit = document.querySelector('.popup_type_profile'); 
export const buttonClosePopupEdit = popupEdit.querySelector('.button_theme_close'); 
export const popupUsername = popupEdit.querySelector('#username');
export const popupProfession = popupEdit.querySelector('#profession');
export const popupEditButton = popupEdit.querySelector('.popup__button');

export const popupView = document.querySelector('.popup_type_picture');
export const buttonClosePopupView = popupView.querySelector('.button_theme_close');
export const popupViewImage =  popupView.querySelector('.popup__image');
export const popupViewImageName = popupView.querySelector('.popup__name-image');

export const popupAvatar = document.querySelector('.popup_type_avatar-edit');
export const buttonClosePopupAvatar = popupAvatar.querySelector('.button_theme_close');
export const popupAvatarLink =  popupAvatar.querySelector('#avatarLink');
export const popupAvatarButton = popupAvatar.querySelector('.popup__button');
export const popupAvatarForm = popupAvatar.querySelector('.popup_form_avatar-edit');

//Работа с карточками
export const elementTemlate = document.querySelector('#element').content;
export const elements = document.querySelector('.elements');

// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];