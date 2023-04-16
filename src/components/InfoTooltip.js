import {useState} from 'react';

function InfoTooltip({message}) {
  let messageClassName = "popup__info-message"
  if({message}) {
    messageClassName += message.isSucess ? '...' : '...'

  }
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  
  // function handleChangeEmail(e) {
  //   setEmail (e.target.value);
  // }

  // function handleChangePassword(e) {
  //   setPassword (e.target.value);
  // }

  return (
    <div className={`popup popup_type_info ${message ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__closed button" type="button" onClick={onClose}></button>
        <p className></p>
      </div>
    </div>
  )

}

export default InfoTooltip