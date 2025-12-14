import { type FC, useState, useRef, useEffect } from 'react';

import { type IPlant } from '@/shared/api';

import useStyles from './PlantModal.styles';

export interface IPlantModalProps {
  plant: IPlant;
  // От режима просмотра (гостевого режима, режима без редактирования) отказались, `redactionAllowed` не используется...
  // ... Хотя можешь реализовать режим. Вопрос в том, будет ли у тебя время на это.
  redactionAllowed: boolean;
  onClose: () => void;
  openJournal: () => void;
  onRedactionSubmit?: (newPlant: IPlant) => void;
  onDeleteSubmit?: () => void;
}

export const PlantModal: FC<IPlantModalProps> = ({ plant, onClose, openJournal }) => {
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<'alive' | 'dead'>('alive');
  const [aboutText, setAboutText] = useState('О растении');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
  const [showJournalTooltip, setShowJournalTooltip] = useState(false);
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const [showSaveTooltip, setShowSaveTooltip] = useState(false);
  const [showStatusSelect, setShowStatusSelect] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedLargeImage, setSelectedLargeImage] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Здесь будет логика сохранения изменений
  };

  const handleStatusClick = () => {
    setShowStatusSelect(true);
  };

  const handleStatusSelect = (selectedStatus: 'alive' | 'dead') => {
    setStatus(selectedStatus);
    setShowStatusSelect(false);
  };

  const handleBuryClick = () => {
    alert('Кладбище пока не создано');
  };

  const handleJournalClick = openJournal;

  const handleDeleteClick = () => {
    // Пока неактивно
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setSelectedLargeImage(plantImages[index]);
    setIsImageModalOpen(true);
  };

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

  return (
    <>
      {/* Основная модалка */}
        <div className={styles.modalContainer} ref={modalRef}>
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
              readOnly={!isEditing}
              placeholder="О растении"
            />

            {/* Статус и кнопка редактирования */}
            <div className={styles.statusContainer}>
              <div className={styles.statusRow}>
                {showStatusSelect ? (
                  <>
                    <button
                      className={styles.statusOption}
                      onClick={() => handleStatusSelect('alive')}
                    >
                      жив
                    </button>
                    <button
                      className={styles.statusOption}
                      onClick={() => handleStatusSelect('dead')}
                    >
                      мёртв
                    </button>
                  </>
                ) : (
                  <>
                    <div className={styles.statusLabel}>
                      {status === 'alive' ? 'жив' : 'мёртв'}
                    </div>
                    <button
                      className={styles.editStatusButton}
                      onClick={handleStatusClick}
                      title="Изменить статус"
                    >
                      <img src={icons.pencil} alt="Изменить статус" />
                    </button>
                  </>
                )}
              </div>

              {status === 'dead' && !showStatusSelect && (
                <button className={styles.buryButton} onClick={handleBuryClick}>
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
                  disabled
                >
                  <img src={icons.trash} alt="Удалить" />
                </button>
                {showDeleteTooltip && (
                  <div className={styles.tooltip}>Удалить</div>
                )}
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
                >
                  <img src={icons.journal} alt="Журнал" />
                </button>
                {showJournalTooltip && (
                  <div className={styles.tooltip}>Журнал</div>
                )}
              </div>

              {/* Редактировать/Сохранить */}
              <div
                className={styles.actionCircleWrapper}
                onMouseEnter={() =>
                  isEditing ? setShowSaveTooltip(true) : setShowEditTooltip(true)
                }
                onMouseLeave={() =>
                  isEditing ? setShowSaveTooltip(false) : setShowEditTooltip(false)
                }
              >
                <button
                  className={styles.actionCircle}
                  onClick={isEditing ? handleSaveClick : handleEditClick}
                >
                  <img
                    src={isEditing ? icons.save : icons.pencil}
                    alt={isEditing ? "Сохранить" : "Редактировать"}
                  />
                </button>
                {isEditing ? (
                  showSaveTooltip && <div className={styles.tooltip}>Сохранить</div>
                ) : (
                  showEditTooltip && <div className={styles.tooltip}>Редактировать</div>
                )}
              </div>
            </div>
          </div>

          {/* Кнопка "назад" */}
          <button className={styles.backButton} onClick={onClose}>
            назад
          </button>
        </div>

      {/* Модалка для увеличенного изображения */}
      {isImageModalOpen && (
        <div className={styles.imageModalOverlay} onClick={() => setIsImageModalOpen(false)}>
          <div
            className={styles.imageModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeImageModal}
              onClick={() => setIsImageModalOpen(false)}
            >
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
