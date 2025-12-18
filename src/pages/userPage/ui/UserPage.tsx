import { type FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ============ ИМПОРТЫ API ============
import { useApiQuery, type IMe, meFetchKey, meEditKey } from '@/shared/api';

import useStyles from './UserPage.styles';

import { renderEmojiIcon } from '../../../shared/ui';
import { clearAccessToken } from '@/shared/global';

export const UserPage: FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  // ============ СОСТОЯНИЯ ИНТЕРФЕЙСА ============
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false); // Режим редактирования профиля
  const [username, setUsername] = useState(''); // Имя пользователя из API
  const [email, setEmail] = useState(''); // Email из API
  const [aboutText, setAboutText] = useState('Привет, я коллекционирую кактусы и цветы');

  const menuRef = useRef<HTMLDivElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // ============ API ЗАПРОСЫ ============
  // 1. Запрос на получение данных пользователя
  const fetchUserQuery = useApiQuery(
    meFetchKey, // Ключ запроса для получения данных пользователя
    {}, // Параметры не нужны для GET /api/users/api/me
    { enabled: true } // Всегда выполняем при монтировании
  );

  // 2. Состояние для запроса на редактирование
  const [editUserParams, setEditUserParams] = useState<{
    username?: string;
    email?: string;
  } | null>(null);

  // 3. Запрос на редактирование пользователя
  const editUserQuery = useApiQuery(
    meEditKey, // Ключ запроса для редактирования
    editUserParams || undefined, // Параметры для редактирования
    { enabled: !!editUserParams } // Выполняется только когда есть параметры
  );

  // ============ ЭФФЕКТЫ ДЛЯ ОБРАБОТКИ ДАННЫХ ============

  // Обработка успешного получения данных пользователя
  useEffect(() => {
    if (fetchUserQuery.data && !fetchUserQuery.isLoading) {
      console.log('Данные пользователя получены:', fetchUserQuery.data);

      // Преобразуем данные из IMeRaw (строковые даты) в IMe (Date объекты)
      // или используем как есть, в зависимости от формата
      const userData = fetchUserQuery.data as IMe; // Предполагаем, что mapper уже преобразовал

      setUsername(userData.username || '');
      setEmail(userData.email || '');

      // Здесь можно также установить aboutText, если оно есть в API
      // Но в IMe нет поля about, так что оставляем как есть
    }
  }, [fetchUserQuery.data, fetchUserQuery.isLoading]);

  // Обработка успешного редактирования пользователя
  useEffect(() => {
    if (editUserQuery.data && editUserParams && !editUserQuery.isLoading) {
      console.log('Профиль успешно обновлён:', editUserQuery.data);

      // Обновляем локальные состояния из ответа
      const updatedData = editUserQuery.data as IMe;
      setUsername(updatedData.username || '');
      setEmail(updatedData.email || '');

      // Выходим из режима редактирования
      setIsEditingProfile(false);
      setEditUserParams(null);
    }
  }, [editUserQuery.data, editUserParams, editUserQuery.isLoading]);

  // Обработка ошибок редактирования
  useEffect(() => {
    if (editUserQuery.error && editUserParams) {
      console.error('Ошибка при обновлении профиля:', editUserQuery.error);
      alert('Не удалось обновить профиль. Попробуйте еще раз.');
      setEditUserParams(null);
    }
  }, [editUserQuery.error, editUserParams]);

  // ============ ОБРАБОТКА ИНТЕРФЕЙСА ============

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

  // Фокус на поле ввода имени при включении режима редактирования
  useEffect(() => {
    if (isEditingProfile && usernameInputRef.current) {
      usernameInputRef.current.focus();
      usernameInputRef.current.select();
    }
  }, [isEditingProfile]);

  // ============ ОБРАБОТЧИКИ ДЕЙСТВИЙ ============

  // Переключение меню
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Включение режима редактирования профиля
  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setIsMenuOpen(false);
  };

  // Сохранение изменений профиля
  const handleSaveProfile = () => {
    // Собираем данные для отправки
    const editRequest = {
      username: username,
      email: email,
    };

    console.log('Отправляем запрос на обновление профиля:', editRequest);
    setEditUserParams(editRequest);
  };

  // Выход из профиля
  const handleLogout = () => {
    console.log('Кнопка выхода нажата, но функционал временно отключен');
    alert('Функция выхода временно недоступна. Ожидается clearAccessToken.');

    console.log('Выход из профиля');

    // 1. Очищаем access token
    try {
      clearAccessToken(); // Предполагаем, что эта функция существует
    } catch (error) {
      console.error('Ошибка при очистке токена:', error);
    }

    // 2. Перенаправляем на страницу логина
    navigate('/login');

    setIsMenuOpen(false);
  };

  // Обработка нажатия клавиш при редактировании
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSaveProfile();
    }
    if (e.key === 'Escape') {
      setIsEditingProfile(false);
      // Можно восстановить исходные значения из fetchUserQuery.data
    }
  };

  // ============ ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ ============
  // Проверяем, выполняется ли загрузка или редактирование
  const isLoading = fetchUserQuery.isLoading || editUserQuery.isLoading;

  // ============ РЕНДЕРИНГ ============
  return (
    <div className={styles.container}>
      {/* Верхняя часть с фоновым изображением */}
      <div className={styles.topSection} />

      {/* Нижняя часть с цветом */}
      <div className={styles.bottomSection} />

      {/* Основной контент */}
      <div className={styles.content}>

        {/* ============ ЛЕВАЯ ЧАСТЬ - АВАТАР И ИНФОРМАЦИЯ ============ */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            <div className={styles.largeCircle} />
            <div className={styles.avatarCircle}>
              <div className={styles.avatarImage}>
                {renderEmojiIcon('ava')}
              </div>
            </div>
          </div>

          {/* Имя пользователя и email */}
          <div className={styles.userInfo}>
            {isEditingProfile ? (
              // Режим редактирования
              <div className={styles.editForm}>
                <input
                  ref={usernameInputRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Имя пользователя"
                  className={styles.editInput}
                  disabled={isLoading}
                />
                <input
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Email"
                  className={styles.editInput}
                  disabled={isLoading}
                />
                <div className={styles.editButtons}>
                  <button
                    onClick={handleSaveProfile}
                    className={styles.saveButton}
                    disabled={isLoading}
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className={styles.cancelButton}
                    disabled={isLoading}
                  >
                    Отмена
                  </button>
                </div>
                {editUserQuery.isLoading && (
                  <div className={styles.loadingText}>Сохранение...</div>
                )}
              </div>
            ) : (
              // Режим просмотра
              <>
                <h1 className={styles.userName}>
                  {isLoading ? 'Загрузка...' : username || 'Без имени'}
                </h1>
                <div className={styles.userEmail}>
                  {isLoading ? 'Загрузка...' : email || 'Email не указан'}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ============ ПРАВАЯ ЧАСТЬ - О СЕБЕ И КНОПКИ ============ */}
        <div className={styles.rightSection}>
          {/* Поле "О себе" - статичное, не редактируется через API */}
          <div className={styles.aboutSection}>
            <textarea
              className={styles.aboutTextarea}
              placeholder="о себе..."
              value={aboutText}
              readOnly={true} // Только для чтения
              style={{
                cursor: 'default',
                backgroundColor: '#f5f5f5'
              }}
            />
          </div>

          {/* Кнопки навигации */}
          <div className={styles.buttonsContainer}>
            <button
              className={styles.navButton}
              onClick={() => navigate('/collection')}
              disabled={isLoading}
            >
              Коллекции
            </button>
            <button
              className={styles.navButton}
              onClick={() => navigate('/graveyard')}
              disabled={isLoading}
            >
              Кладбище
            </button>
          </div>
        </div>
      </div>

      {/* ============ КНОПКА МЕНЮ ПРОФИЛЯ ============ */}
      <div className={styles.menuContainer} ref={menuRef}>
        <button
          className={styles.menuButton}
          onClick={handleMenuToggle}
          disabled={isLoading}
        >
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
              disabled={isLoading}
            >
              Редактировать
            </button>
            <button
              className={styles.menuItem}
              onClick={handleLogout}
              //disabled={isLoading}
              disabled // Делаем некликабельной
              style={{ opacity: 0.6, cursor: 'not-allowed' }} // Дополнительные стили
              title="Функция временно недоступна"
            >
              Выйти из профиля
            </button>
            {/* Кнопка "Удалить профиль" убрана по заданию */}
          </div>
        )}
      </div>
    </div>
  );
};
