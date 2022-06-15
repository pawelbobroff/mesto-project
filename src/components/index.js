import '../pages/index.css'
import {validationSettings, buttonOpenPopupEdit, buttonOpenPopupAdd, popupAdd,
  popupElementName, popupElementLink, popupAddButton,
  popupEdit, popupUsername, 
  popupProfession, elements, popupEditButton, popupAvatarLink,
  popupAvatarButton, popupAvatarForm, buttonOpenPopupAvatar, config, formAdd, formAvatar, formEdit} from './utils.js';
import Api from './Api.js';
import Card from './Card.js';
import FormVaidator from './FormValidator.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';


//создаем экземпляр класса Api
export const api = new Api(config);

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
        const card = new Card(item, userId, 'element');  
        return card.generate()
      }
    }, '.elements');
    section.addItems();
  })
  .catch((err) => {console.log(err)});



//1. Работа модальных окон. Открытие и закрытие модального окна

const popupAvatar = new PopupWithForm ({
  popupSelector: '.popup_type_avatar-edit',
  colbackSubmit: (item) => {
    renderLoading(true, popup_type_avatar-edit);
    api.setUserAvatar(item)
      .then((data) => {
        userInfo.setUserAvatar(data);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(()=> {
        renderLoading(false, popup_type_avatar-edit);
      })
  }
});

popupAvatar.setEventListeners();

buttonOpenPopupAvatar.addEventListener('click', () => {
  // FormVaidatorEditAvatar.hideErorrs();
  popupAvatar.open();
 });


// closePopupWithCross();
// closePopupWithMouse();

// buttonOpenPopupEdit.addEventListener(
//   'click',
//   function () {
//         FormVaidatorEditProfile.hideErorrs();
//         popupUsername.value = userNameElement.textContent;
//         popupProfession.value = userProfElement.textContent;
//         openPopup(popupEdit);
//   }
// )


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



//Редактирование профиля
// function handleformSubmitEdit (evt) {
//   evt.preventDefault();
//   renderLoading(true, popupEditButton);
//   api.editProfile(popupUsername.value, popupProfession.value)
//     .then(res => {
//       renderUserData(res);
//       disabledEditPopupButton(popupEditButton);
//       closePopup(popupEdit);
//     })
//     .catch(api.printError())
//     .finally(() => renderLoading(false, popupEditButton))  
// }

// popupEdit.addEventListener('submit', handleformSubmitEdit);

// export function disabledEditPopupButton(disabledButton) {
//   disabledButton.classList.add(validationSettings.inactiveButtonClass);
//   disabledButton.disabled = true;
// };

//Редактирование аватара


// export function editAvatarImg() {
//   const avatarLink = popupAvatarLink.value;
//   renderLoading(true, popupAvatarButton);
//   api.editAvatarProfile(avatarLink)
//     .then(link => {
//       userAvatarElement.src = link.avatar;
//       popupAvatarButton.classList.add('popup__button_novalid');
//       popupAvatarButton.disabled = true;
//       popupAvatarForm.reset();
//       closePopup(popupAvatar);
//     })
//     .catch(api.printError())
//     .finally(() => renderLoading(false, popupAvatarButton));
// }

// buttonOpenPopupAvatar.addEventListener('click', () => {
//   FormVaidatorEditAvatar.hideErorrs();
//   openPopup(popupAvatar)
// });


// popupAvatar.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   editAvatarImg();
// });




//Валидация

const FormVaidatorAddCard = new FormVaidator(validationSettings, formAdd);
FormVaidatorAddCard.enableValidation();
const FormVaidatorEditProfile = new FormVaidator(validationSettings, formEdit);
FormVaidatorEditProfile.enableValidation();
const FormVaidatorEditAvatar = new FormVaidator(validationSettings, formAvatar);
FormVaidatorEditAvatar.enableValidation();


//Улучшенный UX всех форм
export function renderLoading(isLoading, popup) {
  const popupButton = document.querySelector(`.${popup} .popup__button`)
  if (button.name === 'create-card-button') {
    button.textContent = isLoading ? 'Сохранение...' : 'Создать'
  } else {
    button.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
  }
}