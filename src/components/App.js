import React from 'react';
import logo from '../images/mesto-logo.svg';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
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
  const [cards, setCards] = React.useState([]);//создает стейт из пустого массива (в нем будет хранится массив карточек)

  React.useEffect(() => {
    api.getUserInterface('/users/me')
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      });
    api.getInitialCards('/cards') //отправляем запрос на сервер и получаем массив карточек
      .then((array) => {
        setCards(array); //меняем стейт cards
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      });
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

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    api.changeLikeCardStatus(`/cards/likes/${card._id}`, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);// Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        //проверяет если id предыдущей карточки равен id полученной при PUT-запросе, то создавай новую карточку из запроса иначе оставляй старую
        setCards(newCards);// Обновляем стейт
      })
  }

  function handleCardDelete(card, e) {
    api.deleteCard(`/cards/${card._id}`)
      .then((data) => {
        e.remove();
        const newCards = cards.filter((c) => c._id !== data._id);
        setCards(newCards);
      })
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

  function handleAddPlace(data) {
    api.sendPlaceCard('/cards', data)
      .then((newCard) => {
        setCards([ ...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      })
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

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
