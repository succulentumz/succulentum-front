import { type FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useStyles from './UserPage.styles';

export const UserPage: FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      {/* Верхняя часть с фоновым изображением */}
      <div className={styles.topSection} />

      {/* Нижняя часть с цветом */}
      <div className={styles.bottomSection} />

      {/* Основной контент */}
      <div className={styles.content}>

        {/* Аватар и круг */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            <div className={styles.largeCircle} />
            <div className={styles.avatarCircle}>
              <img
                src="/src/shared/ui/EmojiIcon/assets/ava.jpg"
                alt="Аватар пользователя"
                className={styles.avatarImage}
              />
            </div>
          </div>

          {/* Имя пользователя */}
          <h1 className={styles.userName}>Александр Некрасов</h1>
        </div>

        {/* Правая часть с полем "О себе" и кнопками */}
        <div className={styles.rightSection}>
          {/* Поле "О себе" */}
          <div className={styles.aboutSection}>
            <textarea
              className={styles.aboutTextarea}
              placeholder="о себе..."
              defaultValue="о себе..."
              readOnly
            />
          </div>

          {/* Кнопки навигации */}
          <div className={styles.buttonsContainer}>
            <button
              className={styles.navButton}
              onClick={() => navigate('/collection')}
            >
              Коллекции
            </button>
            <button className={styles.navButton} disabled>
              Растения
            </button>
            <button className={styles.navButton} disabled>
              Кладбище
            </button>
            <button className={styles.navButton} disabled>
              журнал
            </button>
          </div>
        </div>
      </div>

      {/* Кнопка меню профиля */}
      <div className={styles.menuContainer} ref={menuRef}>
        <button className={styles.menuButton} onClick={handleMenuToggle}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </button>

        {/* Выпадающее меню */}
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <button className={styles.menuItem} disabled>
              Редактировать
            </button>
            <button className={styles.menuItem} disabled>
              Выйти из профиля
            </button>
            <button className={styles.menuItem} disabled>
              Удалить профиль
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
