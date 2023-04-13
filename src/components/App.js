import {useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setСurrentUser] = useState({
    about:"",
    avatar:"",
    name:"",
  });
  const [cards, setCards] = useState([]);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setСurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
 
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }
  
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        setCards((cardDel) => cardDel.filter((item  => item._id  !== card._id)))
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateUser(currentUser) {
    api.editUserInfo(currentUser)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateAvatar(newAvatar) {
    api.editAvatar(newAvatar)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
  
  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        
        <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/" element={
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />}/>
        </Routes>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser ={ handleUpdateUser }/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace  ={ handleAddPlaceSubmit }/>
            <PopupWithForm name="delete" title="Вы уверены?" submit="Да"/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar ={ handleUpdateAvatar }/>  
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          
        </CurrentUserContext.Provider>
        <Footer />
      </div>
    </div>
  );
}

export default App;
