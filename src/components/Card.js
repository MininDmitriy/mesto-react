import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__button-delete ${isOwn ? 'card__button-delete_visible' : 'card__button-delete_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `${isLiked ? 'card__button-like card__button-like_active' : 'card__button-like'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <button aria-label="Delete" className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
      <div className="card__body">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__container-for-info-like">
          <button aria-label="Like" className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="card__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;