import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link
    })
  }

  function resetInput() {
    props.onClose();
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Новое место"
      name="add-place"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={resetInput}
      children={
        <>
          <input
            className="popup-container__infoform popup-container__infoform_place-name"
            id="place-input"
            defaultValue={name}
            name="name"
            type="text"
            placeholder="Название"
            minLength="1" maxLength="30"
            onChange={handleChangeName}
            required
          />
          <span className="popup-container__input-error" id="place-input-error">Вы пропустили это поле.</span>
          <input
            className="popup-container__infoform popup-container__infoform_place-link"
            id="link-input"
            defaultValue={link}
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            onChange={handleChangeLink}
            required
          />
          <span className="popup-container__input-error" id="link-input-error"></span>
        </>
      }
    />
  )
}

export default AddPlacePopup;
