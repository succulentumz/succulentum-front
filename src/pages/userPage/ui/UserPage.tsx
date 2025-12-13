import { type FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useStyles from './UserPage.styles';

import { renderEmojiIcon } from '../../../shared/ui';

export const UserPage: FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState('о себе...');
  const menuRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // Фокус на textarea при включении режима редактирования
  useEffect(() => {
    if (isEditingAbout && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditingAbout]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditProfile = () => {
    setIsEditingAbout(true);
    setIsMenuOpen(false);
  };

  const handleSaveAbout = () => {
    setIsEditingAbout(false);
    // Здесь можно добавить логику сохранения на сервер
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutText(e.target.value);
  };

  const handleAboutKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSaveAbout();
    }
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
              <div
                //src="/src/shared/ui/EmojiIcon/assets/ava.jpg"
                className={styles.avatarImage}
              >
                {renderEmojiIcon('ava')}
              </div>
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
              ref={textareaRef}
              className={styles.aboutTextarea}
              placeholder="о себе..."
              value={aboutText}
              readOnly={!isEditingAbout}
              onChange={handleAboutChange}
              onKeyDown={handleAboutKeyDown}
              onBlur={handleSaveAbout}
              style={{
                cursor: isEditingAbout ? 'text' : 'default',
                backgroundColor: isEditingAbout ? '#ffffff' : '#f5f5f5'
              }}
            />
            {isEditingAbout && (
              <div className={styles.editHint}>
                Нажмите Ctrl+Enter для сохранения или кликните вне поля
              </div>
            )}
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
              Журнал
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
            <button
              className={styles.menuItem}
              onClick={handleEditProfile}
            >
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
