export default class Api {
  constructor(options){
      this._baseUrl = options.baseUrl;
      this._headers = options.headers
  }

  responseCheck(res) {
      if (res.ok) {
          return res.json();
      } else {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
  }
    
  printError(error) {
      console.log(`Ошибка: ${error}`);
  }   

  //загрузка данных пользователя с сервера
  getUserData() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers
      })
      .then(this.responseCheck)
  }

  //загрузка карточек с сервера
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers
      })
      .then(this.responseCheck)
  }

  // Редактирование профиля

  editProfile(data) {    
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: data.username,
            about: data.profession
          })
      })
      .then(this.responseCheck)
  };
 
  //Добавление новой карточки
  postCard(data) {    
      return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          })
      })
      .then(this.responseCheck)
  };

  //Удаление карточки
  deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers
      })
      .then(this.responseCheck)
  };

  //Постановка и снятие лайка
  addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: this._headers
      })
      .then(this.responseCheck)
  };

  deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: this._headers
      })
      .then(this.responseCheck)
  };

  //Обновление аватара пользователя
  editAvatarProfile(avatarLink) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: avatarLink
          })
      })
      .then(this.responseCheck)
  }
}