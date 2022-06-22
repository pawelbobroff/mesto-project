import {api} from '../pages/index.js';

export default class Card {
  constructor({cardData, userId, handleDelClick, handleCardClick, handleLikeClick}, selector){
    this._cardData = cardData;
    this.cardId = cardData._id;
    this._selector = selector;
    this._userId = userId;
    this._handleDelClick = handleDelClick;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick =handleLikeClick

  }

  _getElement() {
    this._element = document
      .querySelector(`#${this._selector}`)
      .content
      .querySelector('.element')
      .cloneNode(true);
    
    return this._element;
  }
  clickButtonLike(data){
    this._cardData.likes = data.likes;
    this._element.querySelector(".element__like-counter").textContent = data.likes.length;
    if (this.isLikedCard()){
      this._element.querySelector(".element__like").classList.add("element__like_liked")
    } else {
      this._element.querySelector(".element__like").classList.remove("element__like_liked")
    }
  }

  deleteCard(){
    this._element.remove();
    this._element = null;
  }

  isLikedCard() {
    return Boolean(
      this._cardData.likes.find((item) => {
        return item._id === this._userId;
      })
    );
  }

  _checkOwnerRemoveButtonDel(){
    if (this._userId === this._cardData.owner._id) {
      this._element.querySelector(".element__delete").style.display = "block";
    }
  }

  _setEventListeners(){    
    this._element.querySelector('.element__image').addEventListener('click',     
      this.handleCardClick(this._cardData)
    )

    this._element.querySelector(".element__delete").addEventListener('click', () => {
      this.handleDelClick(this)
    })

    this._element.querySelector(".element__like").addEventListener('click', () => {
      this.clickButtonLike(this)
    })
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    const elementImage = this._element.querySelector('.element__image');
      elementImage.src = this._cardData.link;
      elementImage.alt = this._cardData.name;
    this._element.querySelector('.element__name').textContent = this._cardData.name;
    this._element.querySelector('.element__like-counter').textContent = this._cardData.likes.length;
    this._checkOwnerRemoveButtonDel();
    this.clickButtonLike ( this._cardData );
    return this._element;
  }
};