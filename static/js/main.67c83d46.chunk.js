(this.webpackJsonpmesto=this.webpackJsonpmesto||[]).push([[0],{10:function(e,a,t){e.exports=t(16)},15:function(e,a,t){},16:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),r=t(5),c=t.n(r),i=(t(15),t(9)),l=t(1),s=t(6),u=t.n(s);var m=function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("header",{className:"header"},o.a.createElement("img",{className:"header__logo",src:e.logo,alt:"\u041b\u043e\u0433\u043e\u0442\u0438\u043f-\u041c\u0435\u0441\u0442\u043e"})))};var d=function(e){var a=o.a.useState(!1),t=Object(l.a)(a,2),n=t[0],r=t[1],c=e.card.owner._id===e.currentUser._id,i="element__trash ".concat(c?"":"element__trash_hidden"),s=e.card.likes.some((function(a){return a._id===e.currentUser._id})),u="element__button ".concat(s?"element__button_like-active":""),m="".concat(n&&"element__button_hidden"),d="".concat(n?"\u0423\u043f\u0441, \u043e\u0448\u0438\u0431\u043a\u0430...":"".concat(e.card.name)),f="element__count ".concat(n&&"element__count_hidden");return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"element"},o.a.createElement("img",{className:"element__image",alt:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435",src:e.card.link,onClick:function(a){!n&&e.onCardClick(e.card)},onError:function(e){e.target.setAttribute("src","https://image.freepik.com/free-vector/404_115790-50.jpg"),r(!0)}})," ",o.a.createElement("div",{className:"element__places"},o.a.createElement("h2",{className:"element__place"},d),o.a.createElement("div",{className:"element__likes"},o.a.createElement("button",{className:"".concat(u," ").concat(m),type:"button",onClick:function(){e.onCardLike(e.card)}}),o.a.createElement("span",{className:f}," ",e.card.likes.length>0?"".concat(e.card.likes.length):0," "))),o.a.createElement("button",{className:i,type:"button",onClick:function(a){e.onTrashClick(e.card,a.target.parentElement)}})))},f=o.a.createContext();var p=function(e){var a=o.a.useContext(f);return o.a.createElement(o.a.Fragment,null,o.a.createElement("main",{className:"content"},o.a.createElement("section",{className:"profile"},o.a.createElement("div",{className:"profile__cover"},o.a.createElement("div",{className:"profile__information"},o.a.createElement("figure",{className:"profile__background",onClick:e.onEditAvatar})," ",o.a.createElement("img",{className:"profile__avatar",src:a.avatar,alt:a.name})),o.a.createElement("div",{className:"profile__info"},o.a.createElement("div",{className:"profile__reg"},o.a.createElement("h1",{className:"profile__author"},a.name),o.a.createElement("button",{className:"profile__button-edit",type:"button",onClick:e.onEditProfile})," "),o.a.createElement("p",{className:"profile__specialty"},a.about))),o.a.createElement("button",{className:"profile__button-add",type:"button",onClick:e.onAddPlace})," "),o.a.createElement("section",{className:"elements"}," ",e.cards.map((function(t){return o.a.createElement(d,{card:t,key:t._id,onCardClick:e.onCardClick,currentUser:a,onCardLike:e.onCardLike,onTrashClick:e.onTrashClick})})))))};var _=function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("section",{className:"popup popup__".concat(e.name," ").concat(e.isOpen&&"popup_opened"),onClick:e.overlayClick},o.a.createElement("form",{className:"popup-container popup-container__".concat(e.name),name:"form",method:"POST",action:"#",onSubmit:e.onSubmit,noValidate:!0},o.a.createElement("h2",{className:"popup-container__text"},e.title),o.a.createElement("fieldset",{className:"popup-container__info"},e.children,o.a.createElement("button",{className:"popup-container__button-add ".concat(e.isButtonDisable||void 0===e.isButtonDisable?"":"popup-container__button-add_error"),type:"submit",disabled:!e.isButtonDisable&&void 0!==e.isButtonDisable},e.buttonText)),o.a.createElement("button",{className:"popup-container__button-reset",type:"reset","aria-label":"Close",onClick:e.onClose}))))},h="popup-container__infoform_type_error",v="popup-container__input-error_active";var E=function(e){var a=o.a.useContext(f),t=o.a.useState(""),n=Object(l.a)(t,2),r=n[0],c=n[1],i=o.a.useState(""),s=Object(l.a)(i,2),u=s[0],m=s[1],d=o.a.useState({formErrors:{author:"",job:""},authorValid:!0,jobValid:!0,formValid:!0}),p=Object(l.a)(d,2),E=p[0],g=p[1];function b(e,a){var t=E.formErrors,n=E.authorValid,o=E.jobValid;E.formValid;switch(a){case"author":n=e.validity.valid,t.author=n?"":e.validationMessage;break;case"job":o=e.validity.valid,t.job=o?"":e.validationMessage}g({formErrors:t,authorValid:n,jobValid:o,formValid:n&&o})}o.a.useEffect((function(){c(a.name),m(a.about)}),[a]);var k="".concat(e.isText?"\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435...":"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c");return o.a.createElement(_,{overlayClick:function(a){e.overlay(a.target)},onSubmit:function(a){a.preventDefault(),e.onChangeText(),e.onUpdateUser({name:r,about:u})},title:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c",name:"edit-form",buttonText:k,isButtonDisable:E.formValid,isOpen:e.isOpen,onClose:function(){e.onClose(),c(a.name),m(a.about),g({formErrors:{author:"",job:""},authorValid:!0,jobValid:!0,formValid:!0})},children:o.a.createElement(o.a.Fragment,null,o.a.createElement("input",{className:"popup-container__infoform popup-container__infoform_author ".concat(!E.authorValid&&h),id:"author",name:"author",type:"text",placeholder:"\u0410\u0432\u0442\u043e\u0440",defaultValue:r,minLength:"2",maxLength:"40",pattern:"[A-Za-z\u0410-\u042f\u0401\u0430-\u044f\u0451 -]{1,}",required:!0,onChange:function(e){c(e.target.value),b(e.target,e.target.name)}}),o.a.createElement("span",{className:"popup-container__input-error ".concat(!E.authorValid&&v),id:"author-input-error"},E.formErrors.author),o.a.createElement("input",{className:"popup-container__infoform popup-container__infoform_author ".concat(!E.jobValid&&h),id:"job",name:"job",type:"text",defaultValue:u,placeholder:"\u041e \u0441\u0435\u0431\u0435",minLength:"2",maxLength:"200",required:!0,onChange:function(e){m(e.target.value),b(e.target,e.target.name)}}),o.a.createElement("span",{className:"popup-container__input-error ".concat(!E.jobValid&&v),id:"job-input-error"},E.formErrors.job))})};var g=function(e){var a=o.a.useRef(),t=o.a.useState({formError:"",avatar:!1,form:!1}),n=Object(l.a)(t,2),r=n[0],c=n[1],i="".concat(e.isText?"\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435...":"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c");return o.a.createElement(_,{isButtonDisable:r.form,overlayClick:function(a){e.overlay(a.target)},onSubmit:function(t){t.preventDefault(),e.onChangeText(),e.onUpdateAvatar(t.target,{avatar:a.current.value})},title:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440",defaultValue:"",name:"avatar",buttonText:i,isOpen:e.isOpen,onClose:function(){e.onClose()},children:o.a.createElement(o.a.Fragment,null,o.a.createElement("input",{className:"popup-container__infoform popup-container__infoform_avatar-link ".concat(!r.avatar&&h),id:"avatar-input",ref:a,onChange:function(e){!function(e,a){var t=r.avatar,n=(r.form,r.formError);t=e.validity.valid,n=t?"":e.validationMessage,c({formError:n,avatar:t,form:t})}(e.target,e.target.name)},name:"avatar",type:"url",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0443",required:!0}),o.a.createElement("span",{className:"popup-container__input-error"},r.formError))})};var b=function(e){var a=o.a.useRef(),t=o.a.useRef(),n=o.a.useState({formErrors:{name:"",link:""},nameValid:!1,linkValid:!1,formValid:!1}),r=Object(l.a)(n,2),c=r[0],i=r[1];function s(e){e.target===a.current?u(a.current,a.current.name):u(t.current,t.current.name)}function u(e,a){var t=c.formErrors,n=c.nameValid,o=c.linkValid;c.formValid;switch(a){case"name":n=e.validity.valid,t.name=n?"":e.validationMessage;break;case"link":o=e.validity.valid,t.link=o?"":e.validationMessage}i({formErrors:t,nameValid:n,linkValid:o,formValid:n&&o})}var m="".concat(e.isText?"\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435...":"\u0421\u043e\u0437\u0434\u0430\u0442\u044c");return o.a.createElement(_,{isButtonDisable:c.formValid,overlayClick:function(a){e.overlay(a.target)},onSubmit:function(n){n.preventDefault(),e.onChangeText(),e.onAddPlace(n.target,{name:a.current.value,link:t.current.value}),i({formErrors:{name:"",link:""},nameValid:!1,linkValid:!1,formValid:!1})},title:"\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u0441\u0442\u043e",name:"add-place",buttonText:m,isOpen:e.isOpen,onClose:function(){e.onClose(),i({formErrors:{name:"",link:""},nameValid:!1,linkValid:!1,formValid:!1})},children:o.a.createElement(o.a.Fragment,null,o.a.createElement("input",{className:"popup-container__infoform popup-container__infoform_place-name ".concat(!c.nameValid&&h),id:"place-input",defaultValue:"",name:"name",type:"text",placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",minLength:"1",maxLength:"30",ref:a,onChange:s,required:!0}),o.a.createElement("span",{className:"popup-container__input-error ".concat(!c.nameValid&&v),id:"place-input-error"},c.formErrors.name),o.a.createElement("input",{className:"popup-container__infoform popup-container__infoform_place-link ".concat(!c.linkValid&&h),id:"link-input",defaultValue:"",name:"link",type:"url",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",ref:t,onChange:s,required:!0}),o.a.createElement("span",{className:"popup-container__input-error ".concat(!c.linkValid&&v)},c.formErrors.link))})};var k=function(e){var a="".concat(e.isText?"\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435...":"\u0414\u0430");return o.a.createElement(_,{overlayClick:function(a){e.overlay(a.target)},onSubmit:function(a){a.preventDefault(),e.onChangeText(),e.onCardDelete(e.cardId)},isOpen:e.isOpen,onClose:e.onClose,title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",name:"verification",buttonText:a,isText:e.isText})};var C=function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("section",{className:"popup popup__show-image ".concat(e.isOpen&&"popup_opened"),onClick:function(a){e.overlay(a.target)}},o.a.createElement("figure",{className:"popup-image"},o.a.createElement("img",{className:"popup-image__picture",src:e.card.link,alt:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043c\u0435\u0441\u0442\u0430"}),o.a.createElement("figcaption",{className:"popup-image__caption"},e.card.name),o.a.createElement("button",{className:"popup-container__button-reset popup-container__button-reset_image",type:"reset","aria-label":"Close",onClick:e.onClose}))))};var y=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("footer",{className:"footer"},o.a.createElement("p",{className:"footer__copyright"},"\xa9 2020 Mesto Russia")))},N=t(7),V=t(8),O=new(function(){function e(a){var t=a.baseUrl;Object(N.a)(this,e),this._baseUrl=t}return Object(V.a)(e,[{key:"_fetch",value:function(e,a){return a.headers={authorization:"f137b98e-3f11-4f62-a4b2-d83c32e82337","Content-Type":"application/json"},fetch(this._baseUrl+e,a).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))}},{key:"getInitialCards",value:function(e){return this._fetch(e,{method:"GET"})}},{key:"getUserInterface",value:function(e){return this._fetch(e,{method:"GET"})}},{key:"sendUserInfo",value:function(e,a){return this._fetch(e,{method:"PATCH",body:JSON.stringify({name:"".concat(a.name),about:"".concat(a.about)})})}},{key:"sendPlaceCard",value:function(e,a){return this._fetch(e,{method:"POST",body:JSON.stringify({name:"".concat(a.name),link:"".concat(a.link)})})}},{key:"changeLikeCardStatus",value:function(e,a){return a?this._fetch(e,{method:"DELETE"}):this._fetch(e,{method:"PUT"})}},{key:"deleteCard",value:function(e){return this._fetch(e,{method:"DELETE"})}},{key:"changeAvatar",value:function(e,a){return this._fetch(e,{method:"PATCH",body:JSON.stringify({avatar:"".concat(a.avatar)})})}}]),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-12"});var T=function(){var e=o.a.useState(!1),a=Object(l.a)(e,2),t=a[0],n=a[1],r=o.a.useState(!1),c=Object(l.a)(r,2),s=c[0],d=c[1],_=o.a.useState(!1),h=Object(l.a)(_,2),v=h[0],N=h[1],V=o.a.useState({state:!1,cardId:"",elem:{}}),T=Object(l.a)(V,2),j=T[0],x=T[1],S=o.a.useState(!1),U=Object(l.a)(S,2),w=U[0],L=U[1],D=o.a.useState({}),P=Object(l.a)(D,2),A=P[0],I=P[1],B=o.a.useState(!1),F=Object(l.a)(B,2),M=F[0],q=F[1],J=o.a.useState({}),R=Object(l.a)(J,2),z=R[0],G=R[1],H=o.a.useState([]),W=Object(l.a)(H,2),Z=W[0],$=W[1];function K(){q(!0)}function Q(){N(!1),n(!1),d(!1),L(!1),x({state:!1,cardId:"",elem:{}})}function X(e){e.classList.contains("popup")&&Q()}return o.a.useEffect((function(){O.getUserInterface("/users/me").then((function(e){G(e)})).catch((function(e){console.log("\u0423\u043f\u0441, \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430: ".concat(e))})),O.getInitialCards("/cards").then((function(e){$(e)})).catch((function(e){console.log("\u0423\u043f\u0441, \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430: ".concat(e))}))}),[]),o.a.useEffect((function(){window.addEventListener("keydown",(function(e){"Escape"===e.key&&Q()}))}),[]),o.a.createElement("div",{className:"page"},o.a.createElement(f.Provider,{value:z},o.a.createElement(m,{logo:u.a}),o.a.createElement(p,{onEditProfile:function(){n(!0)},onAddPlace:function(){d(!0)},onEditAvatar:function(){N(!0)},onCardClick:function(e){L(!0),I(e)},onTrashClick:function(e,a){x({state:!0,cardId:"".concat(e._id),elem:a})},cards:Z,onCardLike:function(e){var a=e.likes.some((function(e){return e._id===z._id}));O.changeLikeCardStatus("/cards/likes/".concat(e._id),a).then((function(a){var t=Z.map((function(t){return t._id===e._id?a:t}));$(t)})).catch((function(e){console.log("\u0423\u043f\u0441, \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430: ".concat(e))}))}}),o.a.createElement(E,{overlay:X,isText:M,onChangeText:K,isOpen:t,onClose:Q,onUpdateUser:function(e){O.sendUserInfo("/users/me",e).then((function(e){G(e),Q()})).catch((function(e){console.log("\u0423\u043f\u0441, \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430: ".concat(e))})).finally((function(){q(!1)}))}}),o.a.createElement(b,{overlay:X,isText:M,onChangeText:K,isOpen:s,onClose:Q,onAddPlace:function(e,a){O.sendPlaceCard("/cards",a).then((function(e){$([].concat(Object(i.a)(Z),[e])),Q()})).catch((function(e){console.log("\u0423\u043f\u0441, \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430: ".concat(e))})).finally((function(){e.reset(),q(!1)}))}}),o.a.createElement(g,{overlay:X,isText:M,onChangeText:K,isOpen:v,onClose:Q,onUpdateAvatar:function(e,a){O.changeAvatar("/users/me/avatar",a).then((function(e){G(e),Q()})).catch((function(e){console.log("\u0423\u043f\u0441, \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430: ".concat(e))})).finally((function(){e.reset(),q(!1)}))}}),o.a.createElement(k,{overlay:X,isText:M,onChangeText:K,cardId:j.cardId,isOpen:j.state,onClose:Q,onCardDelete:function(e){O.deleteCard("/cards/".concat(e)).then((function(e){j.elem.remove();var a=Z.filter((function(a){return a._id!==e._id}));$(a),Q()})).catch((function(e){console.log("\u0423\u043f\u0441, \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430: ".concat(e))})).finally((function(){q(!1)}))}}),o.a.createElement(C,{overlay:X,card:A,isOpen:w,onClose:Q}),o.a.createElement(y,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,a,t){e.exports=t.p+"static/media/mesto-logo.c6f11019.svg"}},[[10,1,2]]]);
//# sourceMappingURL=main.67c83d46.chunk.js.map