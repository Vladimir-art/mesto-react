import React from 'react';
import logo from '../images/mesto-logo.svg';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import EditVerificationPopup from './EditVerificationPopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); //стейт профиль
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); //добавление нового места
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); //смена аватара
  const [isEditVerificationPopupOpen, setIsEditVerificationPopupOpen] = React.useState({ state: false, cardId: '', elem: {} }); //подтверждение удаления
  const [selectedCard, setSelectedCard] = React.useState(false); //открытие картинки
  const [showImage, setShowImage] = React.useState({}); //данные картинки
  const [text, setText] = React.useState(false); //стейт для изменения текта при загрузке сервера

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

  function changeText() { //смена текта при апи запросе
    setText(true);
  }
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
  // подтверждение удаления (принимает объект карточки и форму)
  function handleVerificationClick(data, e) {
    setIsEditVerificationPopupOpen({ state: true, cardId: `${data._id}`, elem: e });
  };
  //закрывает все попапы на крестик
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsEditVerificationPopupOpen({ state: false, cardId: '', elem: {} });
  }

  function overlayClick(e) { //оверлей по клику (принимает попап)
    if (e.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    });
  }, []);

  // function escClick(e) { //закрытие попара по esc (не закрывется попап с аватар и картинкой)
  //   if (e.key === 'Escape') {
  //     closeAllPopups();
  //   }
  // }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    api.changeLikeCardStatus(`/cards/likes/${card._id}`, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);// Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        //проверяет если id предыдущей карточки равен id полученной при PUT-запросе, то создавай новую карточку из запроса иначе оставляй старую
        setCards(newCards);// Обновляем стейт
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      });
  }
  // запрос по удалению карточки с сервера (принимает Id карточки)
  function handleCardDelete(cardId) {
    api.deleteCard(`/cards/${cardId}`)
      .then((data) => {
        isEditVerificationPopupOpen.elem.remove(); //удаляет карточку
        const newCards = cards.filter((c) => c._id !== data._id);
        setCards(newCards); //меняет стейт с карточками
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      })
      .finally(() => {
        setText(false); //меняет текст кнопки сабмита
      })
  }

  // обновляет информацию о пользователе
  function handleUpdateUser(data) {
    api.sendUserInfo('/users/me', data)
      .then((newData) => {
        setCurrentUser(newData); //обновляет контекст currentUser
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      })
      .finally(() => {
        setText(false); //меняет текст кнопки сабмита
      })
  }
  // обновляет аватар пользователя (принимает форму и объект с данными (имя и ссылка))
  function handleUpdateAvatar(e, data) {
    api.changeAvatar('/users/me/avatar', data)
      .then((newData) => {
        setCurrentUser(newData); //обновляет контекст currentUser
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      })
      .finally(() => {
        e.reset(); //сбрасывает значения инпутов
        setText(false); //меняет текст кнопки сабмита
      });
  }
  // добавляет новую карточку (принимает форму и объект(имя и ссылка))
  function handleAddPlace(e, data) {
    api.sendPlaceCard('/cards', data)
      .then((newCard) => {
        setCards([...cards, newCard]); //добавляет в имеющийся массив карточек новую карточку
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      })
      .finally(() => {
        e.reset(); //сбрасывает значения инпутов
        setText(false); //меняет текст кнопки сабмита
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
          onTrashClick={handleVerificationClick}
          cards={cards}
          onCardLike={handleCardLike}
        />

        <EditProfilePopup
          overlay={overlayClick}
          isText={text}
          onChangeText={changeText}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          overlay={overlayClick}
          isText={text}
          onChangeText={changeText}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditAvatarPopup
          overlay={overlayClick}
          isText={text}
          onChangeText={changeText}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditVerificationPopup
          overlay={overlayClick}
          isText={text}
          onChangeText={changeText}
          cardId={isEditVerificationPopupOpen.cardId}
          isOpen={isEditVerificationPopupOpen.state}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup
          overlay={overlayClick}
          card={showImage}
          isOpen={selectedCard}
          onClose={closeAllPopups}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
