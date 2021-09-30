const buttonOpenPopup = document.querySelector('.button_theme_edit'); 
const popupEdit = document.getElementById('popup-edit'); 
const buttonClosePopup = popupEdit.querySelector('.button_theme_close'); 
const popupUsername = popupEdit.querySelector('#username');
const popupProfession = popupEdit.querySelector('#profession'); 
let username = document.querySelector('.profile__name').textContent;
let profession = document.querySelector('.profile__proffession').textContent;

const buttonOpenPopupAdd = document.querySelector('.button_theme_add');
const popupAdd = document.getElementById('popup-add');
const buttonClosePopupAdd = popupAdd.querySelector('.button_theme_close');
const popupElementName = popupAdd.querySelector('#elementName');
const popupElementLink = popupAdd.querySelector('#elementLink');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elementTemlate=document.querySelector('#element').content;
const elements=document.querySelector('.elements');




//1. Работа модальных окон. Открытие и закрытие модального окна


const popupOpen = function (popup) {
  popup.classList.remove('popup_unvisible')
}
  
const popupClose = function (popup) {
  popup.classList.add('popup_unvisible')
}

buttonOpenPopup.addEventListener(
  'click',
  function (evt) {
        popupUsername.placeholder = username
        popupProfession.placeholder = profession
        popupOpen(popupEdit)
  }
)

buttonClosePopup.addEventListener('click', function () {
    popupClose(popupEdit)
})

function formSubmitHandlerEdit (evt) {
  evt.preventDefault();    
  document.querySelector('.profile__name').textContent = popupUsername.value;
  document.querySelector('.profile__proffession').textContent = popupProfession.value;
  popupClose(popupEdit);    
}

popupEdit.addEventListener('submit', formSubmitHandlerEdit); 

//2. Шесть карточек «из коробки» 

// создать template-элемент в html разметке

for (i = 0; i < initialCards.length; i = i + 1){
  let element = elementTemlate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = initialCards[i].link;
  element.querySelector('.element__image').alt = initialCards[i].name;
  element.querySelector('.element__name').textContent = initialCards[i].name;
  elements.prepend(element);
};

//3 and 4 Форма добавления карточки

buttonOpenPopupAdd.addEventListener(
  'click',
  function (evt) {
        popupOpen(popupAdd)
  }
)

buttonClosePopupAdd.addEventListener('click', function () {
  popupClose(popupAdd)
})

function formSubmitHandlerAdd (evt) {
  evt.preventDefault();    
  let element = elementTemlate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = popupElementLink.value;
  element.querySelector('.element__image').alt = popupElementName.value;
  element.querySelector('.element__name').textContent = popupElementName.value;
  elements.prepend(element);
  popupClose(popupAdd);    
}

popupAdd.addEventListener('submit', formSubmitHandlerAdd);

//5. Лайк карточки

let buttonsLike = document.querySelectorAll('.element__like');

for (let buttonLike of buttonsLike) {
  buttonLike.addEventListener(
    'click',
    function (evt) {
          buttonLike.classList.toggle('element__like_liked')
    }
  )
}

//6. Удаление карточки

let buttonsDelete = document.querySelectorAll('.element__delete');

for (let buttonDelete of buttonsDelete) {
  buttonDelete.addEventListener(
    'click',
    function (evt) {
          buttonDelete.parentElement.remove();
    }
  )
}

//7. Открытие попапа с картинкой

const popupView = document.getElementById('popup-view');
const picturesOpenPopup = document.querySelectorAll('.element__image');
const buttonClosePopupView = popupView.querySelector('.button_theme_close'); 

for (let pictureOpenPopup of picturesOpenPopup){
  pictureOpenPopup.addEventListener(
    'click',
    function (evt) {
      popupView.querySelector('.popup__image').src = pictureOpenPopup.parentElement.querySelector('.element__image').src
      popupView.querySelector('.popup__image').alt = pictureOpenPopup.parentElement.querySelector('.element__name').textContent;
      popupView.querySelector('.popup__name-image').textContent = pictureOpenPopup.parentElement.querySelector('.element__name').textContent;       
      popupOpen(popupView)
    }
  )
}

buttonClosePopupView.addEventListener('click', function () {
  popupClose(popupView)
})
