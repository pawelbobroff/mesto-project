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
    this._elementLikeCount.textContent = this._cardData.likes.length;
    if (this.isLikedCard()){
      this._elementButtonLike.classList.add("element__like_liked")
    } else {
      this._elementButtonLike.classList.remove("element__like_liked")
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
      this._elementButtonDel.style.display = "block";
    }
  }

  _setEventListeners(){    
    this._elementImage.addEventListener('click', () => { 
      this._handleCardClick(this._cardData);
      
    });

    this._elementButtonDel.addEventListener('click', () => {
      this._handleDelClick(this._cardData)
    });

    this._elementButtonLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardData)
    })
  }

  generate() {
    this._element = this._getElement();

    // this._elementImage = this._element.querySelector('.element__image');
    this._elementButtonDel = this._element.querySelector('.element__delete');
    this._elementButtonLike = this._element.querySelector('.element__like');
    this._elementLikeCount = this._element.querySelector('.element__like-counter');


    
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._cardData.link;
    this._elementImage.alt = this._cardData.name;
    
    this._element.querySelector('.element__name').textContent = this._cardData.name;
    this._elementLikeCount.textContent = this._cardData.likes.length;
    this._checkOwnerRemoveButtonDel();
    this.clickButtonLike(this._cardData);
    this._setEventListeners();
    
    return this._element;
  }
};