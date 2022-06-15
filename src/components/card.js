// import {popupViewImage, popupViewImageName} from './utils.js';

// import { openPopup } from './modal.js';

// import {api} from './index.js';

// export default class Card {
//   constructor(cardData, userId, selector){
//     this._cardData = cardData;
//     this._likes = cardData.likes;
//     this._name = cardData.name;
//     this._link = cardData.link;
//     this._cardId = cardData.cardId;
//     this._owner = cardData.owner;
//     this.__id = cardData._id;
//     this._selector = selector;
//     this._userId = userId  
//   }

//   _getElement() {
//     this._element = document
//       .querySelector(`#${this._selector}`)
//       .content
//       .querySelector('.element')
//       .cloneNode(true);
    
//     return this._element;
//   }
//   _clickButtonLike(){
//     if (this._elementButtonLike.classList.contains('element__like_liked')) {
//       api.deleteLike(this.__id)
//         .then(res => {
//           this._elementLikeCount.textContent = res.likes.length;
//           this._elementButtonLike.classList.remove('element__like_liked');
//         })
//         .catch(err => console.error(err))
//     } else {
//       api.addLike(this.__id)
//         .then(res => {
//           this._elementLikeCount.textContent = res.likes.length;
//           this._elementButtonLike.classList.add('element__like_liked');
//         })
//         .catch(err => console.error(err))
//     }
//   }

//   _setEventListenersButtonLike(){
//     this._elementButtonLike.addEventListener('click', () => {
//       this._clickButtonLike()
//     })
//   }
//   _setEventListenerButtonDel(){
//     this._elementButtonDel.addEventListener('click', () => {
//       api.deleteCard(this.__id)
//         .then(() => {
//           const cardItem = this._elementButtonDel.closest('.element');
//           cardItem.remove();
//         })
//         .catch(printError)
//     })
//   }
//   _markButtonLike(){
//     if (this._likes.some(item => item._id === this._userId)) {
//       this._elementButtonLike.classList.add('element__like_liked');
//     }
//   }
//   _checkOwnerRemoveButtonDel(){
//     if (this._owner._id !== this._userId) {
//       this._elementButtonDel.remove();
//     }
//   }
//   _addImageListener(){
//     this._elementImage.addEventListener('click',
//       function (evt) {
//         popupViewImage.src = this._link;                    //Должно быть исправлено
//         popupViewImage.alt = this._name;                    //Должно быть исправлено        
//         popupViewImageName.textContent = this._name;        //Должно быть исправлено
//         openPopup(popupView)
//       }
//     )
//   }
//   generate() {
//     this._getElement();
//     this._elementName = this._element.querySelector('.element__name');
//     this._elementImage = this._element.querySelector('.element__image');
//     this._elementButtonDel = this._element.querySelector('.element__delete');
//     this._elementButtonLike = this._element.querySelector('.element__like');
//     this._elementLikeCount = this._element.querySelector('.element__like-counter');
//     this._elementName.textContent = this._name;
//     this._elementImage.src = this._link;
//     this._elementImage.alt = this._name;
//     this._elementLikeCount.textContent = this._likes.length;    
//     this._setEventListenersButtonLike();
//     this._setEventListenerButtonDel();
//     this._markButtonLike();
//     this._checkOwnerRemoveButtonDel();
//     this._addImageListener()
//     return this._element;
//   }
// }