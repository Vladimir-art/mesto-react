import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  const isOwn = props.card.owner._id === props.currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const cardDeleteButtonClassName = ( // Создаём переменную, которую после зададим в `className` для кнопки удаления
    `${isOwn ? 'element__trash' : 'element__trash_hidden'}`
  );


  const isLiked = props.card.likes.some(item => item._id === props.currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeButtonClassName = (// Создаём переменную, которую после зададим в `className` для кнопки лайка
    `element__button ${isLiked ? 'element__button_like-active' : ''}`
  );

  return (
    <>
      <div className="element">
        <img className="element__image" alt="Изображение" src={props.card.link} onClick={handleClick} /> {/*при клике вызывает ф-цию по смене стейта и передает данные о карточке в App*/}
        <div className="element__places">
          <h2 className="element__place">{props.card.name}</h2>
          <div className="element__likes">
            <button className={cardLikeButtonClassName} type="button"></button>
            <span className="element__count"> {props.card.likes.length > 0 ? `${props.card.likes.length}` : 0} </span>
          </div>
        </div>
        <button className={cardDeleteButtonClassName} type="button"></button>
      </div>
    </>
  )
}

export default Card;
