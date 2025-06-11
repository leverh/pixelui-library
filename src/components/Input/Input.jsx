import { useState, useId, forwardRef } from 'react';
import PropTypes from 'prop-types';
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
  size = 'medium',
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
  className = '',
  id: providedId,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  const generatedId = useId();
  const id = providedId || generatedId;
  const helperTextId = `${id}-helper`;
  const errorTextId = `${id}-error`;
  
  // Determine if this is a controlled or uncontrolled component
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
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const inputClasses = [
    styles.input,
    styles[size],
    validationState && styles[validationState],
    leftIcon && styles.hasLeftIcon,
    (rightIcon || type === 'password') && styles.hasRightIcon,
    className
  ].filter(Boolean).join(' ');
  
  // Calculate character count
  const characterCount = currentValue ? currentValue.length : 0;
  const isOverLimit = maxLength && characterCount > maxLength;
  
  // ARIA attributes
  const ariaAttributes = {
    'aria-invalid': validationState === 'error',
    'aria-describedby': [
      getHelperText() && helperTextId,
      errorText && errorTextId
    ].filter(Boolean).join(' ') || undefined,
    'aria-required': required,
  };
  
  // Eye icons for password toggle
  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
  
  const EyeOffIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <div className={styles.labelWrapper}>
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && <span className={styles.required} aria-label="required">*</span>}
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
          ref={ref}
          id={id}
          type={inputType}
          value={currentValue}
          defaultValue={isControlled ? undefined : defaultValue}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          className={inputClasses}
          {...ariaAttributes}
          {...props}
        />
        
        {type === 'password' && (
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
        
        {rightIcon && type !== 'password' && (
          <span className={styles.rightIcon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>
      
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
          className={`${styles.characterCount} ${isOverLimit ? styles.characterCountError : ''}`}
          data-testid="character-count"
        >
          {characterCount}/{maxLength}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  /** Input type */
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search']),
  
  /** Input label */
  label: PropTypes.string,
  
  /** Placeholder text */
  placeholder: PropTypes.string,
  
  /** Controlled value */
  value: PropTypes.string,
  
  /** Default value for uncontrolled component */
  defaultValue: PropTypes.string,
  
  /** Change handler */
  onChange: PropTypes.func,
  
  /** Blur handler */
  onBlur: PropTypes.func,
  
  /** Focus handler */
  onFocus: PropTypes.func,
  
  /** Input size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /** Validation state */
  state: PropTypes.oneOf(['error', 'success', 'warning']),
  
  /** Helper text */
  helperText: PropTypes.string,
  
  /** Error text (overrides helperText and state) */
  errorText: PropTypes.string,
  
  /** Success text (overrides helperText) */
  successText: PropTypes.string,
  
  /** Warning text (overrides helperText) */
  warningText: PropTypes.string,
  
  /** Whether the field is required */
  required: PropTypes.bool,
  
  /** Whether the input is disabled */
  disabled: PropTypes.bool,
  
  /** Whether the input is read-only */
  readOnly: PropTypes.bool,
  
  /** Icon to display on the left */
  leftIcon: PropTypes.node,
  
  /** Icon to display on the right */
  rightIcon: PropTypes.node,
  
  /** Maximum character length */
  maxLength: PropTypes.number,
  
  /** Show character count */
  showCharacterCount: PropTypes.bool,
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** Input ID */
  id: PropTypes.string,
};

export default Input;