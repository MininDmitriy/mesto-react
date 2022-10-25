import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, buttonText, onUpdateUser, onClose}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm onClose={onClose} isOpen={isOpen ? 'popup_opened' : ''} title="Редактировать профиль" buttonText={buttonText ?  'Сохранение...' : 'Сохранить'} name="form_name" onSubmit={handleSubmit}>
      <>
        <input type="text" name="popup__input-text_fullname" className="popup__input popup__input_form_name popup__input_border-bottom_black" minLength="2" maxLength="40" placeholder="Имя" required value={name} onChange={handleChangeName} />
        <span className="popup__input-text popup__input-text_fullname-error"></span>
        <input type="text" name="popup__input-text_profession" className="popup__input popup__input_form_profession popup__input_border-bottom_black" minLength="2" maxLength="200" placeholder="Профессия" required value={description} onChange={handleChangeDescription} />
        <span className="popup__input-text popup__input-text_profession-error"></span>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;