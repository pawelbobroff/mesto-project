import '../pages/index.css'
import {validationSettings, popups, buttonOpenPopupEdit, buttonOpenPopupAdd,
  userAvatarElement, userNameElement, userProfElement, popupAdd,
  popupElementName, popupElementLink, popupAddButton, buttonClosePopupAdd,
  popupAddCard, popupEdit, buttonClosePopupEdit, popupUsername, 
  popupProfession, popupView, buttonClosePopupView, popupViewImage,
  popupViewImageName, elementTemlate, elements, initialCards, popupEditButton,
  popupAvatar, buttonClosePopupAvatar, popupAvatarLink,
  popupAvatarButton, popupAvatarForm, buttonOpenPopupAvatar, config, formAdd, formAvatar, formEdit} from './utils.js';
import { openPopup, closePopup, escapeClosePopup, closePopupWithMouse, closePopupWithCross} from './modal.js';
import Api from './api.js';
import Card from './card.js';
import FormVaidator from './FormValidator.js';

const elementik = 'element';
//создаем экземпляр класса Api
export const api = new Api(config);
// export const card = new Card({
//     likes: [{
//       about: 'Исследователь океана96',
//       avatar: "https://bestprogrammer.ru/wp-content/uploads/2020/08/React.jpg",
//       cohort: 'plus-cohort-9',
//       name: 'gh6',
//       _id: '12b8ae712c461ad10ad8a065'
//     }],
//     name: 'rty',
//     link: 'https://bestprogrammer.ru/wp-content/uploads/2020/08/React.jpg',
//     owner: {
//       about: 'Исследователь океана96',
//       avatar: "https://bestprogrammer.ru/wp-content/uploads/2020/08/React.jpg",
//       cohort: 'plus-cohort-9',
//       name: 'gh6',
//       _id: '12b8ae712c461ad10ad8a065'
//     },
//     _id: '629cd069f2b1ce03034296bb'
//     }, 
//     'element');
// console.log(api.getInitialCards());
// console.log(api.getInitialCards()[5]);
// console.log(JSON.stringify(api.getInitialCards()[5]));
// console.log(card.generate());

//Обновляем данные пользователя
let user;
export function renderUserData(data) {
  user = data;
  userNameElement.textContent = data.name;
  userProfElement.textContent = data.about;
  userAvatarElement.src = data.avatar;
  userAvatarElement.alt = `Аватар ${data.name}`;
}

// Получаем и записываем данные с сервера
let userId;
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    renderUserData(userData);
    cards.forEach((card) => {
      const cardElement = new Card(card, userId, 'element');
      elements.append(cardElement.generate());
    });
  })
  .catch(api.printError());

//1. Работа модальных окон. Открытие и закрытие модального окна

closePopupWithCross();
closePopupWithMouse();

buttonOpenPopupEdit.addEventListener(
  'click',
  function () {
        FormVaidatorEditProfile.hideErorrs();
        popupUsername.value = userNameElement.textContent;
        popupProfession.value = userProfElement.textContent;
        openPopup(popupEdit);
  }
)


buttonOpenPopupAdd.addEventListener('click', () => openPopup(popupAdd));


//Добавление карточки
popupAdd.addEventListener('submit', function (evt){
  evt.preventDefault();
  renderLoading(true, popupAddButton);
  const cardName = popupElementName.value;
  const cardLink = popupElementLink.value;
  api.postCard(cardName, cardLink)
    .then(card => elements.prepend(new Card(card, userId, 'element')))
    .then(() => {
      popupAddCard.reset();
      popupAddButton.classList.add('popup__button_novalid');
      popupAddButton.disabled = true;
      closePopup(popupAdd);
    })
    .catch(api.printError())
    .finally(() => renderLoading(false, popupAddButton));
});



//Редактирование профиля
function handleformSubmitEdit (evt) {
  evt.preventDefault();
  renderLoading(true, popupEditButton);
  api.editProfile(popupUsername.value, popupProfession.value)
    .then(res => {
      renderUserData(res);
      disabledEditPopupButton(popupEditButton);
      closePopup(popupEdit);
    })
    .catch(api.printError())
    .finally(() => renderLoading(false, popupEditButton))  
}

popupEdit.addEventListener('submit', handleformSubmitEdit);

export function disabledEditPopupButton(disabledButton) {
  disabledButton.classList.add(validationSettings.inactiveButtonClass);
  disabledButton.disabled = true;
};

//Редактирование аватара


export function editAvatarImg() {
  const avatarLink = popupAvatarLink.value;
  renderLoading(true, popupAvatarButton);
  api.editAvatarProfile(avatarLink)
    .then(link => {
      userAvatarElement.src = link.avatar;
      popupAvatarButton.classList.add('popup__button_novalid');
      popupAvatarButton.disabled = true;
      popupAvatarForm.reset();
      closePopup(popupAvatar);
    })
    .catch(api.printError())
    .finally(() => renderLoading(false, popupAvatarButton));
}

buttonOpenPopupAvatar.addEventListener('click', () => {
  FormVaidatorEditAvatar.hideErorrs();
  openPopup(popupAvatar)
});


popupAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  editAvatarImg();
});


// 2. Создаем 6 карточек из коробки
// initialCards.forEach ( function (initialCard) {
//   const element = createCard(initialCard);
//   elements.prepend(element);
// });

//Валидация

// enableValidation(validationSettings);
const FormVaidatorAddCard = new FormVaidator(validationSettings, formAdd);
FormVaidatorAddCard.enableValidation();
const FormVaidatorEditProfile = new FormVaidator(validationSettings, formEdit);
FormVaidatorEditProfile.enableValidation();
const FormVaidatorEditAvatar = new FormVaidator(validationSettings, formAvatar);
FormVaidatorEditAvatar.enableValidation();


//Улучшенный UX всех форм
export function renderLoading(isLoading, button) {
  if (button.name === 'create-card-button') {
    button.textContent = isLoading ? 'Сохранение...' : 'Создать'
  } else {
    button.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
  }
}