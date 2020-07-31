import React from 'react';
import logo from '../images/mesto-logo.svg';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [showImage, setShowImage] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({}); //получаем информацию об авторе

  React.useEffect(() => {
    api.getUserInterface('/users/me')
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      })
  }, []);

  //функция меняет хначения при клике на картинку и передает showImage данные об этой картинке (получает из компонента ImagePopup)
  function handleCardClick(data) {
    setSelectedCard(true);
    setShowImage(data);
  }
  //попап сменить аватарку
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  //попап редактировать профиль
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  //попап загрузить новое место
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  //закрывает все попапы на крестик
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  function handleUpdateUser(e, data) {
    api.sendUserInfo('/users/me', data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(e, data) {
    api.changeAvatar('/users/me/avatar', data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      })
      .finally(() => {
        e.reset();
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header logo={logo} />
        <Main
          onEditProfile={handleEditProfileClick} //передает ф-цию по клике на редактирование профиля
          onAddPlace={handleAddPlaceClick} // передает ф-цию по клике на кнопку добавления нового места
          onEditAvatar={handleEditAvatarClick} //ф-ция по клику на смену аватара
          onCardClick={handleCardClick} //ф-ция по клике на картинку
        />
        {/*в каждом компоненте PopupWithForm передаем пропс isOpen, который есть условие того что конкретное поле объекта true и если оно верно, передаем новый класс по открытию формы*/}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <PopupWithForm title="Новое место" name="add-place" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} children={
          <>
            <input className="popup-container__infoform popup-container__infoform_place-name" id="place-input" name="name" type="text" placeholder="Название" minLength="1" maxLength="30" required />
            <span className="popup-container__input-error" id="place-input-error">Вы пропустили это поле.</span>
            <input className="popup-container__infoform popup-container__infoform_place-link" id="link-input" name="link" type="url" placeholder="Ссылка на картинку" required />
            <span className="popup-container__input-error" id="link-input-error"></span>
          </>
        } />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithForm title="Вы уверены?" name="verification" buttonText="Да" />
        {/*в ImagePopup передаем объект о нажатой карточке (card), условие как в PopupWithForm и ф-цию по смене стейта по нажатию на крестик*/}
        <ImagePopup card={showImage} isOpen={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
