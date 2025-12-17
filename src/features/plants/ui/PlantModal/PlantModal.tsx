import { type FC, useState, useRef, useEffect } from 'react';

import {
  useApiQuery,
  type IPlant,
  plantEditKey,
  plantDeleteKey,
  plantBuryKey,
  type IEditPlantRequest,
} from '@/shared/api';

import useStyles from './PlantModal.styles';

export interface IPlantModalProps {
  plant: IPlant;
  redactionAllowed: boolean;
  onClose: () => void;
  openJournal: () => void;
  onRedactionSubmit?: (newPlant: IPlant) => void;
  onDeleteSubmit?: () => void;
}

export const PlantModal: FC<IPlantModalProps> = ({
  plant,
  onClose,
  openJournal,
  onRedactionSubmit,
  onDeleteSubmit,
}) => {
  const styles = useStyles();

  // Состояния интерфейса
  const [isEditing, setIsEditing] = useState(false);
  const [plantName, setPlantName] = useState(plant.name);
  const [status, setStatus] = useState<'alive' | 'dead'>(
    plant.lifeStatus === 'ALIVE' ? 'alive' : 'dead'
  );
  const [aboutText, setAboutText] = useState(plant.description || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
  const [showJournalTooltip, setShowJournalTooltip] = useState(false);
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const [showSaveTooltip, setShowSaveTooltip] = useState(false);
  const [showStatusSelect, setShowStatusSelect] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedLargeImage, setSelectedLargeImage] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Состояния для API запросов
  const [editPlantParams, setEditPlantParams] = useState<{
    plantId: IPlant['id'];
    name?: string;
    description?: string;
    lifeStatus?: 'ALIVE' | 'DEAD';
  } | null>(null);

  const [deletePlantParams, setDeletePlantParams] = useState<{ plantId: IPlant['id'] } | null>(null);
  const [buryPlantParams, setBuryPlantParams] = useState<{ plantId: IPlant['id'] } | null>(null);

  // ============ API ЗАПРОСЫ С useApiQuery ============
  // 1. Запрос на редактирование растения (PATCH /api/plants/:plantId)
  const editPlantQuery = useApiQuery(
    plantEditKey,
    editPlantParams || undefined,
    { enabled: !!editPlantParams }
  );

  // 2. Запрос на удаление растения (DELETE /api/plants/:plantId)
  const deletePlantQuery = useApiQuery(
    plantDeleteKey,
    deletePlantParams || undefined,
    { enabled: !!deletePlantParams }
  );

  // 3. Запрос на похоронение растения (POST /api/plants/:plantId)
  const buryPlantQuery = useApiQuery(
    plantBuryKey,
    buryPlantParams || undefined,
    { enabled: !!buryPlantParams }
  );

  // ============ ЭФФЕКТЫ ДЛЯ ОБРАБОТКИ РЕЗУЛЬТАТОВ ЗАПРОСОВ ============
  // Обработка успешного редактирования
  useEffect(() => {
    if (editPlantQuery.data && editPlantParams && !editPlantQuery.isLoading) {
      console.log('Растение успешно отредактировано:', editPlantQuery.data);
      console.log('Исходный ID:', plant.id, 'Полученный ID:', editPlantQuery.data.id);

      // Проверяем, что ID растения не изменился (не создалось новое)
      if (editPlantQuery.data.id === plant.id) {
        onRedactionSubmit?.(editPlantQuery.data);
      } else {
        console.error('Создалось новое растение вместо редактирования!');
        alert('Ошибка: создалось новое растение вместо редактирования существующего');
      }

      setEditPlantParams(null);
      setIsEditing(false);
    }
  }, [editPlantQuery.data, editPlantQuery.isLoading, editPlantParams, onRedactionSubmit, plant.id]);

  // Обработка ошибок редактирования
  useEffect(() => {
    if (editPlantQuery.error && editPlantParams) {
      console.error('Ошибка при редактировании растения:', editPlantQuery.error);
      alert('Не удалось сохранить изменения. Попробуйте еще раз.');
      setEditPlantParams(null);
    }
  }, [editPlantQuery.error, editPlantParams]);

  // Обработка успешного удаления
  useEffect(() => {
    if (deletePlantQuery.data && deletePlantParams && !deletePlantQuery.isLoading) {
      console.log('Растение успешно удалено');
      onDeleteSubmit?.();
      setDeletePlantParams(null);
      onClose();
    }
  }, [deletePlantQuery.data, deletePlantQuery.isLoading, deletePlantParams, onDeleteSubmit, onClose]);

  // Обработка ошибок удаления
  useEffect(() => {
    if (deletePlantQuery.error && deletePlantParams) {
      console.error('Ошибка при удалении растения:', deletePlantQuery.error);
      alert('Не удалось удалить растение. Попробуйте еще раз.');
      setDeletePlantParams(null);
    }
  }, [deletePlantQuery.error, deletePlantParams]);

  // Обработка успешного похоронения
  useEffect(() => {
    if (buryPlantQuery.data && buryPlantParams && !buryPlantQuery.isLoading) {
      console.log('Растение успешно похоронено:', buryPlantQuery.data);

      // Проверяем, что ID растения не изменился
      if (buryPlantQuery.data.id === plant.id) {
        onRedactionSubmit?.(buryPlantQuery.data);
        setStatus('dead');
      } else {
        console.error('Создалось новое растение при похоронении!');
        alert('Ошибка при похоронении растения');
      }

      setBuryPlantParams(null);
    }
  }, [buryPlantQuery.data, buryPlantQuery.isLoading, buryPlantParams, onRedactionSubmit, plant.id]);

  // Обработка ошибок похоронения
  useEffect(() => {
    if (buryPlantQuery.error && buryPlantParams) {
      console.error('Ошибка при похоронении растения:', buryPlantQuery.error);
      alert('Не удалось похоронить растение. Попробуйте еще раз.');
      setBuryPlantParams(null);
    }
  }, [buryPlantQuery.error, buryPlantParams]);

  // Закрытие при клике вне модалки и по Escape
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  // ============ ОБРАБОТЧИКИ ДЕЙСТВИЙ ПОЛЬЗОВАТЕЛЯ ============
  // Включение режима редактирования
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Сохранение изменений
  const handleSaveClick = () => {
    // Собираем данные для редактирования
    // Важно: plantId должен передаваться как часть params, не включать его в body
    const editRequest = {
      plantId: plant.id,
      name: plantName,
      description: aboutText,
    };

    console.log('Отправляем запрос на редактирование:', editRequest);
    setEditPlantParams(editRequest);
  };

  // Показать выбор статуса
  const handleStatusClick = () => {
    setShowStatusSelect(true);
  };

  // Выбор статуса растения
  const handleStatusSelect = (selectedStatus: 'alive' | 'dead') => {
    const newStatus = selectedStatus === 'alive' ? 'ALIVE' : 'DEAD';

    const editRequest = {
      plantId: plant.id,
      lifeStatus: newStatus,
    };

    console.log('Отправляем запрос на изменение статуса:', editRequest);
    setEditPlantParams(editRequest);
    setStatus(selectedStatus);
    setShowStatusSelect(false);
  };

  // Похоронение растения
  const handleBuryClick = () => {
    console.log('Отправляем запрос на похоронение:', { plantId: plant.id });
    setBuryPlantParams({ plantId: plant.id });
  };

  //открытие растения
  const handleJournalClick = openJournal;

  // Удаление растения
  const handleDeleteClick = () => {
    if (window.confirm('Вы уверены, что хотите удалить растение?')) {
      console.log('Отправляем запрос на удаление:', { plantId: plant.id });
      setDeletePlantParams({ plantId: plant.id });
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setSelectedLargeImage(plantImages[index]);
    setIsImageModalOpen(true);
  };

  // ============ ДАННЫЕ ДЛЯ ОТОБРАЖЕНИЯ ============
  // Массив изображений растения
  const plantImages = [
    `/src/shared/ui/EmojiIcon/assets/kaktus.jpg`,
    `/src/shared/ui/EmojiIcon/assets/kaktus.jpg`,
    `/src/shared/ui/EmojiIcon/assets/kaktus.jpg`,
    `/src/shared/ui/EmojiIcon/assets/kaktus.jpg`,
    `/src/shared/ui/EmojiIcon/assets/kaktus.jpg`,
  ];

  // Пути к иконкам
  const icons = {
    pencil: '/src/shared/ui/EmojiIcon/assets/pencil.png',
    trash: '/src/shared/ui/EmojiIcon/assets/trash.png',
    journal: '/src/shared/ui/EmojiIcon/assets/journal.png',
    save: '/src/shared/ui/EmojiIcon/assets/save.png',
  };

  // Проверяем, выполняется ли какой-либо запрос
  const isLoading = editPlantQuery.isLoading || deletePlantQuery.isLoading || buryPlantQuery.isLoading;

  // ============ РЕНДЕРИНГ КОМПОНЕНТА ============
  return (
    <>
      {/* Основная модалка */}
      <div className={styles.modalContainer} ref={modalRef}>

        {/* Индикатор загрузки */}
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}>Загрузка...</div>
          </div>
        )}

        {/* Название растения в левом верхнем углу */}
        <div className={styles.plantNameContainer}>
          {isEditing ? (
            <input
              className={styles.plantNameInput}
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              placeholder="Название растения"
              autoFocus
              disabled={isLoading}
            />
          ) : (
            <div className={styles.plantNameDisplay}>{plantName}</div>
          )}
        </div>

        {/* Левая часть - изображения */}
        <div className={styles.leftSection}>
          {/* Основное изображение */}
          <div className={styles.mainImageContainer}>
            <img
              src={plantImages[selectedImageIndex]}
              alt={plant.name}
              className={styles.mainImage}
            />
          </div>

          {/* Галерея маленьких изображений */}
          <div className={styles.imageGallery}>
            {plantImages.map((image, index) => (
              <div
                key={index}
                className={styles.galleryImageWrapper}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image}
                  alt={`${plant.name} ${index + 1}`}
                  className={styles.galleryImage}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Правая часть - информация и управление */}
        <div className={styles.rightSection}>
          {/* Поле "О растении" */}
          <textarea
            className={styles.aboutTextarea}
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            readOnly={!isEditing || isLoading}
            placeholder="О растении"
            disabled={isLoading}
          />

          {/* Статус и кнопка редактирования */}
          <div className={styles.statusContainer}>
            <div className={styles.statusRow}>
              {showStatusSelect ? (
                <>
                  <button
                    className={styles.statusOption}
                    onClick={() => handleStatusSelect('alive')}
                    disabled={isLoading}
                  >
                    жив
                  </button>
                  <button
                    className={styles.statusOption}
                    onClick={() => handleStatusSelect('dead')}
                    disabled={isLoading}
                  >
                    мёртв
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.statusLabel}>{status === 'alive' ? 'жив' : 'мёртв'}</div>
                  <button
                    className={styles.editStatusButton}
                    onClick={handleStatusClick}
                    title="Изменить статус"
                    disabled={isLoading}
                  >
                    <img src={icons.pencil} alt="Изменить статус" />
                  </button>
                </>
              )}
            </div>

            {status === 'dead' && !showStatusSelect && (
              <button
                className={styles.buryButton}
                onClick={handleBuryClick}
                disabled={isLoading}
              >
                Похоронить
              </button>
            )}
          </div>

          {/* Круги действий */}
          <div className={styles.actionCircles}>
            {/* Удалить */}
            <div
              className={styles.actionCircleWrapper}
              onMouseEnter={() => setShowDeleteTooltip(true)}
              onMouseLeave={() => setShowDeleteTooltip(false)}
            >
              <button
                className={styles.actionCircle}
                onClick={handleDeleteClick}
                disabled={isLoading}
              >
                <img src={icons.trash} alt="Удалить" />
              </button>
              {showDeleteTooltip && <div className={styles.tooltip}>Удалить</div>}
            </div>

            {/* Журнал */}
            <div
              className={styles.actionCircleWrapper}
              onMouseEnter={() => setShowJournalTooltip(true)}
              onMouseLeave={() => setShowJournalTooltip(false)}
            >
              <button
                className={styles.actionCircle}
                onClick={handleJournalClick}
                disabled={isLoading}
              >
                <img src={icons.journal} alt="Журнал" />
              </button>
              {showJournalTooltip && <div className={styles.tooltip}>Журнал</div>}
            </div>

            {/* Редактировать/Сохранить */}
            <div
              className={styles.actionCircleWrapper}
              onMouseEnter={() => (isEditing ? setShowSaveTooltip(true) : setShowEditTooltip(true))}
              onMouseLeave={() =>
                isEditing ? setShowSaveTooltip(false) : setShowEditTooltip(false)
              }
            >
              <button
                className={styles.actionCircle}
                onClick={isEditing ? handleSaveClick : handleEditClick}
                disabled={isLoading}
              >
                <img
                  src={isEditing ? icons.save : icons.pencil}
                  alt={isEditing ? 'Сохранить' : 'Редактировать'}
                />
              </button>
              {isEditing
                ? showSaveTooltip && <div className={styles.tooltip}>Сохранить</div>
                : showEditTooltip && <div className={styles.tooltip}>Редактировать</div>}
            </div>
          </div>
        </div>

        {/* Кнопка "назад" */}
        <button
          className={styles.backButton}
          onClick={onClose}
          disabled={isLoading}
        >
          назад
        </button>
      </div>

      {/* Модалка для увеличенного изображения */}
      {isImageModalOpen && (
        <div className={styles.imageModalOverlay} onClick={() => setIsImageModalOpen(false)}>
          <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeImageModal} onClick={() => setIsImageModalOpen(false)}>
              ×
            </button>
            <img
              src={selectedLargeImage}
              alt="Увеличенное изображение"
              className={styles.largeImage}
            />
          </div>
        </div>
      )}
    </>
  );
};
