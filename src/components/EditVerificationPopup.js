import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditVerificationPopup(props) {

  function handleDeleteClick(e) {
    e.preventDefault();
    props.onCardDelete(props.cardId, e.target);
  }

  return (
    <PopupWithForm
      onSubmit={handleDeleteClick}
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Вы уверены?"
      name="verification"
      buttonText="Да"
    />
  )
}

export default EditVerificationPopup;
