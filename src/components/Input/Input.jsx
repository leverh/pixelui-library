import { useState, useId, forwardRef, useCallback, useRef, useEffect } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  size = 'md', // 'xs', 'sm', 'md', 'lg', 'xl'
  variant = 'default', // 'default', 'minimal', 'floating', 'glass'
  state,
  helperText,
  errorText,
  successText,
  warningText,
  required = false,
  disabled = false,
  readOnly = false,
  leftIcon,
  rightIcon,
  maxLength,
  showCharacterCount = false,
  autoComplete,
  autoFocus = false,
  clearable = false,
  loading = false,
  className = '',
  id: providedId,
  name,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const internalRef = useRef(null);
  const generatedId = useId();
  const id = providedId || generatedId;
  const helperTextId = `${id}-helper`;
  const errorTextId = `${id}-error`;
  
  // Combine internal ref with forwarded ref
  const combinedRef = useCallback((node) => {
    internalRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  }, [ref]);

  // Auto-focus handling
  useEffect(() => {
    if (autoFocus && internalRef.current && !disabled) {
      internalRef.current.focus();
    }
  }, [autoFocus, disabled]);
  
  // Controlled or uncontrolled component?
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  // Determine the input type
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  // Determine validation state
  let validationState = state;
  if (errorText) validationState = 'error';
  else if (successText) validationState = 'success';
  else if (warningText) validationState = 'warning';
  
  // Get appropriate helper text
  const getHelperText = () => {
    if (errorText) return errorText;
    if (successText) return successText;
    if (warningText) return warningText;
    return helperText;
  };
  
  const getHelperTextClass = () => {
    if (errorText) return styles.errorText;
    if (successText) return styles.successText;
    if (warningText) return styles.warningText;
    return '';
  };
  
  const handleChange = (event) => {
    const newValue = event.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(event);
  };

  const handleFocus = (event) => {
    setIsFocused(true);
    setHasInteracted(true);
    onFocus?.(event);
  };

  const handleBlur = (event) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleKeyDown = (event) => {
    // Handle Escape to clear focus
    if (event.key === 'Escape' && clearable && currentValue) {
      handleClear();
    }
    onKeyDown?.(event);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    // Focus on input after toggle
    setTimeout(() => {
      internalRef.current?.focus();
    }, 0);
  };

  const handleClear = () => {
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: internalRef.current
    };
    
    if (!isControlled) {
      setInternalValue('');
    }
    
    onChange?.(syntheticEvent);
    internalRef.current?.focus();
  };
  
  const inputClasses = [
    styles.input,
    styles[size],
    styles[variant],
    validationState && styles[validationState],
    leftIcon && styles.hasLeftIcon,
    (rightIcon || type === 'password' || clearable || loading) && styles.hasRightIcon,
    isFocused && styles.focused,
    hasInteracted && styles.interacted,
    disabled && styles.disabled,
    readOnly && styles.readOnly,
    className
  ].filter(Boolean).join(' ');
  
  // Calculate character count
  const characterCount = currentValue ? currentValue.length : 0;
  const isOverLimit = maxLength && characterCount > maxLength;
  const isNearLimit = maxLength && characterCount > maxLength * 0.8;
  
  // Show clear button conditions
  const showClearButton = clearable && currentValue && !disabled && !readOnly;
  
  // ARIA attributes
  const ariaAttributes = {
    'aria-invalid': validationState === 'error',
    'aria-describedby': [
      getHelperText() && helperTextId,
      errorText && errorTextId,
      showCharacterCount && maxLength && `${id}-count`
    ].filter(Boolean).join(' ') || undefined,
    'aria-required': required,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby || (label ? `${id}-label` : undefined),
  };

  // Enhanced icon components
  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
  
  const EyeOffIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  const ClearIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  const LoadingSpinner = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.loadingSpinner}>
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
  );

  return (
    <div 
      className={`${styles.inputWrapper} ${className}`}
      data-size={size}
      data-variant={variant}
      data-state={validationState}
      data-focused={isFocused}
      data-disabled={disabled}
      data-readonly={readOnly}
    >
      {label && (
        <div className={styles.labelWrapper}>
          <label 
            htmlFor={id} 
            id={`${id}-label`}
            className={`${styles.label} ${required ? styles.labelRequired : ''}`}
          >
            {label}
            {required && (
              <span className={styles.required} aria-label="required">
                *
              </span>
            )}
          </label>
          {!required && (
            <span className={styles.optional}>Optional</span>
          )}
        </div>
      )}
      
      <div className={styles.inputContainer}>
        {leftIcon && (
          <span className={styles.leftIcon} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        
        <input
          ref={combinedRef}
          id={id}
          name={name}
          type={inputType}
          value={currentValue}
          defaultValue={isControlled ? undefined : defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className={inputClasses}
          {...ariaAttributes}
          {...props}
        />

        {/* Right side icons */}
        <div className={styles.rightIconsContainer}>
          {loading && (
            <div className={styles.loadingContainer} aria-label="Loading">
              <LoadingSpinner />
            </div>
          )}
          
          {showClearButton && !loading && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Clear input"
              tabIndex={-1}
            >
              <ClearIcon />
            </button>
          )}
          
          {type === 'password' && !loading && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
          
          {rightIcon && type !== 'password' && !showClearButton && !loading && (
            <span className={styles.rightIcon} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
      </div>
      
      {/* Helper text and character count row */}
      <div className={styles.bottomRow}>
        {getHelperText() && (
          <div
            id={helperTextId}
            className={`${styles.helperText} ${getHelperTextClass()}`}
          >
            {getHelperText()}
          </div>
        )}
        
        {showCharacterCount && maxLength && (
          <div 
            id={`${id}-count`}
            className={`
              ${styles.characterCount} 
              ${isOverLimit ? styles.characterCountError : ''}
              ${isNearLimit ? styles.characterCountWarning : ''}
            `}
            aria-live="polite"
          >
            {characterCount}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;