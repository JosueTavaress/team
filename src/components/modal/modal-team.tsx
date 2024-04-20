import React from 'react'
import './styles.css'
import { ModalProps } from './types'

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modalBackdrop">
      <div className="modalWrapper">
        <div className="modal">
          <div className="modalHeader">
            <h3 className="modalTitle">{title}</h3>
            <button onClick={onClose} className="closeButton">Close</button>
          </div>
          <div className="modalBody">
            {children}
          </div>
          <div className="modalFooter">
            <button onClick={onClose} className="closeButton">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal
