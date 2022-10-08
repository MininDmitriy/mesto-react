import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInfoAboutProfile()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  React.useEffect(() => {
    api.getInfoAboutCards()
      .then((data) => {
        setCards(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  const newCards = cards.map((item) => <Card key={item._id} card={item} onCardClick={props.onClick}/>);

  return (
    <main className="main root__main">

      <section className="profile main__profile">
        <div className="profile__area">
          <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }} ></div>
          <div className="profile__info">
            <h1 className="profile__fullname">{userName}</h1>
            <button aria-label="Edit Info" className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__profession">{userDescription}</p>
          </div>
        </div>
        <button aria-label="Add place" className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements main__elements">
        <ul className="elements__cards">
          {newCards}
        </ul>
      </section>

    </main>
  );
}

export default Main;