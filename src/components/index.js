import '../pages/index.css'
import { createCard, clickLikeButton} from './card.js';
import { showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState,
  setEventListeners, enableValidation, hideErorrs } from './validate.js';
import {validationSettings, popups, buttonOpenPopupEdit, buttonOpenPopupAdd,
  userAvatarElement, userNameElement, userProfElement, popupAdd,
  popupElementName, popupElementLink, popupAddButton, buttonClosePopupAdd,
  popupAddCard, popupEdit, buttonClosePopupEdit, popupUsername, 
  popupProfession, popupView, buttonClosePopupView, popupViewImage,
  popupViewImageName, elementTemlate, elements, initialCards, popupEditButton,
  popupAvatar, buttonClosePopupAvatar, popupAvatarLink,
  popupAvatarButton, popupAvatarForm, buttonOpenPopupAvatar} from './utils.js';
import { openPopup, closePopup, escapeClosePopup, closePopupWithMouse, closePopupWithCross} from './modal.js';
import { getInitialCards, printError, getUserData, editProfile, postCard, editAvatarProfile, deleteCard} from './api.js';

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
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    renderUserData(userData);
    cards.forEach((card) => {
      elements.append(createCard(card, userId));
    });
  })
  .catch(printError);

//1. Работа модальных окон. Открытие и закрытие модального окна

closePopupWithCross();
closePopupWithMouse();

buttonOpenPopupEdit.addEventListener(
  'click',
  function () {
        hideErorrs(popupEdit);
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
  postCard(cardName, cardLink)
    .then(card => elements.prepend(createCard(card, userId)))
    .then(() => {
      popupAddCard.reset();
      popupAddButton.classList.add('popup__button_novalid');
      popupAddButton.disabled = true;
      closePopup(popupAdd);
    })
    .catch(printError)
    .finally(() => renderLoading(false, popupAddButton));
});



//Редактирование профиля
function handleformSubmitEdit (evt) {
  evt.preventDefault();
  renderLoading(true, popupEditButton);
  editProfile(popupUsername.value, popupProfession.value)
    .then(res => {
      renderUserData(res);
      disabledEditPopupButton(popupEditButton);
      closePopup(popupEdit);
    })
    .catch(printError)
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
  editAvatarProfile(avatarLink)
    .then(res => {      
      userAvatarElement.src = res.avatar;
      popupAvatarButton.classList.add('popup__button_novalid');
      popupAvatarButton.disabled = true;
      popupAvatarForm.reset();
      closePopup(popupAvatar);
    })
    .catch(printError)
    .finally(() => renderLoading(false, popupAvatarButton));
}

buttonOpenPopupAvatar.addEventListener('click', () => {
  hideErorrs(popupAvatar);
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

enableValidation(validationSettings);


//Улучшенный UX всех форм
export function renderLoading(isLoading, button) {
  if (button.name === 'create-card-button') {
    button.textContent = isLoading ? 'Сохранение...' : 'Создать'
  } else {
    button.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
  }
}