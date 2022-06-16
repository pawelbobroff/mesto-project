import '../pages/index.css'
import {validationSettings, buttonOpenPopupEdit, buttonOpenPopupAdd, 
  popupElementName, popupElementLink,
   buttonOpenPopupAvatar, formAdd, formAvatar,
   formEdit} from './utils.js';
import Api from './Api.js';
import Card from './Card.js';
import FormVaidator from './FormValidator.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Popup from './Popup';


//создаем экземпляр класса Api
export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
      authorization: '51635047-90c2-46fc-abfe-190701a5705f',
      'Content-Type': 'application/json',
  }
});

//создаем экземпляр класса UserInfo

const userInfo = new UserInfo({userNameSelector: '.profile__name',
  userAboutSelector: '.profile__proffession',
  userAvatarSelector: '.profile__avatarImg'});

// Получаем и записываем данные с сервера
let userId;
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData._id;
    const section = new Section({
      items: cards,
      renderer: (item) => {
        const card = new Card(item, userId, 'element',
          clickButtonLikeWithServer(card, userId));  
        return card.generate()
      }
    }, '.elements');
    section.addItems();
  })
  .catch((err) => {console.log(err)});

//1. Работа модальных окон. Открытие и закрытие модального окна

const popupAvatar = new PopupWithForm ({
  popupSelector: '.popup_type_avatar-edit',
  colbackSubmit: 
  (item) => {
    renderLoading(true, '.popup_type_avatar-edit');
    console.log(item);
    api.editAvatarProfile(item.avatar)
      .then((data) => {
        userInfo.setUserAvatar(data);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(()=> {
        renderLoading(false, '.popup_type_avatar-edit');
      })
  }
});

popupAvatar.setEventListeners();

buttonOpenPopupAvatar.addEventListener('click', () => {
  FormVaidatorEditAvatar.hideErorrs();
  popupAvatar.open();
 });

const editProfile = new PopupWithForm ({
  popupSelector: '.popup_type_profile',
  colbackSubmit: (item) => {
    console.log(item);
    renderLoading(true, '.popup_type_profile');
    api.editProfile(item)
      .then((data)=> {
        userInfo.setUserInfo(data);
        editProfile.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(()=> {
        renderLoading(false, '.popup_type_profile');
      })

  }
})

editProfile.setEventListeners();
buttonOpenPopupEdit.addEventListener('click', () => {
  FormVaidatorEditProfile.hideErorrs();
  editProfile.open();
});


// //создаем экземпляр класса Section
// const createCards = new Section({
//   renderer: (item) => {
//     rendererCard(item, userId, createCard);
//   },
// }, '.elements');

// //Функция отрисовки карточки

// function rendererCard (data, userId, createCard) {
//   const card = new Card(
//     data,
//    '.photo-template',
//    userId,
//    handleCardClick,{
//      handleDeleteClick: () => handleDeleteClick(card),
//      handleLikeClick: () => handleLikeClick(card, data) });
 
//   const cardElement = card.generateCard();
 
//   createCard.addItem(cardElement);
//   //return cardElement;
//  };






//buttonOpenPopupAdd.addEventListener('click', () => openPopup(popupAdd));


//Добавление карточки

// popupAdd.addEventListener('submit', function (evt){
//   evt.preventDefault();
//   renderLoading(true, popupAddButton);
//   const cardName = popupElementName.value;
//   const cardLink = popupElementLink.value;
//   api.postCard(cardName, cardLink)
//     .then(card => elements.prepend(new Card(card, userId, '.element')))
//     .then(() => {
//       popupAddCard.reset();
//       popupAddButton.classList.add('popup__button_novalid');
//       popupAddButton.disabled = true;
//       closePopup(popupAdd);
//     })
//     .catch(api.printError())
//     .finally(() => renderLoading(false, popupAddButton));
// });

// const popupAddCard = new PopupWithForm({
//   selector: '.popup__form-add-card',
//   handleformSubmitEdit: (item) => {
//     renderLoading(true, popupAddButton);

//   }

// })

//Функция клика на лайк
function clickButtonLikeWithServer(card, userId) {
  if (card.haveMyLike) {
    api.deleteLike(userId)
      .then(res)
      .catch(err => console.error(err))
  } else {
    api.addLike(userId)
      .then(res)
      .catch(err => console.error(err))
  }
}








//Валидация

// const FormVaidatorAddCard = new FormVaidator(validationSettings, formAdd);
// FormVaidatorAddCard.enableValidation();
const FormVaidatorEditProfile = new FormVaidator(validationSettings, formEdit);
FormVaidatorEditProfile.enableValidation();
const FormVaidatorEditAvatar = new FormVaidator(validationSettings, formAvatar);
FormVaidatorEditAvatar.enableValidation();


//Улучшенный UX всех форм
export function renderLoading(isLoading, popup) {
  const popupButton = document.querySelector(`${popup} .popup__button`)
  if (popupButton.name === 'create-card-button') {
    popupButton.textContent = isLoading ? 'Сохранение...' : 'Создать'
  } else {
    popupButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
  }
}