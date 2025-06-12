import { useState, useEffect, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = forwardRef(({
  isOpen = false,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  closeOnEscapeKey = true,
  showCloseButton = true,
  loading = false,
  className = '',
  overlayClassName = '',
  ...props
}, ref) => {
  const [isClosing, setIsClosing] = useState(false);
  const [portalElement, setPortalElement] = useState(null);

  // Create portal element
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let element = document.getElementById('modal-portal');
    let created = false;
    
    if (!element) {
      element = document.createElement('div');
      element.id = 'modal-portal';
      element.style.position = 'relative';
      element.style.zIndex = '9999';
      
      if (document.body) {
        document.body.appendChild(element);
        created = true;
      }
    }
    
    setPortalElement(element);
    
    return () => {
      if (created && element && element.children.length === 0 && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    const originalStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    const scrollbarWidth = typeof window !== 'undefined' 
      ? window.innerWidth - document.documentElement.clientWidth 
      : 0;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.paddingRight = originalStyle.paddingRight;
    };
  }, [isOpen]);

  // Handle close with animation
  const handleClose = () => {
    if (loading) return;
    
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose?.();
    }, 200);
  };

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscapeKey || typeof document === 'undefined') return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscapeKey, loading]);

  // Basic focus management
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = document.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );
    
    const modalFocusableElements = Array.from(focusableElements).filter(el => {
      return document.getElementById('modal-portal')?.contains(el);
    });

    if (modalFocusableElements.length > 0) {
      setTimeout(() => {
        modalFocusableElements[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      handleClose();
    }
  };

  // Don't render if not open and not closing
  if (!isOpen && !isClosing) {
    return null;
  }

  // Don't render if portal element is not ready
  if (!portalElement || typeof document === 'undefined') {
    return null;
  }

  const overlayClasses = [
    styles.overlay,
    isClosing && styles.overlayClosing,
    overlayClassName
  ].filter(Boolean).join(' ');

  const modalClasses = [
    styles.modal,
    styles[size],
    isClosing && styles.modalClosing,
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  // Close icon component
  const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const modalContent = (
    <div 
      className={overlayClasses}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={ref}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby="modal-body"
        {...props}
      >
        {/* Loading overlay */}
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner} aria-hidden="true" />
          </div>
        )}

        {/* Header */}
        {(title || showCloseButton) && (
          <div className={styles.header}>
            {title && (
              <h2 id="modal-title" className={styles.title}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Close modal"
                disabled={loading}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div 
          id="modal-body" 
          className={`${styles.body} ${!title && !showCloseButton ? styles.bodyNoPadding : ''}`}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  try {
    return createPortal(modalContent, portalElement);
  } catch (error) {
    console.warn('Portal rendering failed:', error);
    return null;
  }
});

Modal.displayName = 'Modal';

// Modal Header subcomponent
const ModalHeader = ({ title, onClose, className = '', children, ...props }) => {
  const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <div className={`${styles.header} ${className}`} {...props}>
      {children || (
        <>
          {title && <h2 className={styles.title}>{title}</h2>}
          {onClose && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          )}
        </>
      )}
    </div>
  );
};

// Modal Body subcomponent
const ModalBody = ({ children, noPadding = false, className = '', ...props }) => {
  const bodyClasses = [
    styles.body,
    noPadding && styles.bodyNoPadding,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={bodyClasses} {...props}>
      {children}
    </div>
  );
};

// Modal Footer subcomponent
const ModalFooter = ({ children, spaceBetween = false, className = '', ...props }) => {
  const footerClasses = [
    styles.footer,
    spaceBetween && styles.footerSpaceBetween,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
};

// PropTypes
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'fullscreen']),
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscapeKey: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
};

ModalHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
  noPadding: PropTypes.bool,
  className: PropTypes.string,
};

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
  spaceBetween: PropTypes.bool,
  className: PropTypes.string,
};

// Attach subcomponents
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;