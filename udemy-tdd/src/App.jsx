import { useState } from 'react';

import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';

const App = function () {
  const [path, setPath] = useState(window.location.pathname);

  const onClickLink = event => {
    event.preventDefault();
    const path = event.target.attributes.href.value;
    window.history.pushState({}, '', path);
    setPath(path);
  };

  return (
    <>
      <div>
        <a href="/" title="Home" onClick={onClickLink}>
          TDD
        </a>
        <a href="/signup" title="Sign Up" onClick={onClickLink}>
          sign up
        </a>
        <a href="/login" title="Login" onClick={onClickLink}>
          login
        </a>
      </div>

      {window.location.pathname === '/' && <HomePage />}
      {window.location.pathname === '/signup' && <SignUpPage />}
      {window.location.pathname.startsWith('/user/') && <UserPage />}
      {window.location.pathname === '/login' && <LoginPage />}
    </>
  );
};

export default App;
