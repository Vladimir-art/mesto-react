import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const inputRef = React.useRef();
  //при добавлении валидации на эту форму делаю по аналогии с предыдущими формами. Но
  //каким то образом инпуты с ссылками в форме изменения инфы об авторе и добавлении карточки
  //становятся заблокированными, я не могу по ним кликнуть и печатать. Тоже вообще не пойму даже где
  //искать баг...

  // const [valid, setValid] = React.useState({ //стейт для валидации
  //   formErrors: { avatar: '' }, //объект с текстом ошибок
  //   avatarValid: false, //валидность поля с автором
  //   formValid: false //валидность всей формы
  // });

  // function handleInput(e) {
  //   e.target === inputRef.current && validateField(inputRef.current, inputRef.current.name);
  // }

  // function validateField(input, inputName) {
  //   let inputValidationErrors = valid.formErrors; //все переменные берут первоначальные значения из стейта
  //   let avatarValid = valid.avatarValid;
  //   let formValid = valid.formValid;

  //   switch (inputName) {
  //     case 'avatar':
  //       avatarValid = input.validity.valid;
  //       inputValidationErrors.avatar = avatarValid ? '' : input.validationMessage;
  //       break;
  //     default:
  //       break;
  //   }

  //   formValid = avatarValid;

  //   setValid({
  //     formErrors: inputValidationErrors,
  //     avatarValid: avatarValid,
  //     formValid: formValid
  //   })
  // }

  function handleSubmit(e) {
    e.preventDefault();
    props.onChangeText();
    props.onUpdateAvatar(e.target, {
      avatar: inputRef.current.value,
    });
  }

  const handleButtonText = (
    `${props.isText ? 'Сохранение...' : 'Сохранить'}`
  );

  function overlayClick(e) {
    props.overlay(e.target);
  }

  function resetInput() { //сбрасываем введенные значания инпутов при клике на крестик
    props.onClose();
  }

  return (
    <PopupWithForm
      overlayClick={overlayClick}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      defaultValue=""
      name="avatar"
      buttonText={handleButtonText}
      isOpen={props.isOpen}
      onClose={resetInput}
      children={
        <>
          <input className={`popup-container__infoform popup-container__infoform_avatar-link`}
            id="avatar-input"
            ref={inputRef}
            name="avatar"
            type="url"
            placeholder="Введите ссылку"
            required />
          <span className={`popup-container__input-error`}></span>
        </>
      }
    />
  )
}

export default EditAvatarPopup;
