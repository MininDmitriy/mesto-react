import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, buttonText}) {
  const avatarRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm onClose={onClose} isOpen={isOpen ? 'popup_opened' : ''} title="Обновить аватар" buttonText={buttonText ?  'Сохранение...' : 'Сохранить'} name="form_avatar" onSubmit={handleSubmit}>
      <>
        <input type="url" name="popup__input-text_source-on-avatar" className="popup__input popup__input_form_source-on-avatar popup__input_border-bottom_black" placeholder="Ссылка на картинку" ref={avatarRef} required />
        <span className="popup__input-text popup__input-text_source-on-avatar-error"></span>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;