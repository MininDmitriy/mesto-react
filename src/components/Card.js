import React from "react";

function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  }

  return(
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <button aria-label="Delete" className="card__button-delete" type="button"></button>
      <div className="card__body">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__container-for-info-like">
          <button aria-label="Like" className="card__button-like" type="button"></button>
          <p className="card__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;