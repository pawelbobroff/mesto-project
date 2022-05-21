(()=>{"use strict";var e={formSelector:".form",inputSelector:".popup__item",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_novalid",inputErrorClass:"popup__item_type_error",errorClass:"popup__input-errors_active"},t=document.querySelectorAll(".popup"),n=document.querySelector(".button_theme_edit"),r=document.querySelector(".button_theme_add"),o=document.querySelector(".profile__avatar-edit"),c=document.querySelector(".profile__avatarImg"),a=document.querySelector(".profile__name"),u=document.querySelector(".profile__proffession"),l=document.querySelector(".popup_type_card-add"),i=l.querySelector("#elementName"),s=l.querySelector("#elementLink"),d=l.querySelector(".popup__button"),p=(l.querySelector(".button_theme_close"),l.querySelector(".popup__form-add-card")),f=document.querySelector(".popup_type_profile"),m=(f.querySelector(".button_theme_close"),f.querySelector("#username")),_=f.querySelector("#profession"),h=f.querySelector(".popup__button"),y=document.querySelector(".popup_type_picture"),v=(y.querySelector(".button_theme_close"),y.querySelector(".popup__image")),S=y.querySelector(".popup__name-image"),b=document.querySelector(".popup_type_avatar-edit"),q=(b.querySelector(".button_theme_close"),b.querySelector("#avatarLink")),L=b.querySelector(".popup__button"),k=(b.querySelector(".popup_form_avatar-edit"),document.querySelector("#element").content),E=document.querySelector(".elements");function C(e){e.classList.add("popup_opened"),document.addEventListener("keydown",x)}function g(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",x)}function x(e){"Escape"===e.key&&g(document.querySelector(".popup_opened"))}var A={baseUrl:"https://nomoreparties.co/v1/plus-cohort-9",headers:{authorization:"51635047-90c2-46fc-abfe-190701a5705f","Content-Type":"application/json"}};function U(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function w(e){console.log("Ошибка: ".concat(e))}function T(e,t){var n=e.likes,r=e.name,o=e.link,c=(e.isLiked,e.cardId,e.owner,k.querySelector(".element").cloneNode(!0)),a=c.querySelector(".element__name"),u=c.querySelector(".element__image"),l=c.querySelector(".element__delete"),i=c.querySelector(".element__like"),s=c.querySelector(".element__like-counter");return a.textContent=r,u.src=o,u.alt=r,s.textContent=n.length,i.addEventListener("click",(function(t){!function(e,t,n){e.classList.contains("element__like_liked")?function(e){return fetch("".concat(A.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:A.headers}).then(U)}(n).then((function(n){t.textContent=n.likes.length,e.classList.remove("element__like_liked")})).catch((function(e){return console.error(e)})):function(e){return fetch("".concat(A.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:A.headers}).then(U)}(n).then((function(n){t.textContent=n.likes.length,e.classList.add("element__like_liked")})).catch((function(e){return console.error(e)}))}(i,s,e._id)})),l.addEventListener("click",(function(){var t;(t=e._id,fetch("".concat(A.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:A.headers}).then(U)).then((function(){l.closest(".element").remove()})).catch(w)})),e.likes.some((function(e){return e._id===t}))&&i.classList.add("element__like_liked"),e.owner._id!==t&&l.remove(),u.addEventListener("click",(function(e){v.src=o,v.alt=r,S.textContent=r,C(y)})),c}var j=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""};function B(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}var O,P;function D(t){var n=t.querySelector(e.formSelector);n.querySelectorAll(e.inputSelector).forEach((function(t){j(n,t,e)}))}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function N(e){a.textContent=e.name,u.textContent=e.about,c.src=e.avatar,c.alt="Аватар ".concat(e.name)}function J(e,t){"create-card-button"===t.name?t.textContent=e?"Сохранение...":"Создать":t.textContent=e?"Сохранение...":"Сохранить"}Promise.all([fetch("".concat(A.baseUrl,"/users/me"),{headers:A.headers}).then(U),fetch("".concat(A.baseUrl,"/cards"),{headers:A.headers}).then(U)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];O=o._id,N(o),c.forEach((function(e){E.append(T(e,O))}))})).catch(w),t.forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("button_theme_close")&&g(e)}))})),t.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup__opened")&&g(e),t.target.classList.contains("popup_unvisible")&&g(e)}))})),n.addEventListener("click",(function(){D(f),m.value=a.textContent,_.value=u.textContent,C(f)})),r.addEventListener("click",(function(){return C(l)})),l.addEventListener("submit",(function(e){var t,n;e.preventDefault(),J(!0,d),(t=i.value,n=s.value,fetch("".concat(A.baseUrl,"/cards"),{method:"POST",headers:A.headers,body:JSON.stringify({name:t,link:n})}).then(U)).then((function(e){return E.prepend(T(e,O))})).then((function(){console.log(p),p.reset(),d.classList.add("popup__button_novalid"),d.disabled=!0,g(l)})).catch(w).finally((function(){return J(!1,d)}))})),f.addEventListener("submit",(function(t){var n,r;t.preventDefault(),J(!0,h),(n=m.value,r=_.value,fetch("".concat(A.baseUrl,"/users/me"),{method:"PATCH",headers:A.headers,body:JSON.stringify({name:n,about:r})}).then(U)).then((function(t){var n;N(t),(n=h).classList.add(e.inactiveButtonClass),n.disabled=!0,g(f)})).catch(w).finally((function(){return J(!1,h)}))})),o.addEventListener("click",(function(){D(b),C(b)})),b.addEventListener("submit",(function(e){var t;e.preventDefault(),t=q.value,J(!0,L),function(e){return fetch("".concat(A.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:A.headers,body:JSON.stringify({avatar:e})}).then(U)}(t).then((function(e){c.src=e.avatar,L.classList.add("popup__button_novalid"),L.disabled=!0,g(b)})).then(console.log(b.querySelector("popup__container"))).catch(w).finally((function(){return J(!1,L)}))})),P=e,Array.from(document.querySelectorAll(P.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);B(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?j(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),B(n,r,t)}))}))}(e,P)}))})();