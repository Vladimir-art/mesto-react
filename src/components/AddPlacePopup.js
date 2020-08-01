import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const inputName = React.useRef();
  const inputLink = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(e.target, {
      name: inputName.current.value,
      link: inputLink.current.value
    })
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Новое место"
      name="add-place"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <>
          <input
            className="popup-container__infoform popup-container__infoform_place-name"
            id="place-input"
            defaultValue=""
            name="name"
            type="text"
            placeholder="Название"
            minLength="1" maxLength="30"
            ref={inputName}
            required
          />
          <span className="popup-container__input-error" id="place-input-error">Вы пропустили это поле.</span>
          <input
            className="popup-container__infoform popup-container__infoform_place-link"
            id="link-input"
            defaultValue=""
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            ref={inputLink}
            required
          />
          <span className="popup-container__input-error" id="link-input-error"></span>
        </>
      }
    />
  )
}

export default AddPlacePopup;
