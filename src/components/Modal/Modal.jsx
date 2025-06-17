import { useState, useEffect, forwardRef, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const Modal = forwardRef(({
  isOpen = false,
  onClose,
  title,
  children,
  footer,
  size = 'md', // 'xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'
  variant = 'default', // 'default', 'minimal', 'floating', 'glass'
  closeOnOverlayClick = true,
  closeOnEscapeKey = true,
  showCloseButton = true,
  loading = false,
  persistent = false,
  centered = true,
  blurBackground = false,
  preventBodyScroll = true,
  animationDuration = 300,
  className = '',
  overlayClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  onOpen,
  onAfterOpen,
  onAfterClose,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [portalElement, setPortalElement] = useState(null);
  const [previousFocus, setPreviousFocus] = useState(null);
  
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const animationTimeoutRef = useRef(null);

  // Combine internal ref with forwarded ref
  const combinedRef = useCallback((node) => {
    modalRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  }, [ref]);

  // Create portal element with setup
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let element = document.getElementById('modal-portal');
    let created = false;
    
    if (!element) {
      element = document.createElement('div');
      element.id = 'modal-portal';
      element.style.position = 'fixed';
      element.style.top = '0';
      element.style.left = '0';
      element.style.zIndex = '9999';
      element.style.pointerEvents = 'none';
      
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

  // Body scroll lock with scrollbar compensation
  useEffect(() => {
    if (!isOpen || !preventBodyScroll || typeof document === 'undefined') return;

    const originalStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
      position: document.body.style.position,
    };

    // Store current focus
    setPreviousFocus(document.activeElement);

    const scrollbarWidth = typeof window !== 'undefined' 
      ? window.innerWidth - document.documentElement.clientWidth 
      : 0;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Add blur effect to background if enabled
    if (blurBackground) {
      const rootElement = document.getElementById('root') || document.body.firstElementChild;
      if (rootElement) {
        rootElement.style.filter = 'blur(4px)';
        rootElement.style.transition = 'filter 0.3s ease';
      }
    }

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.paddingRight = originalStyle.paddingRight;
      document.body.style.position = originalStyle.position;

      // Remove blur effect
      if (blurBackground) {
        const rootElement = document.getElementById('root') || document.body.firstElementChild;
        if (rootElement) {
          rootElement.style.filter = '';
          rootElement.style.transition = '';
        }
      }

      // Restore focus
      if (previousFocus && previousFocus.focus) {
        setTimeout(() => {
          previousFocus.focus();
        }, 0);
      }
    };
  }, [isOpen, preventBodyScroll, blurBackground, previousFocus]);

  // Open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      onOpen?.();
      
      // Trigger onAfterOpen after animation
      const timeout = setTimeout(() => {
        onAfterOpen?.();
      }, animationDuration);
      
      animationTimeoutRef.current = timeout;
    } else if (isVisible) {
      handleClose();
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // Handle close with animation
  const handleClose = useCallback(() => {
    if (loading || persistent) return;
    
    setIsClosing(true);
    
    const timeout = setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
      onClose?.();
      onAfterClose?.();
    }, animationDuration);
    
    animationTimeoutRef.current = timeout;
  }, [loading, persistent, animationDuration, onClose, onAfterClose]);

  // Keyboard handling
  useEffect(() => {
    if (!isVisible || typeof document === 'undefined') return;

    const handleKeyDown = (event) => {
      // Handle Escape key
      if (event.key === 'Escape' && closeOnEscapeKey) {
        event.preventDefault();
        handleClose();
        return;
      }

      // EFocus trapping
      if (event.key === 'Tab') {
        trapFocus(event);
      }
    };

    const trapFocus = (event) => {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, closeOnEscapeKey, handleClose]);

  // Focus management
  useEffect(() => {
    if (!isVisible || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      // Focus the close button first, then first focusable element
      const closeButton = modalRef.current.querySelector('[aria-label="Close modal"]');
      const targetElement = closeButton || focusableElements[0];
      
      setTimeout(() => {
        targetElement?.focus();
      }, 100);
    }
  }, [isVisible]);

  // Handle overlay click with ripple effect
  const handleOverlayClick = useCallback((event) => {
    if (event.target === event.currentTarget && closeOnOverlayClick && !persistent) {
      // Add ripple effect at click position
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'modalRipple 0.6s ease-out forwards';
      ripple.style.pointerEvents = 'none';
      
      event.currentTarget.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      handleClose();
    }
  }, [closeOnOverlayClick, persistent, handleClose]);

  // Doesn't render if not visible
  if (!isVisible) {
    return null;
  }

  // Doesn't render if portal element is not ready
  if (!portalElement || typeof document === 'undefined') {
    return null;
  }

  const overlayClasses = [
    styles.overlay,
    centered && styles.overlayCentered,
    isClosing && styles.overlayClosing,
    overlayClassName
  ].filter(Boolean).join(' ');

  const modalClasses = [
    styles.modal,
    styles[size],
    styles[variant],
    isClosing && styles.modalClosing,
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  // Close icon component
  const CloseIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );

  // Loading spinner
  const LoadingSpinner = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={styles.loadingSpinner}
    >
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
  );

  const modalContent = (
    <div 
      ref={overlayRef}
      className={overlayClasses}
      onClick={handleOverlayClick}
      role="presentation"
      style={{ 
        pointerEvents: 'auto',
        '--animation-duration': `${animationDuration}ms`
      }}
      data-variant={variant}
      data-closing={isClosing}
    >
      <div
        ref={combinedRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby || (title ? 'modal-title' : undefined)}
        aria-describedby={ariaDescribedby || 'modal-body'}
        data-size={size}
        data-variant={variant}
        {...props}
      >
        {/* Loading overlay */}
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingContent}>
              <LoadingSpinner />
              <span className={styles.loadingText}>Loading...</span>
            </div>
          </div>
        )}

        {/* Header */}
        {(title || showCloseButton) && (
          <div className={`${styles.header} ${headerClassName}`}>
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
                disabled={loading || persistent}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div 
          id="modal-body" 
          className={`
            ${styles.body} 
            ${!title && !showCloseButton ? styles.bodyNoPadding : ''} 
            ${bodyClassName}
          `}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={`${styles.footer} ${footerClassName}`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  try {
    return createPortal(modalContent, portalElement);
  } catch (error) {
    console.warn('Modal portal rendering failed:', error);
    return null;
  }
});

Modal.displayName = 'Modal';

// Modal Header subcomponent
const ModalHeader = ({ 
  title, 
  onClose, 
  className = '', 
  children, 
  subtitle,
  icon,
  actions,
  ...props 
}) => {
  const CloseIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );

  return (
    <div className={`${styles.header} ${className}`} {...props}>
      {children || (
        <>
          <div className={styles.headerContent}>
            {icon && <span className={styles.headerIcon}>{icon}</span>}
            <div className={styles.headerText}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
          <div className={styles.headerActions}>
            {actions}
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
          </div>
        </>
      )}
    </div>
  );
};

// Modal Body subcomponent
const ModalBody = ({ 
  children, 
  noPadding = false, 
  scrollable = true,
  className = '', 
  ...props 
}) => {
  const bodyClasses = [
    styles.body,
    noPadding && styles.bodyNoPadding,
    !scrollable && styles.bodyNoScroll,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={bodyClasses} {...props}>
      {children}
    </div>
  );
};

// Modal Footer subcomponent
const ModalFooter = ({ 
  children, 
  spaceBetween = false, 
  align = 'end', // 'start', 'center', 'end', 'stretch'
  className = '', 
  ...props 
}) => {
  const footerClasses = [
    styles.footer,
    spaceBetween && styles.footerSpaceBetween,
    styles[`footerAlign${align.charAt(0).toUpperCase() + align.slice(1)}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
};

// Attach subcomponents
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;