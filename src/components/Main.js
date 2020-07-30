import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const [cards, setCards] = React.useState([]);//создает стейт из пустого массива (в нем будет хранится массив карточек)
  const currentUser = React.useContext(CurrentUserContext); //получаем объект о пользвателе из контекста

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

  React.useEffect(() => {
    api.getInitialCards('/cards') //отправляем запрос на сервер и получаем массив карточек
      .then((array) => {
        setCards(array); //меняем стейт cards
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`);
      });
  }, []);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__cover">
            <div className="profile__information">
              <figure className="profile__background" onClick={props.onEditAvatar}></figure> {/*при клике на аву меняем стейт на true и передем в компонент App*/}
              <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
            </div>
            <div className="profile__info">
              <div className="profile__reg">
                <h1 className="profile__author">{currentUser.name}</h1>
                <button className="profile__button-edit" type="button" onClick={props.onEditProfile}></button> {/*при клике на редактор инфы меняем стейт на true и передем в компонент App*/}
              </div>
              <p className="profile__specialty">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__button-add" type="button" onClick={props.onAddPlace}></button> {/*при клике на + меняем стейт на true и передем в компонент App*/}
        </section>

        <section className="elements"> {/*передаем в Card информацию о каждой карточке, приcваиваем каждой карточке key и передаем ф-цию по смене флага при нажатии на картинку*/}
          {cards.map((item) => {
            return (
              <Card card={item} key={item._id} onCardClick={props.onCardClick} currentUser={currentUser} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
            );
          })}
        </section>
      </main>
    </>
  )
}

export default Main
