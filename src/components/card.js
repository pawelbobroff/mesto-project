import {popupViewImage, popupViewImageName} from './utils.js';

import { openPopup } from './modal.js';

import {api} from './index.js';

//2. Шесть карточек «из коробки» 

// создать template-элемент в html разметке

// export function createCard (cardData) {
//   const element = elementTemlate.querySelector('.element').cloneNode(true);
//   const elementImage = element.querySelector('.element__image');
//   const elementButtonDel = element.querySelector('.element__delete');
//   const elementButtonLike = element.querySelector('.element__like');
//   elementImage.src = cardData.link;
//   elementImage.alt = cardData.name;
//   element.querySelector('.element__name').textContent = cardData.name;
//   elementButtonLike.addEventListener('click',
//     () => elementButtonLike.classList.toggle('element__like_liked'));
//   elementButtonDel.addEventListener('click',
//     () => elementButtonDel.closest("article").remove());
//   elementImage.addEventListener('click',
//     function (evt) {
//       popupViewImage.src = cardData.link;
//       popupViewImage.alt = cardData.name;
//       popupViewImageName.textContent = cardData.name;       
//       openPopup(popupView)
//     }
//   )
//   return element;
// }

//Добавление карточки
// function createCard (cardData, userId) {
//   const { likes, name, link, cardId, owner } = cardData;
//   const element = elementTemlate.querySelector('.element').cloneNode(true);
//   const elementName = element.querySelector('.element__name');
//   const elementImage = element.querySelector('.element__image');
//   const elementButtonDel = element.querySelector('.element__delete');
//   const elementButtonLike = element.querySelector('.element__like');
//   const elementLikeCount = element.querySelector('.element__like-counter');

//   elementName.textContent = name;
//   elementImage.src = link;
//   elementImage.alt = name;
//   elementLikeCount.textContent = likes.length;
  
//   elementButtonLike.addEventListener('click',
//     (evt) => {clickLikeButton(elementButtonLike, elementLikeCount, cardData._id)});
  
//   elementButtonDel.addEventListener('click', function () {
//     api.deleteCard(cardData._id)
//       .then(() => {
//         const cardItem = elementButtonDel.closest('.element');
//         cardItem.remove();
//       })
//       .catch(api.printError())
//   });

//   if (cardData.likes.some(item => item._id === userId)) {

//     elementButtonLike.classList.add('element__like_liked');
//   }

//   if (cardData.owner._id !== userId) {
//     elementButtonDel.remove();
//   }

//   elementImage.addEventListener('click',
//     function (evt) {
//       popupViewImage.src = link;
//       popupViewImage.alt = name;
//       popupViewImageName.textContent = name;       
//       openPopup(popupView)
//     }
//   )
//   return element;
// }

// export function handleNewCardSubmit (evt) {
//   evt.preventDefault();
//   const cardData ={
//       name: popupElementName.value,
//       link: popupElementLink.value
//     }
//   element = createCard(cardData);
//   elements.prepend(element);
//   popupAddButton.classList.add('popup__button_novalid');
//   popupAddButton.disabled = true;
//   closePopup(popupAdd);
//   popupAddCard.reset();
// }

// function clickLikeButton(elementButtonLike, elementLikeCount, cardId) {
//   if (elementButtonLike.classList.contains('element__like_liked')) {
//     api.deleteLike(cardId)
//       .then(res => {
//         elementLikeCount.textContent = res.likes.length;
//         elementButtonLike.classList.remove('element__like_liked');
//       })
//       .catch(err => console.error(err))
//   } else {
//     api.addLike(cardId)
//       .then(res => {
//         elementLikeCount.textContent = res.likes.length;
//         elementButtonLike.classList.add('element__like_liked');
//       })
//       .catch(err => console.error(err))
//   }
// };

export default class Card {
  constructor(cardData, userId, selector){
    this._cardData = cardData;
    this._likes = cardData.likes;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData.cardId;
    this._owner = cardData.owner;
    this.__id = cardData._id;
    this._selector = selector;
    this._userId = userId  
  }

  _getElement() {
    this._element = document
      .querySelector(`#${this._selector}`)
      .content
      .querySelector('.element')
      .cloneNode(true);
    
    return this._element;
  }
  _clickButtonLike(){
    if (this._elementButtonLike.classList.contains('element__like_liked')) {
      api.deleteLike(this.__id)
        .then(res => {
          this._elementLikeCount.textContent = res.likes.length;
          this._elementButtonLike.classList.remove('element__like_liked');
        })
        .catch(err => console.error(err))
    } else {
      api.addLike(this.__id)
        .then(res => {
          this._elementLikeCount.textContent = res.likes.length;
          this._elementButtonLike.classList.add('element__like_liked');
        })
        .catch(err => console.error(err))
    }
  }

  _setEventListenersButtonLike(){
    this._elementButtonLike.addEventListener('click', () => {
      this._clickButtonLike()
    })
  }
  _setEventListenerButtonDel(){
    this._elementButtonDel.addEventListener('click', () => {
      api.deleteCard(this.__id)
      .then(() => {
        const cardItem = this._elementButtonDel.closest('.element');
        cardItem.remove();
      })
      .catch(printError)
    })
  }
  _markButtonLike(){
    if (this._likes.some(item => item._id === this._userId)) {
      this._elementButtonLike.classList.add('element__like_liked');
    }
  }
  _checkOwnerRemoveButtonDel(){
    if (this._owner._id !== this._userId) {
      this._elementButtonDel.remove();
    }
  }
  _addImageListener(){
    this._elementImage.addEventListener('click',
      function (evt) {
        popupViewImage.src = this._link;
        popupViewImage.alt = this._name;
        popupViewImageName.textContent = this._name;       
        openPopup(popupView)
      }
    )
  }
  generate() {
    this._getElement();
    this._elementName = this._element.querySelector('.element__name');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementButtonDel = this._element.querySelector('.element__delete');
    this._elementButtonLike = this._element.querySelector('.element__like');
    this._elementLikeCount = this._element.querySelector('.element__like-counter');
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLikeCount.textContent = this._likes.length;
    
    this._setEventListenersButtonLike();
    this._setEventListenerButtonDel();
    this._markButtonLike();
    this._checkOwnerRemoveButtonDel();
    this._addImageListener()


    return this._element;
  }
}