import {validationSettings, popupaddLikes, buttonOpenPopupEdit, buttonOpenPopupAdd,
  userAvatarElement, userNameElement, userProfElement, popupAdd,
  popupElementName, popupElementLink, popupAddButton, buttonClosePopupAdd,
  popupAddCard, popupEdit, buttonClosePopupEdit, popupUsername, 
  popupProfession, popupView, buttonClosePopupView, popupViewImage,
  popupViewImageName, elementTemlate, elements, initialCards} from './utils.js';

import { openPopup } from './modal.js';
import { deleteCard, printError, addLike, deleteLike } from './api';

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
export function createCard (cardData, userId) {
  const { likes, name, link, isLiked, cardId, owner } = cardData;
  const element = elementTemlate.querySelector('.element').cloneNode(true);
  const elementName = element.querySelector('.element__name');
  const elementImage = element.querySelector('.element__image');
  const elementButtonDel = element.querySelector('.element__delete');
  const elementButtonLike = element.querySelector('.element__like');
  const elementLikeCount = element.querySelector('.element__like-counter');

  elementName.textContent = name;
  elementImage.src = link;
  elementImage.alt = name;
  elementLikeCount.textContent = likes.length;
  
  elementButtonLike.addEventListener('click',
    (evt) => {clickLikeButton(elementButtonLike, elementLikeCount, cardData._id)});
  
  elementButtonDel.addEventListener('click', function () {
    deleteCard(cardData._id)
      .then(() => {
        const cardItem = elementButtonDel.closest('.element');
        cardItem.remove();
      })
      .catch(printError)
  });

  if (cardData.likes.some(item => item._id === userId)) {

    elementButtonLike.classList.add('element__like_liked');
  }

  if (cardData.owner._id !== userId) {
    elementButtonDel.remove();
  }

  elementImage.addEventListener('click',
    function (evt) {
      popupViewImage.src = link;
      popupViewImage.alt = name;
      popupViewImageName.textContent = name;       
      openPopup(popupView)
    }
  )
  return element;
}

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

export function clickLikeButton(elementButtonLike, elementLikeCount, cardId) {
  if (elementButtonLike.classList.contains('element__like_liked')) {
    deleteLike(cardId)
      .then(res => {
        elementLikeCount.textContent = res.likes.length;
        elementButtonLike.classList.remove('element__like_liked');
      })
      .catch(err => console.error(err))
  } else {
    addLike(cardId)
      .then(res => {
        elementLikeCount.textContent = res.likes.length;
        elementButtonLike.classList.add('element__like_liked');
      })
      .catch(err => console.error(err))
  }
};