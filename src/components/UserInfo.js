export default class UserInfo {

    constructor({userNameSelector, userAboutSelector, userAvatarSelector}){
        this._name = document.querySelector(userNameSelector);
        this._about = document.querySelector(userAboutSelector);
        this._avatar = document.querySelector(userAvatarSelector);
        
    }

    getUserInfo(){
        const userData = {
            name: this._name.textContent,
            about: this._about.textContent,
        };

        return userData;
    }

    setUserInfo(data){
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar || data.link;
      }
}