import {useState} from 'react';

function Register(onSubmit) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function handleChangeEmail(e) {
    setEmail (e.target.value);
  }

  function handleChangePassword(e) {
    setPassword (e.target.value);
  }

  return (
    <div className="login">
      <div className='login__container'>
        <p className="login__title">Регистрация</p>
        <form className="login__form" onSubmit ={onSubmit}>
          <input  className="login__input" placeholder="Email" id="email" type="text" name="email" value={email||""} 
            onChange={ handleChangeEmail } required/>
          <input className="login__input" placeholder="Пароль" id="password" name="password" type="password" value={""} 
            onChange={ handleChangePassword } required/>
          <button type="submit" className="login__link button">Зарегистрироваться</button>
          <p className="login__info">Уже зарегистрированы? Войти</p>
        </form>
      </div>  
    </div>
  )

}

export default Register