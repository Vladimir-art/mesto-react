import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onChangeText();
    props.onUpdateAvatar(e.target, {
      avatar: inputRef.current.value,
    });
  }

  const handleButtonText = (
    `${props.isText ? 'Сохранение...' : 'Сохранить'}`
  )

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Обновить аватар"
      defaultValue=""
      name="avatar"
      buttonText={handleButtonText}
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
