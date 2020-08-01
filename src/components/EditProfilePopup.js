import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  //реализация управляемого компонента
  const [name, setName] = React.useState(''); //стетй с именем
  const [description, setDescription] = React.useState(''); //стейт с деятельностью

  React.useEffect(() => { //меняем стейты в зависимости от контекста currentUser
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onChangeText();
    props.onUpdateUser({
      name: name,
      about: description
    });
  }

  function handleChangeAuthor(e) { //меняем стейт при каждом изменении в поле инпута
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }

  function resetInput() { //сбрасываем введенные значания инпутов при клике на крестик
    props.onClose();
    setName(currentUser.name);
    setDescription(currentUser.about);
  }

  const handleButtonText = (
    `${props.isText ? 'Сохранение...' : 'Сохранить'}`
  )

  function overlayClick(e) {
    props.overlay(e.target);
  }

  return (
    <PopupWithForm
      overlayClick={overlayClick}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="edit-form"
      buttonText={handleButtonText}
      isOpen={props.isOpen}
      onClose={resetInput}
      children={
        <>
          <input className="popup-container__infoform popup-container__infoform_author"
            id="author-input"
            name="author"
            type="text"
            placeholder="Автор"
            defaultValue={name}
            minLength="2" maxLength="40"
            pattern="[A-Za-zА-ЯЁа-яё -]{1,}" required
            onChange={handleChangeAuthor} />
          <span className="popup-container__input-error" id="author-input-error">Вы пропустили это поле.</span>
          <input className="popup-container__infoform popup-container__infoform_aboutyourself"
            id="job-input"
            name="job"
            type="text"
            defaultValue={description}
            placeholder="О себе"
            minLength="2" maxLength="200" required
            onChange={handleChangeAbout} />
          <span className="popup-container__input-error" id="job-input-error">Вы пропустили это поле.</span>
        </>
      }
    />
  )
}

export default EditProfilePopup;
