import './ConfirmModal.css';

interface ConfirmModalProps {
  isOpen: boolean;
  type: 'logout' | 'delete';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  type, 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  const title = type === 'logout' ? 'Вы уверены что хотите выйти?' : 'Вы уверены что хотите удалить учетную запись?';
  const confirmText = type === 'logout' ? 'Выйти' : 'Удалить';

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <h3 className="confirm-modal-title">{title}</h3>
        <div className="confirm-modal-buttons">
          <button 
            className="confirm-modal-button cancel-button"
            onClick={onCancel}
          >
            Отмена
          </button>
          <button 
            className={`confirm-modal-button confirm-button--blue`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;