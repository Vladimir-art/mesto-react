import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { formConfig } from '../utils/utils';

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
    // console.log(e.target);
    setValid({ ...valid, [e.target.name]: e.target.value }, validateField(e.target, e.target.name));
    // setValid({ [e.target.name]: e.target.value },
    //   () => {
    //     validateField(e.target, e.target.name, e.target.value);
    //   })
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
    setValid({ ...valid, [e.target.name]: e.target.value }, validateField(e.target, e.target.name, e.target.value));
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

  const [valid, setValid] = React.useState({
    author: name,
    job: description,
    formErrors: { author: '', job: '' },
    authorValid: true,
    jobValid: true,
    formValid: true,
  });
  const [god, setGod] = React.useState({});

  function validateField(input, inputName, value) {
    let inputValidationErrors = valid.formErrors;
    let authorValid = valid.authorValid;
    let jobValid = valid.jobValid;

    switch (inputName) {
      case 'author':
        authorValid = input.validity.valid;
        inputValidationErrors.author = authorValid ? '' : input.validationMessage;
        break;
      case 'job':
        jobValid = input.validity.valid;
        inputValidationErrors.job = jobValid ? '' : input.validationMessage;
        break;
      default:
        break;
    }

    let statusCopy = Object.assign({});
    // statusCopy.author = input.name,
    // statusCopy.job = input.name,
    statusCopy.formErrors = inputValidationErrors;
    statusCopy.authorValid = authorValid;
    statusCopy.jobValid = jobValid;
    let formValid = statusCopy.authorValid && statusCopy.jobValid;
    statusCopy.formValid = formValid;
    setGod(statusCopy);
    // console.log(valid);
    // this.setState(statusCopy);
    // setValid({
    //   formErrors: inputValidationErrors,
    //   authorValid: authorValid,
    //   jobValid: jobValid
    // }, validateForm());
  }

  function validateForm() {
    setValid({ ...valid, formValid: valid.authorValid && valid.jobValid });
  }
  console.log(god);

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
            id="author"
            name="author"
            type="text"
            placeholder="Автор"
            defaultValue={name}
            minLength="2" maxLength="40"
            pattern="[A-Za-zА-ЯЁа-яё -]{1,}" required
            onChange={handleChangeAuthor} />
          <span className="popup-container__input-error" id="author-input-error">Вы пропустили это поле.</span>
          <input className="popup-container__infoform popup-container__infoform_aboutyourself"
            id="job"
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
