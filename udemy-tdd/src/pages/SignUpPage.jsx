import { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [apiProgress, setApiProgress] = useState(false);

  const onChangeUsername = event => {
    const currentValue = event.target.value;
    setUsername(currentValue);
  };
  const onchangeEmail = event => {
    const currentValue = event.target.value;
    setEmail(currentValue);
  };
  const onChangePassword = event => {
    const currentValue = event.target.value;
    setPassword(currentValue);
    setDisabled(currentValue !== passwordRepeat);
  };
  const onChangePasswordRepeat = event => {
    const currentValue = event.target.value;
    setPasswordRepeat(currentValue);
    setDisabled(currentValue !== password);
  };

  const submit = event => {
    event.preventDefault();
    const body = {
      username,
      email,
      password,
    };

    setApiProgress(true);
    // axios 버전
    axios.post('/api/1.0/users', body);

    // fetch 버전
    // fetch('/api/1.0/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input id="username" onChange={onChangeUsername} />
        <label htmlFor="email">E-mail</label>
        <input id="email" onChange={onchangeEmail} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={onChangePassword} />
        <label htmlFor="passwordRepeat">Password Repeat</label>
        <input id="passwordRepeat" type="password" onChange={onChangePasswordRepeat} />
        <button disabled={disabled || apiProgress} onClick={submit}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUpPage;
