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
const elementTemlate=document.querySelector('#element').content;
const elements=document.querySelector('.elements');
const popupView = document.querySelector('.popup_type_picture');
const buttonClosePopupView = popupView.querySelector('.button_theme_close');


//1. Работа модальных окон. Открытие и закрытие модального окна


const openPopup = function (popup) {
  popup.classList.remove('popup_unvisible')
}
  
const closePopup = function (popup) {
  popup.classList.add('popup_unvisible')
}

buttonOpenPopupEdit.addEventListener(
  'click',
  function (evt) {
        popupUsername.value = userNameElement.textContent
        console.log(username)
        popupProfession.value = userProfElement.textContent
        openPopup(popupEdit)
  }
)

buttonClosePopupEdit.addEventListener('click', () => closePopup(popupEdit))

function handleformSubmitEdit (evt) {
  evt.preventDefault();    
  document.querySelector('.profile__name').textContent = popupUsername.value;
  document.querySelector('.profile__proffession').textContent = popupProfession.value;
  closePopup(popupEdit);  
}

popupEdit.addEventListener('submit', handleformSubmitEdit); 

//2. Шесть карточек «из коробки» 

// создать template-элемент в html разметке

function addCard (cardData) {
  const element = elementTemlate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = cardData.link;
  element.querySelector('.element__image').alt = cardData.name;
  element.querySelector('.element__name').textContent = cardData.name;
  element.querySelector('.element__like').addEventListener('click',
    () => element.querySelector('.element__like').classList.toggle('element__like_liked'));
  element.querySelector('.element__delete').addEventListener('click',
    () => element.querySelector('.element__delete').closest("article").remove());
  element.querySelector('.element__image').addEventListener('click',
    function (evt) {
      popupView.querySelector('.popup__image').src = cardData.link;
      popupView.querySelector('.popup__image').alt = cardData.name;
      popupView.querySelector('.popup__name-image').textContent = cardData.name;       
      openPopup(popupView)
    }
  )
  return element;
}

initialCards.forEach ( function (initialCard) {
  element = addCard(initialCard);
  elements.prepend(element);
} 
);

//3 and 4 Форма добавления карточки

buttonOpenPopupAdd.addEventListener('click', () => openPopup(popupAdd))

buttonClosePopupAdd.addEventListener('click', () => closePopup(popupAdd))

function handleNewCardSubmit (evt) {
  evt.preventDefault();
  const cardData ={
      name: popupElementName.value,
      link: popupElementLink.value
    }
  element = addCard(cardData);
  elements.prepend(element);
  closePopup(popupAdd);
  popupAdd.querySelector('.popup__form-add-card').reset();
}

popupAdd.addEventListener('submit', handleNewCardSubmit);

buttonClosePopupView.addEventListener('click', () => closePopup(popupView))