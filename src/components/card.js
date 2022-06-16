import {popupViewImage, popupViewImageName} from './utils.js';

import { openPopup } from './modal.js';

import {api} from './index.js';

export default class Card {
  constructor(cardData, userId, selector, likes, {clickButtonLike}){
    this._cardData = cardData;
    this._like = likes;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData.cardId;
    this._owner = cardData.owner;
    this.id = cardData._id;
    this._selector = selector;
    this._userId = userId;
    this._clickLikeButton = clickButtonLike;
    const haveMyLike = false; 
  }

  _getElement() {
    this._element = document
      .querySelector(`#${this._selector}`)
      .content
      .querySelector('.element')
      .cloneNode(true);
    
    return this._element;
  }
  clickButtonLike(res){
    if (this._elementButtonLike.classList.contains('element__like_liked')) {
      
        
          this._elementLikeCount.textContent = res.likes.length;
          this._elementButtonLike.classList.remove('element__like_liked');
        
    } else {
      
        
          this._elementLikeCount.textContent = res.likes.length;
          this._elementButtonLike.classList.add('element__like_liked');
        
        
    }
  }

  _setEventListenersButtonLike(){
    this.elementButtonLike.addEventListener('click', () => {
      console.log(this._clickLikeButton);
    })
  }
  // _setEventListenerButtonDel(){
  //   this._elementButtonDel.addEventListener('click', () => {
  //     api.deleteCard(this.__id)
  //       .then(() => {
  //         const cardItem = this._elementButtonDel.closest('.element');
  //         cardItem.remove();
  //       })
  //       .catch(printError)
  //   })
  // }
  // _markButtonLike(){
  //   if (this._likes.some(item => item._id === this._userId)) {
      
  //     this.elementButtonLike.classList.add('element__like_liked');
  //     return haveMyLike = true;
  //   }
  // }
  _checkOwnerRemoveButtonDel(buttonDel){
    if (this._owner._id !== this._userId) {
      buttonDel.remove();
    }
  }
  // _addImageListener(){
  //   this._elementImage.addEventListener('click',
  //     function (evt) {
  //       popupViewImage.src = this._link;                    //Должно быть исправлено
  //       popupViewImage.alt = this._name;                    //Должно быть исправлено        
  //       popupViewImageName.textContent = this._name;        //Должно быть исправлено
  //       openPopup(popupView)
  //     }
  //   )
  // }

  _addLike() {
    this._likeButton.classList.add('element__like_liked');
  }
  _removeLike() {
    this._likeButton.classList.remove('element__like_liked');
  }
  

  isLiked() {
    const hasLike = this._like.find(user => user._id === this._userId);
    return hasLike;
  }

  
  setLikes(newLikes) {
    this._like = newLikes;
    this._likeCount.textContent = this._like.length;

    if (this.isLiked()) {
      this._addLike();
    }
    else {
      this._removeLike();
    }
  }


  generate() {
    this._getElement();
    this._elementName = this._element.querySelector('.element__name');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementButtonDel = this._element.querySelector('.element__delete');
    this._checkOwnerRemoveButtonDel(this._elementButtonDel);
    this.elementButtonLike = this._element.querySelector('.element__like');
    // this._markButtonLike();
    this.elementLikeCount = this._element.querySelector('.element__like-counter');
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this.elementLikeCount.textContent = this._likes.length;    
    this._setEventListenersButtonLike();
    // this._setEventListenerButtonDel();
    // this._addImageListener();
        
    return this._element;
  }
}