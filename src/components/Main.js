import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const [cards, setCards] = React.useState([]);//создает стейт из пустого массива (в нем будет хранится массив карточек)
  const currentUser = React.useContext(CurrentUserContext); //получаем объект о пользвателе из контекста

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
              <img className="profile__avatar" src={currentUser.avatar} alt="Жак-Ив Кусто" />
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
          {cards.map((item, index) => {
            return (
              <Card card={item} key={index} onCardClick={props.onCardClick} />
            );
          })}
        </section>
      </main>
    </>
  )
}

export default Main
