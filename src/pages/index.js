import '../pages/index.css'
import {validationSettings, buttonOpenPopupEdit, buttonOpenPopupAdd,
   buttonOpenPopupAvatar, formAdd, formAvatar,
   formEdit} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormVaidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';


//создаем экземпляр класса Api
export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
      authorization: '51635047-90c2-46fc-abfe-190701a5705f',
      'Content-Type': 'application/json',
  }
});

//создаем экземпляр класса UserInfo
const popupForImage = document.querySelector('.popup_type_picture');
 const imagePopup = new PopupWithImage ('.popup_type_picture')

const userInfo = new UserInfo({userNameSelector: '.profile__name',
  userAboutSelector: '.profile__proffession',
  userAvatarSelector: '.profile__avatarImg'});

// Функция создания карточек
const createCard = (data) => {
  const card = new Card({ cardData: data,
    userId: userIdFromServer,
    handleDelClick: (card) => {
      api.deleteCard()
    }, handleCardClick, handleLikeClick

  }, "element")
}
 

//Создаем экземпляр класса Section
const section = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    section.addItems(cardElement)
  }
}, '.elements');



// Получаем и записываем данные с сервера
let userIdFromServer;
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userIdFromServer = userData._id;    
    section.addItems(cards);
  })
  .catch((err) => {console.log(err)});


//Попап аватара

const popupAvatar = new PopupWithForm ({
  popupSelector: '.popup_type_avatar-edit',
  colbackSubmit: 
  (item) => {
    renderLoading(true, '.popup_type_avatar-edit');
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

buttonOpenPopupAvatar.addEventListener('click', () => {
  formVaidatorEditAvatar.hideErorrs();
  popupAvatar.open();
 });

popupAvatar.setEventListeners();

// Попап редактирования профиля

const editProfile = new PopupWithForm ({
  popupSelector: '.popup_type_profile',
  colbackSubmit: (item) => {
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

buttonOpenPopupEdit.addEventListener('click', () => {
  formVaidatorEditProfile.hideErorrs();
  editProfile.open();
});
editProfile.setEventListeners();

// Попап добавления карточки

const addCardProfile = new PopupWithForm ({
  popupSelector: '.popup_type_card-add',
  colbackSubmit: (item) => {
    renderLoading(true, '.popup_type_card-add');
    api.postCard(item)
      .then((data)=> {
        console.log(data);        
        const cardData = data;
        section.prependItem(cardData);
        addCardProfile.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(()=> {
        renderLoading(false, '.popup_type_card-add');
      })
  }
})

buttonOpenPopupAdd.addEventListener('click', () => {
  formVaidatorAddCard.hideErorrs();
  addCardProfile.open();
});
addCardProfile.setEventListeners();

imagePopup.setEventListeners();

//Валидация

const formVaidatorAddCard = new FormVaidator(validationSettings, formAdd);
formVaidatorAddCard.enableValidation();
const formVaidatorEditProfile = new FormVaidator(validationSettings, formEdit);
formVaidatorEditProfile.enableValidation();
const formVaidatorEditAvatar = new FormVaidator(validationSettings, formAvatar);
formVaidatorEditAvatar.enableValidation();


//Улучшенный UX всех форм
export function renderLoading(isLoading, popup) {
  const popupButton = document.querySelector(`${popup} .popup__button`)
  if (popupButton.name === 'create-card-button') {
    popupButton.textContent = isLoading ? 'Сохранение...' : 'Создать'
  } else {
    popupButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
  }
}