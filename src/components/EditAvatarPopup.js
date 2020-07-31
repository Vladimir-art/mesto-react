import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {

  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(e.target, {
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Обновить аватар"
      defaultValue=""
      name="avatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <>
          <input className="popup-container__infoform popup-container__infoform_avatar-link"
            id="avatar-input"
            ref={inputRef}
            name="avatar"
            type="url"
            placeholder="Введите ссылку"
            required />
          <span className="popup-container__input-error" id="avatar-input-error"></span>
        </>
      }
    />
  )
}

export default EditAvatarPopup;
