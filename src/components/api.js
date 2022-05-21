import {validationSettings, popups, buttonOpenPopupEdit, buttonOpenPopupAdd,
    userAvatarElement, userNameElement, userProfElement, popupAdd,
    popupElementName, popupElementLink, popupAddButton, buttonClosePopupAdd,
    popupAddCard, popupEdit, buttonClosePopupEdit, popupUsername, 
    popupProfession, popupView, buttonClosePopupView, popupViewImage,
    popupViewImageName, elementTemlate, elements} from './utils.js';


const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
    headers: {
        authorization: '51635047-90c2-46fc-abfe-190701a5705f',
        'Content-Type': 'application/json',
    }
  }
      
export function responseCheck(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}
  
export function printError(error) {
    console.log(`Ошибка: ${error}`);
}
//загрузка данных пользователя с сервера
export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(responseCheck)
}
//загрузка карточек с сервера
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(responseCheck)
}

// Редактирование профиля

export const editProfile = (name, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
    .then(responseCheck)
};
   
//Добавление новой карточки
export const postCard = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  })
    .then(responseCheck)
};
//Отображение количества лайков карточки

//Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(responseCheck)
};
//Постановка и снятие лайка
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(responseCheck)
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(responseCheck)
};

//Обновление аватара пользователя
export const editAvatarProfile = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then(responseCheck)
}