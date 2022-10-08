import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return(
    <li className="card">
      <img className="card__image" src={props.card.link} onClick={handleClick}/>
      <button aria-label="Delete" className="card__button-delete" type="button"></button>
      <div className="card__body">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__container-for-info-like">
          <button aria-label="Like" className="card__button-like" type="button"></button>
          <p className="card__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;