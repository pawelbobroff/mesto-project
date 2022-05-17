const buttonOpenPopupEdit = document.querySelector('.button_theme_edit'); 
const popupEdit = document.querySelector('.popup_type_profile'); 
const buttonClosePopupEdit = popupEdit.querySelector('.button_theme_close'); 
const popupUsername = popupEdit.querySelector('#username');
const popupProfession = popupEdit.querySelector('#profession'); 
const userNameElement = document.querySelector('.profile__name');
const userProfElement = document.querySelector('.profile__proffession');
const buttonOpenPopupAdd = document.querySelector('.button_theme_add');
const popupAdd = document.querySelector('.popup_type_card-add');
const buttonClosePopupAdd = popupAdd.querySelector('.button_theme_close');
const popupElementName = popupAdd.querySelector('#elementName');
const popupElementLink = popupAdd.querySelector('#elementLink');
const popupAddCard = popupAdd.querySelector('.popup__form-add-card');
const elementTemlate=document.querySelector('#element').content;
const elements=document.querySelector('.elements');
const popupView = document.querySelector('.popup_type_picture');
const buttonClosePopupView = popupView.querySelector('.button_theme_close');
const popupViewImage =  popupView.querySelector('.popup__image');

import '../pages/index.css'
import { initialCards } from './card.js';
import { enableValidation, hideErorrs } from './validate.js';
import {validationSettings} from './utils.js';
import { openPopup, closePopup } from './modal.js';
import {toggleButtonState} from './validate';

//1. Работа модальных окон. Открытие и закрытие модального окна


//const openPopup = function (popup) {
//  popup.classList.remove('popup_unvisible')
//}
  
//const closePopup = function (popup) {
//  popup.classList.add('popup_unvisible')
//}

buttonOpenPopupEdit.addEventListener(
  'click',
  function () {
        hideErorrs(popupEdit);
        popupUsername.value = userNameElement.textContent;
        popupProfession.value = userProfElement.textContent;
        openPopup(popupEdit);
  }
)

buttonClosePopupEdit.addEventListener('click', () => closePopup(popupEdit))

function handleformSubmitEdit (evt) {
  evt.preventDefault();    
  userNameElement.textContent = popupUsername.value;
  userProfElement.textContent = popupProfession.value;
  closePopup(popupEdit);  
}

popupEdit.addEventListener('submit', handleformSubmitEdit); 

//2. Шесть карточек «из коробки» 

// создать template-элемент в html разметке

function createCard (cardData) {
  const element = elementTemlate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementButtonDel = element.querySelector('.element__delete');
  const elementButtonLike = element.querySelector('.element__like');
  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  element.querySelector('.element__name').textContent = cardData.name;
  elementButtonLike.addEventListener('click',
    () => elementButtonLike.classList.toggle('element__like_liked'));
  elementButtonDel.addEventListener('click',
    () => elementButtonDel.closest("article").remove());
  elementImage.addEventListener('click',
    function (evt) {
      popupViewImage.src = cardData.link;
      popupViewImage.alt = cardData.name;
      popupView.querySelector('.popup__name-image').textContent = cardData.name;       
      openPopup(popupView)
    }
  )
  return element;
}

initialCards.forEach ( function (initialCard) {
  const element = createCard(initialCard);
  elements.prepend(element);
});



//3 and 4 Форма добавления карточки

buttonOpenPopupAdd.addEventListener('click', () => openPopup(popupAdd))

buttonClosePopupAdd.addEventListener('click', () => closePopup(popupAdd))

function handleNewCardSubmit (evt) {
  evt.preventDefault();
  const cardData ={
      name: popupElementName.value,
      link: popupElementLink.value
    }
  const element = createCard(cardData);
  elements.prepend(element);
  popupAdd.querySelector('.popup__button').classList.add('popup__button_novalid');
  closePopup(popupAdd);
  popupAddCard.reset();
}

popupAdd.addEventListener('submit', handleNewCardSubmit);

buttonClosePopupView.addEventListener('click', () => closePopup(popupView))


//Валидация

enableValidation(validationSettings);
