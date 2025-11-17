import { type FC } from 'react';

export const RegistrationPage: FC = () => {
  // ...
  return (
    <div>
      <h1>Регистрация</h1>
      {/* Здесь будет форма регистрации */}
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Пароль" />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};
