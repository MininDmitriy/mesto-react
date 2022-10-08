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

      <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen ? 'popup_opened' : ''} title="Редактировать профиль" name="form_name" children={
        <>
          <input type="text" name="popup__input-text_fullname" className="popup__input popup__input_form_name" minLength="2" maxLength="40" placeholder="Имя" required />
          <span className="popup__input-text popup__input-text_fullname-error"></span>
          <input type="text" name="popup__input-text_profession" className="popup__input popup__input_form_profession" minLength="2" maxLength="200" placeholder="Профессия" required />
          <span className="popup__input-text popup__input-text_profession-error"></span>
          <input aria-label="Save" className="popup__button-save" type="submit" value="Сохранить" />
        </>
      } />

      <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen ? 'popup_opened' : ''} title="Новое место" name="form_place" children={
        <>
          <input type="text" name="popup__input-text_name-place" className="popup__input popup__input_form_name-place" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="popup__input-text popup__input-text_name-place-error"></span>
          <input type="url" name="popup__input-text_source-on-place" className="popup__input popup__input_form_source-on-place" placeholder="Ссылка на картинку" required />
          <span className="popup__input-text popup__input-text_source-on-place-error"></span>
          <input aria-label="Create" className="popup__button-save" type="submit" value="Создать" />
        </>
      } />

      <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen ? 'popup_opened' : ''} title="Обновить аватар" name="form_avatar" children={
        <>
          <input type="url" name="popup__input-text_source-on-avatar" className="popup__input popup__input_form_source-on-avatar" placeholder="Ссылка на картинку" required />
          <span className="popup__input-text popup__input-text_source-on-avatar-error"></span>
          <input aria-label="Save" className="popup__button-save" type="submit" value="Сохранить" />
        </>
      } />

      <PopupWithForm title="Вы уверены?" name="form_delete-place" children={
        <input aria-label="Create" className="popup__button-save popup__button-save_hover" type="submit" value="Да" />
      } />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </>
  );
}

export default App;