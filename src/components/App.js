import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';
import ConfirmationPopup from './ConfirmationPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopup, setIsConfirmationPopup] = useState(false);
  const [cardId, setCardId] = useState('');
  const [selectedCard, setSelectedCard] = useState({bool: false, alt: '', src: ''});
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [renderLoading, setRenderLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getInfoAboutProfile(), api.getInfoAboutCards()])
      .then(([userData, arrCards]) => {
        setCurrentUser(userData);
        setCards(arrCards);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    setRenderLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id === cardId ? null : c))
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleUpdateUser({name, about}) {
    setRenderLoading(true);
    api.changeProfile({newName: name, newInfo: about})
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleUpdateAvatar({avatar}) {
    setRenderLoading(true);
    api.changeAvatar({avatarNew: avatar})
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    setRenderLoading(true);
    api.addNewCard({name: name, link: link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleConfirmationPopup() {
    setIsConfirmationPopup(!isConfirmationPopup);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopup(false);
    setSelectedCard({bool: false, alt: '', src: ''});
  }

  function handleCardClick(card) {
    setSelectedCard({bool: true, alt: card.name, src: card.link});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onOpenConfirmationPopup={handleConfirmationPopup}
            setCardId={setCardId}
      />

      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        buttonText={renderLoading}
      />
      <AddPlacePopup onClose={closeAllPopups}
                     isOpen={isAddPlacePopupOpen}
                     onAddPlace={handleAddPlaceSubmit}
                     buttonText={renderLoading}
      />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}
                       onUpdateAvatar={handleUpdateAvatar}
                       buttonText={renderLoading}
      />
      <ConfirmationPopup isOpen={isConfirmationPopup}
                         onClose={closeAllPopups}
                         onCardDelete={handleCardDelete}
                         cardId={cardId}
                         buttonText={renderLoading}
      />
      <ImagePopup card={selectedCard}
                  onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  )
}

export default App;