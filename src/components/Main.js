import {useState, useEffect} from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInfoAboutProfile(), api.getInfoAboutCards()])
      .then(([userData, data]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

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
          {cards.map((item) => <Card key={item._id} card={item} onCardClick={props.onClick}/>)}
        </ul>
      </section>

    </main>
  )
}

export default Main;