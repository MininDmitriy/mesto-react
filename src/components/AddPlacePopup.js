import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleAddNamePlace(e) {
    setName(e.target.value);
  }

  function handleAddLinkPlace(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link
    })
  }

  return(
    <PopupWithForm onClose={props.onClose} isOpen={props.isOpen ? 'popup_opened' : ''} title="Новое место" buttonText={props.buttonText ?  'Сохранение...' : 'Создать'} name="form_place" onSubmit={handleSubmit}>
      <>
        <input type="text" name="popup__input-text_name-place" className="popup__input popup__input_form_name-place popup__input_border-bottom_black" placeholder="Название" minLength="2" maxLength="30" value={name} onChange={handleAddNamePlace} required />
        <span className="popup__input-text popup__input-text_name-place-error"></span>
        <input type="url" name="popup__input-text_source-on-place" className="popup__input popup__input_form_source-on-place popup__input_border-bottom_black" placeholder="Ссылка на картинку" value={link} onChange={handleAddLinkPlace} required />
        <span className="popup__input-text popup__input-text_source-on-place-error"></span>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;