import React from 'react';
import { createPortal } from 'react-dom';
import { noop } from '../utils';

interface ModalProps {
  onDismiss?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onDismiss = noop }) => {
  const renderModal = () => {
    return (
      <div
        className="flex items-center justify-center fixed z-50 bg-gray-900 bg-opacity-50 top-0 bottom-0 right-0 left-0 text-gray-900 antialiased"
        onClick={handleClickOutside}
      >
        {children}
      </div>
    );
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      onDismiss();
    }
  };

  const domElement = document.getElementById('modal');
  return domElement ? createPortal(renderModal(), domElement) : null;
};
