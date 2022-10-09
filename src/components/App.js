import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({bool: false, alt: '', src: ''});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({bool: false, alt: '', src: ''});
  }

  function handleCardClick(card) {
    setSelectedCard({bool: true, alt: card.name, src: card.link});
  }

  return (
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen ? 'popup_opened' : ''} title="Редактировать профиль" buttonText="Сохранить" name="form_name">
        <>
          <input type="text" name="popup__input-text_fullname" className="popup__input popup__input_form_name" minLength="2" maxLength="40" placeholder="Имя" required />
          <span className="popup__input-text popup__input-text_fullname-error"></span>
          <input type="text" name="popup__input-text_profession" className="popup__input popup__input_form_profession" minLength="2" maxLength="200" placeholder="Профессия" required />
          <span className="popup__input-text popup__input-text_profession-error"></span>
        </>
      </PopupWithForm>

      <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen ? 'popup_opened' : ''} title="Новое место" buttonText="Создать" name="form_place">
        <>
          <input type="text" name="popup__input-text_name-place" className="popup__input popup__input_form_name-place" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="popup__input-text popup__input-text_name-place-error"></span>
          <input type="url" name="popup__input-text_source-on-place" className="popup__input popup__input_form_source-on-place" placeholder="Ссылка на картинку" required />
          <span className="popup__input-text popup__input-text_source-on-place-error"></span>
        </>
      </PopupWithForm>

      <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen ? 'popup_opened' : ''} title="Обновить аватар" buttonText="Сохранить" name="form_avatar">
        <>
          <input type="url" name="popup__input-text_source-on-avatar" className="popup__input popup__input_form_source-on-avatar" placeholder="Ссылка на картинку" required />
          <span className="popup__input-text popup__input-text_source-on-avatar-error"></span>
        </>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" buttonText="Да" name="form_delete-place" />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </>
  )
}

export default App;