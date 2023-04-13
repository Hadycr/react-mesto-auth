import {useState} from 'react';

function Login(onSubmit) {
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
      <p className="login__entrance">Вход</p>
      <form className="login__form" onSubmit ={onSubmit}>
        <input  placeholder="Email" id="email" type="text" name="email" value={email||""} 
          onChange={ handleChangeEmail } required/>
        <input placeholder="Пароль" id="password" name="password" type="password" value={""} 
          onChange={ handleChangePassword } required/>
        <button type="submit" className="login__link">Войти</button>
      </form>
    </div>
  )

}

export default Login